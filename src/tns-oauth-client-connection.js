"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = require("querystring");
var URL = require("url");
var http = require("tns-core-modules/http");
var tns_oauth_utils_1 = require("./tns-oauth-utils");
var accessTokenName = "access_token";
var TnsOAuthClientConnection = (function () {
    function TnsOAuthClientConnection() {
    }
    Object.defineProperty(TnsOAuthClientConnection.prototype, "client", {
        get: function () {
            return this._client;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TnsOAuthClientConnection.prototype, "completion", {
        get: function () {
            return this._completion;
        },
        enumerable: true,
        configurable: true
    });
    TnsOAuthClientConnection.initWithRequestClientCompletion = function (client, completion) {
        return TnsOAuthClientConnection.initWithRequestClientFeaturesCompletion(client, 0, completion);
    };
    TnsOAuthClientConnection.initWithRequestClientFeaturesCompletion = function (client, features, completion) {
        var instance = new TnsOAuthClientConnection();
        if (instance) {
            instance._client = client;
            instance._completion = completion;
        }
        return instance;
    };
    TnsOAuthClientConnection.prototype.startGetTokenFromCode = function (authCode) {
        this.getTokenFromCode(this.client, authCode, this.completion);
    };
    TnsOAuthClientConnection.prototype.startTokenRevocation = function () {
        var _this = this;
        var revokeUrl = this.client.provider.authority + this.client.provider.revokeEndpoint;
        var headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
        var body = querystring.stringify({
            token: this.client.tokenResult.refreshToken
        });
        http
            .request({
            url: revokeUrl,
            method: "POST",
            headers: headers,
            content: body
        })
            .then(function (response) {
            if (response.statusCode !== 200) {
                _this.completion(null, response, new Error("Failed logout with status " + response.statusCode + "."));
            }
            else {
                _this.completion(null, response, null);
            }
        });
    };
    TnsOAuthClientConnection.prototype.startTokenRefresh = function () {
        var _this = this;
        var tokenUrl = this.client.provider.authority + this.client.provider.tokenEndpoint;
        var headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
        var body = null;
        switch (this.client.provider.options.openIdSupport) {
            case "oid-full":
                var options1 = this.client.provider.options;
                body = querystring.stringify({
                    grant_type: "refresh_token",
                    refresh_token: this.client.tokenResult.refreshToken,
                    client_id: options1.clientId
                });
                break;
            case "oid-none":
                var options2 = this.client.provider.options;
                body = querystring.stringify({
                    grant_type: "refresh_token",
                    refresh_token: this.client.tokenResult.refreshToken,
                    client_id: options2.clientId,
                    client_secret: options2.clientSecret
                });
        }
        http
            .request({
            url: tokenUrl,
            method: "POST",
            headers: headers,
            content: body
        })
            .then(function (response) {
            if (response.statusCode !== 200) {
                _this.completion(null, response, new Error("Failed refresh token with status " + response.statusCode + "."));
            }
            else {
                _this.completion(null, response, null);
            }
        });
    };
    TnsOAuthClientConnection.prototype.getTokenFromCode = function (client, code, completion) {
        var oauthParams = {
            grant_type: "authorization_code"
        };
        return this.getOAuthAccessToken(client, code, oauthParams, completion);
    };
    TnsOAuthClientConnection.prototype.getAccessTokenUrl = function (client) {
        var oauth2 = null;
        switch (client.provider.options.openIdSupport) {
            case "oid-full":
                var options1 = client.provider.options;
                oauth2 = {
                    clientId: options1.clientId,
                    baseSite: client.provider.authority,
                    baseSiteToken: client.provider.tokenEndpointBase,
                    authorizePath: client.provider.authorizeEndpoint,
                    accessTokenPath: client.provider.tokenEndpoint
                };
                break;
            case "oid-none":
                var options2 = client.provider.options;
                oauth2 = {
                    clientId: options2.clientId,
                    clientSecret: options2.clientSecret,
                    baseSite: client.provider.authority,
                    baseSiteToken: client.provider.tokenEndpointBase,
                    authorizePath: client.provider.authorizeEndpoint,
                    accessTokenPath: client.provider.tokenEndpoint
                };
        }
        var _clientId = oauth2.clientId;
        var _clientSecret = oauth2.clientSecret;
        var _baseSite = oauth2.baseSite;
        var _baseSiteToken = oauth2.baseSiteToken;
        var _authorizeUrl = oauth2.authorizePath || "/oauth/authorize";
        var _accessTokenUrl = oauth2.accessTokenPath || "/oauth/access_token";
        var _accessTokenName = "access_token";
        var _authMethod = "Bearer";
        var _useAuthorizationHeaderForGET = false;
        if (_baseSiteToken && _baseSiteToken !== "") {
            return _baseSiteToken + _accessTokenUrl;
        }
        else {
            return _baseSite + _accessTokenUrl;
        }
    };
    TnsOAuthClientConnection.prototype.getOAuthAccessToken = function (client, code, parameters, completion) {
        var _this = this;
        var params = parameters || {};
        params["client_id"] = client.provider.options.clientId;
        if (client.provider.options.openIdSupport === "oid-none") {
            var options = client.provider.options;
            if (options.clientSecret && options.clientSecret !== "") {
                params["client_secret"] = options.clientSecret;
            }
        }
        var codeParam = params.grant_type === "refresh_token" ? "refresh_token" : "code";
        params[codeParam] = code;
        var post_data = querystring.stringify(params);
        post_data =
            post_data + "&redirect_uri=" + client.provider.options.redirectUri;
        var post_headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
        var accessTokenUrl = this.getAccessTokenUrl(client);
        return new Promise(function (resolve, reject) {
            _this._createRequest("POST", accessTokenUrl, post_headers, post_data, null)
                .then(function (response) {
                var tokenResult = tns_oauth_utils_1.httpResponseToToken(response);
                completion(tokenResult, response);
                resolve(response);
            })
                .catch(function (er) {
                reject(er);
            });
        });
    };
    TnsOAuthClientConnection.prototype._createRequest = function (method, url, headers, post_body, access_token) {
        var parsedUrl = URL.parse(url, true);
        var realHeaders = {};
        for (var key in this._customHeaders) {
            realHeaders[key] = this._customHeaders[key];
        }
        if (headers) {
            for (var key in headers) {
                realHeaders[key] = headers[key];
            }
        }
        realHeaders["Host"] = parsedUrl.host;
        if (access_token && !("Authorization" in realHeaders)) {
            if (!parsedUrl.query) {
                parsedUrl.query = {};
            }
            parsedUrl.query[accessTokenName] = access_token;
        }
        var queryStr = querystring.stringify(parsedUrl.query);
        if (queryStr) {
            queryStr = "?" + queryStr;
        }
        var options = {
            host: parsedUrl.hostname,
            port: parsedUrl.port,
            path: parsedUrl.pathname + queryStr,
            method: method,
            headers: realHeaders
        };
        return this._executeRequest(options, url, post_body);
    };
    TnsOAuthClientConnection.prototype._executeRequest = function (options, url, post_body) {
        var promise = http.request({
            url: url,
            method: options.method,
            headers: options.headers,
            content: post_body
        });
        return promise;
    };
    return TnsOAuthClientConnection;
}());
exports.TnsOAuthClientConnection = TnsOAuthClientConnection;
//# sourceMappingURL=tns-oauth-client-connection.js.map
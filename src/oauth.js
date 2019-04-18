"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var applicationModule = require("tns-core-modules/application");
var platformModule = require("tns-core-modules/platform");
var frameModule = require("tns-core-modules/ui/frame");
var delegate_1 = require("./delegate");
var tns_oauth_native_view_controller_1 = require("./tns-oauth-native-view-controller");
var tns_oauth_login_webview_controller_1 = require("./tns-oauth-login-webview-controller");
var tns_oauth_client_connection_1 = require("./tns-oauth-client-connection");
var tns_oauth_utils_1 = require("./tns-oauth-utils");
var TnsOAuthClient = (function () {
    function TnsOAuthClient(providerType) {
        this.provider = null;
        this.provider = exports.tnsOauthProviderMap.providerMap.get(providerType);
        if (this.provider) {
            switch (this.provider.options.openIdSupport) {
                case "oid-full":
                    delegate_1.TnsOAuthClientAppDelegate.setConfig(this, this.provider.options.urlScheme);
                    this.loginController = tns_oauth_native_view_controller_1.TnsOAuthLoginNativeViewController.initWithClient(this);
                    break;
                case "oid-none":
                    this.loginController = tns_oauth_login_webview_controller_1.TnsOAuthLoginWebViewController.initWithClient(this);
                    break;
                default:
                    this.loginController = tns_oauth_login_webview_controller_1.TnsOAuthLoginWebViewController.initWithClient(this);
                    break;
            }
        }
    }
    TnsOAuthClient.prototype.loginWithCompletion = function (completion) {
        if (this.provider) {
            this.loginController.loginWithParametersFrameCompletion(null, frameModule.topmost(), this.provider.options.urlScheme, completion);
        }
        else {
            completion(null, "Provider is not configured");
        }
    };
    TnsOAuthClient.prototype.refreshTokenWithCompletion = function (completion) {
        if (this.provider) {
            this.callRefreshEndpointWithCompletion(completion);
        }
        else {
            completion(null, "Provider is not configured");
        }
    };
    TnsOAuthClient.prototype.logout = function () {
        this.removeCookies();
        this.removeToken();
        this.callRevokeEndpoint();
    };
    TnsOAuthClient.prototype.resumeWithUrl = function (url) {
        this.loginController.resumeWithUrl(url);
    };
    TnsOAuthClient.prototype.removeCookies = function () {
        var _this = this;
        if (platformModule.isIOS) {
            var cookieArr = tns_oauth_utils_1.nsArrayToJSArray(NSHTTPCookieStorage.sharedHTTPCookieStorage.cookies);
            for (var i = 0; i < cookieArr.length; i++) {
                var cookie = cookieArr[i];
                for (var j = 0; j < this.provider.cookieDomains.length; j++) {
                    if (cookie.domain.endsWith(this.provider.cookieDomains[j])) {
                        NSHTTPCookieStorage.sharedHTTPCookieStorage.deleteCookie(cookie);
                    }
                }
            }
            var dataStore_1 = WKWebsiteDataStore.defaultDataStore();
            dataStore_1.fetchDataRecordsOfTypesCompletionHandler(WKWebsiteDataStore.allWebsiteDataTypes(), function (records) {
                var cookieArr = tns_oauth_utils_1.nsArrayToJSArray(records);
                var _loop_1 = function (k) {
                    var cookieRecord = cookieArr[k];
                    for (var l = 0; l < _this.provider.cookieDomains.length; l++) {
                        if (cookieRecord.displayName.endsWith(_this.provider.cookieDomains[l])) {
                            dataStore_1.removeDataOfTypesForDataRecordsCompletionHandler(cookieRecord.dataTypes, tns_oauth_utils_1.jsArrayToNSArray([cookieRecord]), function () {
                                console.log("Cookies for " + cookieRecord.displayName + " deleted successfully");
                            });
                        }
                    }
                };
                for (var k = 0; k < cookieArr.length; k++) {
                    _loop_1(k);
                }
            });
        }
        else if (platformModule.isAndroid) {
            var cookieManager = android.webkit.CookieManager.getInstance();
            if (cookieManager.removeAllCookies) {
                var cm23 = cookieManager;
                cm23.removeAllCookies(null);
                cm23.flush();
            }
            else if (cookieManager.removeAllCookie) {
                cookieManager.removeAllCookie();
                cookieManager.removeSessionCookie();
            }
        }
    };
    TnsOAuthClient.prototype.removeToken = function () {
        this.tokenResult = null;
    };
    TnsOAuthClient.prototype.callRevokeEndpoint = function () {
        if (!this.provider.revokeEndpoint) {
            return;
        }
        var responseCompletion = function (data, response, responseError) {
            if (!responseError) {
                if (response.statusCode === 200) {
                }
                else {
                }
            }
        };
        var connection = tns_oauth_client_connection_1.TnsOAuthClientConnection.initWithRequestClientCompletion(this, responseCompletion);
        connection.startTokenRevocation();
    };
    TnsOAuthClient.prototype.callRefreshEndpointWithCompletion = function (completion) {
        var _this = this;
        if (!this.provider.tokenEndpoint) {
            return;
        }
        var connection = tns_oauth_client_connection_1.TnsOAuthClientConnection.initWithRequestClientCompletion(this, function (data, result, error) {
            _this.tokenResult = tns_oauth_utils_1.httpResponseToToken(result);
            completion(_this.tokenResult, error);
        });
        connection.startTokenRefresh();
    };
    return TnsOAuthClient;
}());
exports.TnsOAuthClient = TnsOAuthClient;
var TnsOauthProviderMap = (function () {
    function TnsOauthProviderMap() {
        this.providerMap = new Map();
    }
    TnsOauthProviderMap.prototype.addProvider = function (providerType, provider) {
        this.providerMap.set(providerType, provider);
    };
    return TnsOauthProviderMap;
}());
exports.TnsOauthProviderMap = TnsOauthProviderMap;
exports.tnsOauthProviderMap = new TnsOauthProviderMap();
function configureClientAuthAppDelegate() {
    applicationModule.ios.delegate = delegate_1.TnsOAuthClientAppDelegate;
}
function configureTnsOAuth(providers) {
    if (platformModule.isIOS) {
        if (providers.some(function (p) { return p.options.openIdSupport === "oid-full"; })) {
            configureClientAuthAppDelegate();
        }
    }
    for (var i = 0; i < providers.length; ++i) {
        exports.tnsOauthProviderMap.addProvider(providers[i].providerType, providers[i]);
    }
}
exports.configureTnsOAuth = configureTnsOAuth;
//# sourceMappingURL=oauth.js.map
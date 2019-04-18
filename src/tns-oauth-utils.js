"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = require("querystring");
var UrlLib = require("url");
function getAuthUrlStr(provider) {
    if (provider.getAuthUrlStr) {
        return provider.getAuthUrlStr();
    }
    var params = {};
    params["client_id"] = provider.options.clientId;
    //params["display"] = "mobile";
    params["response_type"] = "code";
    params["redirect_uri"] = provider.options.redirectUri;
    params["scope"] = provider.options.scopes && provider.options.scopes.join(' ');
    //params["response_mode"] = "query";
    params["state"] = "abcd";
    var pararmsStr = querystring.stringify(params);
    var retAuthUrlStr = provider.authority + provider.authorizeEndpoint + "?" + pararmsStr;
    return retAuthUrlStr;
}
exports.getAuthUrlStr = getAuthUrlStr;
function authorizationCodeFromRedirectUrl(url) {
    console.log('url-inner', url);
    var authorizationCode = null;
    if (url.indexOf('vk.com') > -1) {
        console.log('urlllll',url)
        var parsedRetStr = UrlLib.parse(url);
        var qsObj = querystring.parse(parsedRetStr.hash)['#code'];
        authorizationCode = qsObj;
    }
    else if(url){
        console.log('url',url)
        let parsedRetStr = UrlLib.parse(url);
        console.log('parsedRetStr',parsedRetStr)
        let qsObj = querystring.parse(parsedRetStr.query);
        console.log('qsObj',qsObj)
        authorizationCode = qsObj["code"];
    }
    
    return authorizationCode;
}
exports.authorizationCodeFromRedirectUrl = authorizationCodeFromRedirectUrl;
function getAccessTokenUrlStr(provider) {
    var retStr = "";
    if (provider.tokenEndpointBase && provider.tokenEndpointBase !== "") {
        retStr = provider.tokenEndpointBase + provider.tokenEndpoint;
    }
    else {
        retStr = provider.authority + provider.tokenEndpoint;
    }
    return retStr;
}
exports.getAccessTokenUrlStr = getAccessTokenUrlStr;
function getAccessTokenUrlWithCodeStr(provider, authCode) {
    if (provider.getAccessTokenUrlWithCodeStr) {
        return provider.getAccessTokenUrlWithCodeStr(authCode);
    }
    var params = {};
    params["code"] = authCode;
    params["client_id"] = provider.options.clientId;
    params["client_secret"] = provider.options.clientSecret;
    params["scope"] = provider.options.scopes && provider.options.scopes.join(' ');
    params["state"] = "abcd";
    var pararmsStr = querystring.stringify(params);
    var pararmsWithRedirectStr = pararmsStr + "&redirect_uri=" + provider.options.redirectUri;
    var retAccessTokenWithCodeUrlStr = getAccessTokenUrlStr(provider) + "?" + pararmsWithRedirectStr;
    //debugger
    return retAccessTokenWithCodeUrlStr;
}
exports.getAccessTokenUrlWithCodeStr = getAccessTokenUrlWithCodeStr;
function getAccessTokenWithCodeUrl(provider, authCode) {
    var accessUrlStr = getAccessTokenUrlWithCodeStr(provider, authCode);
    return accessUrlStr;
}
exports.getAccessTokenWithCodeUrl = getAccessTokenWithCodeUrl;
function newUUID(a, b) {
    for (b = a = ""; a++ < 36; b +=
        (a * 51) & 52
            ? (a ^ 15 ? 8 ^ (Math.random() * (a ^ 20 ? 16 : 4)) : 4).toString(16)
            : "-")
        ;
    return b;
}
exports.newUUID = newUUID;
function getAuthHeaderFromCredentials(provider) {
    var customAuthHeader;
    if (provider["basicAuthHeader"]) {
        customAuthHeader = { Authorization: provider["basicAuthHeader"] };
    }
    return customAuthHeader;
}
exports.getAuthHeaderFromCredentials = getAuthHeaderFromCredentials;
function nsArrayToJSArray(a) {
    var arr = [];
    if ("undefined" !== typeof a) {
        var count = a.count;
        for (var i = 0; i < count; i++) {
            arr.push(a.objectAtIndex(i));
        }
    }
    return arr;
}
exports.nsArrayToJSArray = nsArrayToJSArray;
function jsArrayToNSArray(str) {
    return NSArray.arrayWithArray(str);
}
exports.jsArrayToNSArray = jsArrayToNSArray;
function httpResponseToToken(response) {
    var results;
    try {
        results = response.content.toJSON();
    }
    catch (e) {
        results = querystring.parse(response.content.toString());
    }
    var access_token = results["access_token"];
    var refresh_token = results["refresh_token"];
    var id_token = results["id_token"];
    var expires_in = results["expires_in"];
    delete results["refresh_token"];
    var expSecs = Math.floor(parseFloat(expires_in));
    var expDate = new Date();
    var email;
    if(results["email"]) {
        email = results["email"];
    }

    console.log("GET TO TOKEN")
    expDate.setSeconds(expDate.getSeconds() + expSecs);
    return {
        accessToken: access_token,
        refreshToken: refresh_token,
        idToken: id_token,
        accessTokenExpiration: expDate,
        refreshTokenExpiration: expDate,
        idTokenExpiration: expDate,
        email
    };
}
exports.httpResponseToToken = httpResponseToToken;
//# sourceMappingURL=tns-oauth-utils.js.map
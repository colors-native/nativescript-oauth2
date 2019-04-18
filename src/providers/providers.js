"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TnsOaProviderMicrosoft = (function () {
    function TnsOaProviderMicrosoft(options) {
        this.openIdSupport = "oid-full";
        this.providerType = "microsoft";
        this.authority = "https://login.microsoftonline.com/common";
        this.tokenEndpointBase = "https://login.microsoftonline.com/common";
        this.authorizeEndpoint = "/oauth2/v2.0/authorize";
        this.tokenEndpoint = "/oauth2/v2.0/token";
        this.cookieDomains = ["login.microsoftonline.com", "live.com"];
        this.options = options;
    }
    TnsOaProviderMicrosoft.prototype.parseTokenResult = function (jsonData) {
        return jsonData;
    };
    return TnsOaProviderMicrosoft;
}());
exports.TnsOaProviderMicrosoft = TnsOaProviderMicrosoft;
var TnsOaProviderGoogle = (function () {
    function TnsOaProviderGoogle(options) {
        this.openIdSupport = "oid-none";
        this.providerType = "google";
        this.authority = "https://accounts.google.com/o";
        this.tokenEndpointBase = "https://accounts.google.com/o";
        this.authorizeEndpoint = "/oauth2/auth";
        this.tokenEndpoint = "/oauth2/token";
        this.cookieDomains = ["google.com"];
        this.options = options;
    }
    TnsOaProviderGoogle.prototype.parseTokenResult = function (jsonData) {
        return jsonData;
    };
    return TnsOaProviderGoogle;
}());
exports.TnsOaProviderGoogle = TnsOaProviderGoogle;
var TnsOaProviderFacebook = (function () {
    function TnsOaProviderFacebook(options) {
        this.openIdSupport = "oid-none";
        this.providerType = "facebook";
        this.authority = "https://www.facebook.com/v3.2/dialog";
        this.tokenEndpointBase = "https://graph.facebook.com";
        this.authorizeEndpoint = "/oauth";
        this.tokenEndpoint = "/v3.2/oauth/access_token";
        this.cookieDomains = ["facebook.com"];
        this.options = options;
    }
    TnsOaProviderFacebook.prototype.parseTokenResult = function (jsonData) {
        return jsonData;
    };
    return TnsOaProviderFacebook;
}());
exports.TnsOaProviderFacebook = TnsOaProviderFacebook;
var TnsOaProviderVK = (function () {
    function TnsOaProviderVK(options) {
        this.openIdSupport = "oid-none";
        this.providerType = "vkontakte";
        this.authority = "https://oauth.vk.com";
        this.tokenEndpointBase = "https://oauth.vk.com";
        this.authorizeEndpoint = "/authorize";
        this.tokenEndpoint = "/access_token";
        this.cookieDomains = ["vk.com"];
        this.options = options;
    }
    TnsOaProviderVK.prototype.parseTokenResult = function (jsonData) {
        //console.log(12313123123121312312)
        return jsonData;
    };
    return TnsOaProviderVK;
}());
exports.TnsOaProviderVK = TnsOaProviderVK;
var TnsOaProviderInsta = (function () {
    function TnsOaProviderInsta(options) {
        this.openIdSupport = "oid-none";
        this.providerType = "instagram";
        this.authority = "https://api.instagram.com/oauth";
        this.tokenEndpointBase = "https://api.instagram.com/oauth";
        this.authorizeEndpoint = "/authorize/";
        this.tokenEndpoint = "/access_token";
        this.cookieDomains = ["instagram.com"];
        this.options = options;
    }
    TnsOaProviderInsta.prototype.parseTokenResult = function (jsonData) {
        //console.log(12313123123121312312)
        return jsonData;
    };
    return TnsOaProviderInsta;
}());
exports.TnsOaProviderInsta = TnsOaProviderInsta;
var TnsOaProviderGIT = (function () {
    function TnsOaProviderGIT(options) {
        this.openIdSupport = "oid-none";
        this.providerType = "github";
        this.authority = "https://github.com/login/oauth";
        this.tokenEndpointBase = "https://github.com/login/oauth";
        this.authorizeEndpoint = "/authorize";
        this.tokenEndpoint = "/access_token";
        this.cookieDomains = ["github.com"];
        this.options = options;
    }
    TnsOaProviderGIT.prototype.parseTokenResult = function (jsonData) {
        //console.log(12313123123121312312)
        return jsonData;
    };
    return TnsOaProviderGIT;
}());
exports.TnsOaProviderGIT = TnsOaProviderGIT;
var TnsOaProviderLinkedIn = (function () {
    function TnsOaProviderLinkedIn(options) {
        this.openIdSupport = "oid-none";
        this.providerType = "linkedIn";
        this.authority = "https://www.linkedin.com";
        this.tokenEndpointBase = "https://www.linkedin.com";
        this.authorizeEndpoint = "/oauth/v2/authorization";
        this.tokenEndpoint = "/oauth/v2/accessToken";
        this.cookieDomains = ["linkedin.com"];
        this.options = options;
    }
    TnsOaProviderLinkedIn.prototype.parseTokenResult = function (jsonData) {
        return jsonData;
    };
    return TnsOaProviderLinkedIn;
}());
exports.TnsOaProviderLinkedIn = TnsOaProviderLinkedIn;
//# sourceMappingURL=providers.js.map
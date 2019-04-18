"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TnsOAuthState = (function () {
    function TnsOAuthState(codeVerifier, loginCompletion, urlScheme) {
        this._loginCompletion = loginCompletion;
        this._codeVerifier = codeVerifier;
        this._urlScheme = urlScheme;
    }
    Object.defineProperty(TnsOAuthState.prototype, "loginCompletion", {
        get: function () {
            return this._loginCompletion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TnsOAuthState.prototype, "codeVerifier", {
        get: function () {
            return this._codeVerifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TnsOAuthState.prototype, "urlScheme", {
        get: function () {
            return this._urlScheme;
        },
        enumerable: true,
        configurable: true
    });
    return TnsOAuthState;
}());
exports.TnsOAuthState = TnsOAuthState;
//# sourceMappingURL=tns-oauth-auth-state.js.map
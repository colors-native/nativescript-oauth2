"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TnsOAuthClientAppDelegate = (function (_super) {
    __extends(TnsOAuthClientAppDelegate, _super);
    function TnsOAuthClientAppDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TnsOAuthClientAppDelegate_1 = TnsOAuthClientAppDelegate;
    TnsOAuthClientAppDelegate.setConfig = function (client, urlScheme) {
        this._client = client;
        this._urlScheme = urlScheme;
    };
    TnsOAuthClientAppDelegate.prototype.applicationOpenURLOptions = function (application, url, options) {
        return this.handleIncomingUrl(url);
    };
    TnsOAuthClientAppDelegate.prototype.applicationOpenURLSourceApplicationAnnotation = function (application, url, sourceApplication, annotation) {
        return this.handleIncomingUrl(url);
    };
    TnsOAuthClientAppDelegate.prototype.handleIncomingUrl = function (url) {
        if (!TnsOAuthClientAppDelegate_1._client ||
            !TnsOAuthClientAppDelegate_1._urlScheme) {
            console.log("IMPORTANT: Could not complete login flow.");
            return false;
        }
        if (url.scheme.toLowerCase() === TnsOAuthClientAppDelegate_1._urlScheme) {
            TnsOAuthClientAppDelegate_1._client.resumeWithUrl(url.absoluteString);
            return true;
        }
        else {
            return false;
        }
    };
    var TnsOAuthClientAppDelegate_1;
    TnsOAuthClientAppDelegate = TnsOAuthClientAppDelegate_1 = __decorate([
        ObjCClass(UIApplicationDelegate)
    ], TnsOAuthClientAppDelegate);
    return TnsOAuthClientAppDelegate;
}(UIResponder));
exports.TnsOAuthClientAppDelegate = TnsOAuthClientAppDelegate;
//# sourceMappingURL=delegate.ios.js.map
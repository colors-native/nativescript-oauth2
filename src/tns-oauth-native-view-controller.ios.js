"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tns_oauth_login_sub_controller_1 = require("./tns-oauth-login-sub-controller");
var TnsOAuthLoginNativeViewController = (function (_super) {
    __extends(TnsOAuthLoginNativeViewController, _super);
    function TnsOAuthLoginNativeViewController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loginController = null;
        return _this;
    }
    TnsOAuthLoginNativeViewController.initWithClient = function (client) {
        var instance = new TnsOAuthLoginNativeViewController();
        if (instance) {
            instance.loginController = new tns_oauth_login_sub_controller_1.TnsOAuthLoginSubController(client);
        }
        return instance;
    };
    TnsOAuthLoginNativeViewController.prototype.loginWithParametersFrameCompletion = function (parameters, frame, urlScheme, completion) {
        var fullUrl = this.loginController.preLoginSetup(frame, urlScheme, completion);
        this.loginInternalWithParametersCompletion(fullUrl, frame);
    };
    TnsOAuthLoginNativeViewController.prototype.loginInternalWithParametersCompletion = function (fullUrl, frame) {
        this.safariViewController = SFSafariViewController.alloc().initWithURLEntersReaderIfAvailable(NSURL.URLWithString(fullUrl), false);
        this.safariViewController.delegate = this;
        frame.ios.controller.presentViewControllerAnimatedCompletion(this.safariViewController, true, null);
    };
    TnsOAuthLoginNativeViewController.prototype.resumeWithUrl = function (url) {
        var _this = this;
        return this.loginController.resumeWithUrl(url, function (tokenResult, error) {
            if (_this.safariViewController) {
                _this.safariViewController.dismissViewControllerAnimatedCompletion(true, function () {
                    _this.loginController.completeLoginWithTokenResponseError(tokenResult, error);
                });
            }
            else {
                _this.loginController.completeLoginWithTokenResponseError(tokenResult, error);
            }
        });
    };
    TnsOAuthLoginNativeViewController.prototype.safariViewControllerDidFinish = function (controller) {
        if (controller !== this.safariViewController) {
            return;
        }
        if (!this.loginController.authState) {
            return;
        }
        var er = "The login operation was canceled.";
        this.loginController.completeLoginWithTokenResponseError(null, er);
    };
    TnsOAuthLoginNativeViewController.ObjCProtocols = [SFSafariViewControllerDelegate];
    return TnsOAuthLoginNativeViewController;
}(NSObject));
exports.TnsOAuthLoginNativeViewController = TnsOAuthLoginNativeViewController;
//# sourceMappingURL=tns-oauth-native-view-controller.ios.js.map
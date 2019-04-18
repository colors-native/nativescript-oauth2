"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appModule = require("tns-core-modules/application");
var colorModule = require("tns-core-modules/color");
var tns_oauth_login_sub_controller_1 = require("./tns-oauth-login-sub-controller");
var TnsOAuthLoginNativeViewController = (function () {
    function TnsOAuthLoginNativeViewController() {
        this.loginController = null;
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
        var builder = new android.support.customtabs.CustomTabsIntent.Builder();
        builder.setToolbarColor(new colorModule.Color("#335da0").android);
        builder.setShowTitle(true);
        var customTabsIntent = builder.build();
        customTabsIntent.launchUrl(appModule.android.startActivity, android.net.Uri.parse(fullUrl));
    };
    TnsOAuthLoginNativeViewController.prototype.resumeWithUrl = function (url) {
        var _this = this;
        return this.loginController.resumeWithUrl(url, function (tokenResult, error) {
            _this.loginController.completeLoginWithTokenResponseError(tokenResult, error);
            _this.loginController.frame.goBack();
        });
    };
    return TnsOAuthLoginNativeViewController;
}());
exports.TnsOAuthLoginNativeViewController = TnsOAuthLoginNativeViewController;
//# sourceMappingURL=tns-oauth-native-view-controller.android.js.map
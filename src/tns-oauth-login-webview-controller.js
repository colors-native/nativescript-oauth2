"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web_view_1 = require("tns-core-modules/ui/web-view");
var application_1 = require("tns-core-modules/application");
var page_1 = require("tns-core-modules/ui/page");
var grid_layout_1 = require("tns-core-modules/ui/layouts/grid-layout");
var action_bar_1 = require("tns-core-modules/ui/action-bar/action-bar");
var tns_oauth_login_sub_controller_1 = require("./tns-oauth-login-sub-controller");
var utilsModule = require("tns-core-modules/utils/utils");
var SOFT_INPUT_ADJUST_RESIZE = 16;
var TnsOAuthLoginWebViewController = (function () {
    function TnsOAuthLoginWebViewController() {
        this.loginController = null;
    }
    TnsOAuthLoginWebViewController.initWithClient = function (client) {
        var instance = new TnsOAuthLoginWebViewController();
        if (instance) {
            instance.loginController = new tns_oauth_login_sub_controller_1.TnsOAuthLoginSubController(client);
        }
        return instance;
    };
    TnsOAuthLoginWebViewController.prototype.loginWithParametersFrameCompletion = function (parameters, frame, urlScheme, completion) {
        var fullUrl = this.loginController.preLoginSetup(frame, urlScheme, completion);
        this.loginInternalWithParametersCompletion(fullUrl, frame);
    };
    TnsOAuthLoginWebViewController.prototype.loginInternalWithParametersCompletion = function (fullUrl, frame) {
        this.goToWebViewPage(frame, fullUrl);
    };
    TnsOAuthLoginWebViewController.prototype.goToWebViewPage = function (frame, url) {
        var _this = this;
        frame.navigate(function () { return _this.createWebViewPage(url); });
    };
    TnsOAuthLoginWebViewController.prototype.createWebViewPage = function (url) {
        var _this = this;
        var webView = this.createWebView(url, this.pageLoadStarted.bind(this), this.pageLoadFinished.bind(this));
        var grid = new grid_layout_1.GridLayout();
        grid.addChild(webView);
        var page = new page_1.Page();
        page.content = grid;
        if (page_1.isAndroid) {
            page.actionBarHidden = true;
            page.on("navigatedTo", function () {
                _this.setAndroidSoftInputModeToResize();
                webView.android.getSettings().setDomStorageEnabled(true);
                webView.android.getSettings().setBuiltInZoomControls(false);
            });
            page.on("navigatingFrom", function () {
                _this.restoreAndroidSoftInputMode();
            });
        }
        else {
            var navBtn = new action_bar_1.NavigationButton();
            navBtn.text = "";
            page.actionBar.navigationButton = navBtn;
        }
        var onCancel = function () {
            _this.loginController.completeLoginWithTokenResponseError(null, new Error("User cancelled."));
        };
        page.on("navigatedFrom", onCancel);
        this.unbindCancelEvent = function () { return page.off("navigatedFrom", onCancel); };
        return page;
    };
    TnsOAuthLoginWebViewController.prototype.createWebView = function (url, loadStarted, loadFinished) {
        var webView = new web_view_1.WebView();
        webView.on("loadStarted", loadStarted);
        webView.on("loadFinished", loadFinished);
        webView.src = url;
        return webView;
    };
    TnsOAuthLoginWebViewController.prototype.resumeWithUrl = function (url) {
        var _this = this;
        return this.loginController.resumeWithUrl(url, function (tokenResult, error) {
            _this.loginController.completeLoginWithTokenResponseError(tokenResult, error);
            if (_this.unbindCancelEvent) {
                _this.unbindCancelEvent();
            }
            _this.loginController.frame.goBack();
        });
    };
    TnsOAuthLoginWebViewController.prototype.pageLoadStarted = function (args) {
        console.log("WebView loadStarted " + args.url);
        if (args.url.startsWith(this.loginController.client.provider.options.redirectUri)) {
            this.resumeWithUrl(args.url);
        }
    };
    TnsOAuthLoginWebViewController.prototype.pageLoadFinished = function (args) {
        console.log("WebView loadFinished " + args.url);
    };
    TnsOAuthLoginWebViewController.prototype.setAndroidSoftInputModeToResize = function () {
        var window = application_1.android.foregroundActivity.getWindow();
        this.originalSoftInputMode = window.getAttributes().softInputMode;
        window.setSoftInputMode(SOFT_INPUT_ADJUST_RESIZE);
    };
    TnsOAuthLoginWebViewController.prototype.restoreAndroidSoftInputMode = function () {
        var window = application_1.android.foregroundActivity.getWindow();
        window.setSoftInputMode(this.originalSoftInputMode);
    };
    return TnsOAuthLoginWebViewController;
}());
exports.TnsOAuthLoginWebViewController = TnsOAuthLoginWebViewController;
//# sourceMappingURL=tns-oauth-login-webview-controller.js.map
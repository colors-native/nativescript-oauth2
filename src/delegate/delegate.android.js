"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appModule = require("tns-core-modules/application");
var TnsOAuthClientAppDelegate = (function () {
    function TnsOAuthClientAppDelegate() {
    }
    TnsOAuthClientAppDelegate.setConfig = function (client, urlScheme) {
        this._client = client;
        this._urlScheme = urlScheme;
        appModule.android.on(appModule.AndroidApplication.activityResumedEvent, function (args) {
            if (new String(args.activity.getIntent().getAction()).valueOf() ===
                new String(android.content.Intent.ACTION_VIEW).valueOf()) {
                var url = args.activity
                    .getIntent()
                    .getData()
                    .toString();
                TnsOAuthClientAppDelegate._client.resumeWithUrl(url);
                console.log(args.activity.getIntent().getData());
            }
        });
    };
    return TnsOAuthClientAppDelegate;
}());
exports.TnsOAuthClientAppDelegate = TnsOAuthClientAppDelegate;
//# sourceMappingURL=delegate.android.js.map
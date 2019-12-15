var e, a = require("../../vendor/qcloud-weapp-client-sdk/index"), t = require("../../config");

Page({
    data: {
        url: "",
        shareImg: "",
        redpackNo: "",
        navigationBarColor: "",
        version: t.service.version
    },
    onLoad: function(a) {
        console.log("help options", a), a.navfront && a.navBg && "" != a.navfront && "" != a.navBg && wx.setNavigationBarColor({
            frontColor: a.navfront,
            backgroundColor: a.navBg,
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), a.title && "" != a.title && wx.setNavigationBarTitle({
            title: a.title
        }), e = this, a.redpackNo && "" != a.redpackNo ? (e.data.redpackNo = a.redpackNo, 
        a.shareImg && "" != a.shareImg && e.setData({
            shareImg: decodeURIComponent(a.shareImg)
        }), a.url && "" != a.url ? (console.log(decodeURIComponent(a.url)), e.setData({
            url: decodeURIComponent(a.url)
        }), setTimeout(function() {
            getApp().getShareTitle("pages/help/help");
        }, 800)) : wx.redirectTo({
            url: "/pages/result/result?redpackNo=" + e.data.redpackNo + "&t=" + new Date().getTime()
        })) : wx.redirectTo({
            url: "/pages/pay/pay?t=" + new Date().getTime()
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = getCurrentPages();
        getApp().globalData.curPage = e[e.length - 1].route, getApp().globalData.pageVal = "";
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var o = this;
        console.log("help uid", getApp().globalData.uid), console.log(e.webViewUrl);
        var r = "/pages/index/index", n = "";
        return o.data.redpackNo && "" != o.data.redpackNo && (r = "/pages/result/result?t=" + new Date().getTime() + "&rid=" + getApp().globalData.uid + "&redpackNo=" + o.data.redpackNo + "&hasGrab=1"), 
        console.log(n), o.data.shareImg && "" != o.data.shareImg && "undefined" != o.data.shareImg && (n = o.data.shareImg), 
        console.log(n), {
            title: getApp().globalData.shareTitle,
            path: r,
            imageUrl: n,
            success: function(e) {
                a.request({
                    url: t.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/webview/webview",
                        redpackNo: o.data.repackNo,
                        shareTitle: getApp().globalData.shareTitle,
                        ver: t.service.version,
                        way: "0"
                    },
                    login: !0
                });
            }
        };
    }
});
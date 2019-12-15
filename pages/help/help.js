var t, e = require("../../vendor/qcloud-weapp-client-sdk/index"), a = require("../../config"), o = getApp();

Page({
    data: {
        data: [],
        canIUse: wx.canIUse("button.open-type.contact"),
        showContact: !1,
        version: a.service.version,
        contactPhone: "020-29052945",
        showCallContact: !1
    },
    onLoad: function(e) {
        t = this, o.configNavTitle("常见问题"), n(), setTimeout(function() {
            getApp().getShareTitle("pages/help/help");
        }, 800);
    },
    onReady: function() {},
    onShow: function() {
        var e = getCurrentPages();
        getApp().globalData.curPage = e[e.length - 1].route, getApp().globalData.pageVal = "", 
        setTimeout(function() {
            wx.hideToast(), t.setData({
                showContact: !0
            });
        }, 1500);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    bindCallTap: function(t) {
        wx.makePhoneCall({
            phoneNumber: this.data.contactPhone
        });
    },
    onShareAppMessage: function() {
        return console.log("help uid", getApp().globalData.uid), {
            title: getApp().globalData.shareTitle,
            path: "/pages/help/help?t=" + new Date().getTime() + "&rid=" + getApp().globalData.uid,
            success: function(t) {
                e.request({
                    url: a.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/help/help",
                        redpackNo: "",
                        shareTitle: getApp().globalData.shareTitle,
                        ver: a.service.version,
                        way: "0"
                    },
                    login: !0
                }), getApp().getShareTitle("pages/help/help");
            }
        };
    },
    bindTapReport: function(t) {
        getApp().navigateTo("/pages/report/report?page=help");
    },
    bindToRule: function() {
        console.log("bindToRule"), wx.navigateTo({
            url: "/pages/agreement/agreement"
        });
    },
    tapAction: function(t) {
        for (var e = this.data.data, a = 0; a < e.length; a++) e[a].id == t.currentTarget.dataset.idx && e[a].hid ? (e[a].hid = !1, 
        e[a].opa = .45) : (e[a].hid = !0, e[a].opa = 1);
        this.setData({
            data: e
        });
    }
});

var n = function() {
    i("正在加载"), e.request({
        url: a.service.hostUrl + "/user/faqs",
        data: {
            ver: a.service.version
        },
        success: function(e) {
            if (0 == e.data.code) {
                wx.hideToast();
                for (var a = e.data.data, o = 0; o < a.length; o++) a[o].id = o, a[o].hid = !0, 
                a[o].opa = 1;
                e.data.contactPhone && "" != e.data.contactPhone && (t.data.contactPhone = e.data.contactPhone, 
                t.data.showCallContact = !0), t.setData({
                    protocolSwitch: e.data.protocolSwitch,
                    data: a,
                    showCallContact: t.data.showCallContact
                });
            } else switch (e.data.code) {
              case 500:
              case 501:
                c("服务器繁忙\n请稍候重试");
                break;

              default:
                wx.hideToast();
            }
        },
        fail: function(t) {
            c("请求失败\n请稍候重试");
        },
        complete: function(e) {
            t.setData({
                showContact: !0
            });
        }
    });
}, i = function(t) {
    return wx.showToast({
        title: t,
        icon: "loading",
        duration: 1e4
    });
}, c = function(t) {
    return wx.showToast({
        title: t,
        image: "../../images/common/fail.png",
        duration: 1500
    });
};
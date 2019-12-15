var e = require("../../vendor/qcloud-weapp-client-sdk/index"), a = require("../../config"), t = null, n = getApp();

Page({
    data: {
        showUidTapCount: 0,
        avatarUrl: "",
        nickname: "",
        balance: "0.00",
        subscribeCell: null,
        subscribeSession: "",
        profileSession: "",
        needAuth: !1,
        navTitle: "",
        capsuleHeight: a.capsuleHeight,
        statusBarHeight: a.statusBarHeight,
        pixelRate: a.pixelRate,
        navColor: "#d85940"
    },
    onLoad: function(e) {
        t = this, r(), n.configNavTitle("我的"), this.setData({
            subscribeSession: n.getSessionFrom("subscribe"),
            profileSession: n.getSessionFrom("profile")
        });
        var a = wx.getStorageSync("profileData");
        console.log("profile", a, this.data.profileSession), a ? o(a) : t.setData({
            avatarUrl: wx.getStorageSync("avatarUrl"),
            nickname: wx.getStorageSync("nickName")
        });
    },
    onShow: function() {
        i();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), i();
    },
    onShareAppMessage: function() {
        return {
            title: getApp().globalData.shareTitle,
            path: "/pages/pay/pay?rid=" + getApp().globalData.uid + "&t=" + new Date().getTime(),
            success: function(t) {
                e.request({
                    url: a.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/profile/profile",
                        redpackNo: "",
                        shareTitle: getApp().globalData.shareTitle,
                        ver: a.service.version,
                        way: "0"
                    },
                    login: !0
                }), getApp().getShareTitle("pages/profile/profile");
            },
            fail: function(e) {}
        };
    },
    bindContact: function(e) {
        n.contactHandler(e, t, function(e) {
            e.vopwords && "" != e.vopwords && t.setData({
                wordsValue: decodeURI(e.vopwords)
            });
        });
    },
    bindTapHelp: function() {
        getApp().navigateTo("/pages/help/help");
    },
    bindCashbackTap: function(e) {
        getApp().navigateTo("/pages/cashback/cashback?show=0");
    },
    bindRecordTap: function(e) {
        getApp().navigateTo("/pages/record/record?show=0&tab=0");
    },
    confirmTap: function() {
        wx.openSetting({
            success: function(e) {
                e.authSetting[t.data.auth] && (t.setData({
                    needAuth: !1
                }), i());
            }
        });
    },
    bindShowUid: function(e) {
        var a = new Date().getTime();
        a > this.data.showUidTapTime + 800 ? this.data.showUidTapCount = 1 : this.data.showUidTapCount++, 
        this.data.showUidTapTime = a, this.data.showUidTapCount >= 8 && (this.data.showUidTapCount = 0, 
        wx.showModal({
            title: "提示",
            content: "你的用户ID是：" + getApp().globalData.uid + "，已复制到剪贴板",
            confirmText: "我知道了",
            showCancel: !1
        }), wx.setClipboardData({
            data: getApp().globalData.uid + ""
        }));
    },
    bindAuthEvent: function(e) {
        t.setData({
            needAuth: !1
        }), i();
    }
});

var i = function() {
    e.request({
        login: !0,
        url: a.service.hostUrl + "/user/getMine",
        data: {
            ver: a.service.version
        },
        success: function(e) {
            0 == e.data.code && (t.setData({
                needAuth: !1
            }), o(e.data), wx.setStorage({
                key: "profileData",
                data: e.data
            }));
        },
        fail: function(e) {
            "ERR_WX_GET_USER_INFO" === e.type ? (t.data.auth = "scope.userInfo", t.setData({
                needAuth: !0
            })) : s("请求失败\n请稍候重试");
        }
    });
}, o = function(e) {
    t.setData({
        avatarUrl: e.avatarUrl,
        nickname: e.nickname,
        balance: parseFloat(e.balance).toFixed(2),
        subscribeCell: e.subscribeBtn || null
    });
}, s = function(e) {
    return wx.showToast({
        title: e,
        image: "../../images/common/fail.png",
        duration: 1500
    });
}, r = function() {
    wx.getSetting({
        success: function(e) {
            e.authSetting["scope.userInfo"] ? t.setData({
                needAuth: !1
            }) : (t.data.auth = "scope.userInfo", t.setData({
                needAuth: !0
            }));
        }
    });
};
var e = require("../../vendor/qcloud-weapp-client-sdk/index"), t = require("../../config"), a = require("../../vendor/qcloud-weapp-client-sdk/lib/session"), n = (require("../../utils/wx"), 
getApp()), o = null;

Page({
    data: {
        adList: [],
        animationData: {},
        sessionFrom: "more",
        contactButton: !1,
        needAuth: !1,
        showHome: !1,
        navColor: "#D45C44",
        navTitle: "我最懂你 - 更多好玩",
        fontAlign: "center",
        needuserinfo: !1
    },
    onLoad: function(e) {
        var s = this;
        if (console.log("options", e), o = this, e && 1 == e.needuserinfo) {
            var u = {
                originalId: t.service.originalId,
                uid: n.globalData.uid || -1,
                version: t.service.version,
                path: e.path || "pages/more/more",
                scene: n.globalData.scene,
                referrerAppid: e.referrerInfo && e.referrerInfo.appId ? e.referrerInfo.appId : "",
                query: JSON.stringify(e),
                source: e.source || "",
                rid: e.rid || n.globalData.rid
            };
            n.reportSource(u), wx.getStorageSync("unionLogin") ? (this.data.needuserinfo = !1, 
            this.data.needAuth = !1, d()) : (this.data.needuserinfo = !0, wx.getSetting({
                success: function(e) {
                    console.log("getSetting", e), e && e.authSetting && e.authSetting["scope.userInfo"] ? (s.data.needuserinfo = !1, 
                    s.data.needAuth = !1, d()) : (a.clear(), s.data.needAuth = !0, o.UserWxLogin());
                },
                fail: function() {
                    a.clear(), s.data.needAuth = !0;
                }
            }));
        }
        o.setData({
            sessionFrom: n.getSessionFrom("more_fun")
        });
        var c = wx.getStorageSync("moreFun");
        c && r(c), i();
    },
    onShow: function() {
        o.data.contactButton && s(!0);
    },
    onHide: function() {
        o.data.contactButton && s(!1);
    },
    onUnload: function() {
        this.data.needuserinfo && wx.showTabBar();
    },
    tapNavHome: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    bindgetuserinfo: function(e) {
        "getUserInfo:ok" == e.detail.errMsg ? (wx.showLoading({
            title: "加载中...",
            mask: !0
        }), this.setData({
            needAuth: !1,
            needuserinfo: !1
        }), wx.showTabBar(), i(), d()) : wx.showToast({
            title: "请先允许授权",
            icon: "none"
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), i();
    },
    onShareAppMessage: function() {
        return {
            title: getApp().globalData.shareTitle,
            path: "/pages/more/more?rid=" + getApp().globalData.uid + "&t=" + new Date().getTime(),
            success: function(n) {
                e.request({
                    url: t.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/more/more",
                        redpackNo: "",
                        shareTitle: getApp().globalData.shareTitle,
                        ver: t.service.version,
                        way: "0"
                    },
                    header: {
                        "X-WX-Id": a.get() ? a.get().id : "-",
                        "X-WX-Skey": a.get() ? a.get().skey : "-"
                    }
                }), getApp().getShareTitle("pages/more/more");
            },
            fail: function(e) {}
        };
    },
    bindTapAd: function(a) {
        var i = a.currentTarget.dataset.index, r = o.data.adList[i];
        if (!r || 1 != r.ad_status) return !1;
        if (e.request({
            login: !0,
            url: t.service.hostUrl + "/user/adStat",
            data: {
                adNo: r.ad_no,
                adPlace: "more_fun",
                ver: t.service.version
            }
        }), "weapp" == r.action) r.app_id ? wx.navigateToMiniProgram({
            appId: r.app_id,
            path: r.path || "",
            extraData: r.extraData || {},
            success: function(e) {
                console.log(e);
            }
        }) : (0 == r.path.indexOf("/pages/red/red") && (n.globalData.lastRedpacketScene = "sys_ad"), 
        getApp().navigateTo(r.path)); else if ("webview" == r.action) try {
            if (n.compareVersion(n.globalData.SDKVersion, "1.6.4") >= 0) {
                var s = "/pages/webview/webview";
                s += "?title=" + (r.nav_title || ""), s += "&navBg=" + (r.nav_bg_color || ""), s += "&navfront=" + (r.navfront_color || ""), 
                s += "&url=" + encodeURIComponent(r.url || ""), n.navigateTo(s);
            } else n.showModel("提示", "你的微信版本过低，请升级后重试");
        } catch (a) {} else "image" == r.action && wx.previewImage({
            current: r.url,
            urls: [ r.url ],
            success: function(e) {}
        });
    },
    bindContact: function(e) {
        n.contactHandler(e, this);
    },
    UserWxLogin: function() {
        wx.login({
            success: function(e) {
                e.code ? u(e.code).then(function(e) {
                    0 == e ? (o.data.needuserinfo = !1, o.data.needAuth = !1, wx.setStorage({
                        key: "unionLogin",
                        data: !0
                    })) : (wx.hideTabBar(), o.data.needAuth = !0), o.setData({
                        needuserinfo: o.data.needuserinfo,
                        needAuth: o.data.needAuth
                    });
                }).catch(function(e) {
                    wx.hideTabBar(), o.setData({
                        needuserinfo: !0,
                        needAuth: !0
                    });
                }) : (wx.hideTabBar(), o.setData({
                    needuserinfo: !0,
                    needAuth: !0
                }));
            },
            fail: function(e) {
                o.setData({
                    needuserinfo: !1,
                    needAuth: !1
                });
            }
        });
    },
    hideBar: function() {
        o.data.needAuth && wx.hideTabBar();
    }
});

var i = function(n) {
    wx.hideLoading(), e.request({
        url: t.service.moreFunUrl,
        data: {
            appId: t.service.appId,
            ver: t.service.version
        },
        header: {
            "X-WX-Id": a.get() ? a.get().id : "-",
            "X-WX-Skey": a.get() ? a.get().skey : "-"
        },
        success: function(e) {
            0 == e.data.code && (r(e.data), wx.setStorage({
                key: "moreFun",
                data: e.data
            }));
        }
    });
}, r = function(e) {
    o.setData({
        adList: e.adList,
        contactButton: e.contactBtn || null
    }), s(e.contactBtn ? !0 : !1);
}, s = function(e) {
    if (e) (t = wx.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
    })).bottom("-1rpx").step(), o.setData({
        animationData: t.export()
    }); else {
        var t = wx.createAnimation({
            duration: 0,
            timingFunction: "ease"
        });
        t.bottom("-90rpx").step(), o.setData({
            animationData: t.export()
        });
    }
}, d = function() {
    e.request({
        login: !0,
        url: t.service.hostUrl + "/user/getMine",
        data: {
            ver: t.service.version
        },
        success: function(e) {},
        fail: function(e) {}
    });
}, u = function(a) {
    return new Promise(function(n, o) {
        e.request({
            url: t.service.hostUrl + "/unionLogin",
            header: {
                "X-WX-Code": a
            },
            data: {
                ver: t.service.version
            },
            success: function(e) {
                console.log("result", e.data.code), n(e.data.code);
            },
            fail: function(e) {
                o(e);
            }
        });
    });
};
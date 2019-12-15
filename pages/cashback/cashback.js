var a, t = require("../../vendor/qcloud-weapp-client-sdk/index"), e = require("../../config"), i = getApp(), n = 1, s = 200;

Page({
    data: {
        input: "",
        total: "0.00",
        cash: "0.00",
        invalidInput: !1,
        invalidHint: "",
        tipstimeout: null,
        show: 1,
        content: "",
        needAuth: !1,
        auth: "",
        errMsg: "",
        ad: {
            adStatus: 0
        },
        supportNavigator: !1,
        showGuide: !1,
        isShare: !1,
        subscribeSession: ""
    },
    onLoad: function(t) {
        a = this, this.setData({
            subscribeSession: i.getSessionFrom("cashback")
        }), i.configNavTitle("余额提现"), o("正在加载");
        var e = wx.getStorageSync("cashbackAd");
        e && a.setData({
            ad: e
        }), r(), t.show && a.setData({
            show: t.show
        });
        var n = wx.getSystemInfoSync();
        a.setData({
            sessionFrom: i.getSessionFrom("cashback"),
            supportNavigator: i.compareVersion(n.SDKVersion, "2.0.7") > 0
        }), setTimeout(function() {
            getApp().getShareTitle("pages/cashback/cashback");
        }, 800), i.getGuideStatus() && (this.setData({
            showGuide: !0
        }), i.setGuideStatus());
    },
    onReady: function() {},
    onShow: function() {
        var a = getCurrentPages();
        getApp().globalData.curPage = a[a.length - 1].route, getApp().globalData.pageVal = "";
    },
    bindGuideTap: function() {
        this.setData({
            showGuide: !1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return console.log("cashback uid", getApp().globalData.uid), a.setData({
            isShare: !0
        }), {
            title: getApp().globalData.shareTitle,
            path: "/pages/cashback/cashback?t=" + new Date().getTime() + "&rid=" + getApp().globalData.uid,
            success: function(a) {
                t.request({
                    url: e.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/cashback/cashback",
                        redpackNo: "",
                        shareTitle: getApp().globalData.shareTitle,
                        ver: e.service.version,
                        way: "0"
                    },
                    login: !0
                }), getApp().getShareTitle("pages/cashback/cashback");
            }
        };
    },
    bindReportTap: function(a) {
        getApp().navigateTo("/pages/report/report?page=cashback");
    },
    bindAmountInput: function(t) {
        var e = t.detail.value;
        if ("." == e || "" == e) return a.data.input = e, void this.setData({
            cash: "0.00"
        });
        var i = e.search(/\.{2,}/);
        -1 !== i && (e = e.replace(/\.{1,}/g, "."));
        var s = e.replace(/(^[0-9]*\.?([0-9]{0,2}))/g, "");
        if (s.length > 0) {
            var o = new RegExp(s + "$", "");
            e = e.replace(o, "");
        }
        a.data.input = e;
        var d = parseFloat(e).toFixed(2);
        return this.setData({
            cash: d
        }), parseFloat(e) > parseFloat(this.data.total) ? (this.setData({
            invalidInput: !0,
            invalidHint: "提现金额超过账户余额"
        }), clearTimeout(this.data.tipstimeout), this.data.tipstimeout = setTimeout(function() {
            this.setData({
                invalidInput: !1
            });
        }.bind(this), 3e3)) : d < n && e ? (this.setData({
            invalidInput: !0,
            invalidHint: "到账金额不能低于" + n + "元"
        }), clearTimeout(this.data.tipstimeout), this.data.tipstimeout = setTimeout(function() {
            this.setData({
                invalidInput: !1
            });
        }.bind(this), 3e3)) : this.setData({
            invalidInput: !1
        }), {
            value: e
        };
    },
    bindAllTap: function(a) {
        var t = parseFloat(this.data.total).toFixed(2);
        t < n && (this.setData({
            invalidInput: !0,
            invalidHint: "到账金额不能低于" + n + "元"
        }), clearTimeout(this.data.tipstimeout), this.data.tipstimeout = setTimeout(function() {
            this.setData({
                invalidInput: !1
            });
        }.bind(this), 3e3)), this.setData({
            input: this.data.total,
            cash: t
        });
    },
    bindCashbackTap: function(t) {
        var e = this.data.input.search(/[^0-9.]/);
        "" !== a.data.input && 0 !== parseFloat(a.data.input) && -1 === e ? u() : c("提示", "请输入有效提现金额");
    },
    bindTapHelp: function() {
        getApp().navigateTo("/pages/help/help");
    },
    bindCashbackDetail: function() {
        getApp().navigateTo("/pages/cashbackDetail/cashbackDetail");
    },
    bindToPayTap: function(a) {
        getApp().navigateTo("/pages/pay/pay");
    },
    confirmTap: function() {
        wx.openSetting({
            success: function(t) {
                t.authSetting[a.data.auth] && (a.setData({
                    needAuth: !1
                }), r());
            }
        });
    },
    bindAdTap: function(a) {
        console.log("bindAdTap");
        var i = this;
        if (!i.data.ad || 1 != i.data.ad.adStatus) return !1;
        if (t.request({
            url: e.service.hostUrl + "/user/adStat",
            data: {
                adNo: i.data.ad.adNo,
                ver: e.service.version
            },
            login: !0
        }), "weapp" == i.data.ad.action) i.data.ad.appId && "" != i.data.ad.appId ? i.data.supportNavigator || wx.navigateToMiniProgram({
            appId: i.data.ad.appId,
            path: i.data.ad.path ? i.data.ad.path : "",
            extraData: i.data.ad.extraData ? i.data.ad.extraData : {},
            success: function(a) {
                console.log(a);
            }
        }) : getApp().navigateTo(i.data.ad.path); else if ("webview" == i.data.ad.action) try {
            var n = wx.getSystemInfoSync();
            console.log(n.SDKVersion), n.SDKVersion >= "1.6.4" ? getApp().navigateTo("/pages/webview/webview?redpackNo=" + i.data.redpackNo + "&title=" + (i.data.ad.navTitle ? i.data.ad.navTitle : "") + "&navBg=" + (i.data.ad.navBgColor ? i.data.ad.navBgColor : "") + "&navfront=" + (i.data.ad.navfrontColor ? i.data.ad.navfrontColor : "") + "&url=" + encodeURIComponent(i.data.ad.url) + "&shareImg=" + encodeURIComponent(i.data.shareImg)) : c("提示", "你的微信版本过低，请升级后重试");
        } catch (a) {} else "image" == i.data.ad.action && wx.previewImage({
            current: i.data.ad.url,
            urls: [ i.data.ad.url ],
            success: function(a) {}
        });
    },
    bindAuthEvent: function(t) {
        this.setData({
            nickName: t.detail.userInfo.nickName,
            avatarUrl: t.detail.userInfo.avatarUrl
        }), wx.setStorageSync("nickName", t.detail.userInfo.nickName), wx.setStorageSync("avatarUrl", t.detail.userInfo.avatarUrl), 
        a.setData({
            needAuth: !1
        }), r();
    },
    bindContact: function(t) {
        i.contactHandler(t, a, function(t) {
            t.vopwords && "" != t.vopwords && a.setData({
                wordsValue: decodeURI(t.vopwords)
            });
        });
    }
});

var o = function(a) {
    return wx.showToast({
        title: a,
        icon: "loading",
        duration: 1e4,
        mask: !0
    });
}, d = function(a) {
    return wx.showToast({
        title: a,
        image: "../../images/common/fail.png",
        duration: 1500
    });
}, c = function(a, t) {
    wx.hideToast(), wx.showModal({
        title: a,
        content: t,
        showCancel: !1
    });
}, r = function() {
    t.request({
        url: e.service.hostUrl + "/user/balance",
        data: {
            from: "cashback",
            ver: e.service.version
        },
        login: !0,
        success: function(t) {
            if (0 == t.data.code) wx.hideToast(), n = t.data.minAmount, s = t.data.maxAmount, 
            getApp().globalData.uid = t.data.uid, t.data.ad ? (a.setData({
                total: parseFloat(t.data.balance).toFixed(2),
                ad: t.data.ad
            }), wx.setStorage({
                key: "cashbackAd",
                data: t.data.ad
            })) : (a.setData({
                total: parseFloat(t.data.balance).toFixed(2),
                ad: {
                    adStatus: 0
                }
            }), wx.removeStorage({
                key: "cashbackAd",
                success: function(a) {}
            })), i.setUid(t.data.uid); else switch (t.data.code) {
              case 500:
              case 501:
                d("服务器繁忙\n请稍候重试");
                break;

              default:
                wx.hideToast();
            }
        },
        fail: function(t) {
            wx.hideToast(), "ERR_WX_GET_USER_INFO" === t.type ? (a.data.auth = "scope.userInfo", 
            a.setData({
                needAuth: !0,
                content: "小程序需要获取用户信息权限，点击确认前往设置或退出程序？"
            })) : d("请求失败\n请稍候重试");
        }
    });
}, u = function() {
    o("正在加载"), t.request({
        url: e.service.hostUrl + "/user/cashback",
        data: {
            amount: a.data.input,
            ver: e.service.version
        },
        login: !0,
        success: function(t) {
            var e = t.data.msg;
            if (0 == t.data.code) c("提示", e || "提现成功，预计1-5个工作日内到账"), a.setData({
                input: "",
                cash: "0.00"
            }), setTimeout(r, 500); else switch (t.data.code) {
              case 500:
              case 501:
                d(e || "服务器繁忙\n请稍候重试");
                break;

              case 701:
                c("提现失败", e || "到账金额不能低于" + n + "元");
                break;

              case 702:
                c("提现失败", e || "账号余额不足");
                break;

              case 703:
                c("提现失败", e || "系统繁忙，请重试");
                break;

              case 704:
                c("提现失败", e || "您的微信支付未实名，无法提现");
                break;

              default:
                c("提示", e || "提现失败，请联系客服处理");
            }
        },
        fail: function(t) {
            "ERR_WX_GET_USER_INFO" === t.type ? (wx.hideToast(), a.data.auth = "scope.userInfo", 
            a.setData({
                needAuth: !0,
                content: "小程序需要获取用户信息权限，点击确认前往设置或退出程序？"
            })) : d("请求失败\n请稍候重试");
        }
    });
};
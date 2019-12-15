function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = require("../../vendor/qcloud-weapp-client-sdk/index"), s = require("../../config"), o = (require("../../vendor/qcloud-weapp-client-sdk/lib/session"), 
require("../../utils/md5"), getApp()), r = null, i = -1, n = [], r = null, d = null, l = !1, c = 375, u = 0, h = !1, p = [], g = 0, m = !1, f = !1, v = !0, b = !1;

Page({
    data: (t = {
        systemInfo: "",
        ifIphoneX: !1,
        isAbove2: wx.canIUse("button.open-type.share"),
        bottomHeight: -30,
        showTips: !1,
        correctNum: 0,
        avatar: "",
        nickName: "",
        tips: "",
        desc: "",
        puzzleImage: "",
        loadStatus: "default",
        bottomButtons: [],
        redpackNo: "",
        isDel: !1,
        redpackStatus: 0,
        totalAmount: 0,
        refundAmount: 0,
        status: 0,
        packNum: 0,
        takeNum: 0,
        navHeight: 0,
        redpackData: {},
        successGrabbers: [],
        failGrabbers: [],
        navbar: [ "成功", "失败" ],
        index: 0,
        currentTab: 0,
        showPuzzle: !1,
        puzzleScale: .3,
        showChallenge: !1,
        challengeRight: -200,
        puzzleTimeLimit: -1,
        puzzleSeconds: 0,
        showChipsOverlay: !1,
        chips: [],
        chipShadows: [],
        chipWidth: 200,
        puzzleSize: 3,
        puzzleTip: "",
        showRedPacket: !1,
        redPacketScale: 0,
        self: {
            amount: -1
        },
        show: 1,
        isRefresh: !1,
        needAuth: !1,
        auth: "",
        content: "",
        shareImg: "",
        shareBg: "",
        shareImgLoad: !1,
        isGetDataSuccess: !1,
        shareWay: 1,
        isBeta: !1,
        lastGrabberId: -1,
        currentPage: [ 1, 1 ],
        limitTimeArray: [],
        limitTimeIndex: 0,
        all: 0
    }, a(t, "redPacketScale", 1), a(t, "correctRate", 0), a(t, "haveAsk", !1), a(t, "sectionContents", [ {
        name: "成功",
        index: 0,
        number: 0,
        items: [],
        avatars: [],
        lastId: 0,
        loadStatus: "default"
    }, {
        name: "失败",
        index: 1,
        number: 0,
        items: [],
        avatars: [],
        lastId: 0,
        loadStatus: "default"
    } ]), a(t, "supporNavigator", !1), a(t, "hasGrab", 1), a(t, "guideTip", !1), a(t, "buttonInfo", {
        image: "../../images/right1_ic.png"
    }), a(t, "showMoreButton", !1), a(t, "showButton", !1), a(t, "profileSession", ""), 
    a(t, "ShowGuide", !1), t),
    footMarginTop: 0,
    navbarTap: function(a) {
        this.setData({
            currentTab: a.currentTarget.dataset.idx
        });
    },
    swiperChange: function(a) {
        var t = 0 == r.data.sectionContents[a.detail.current].items.length ? 1 : r.data.sectionContents[a.detail.current].items.length;
        this.setData({
            navHeight: 140 * t,
            footMarginTop: 0 == r.data.sectionContents[a.detail.current].length ? 140 * t : 0,
            currentTab: a.detail.current
        });
    },
    onShow: function() {
        r = this, o.globalData.status && (this.data.status = o.globalData.status, o.globalData.status = ""), 
        o.globalData.correct && (this.data.correctNum = Number(o.globalData.correct), o.globalData.correct = ""), 
        o.globalData.all && (this.data.all = Number(o.globalData.all), o.globalData.all = ""), 
        o.globalData.grabErrorTip && (console.log("here", o.globalData.grabErrorTip), this.data.grabErrorTip = o.globalData.grabErrorTip, 
        o.globalData.grabErrorTip = ""), o.globalData.redpackNo ? (console.log("app.globalData.status", o.globalData.redpackNo), 
        this.data.redpackNo = o.globalData.redpackNo, o.globalData.redpackNo = "", r.data.hasGrab = 0, 
        w()) : w(), this.setData({
            correctNum: this.data.correctNum || 0,
            all: this.data.all || 0,
            status: this.data.status,
            grabErrorTip: this.data.grabErrorTip || ""
        });
    },
    onLoad: function(a) {
        m = !1, b = !1;
        try {
            var t = wx.getSystemInfoSync();
            this.data.systemInfo = t, t.model.indexOf("iPhone X") > -1 && this.setData({
                ifIphoneX: !0
            });
        } catch (a) {}
        o.configNavTitle(), wx.showShareMenu({
            withShareTicket: !0
        }), f = !1, wx.showLoading({
            title: "正在加载..."
        }), a.correct && (this.data.correctNum = Number(a.correct)), a.all && (this.data.all = Number(a.all)), 
        a.status && (this.data.status = a.status), this.setData({
            correctNum: this.data.correctNum,
            all: this.data.all,
            status: this.data.status,
            profileSession: o.getSessionFrom("red")
        }), (r = this).setData({
            avatar: wx.getStorageSync("avatarUrl") || ""
        }), r.setData({
            navHeight: this.data.showTips ? 0 : 140 * Math.max(r.data.sectionContents[0].items.length, r.data.sectionContents[1].items.length),
            isBeta: getApp().globalData.isBeta,
            limitTimeArray: o.globalData.limitTimeArray
        }), a.redpackNo && (r.data.redpackNo = a.redpackNo);
        var e = null;
        a.scene && (e = decodeURIComponent(a.scene)), e && "" == r.data.redpackNo && (e.length <= 8 || ("B_" === e.substring(0, 2) ? r.data.redpackNo = e.substring(2) : e.length > 20 && (r.data.redpackNo = e))), 
        a.shareImg && "" != a.shareImg && (this.data.shareImgLoad = !0, this.data.shareImg = a.shareImg, 
        a.shareBg && "" != a.shareBg && (this.data.shareBg = a.shareBg)), o.globalData.screenWidth > 0 && (c = getApp().globalData.screenWidth);
        var i = wx.getSystemInfoSync();
        this.setData({
            supporNavigator: o.compareVersion(i.SDKVersion, "2.0.7") > 0
        }), getApp().globalData.localData && "" != getApp().globalData.appName ? o.configNavTitle() : (console.log("red.init"), 
        wx.request({
            url: s.service.hostUrl + "/init",
            data: {
                ver: s.service.version
            },
            success: function(a) {
                if (0 == a.data.code) {
                    var t = JSON.stringify(a.data);
                    getApp().globalData.localData = t, getApp().setGlobalData(a.data), o.configNavTitle(), 
                    r.setData({
                        limitTimeArray: o.globalData.limitTimeArray
                    }), r.data.redpackStatus > 0 && (console.log("init: set time limit"), M()), wx.setStorage({
                        key: "initData",
                        data: t
                    });
                }
            },
            fail: function(a) {
                console.log("init fail", a);
            }
        })), a.hasGrab && 0 == a.hasGrab ? r.data.hasGrab = 0 : a.hasGrab && 1 == a.hasGrab && (r.data.hasGrab = 1), 
        setTimeout(function() {
            getApp().getShareTitle("pages/result/result");
        }, 800);
    },
    onReady: function() {
        for (var a = 0; a < 100; a += 1) {
            var t = wx.getSystemInfoSync();
            if (t.screenWidth > 0 && t.windowHeight > 0) {
                (c = t.screenWidth) != getApp().globalData.screenWidth && (getApp().globalData.screenWidth = t.screenWidth, 
                wx.setStorage({
                    key: "screenWidth",
                    data: t.screenWidth
                }));
                break;
            }
        }
        var e = void 0, s = 32, i = Number(o.globalData.sWidth);
        wx.getSystemInfoSync();
        if (console.log("swidth", i), o.compareVersion(o.globalData.SDKVersion, "2.1.0") >= 0) for (var n = 0; n < 100; n++) if ((e = wx.getMenuButtonBoundingClientRect()).left > 0 && e.right > 0 && e.width) {
            console.log("rect", e), (s = Number(i - e.right + e.width / 4)) < 0 && (s = 32);
            break;
        }
        r.setData({
            right: s
        });
    },
    onPullDownRefresh: function() {
        r.data.showPuzzle ? wx.stopPullDownRefresh() : (r.data.isRefresh = !0, wx.showToast({
            title: "正在刷新",
            icon: "loading"
        }), w(), wx.stopPullDownRefresh());
    },
    onReachBottom: function() {
        var a = void 0;
        switch (console.log("lastId", r.data.successLastId), r.data.currentTab) {
          case 0:
            a = 1, r.data.lastGrabberId = r.data.successLastId;
            break;

          case 1:
            a = 0, r.data.lastGrabberId = r.data.failLastId;
        }
        "default" == r.data.loadStatus && -1 != r.data.lastGrabberId && L(a);
    },
    bindIconTap: function() {
        if (console.log("tap"), "weapp" === r.data.buttonInfo.action) r.data.buttonInfo.appId && "" != r.data.buttonInfo.appId && wx.navigateToMiniProgram({
            appId: r.data.buttonInfo.appId ? r.data.buttonInfo.appId : "",
            path: r.data.buttonInfo.path
        }); else if ("webview" === r.data.buttonInfo.action) {
            console.log("webview");
            try {
                o.compareVersion(o.globalData.SDKVersion, "1.6.4") >= 0 ? getApp().navigateTo("/pages/webview/webview?url=" + encodeURIComponent(r.data.buttonInfo.path) + "&redpackNo=" + r.data.redpackNo) : B("提示", "你的微信版本过低，请升级后重试");
            } catch (a) {}
        } else "image" === r.data.buttonInfo.action && wx.previewImage({
            urls: [ r.data.buttonInfo.path ]
        });
    },
    onShareAppMessage: function(a) {
        return v = !1, {
            title: getApp().globalData.shareTitle,
            path: "/pages/chat/chat?redpackNo=" + r.data.redpackNo + "&rid=" + getApp().globalData.uid + "&t=" + new Date().getTime() + "&hasGrab=1",
            imageUrl: r.data.shareCardImg,
            success: function(a) {
                e.request({
                    login: !0,
                    url: s.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/chat/chat",
                        redpackNo: r.data.redpackNo,
                        shareTitle: getApp().globalData.shareTitle,
                        ver: s.service.version,
                        way: "0"
                    }
                }), getApp().getShareTitle("pages/chat/chat");
            }
        };
    },
    bindCashbackTap: function(a) {
        o.navigateTo("/pages/cashback/cashback?from=result");
    },
    bindPayTap: function(a) {
        var t = a.currentTarget.dataset.index, e = r.data.bottomButtons[t], s = wx.getSystemInfoSync();
        if ("weapp" == e.action) e.appId && "" != e.appId ? wx.navigateToMiniProgram({
            appId: e.appId,
            path: e.path ? e.path : "",
            extraData: e.extraData ? e.extraData : {},
            success: function(a) {
                console.log(a);
            }
        }) : wx.reLaunch({
            url: e.path
        }); else if ("webview" == e.action) try {
            o.compareVersion(s.SDKVersion, "1.6.4") >= 0 ? getApp().navigateTo("/pages/webview/webview?redpackNo=" + r.data.redpackNo + "&title=" + (e.navTitle ? e.navTitle : "") + "&navBg=" + (e.navBgColor ? e.navBgColor : "") + "&navfront=" + (e.navfrontColor ? e.navfrontColor : "") + "&url=" + encodeURIComponent(e.url) + "&shareImg=" + encodeURIComponent(r.data.shareImg)) : B("提示", "你的微信版本过低，请升级后重试");
        } catch (a) {} else "image" == e.action && wx.previewImage({
            current: e.url,
            urls: [ e.url ],
            success: function(a) {}
        });
    },
    shareTap: function(a) {
        wx.showModal({
            title: "提示",
            content: "点击屏幕右上方即可转发给好友哦",
            showCancel: !1
        });
    },
    bindDirectShareTap: function(a) {
        wx.canIUse("button.open-type.share") || wx.showModal({
            title: "提示",
            content: "请点击屏幕右上角转发哦",
            confirmText: "我知道了",
            showCancel: !1
        });
    },
    bindShareTap: function(a) {
        if (getApp().compareVersion(r.data.systemInfo.version, "1.6.4") >= 0) {
            var t = "/pages/shareimg/shareimg?from=red";
            t += "&redpackNo=" + r.data.redpackNo, t += "&shareWay=" + r.data.shareWay, t += "&redpackType=" + r.data.redpackType, 
            t += "&shareImg=" + encodeURIComponent(r.data.shareImg), t += "&shareCardImg=" + encodeURIComponent(r.data.shareCardImg), 
            t += "&url=" + encodeURIComponent(r.data.shareImgUrl), wx.navigateTo({
                url: t,
                fail: function(a) {
                    wx.redirectTo({
                        url: t
                    });
                }
            }), e.request({
                url: s.service.hostUrl + "/user/share",
                data: {
                    page: "/pages/share/share",
                    redpackNo: r.data.redpackNo,
                    shareTitle: "share_img_webview",
                    ver: s.service.version,
                    way: "11"
                },
                login: !0
            });
        } else wx.previewImage({
            urls: [ r.data.shareImg ],
            success: function(a) {},
            complete: function(a) {
                e.request({
                    url: s.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/share/share",
                        redpackNo: r.data.redpackNo,
                        shareTitle: "share_img_preview",
                        ver: s.service.version,
                        way: "10"
                    },
                    login: !0
                });
            }
        });
    },
    bindPickerChange: function(a) {
        var t = a.detail.value, i = r.data.limitTimeArray[t].v, n = r.data.limitTimeIndex, d = r.data.puzzleTimeLimit;
        r.setData({
            limitTimeIndex: t,
            puzzleTimeLimit: i
        }), e.request({
            url: s.service.hostUrl + "/redpack/setLimitTime",
            data: {
                redpackNo: r.data.redpackNo,
                limitTime: i,
                ver: s.service.version
            },
            login: !0,
            success: function(a) {
                0 == a.data.code ? getApp().globalData.uid = a.data.uid : (o.showFail("设置失败"), r.setData({
                    limitTimeIndex: n,
                    puzzleTimeLimit: d
                }));
            },
            fail: function(a) {
                r.setData({
                    limitTimeIndex: n,
                    puzzleTimeLimit: d
                }), "ERR_WX_GET_USER_INFO" === a.type ? (r.data.auth = "scope.userInfo", r.setData({
                    needAuth: !0,
                    content: "小程序需要获取用户信息权限，点击确认前往设置或退出程序？"
                })) : o.showFail("请求失败\n请稍候重试");
            }
        });
    },
    bindPlayPuzzle: function() {
        wx.showLoading({
            title: "加载中..."
        }), D(function() {
            wx.hideLoading(), r.data.showPuzzle || (T(!0), x());
        });
    },
    bindPreviewPuzzle: function() {
        wx.previewImage({
            urls: [ r.data.puzzleImage ]
        });
    },
    bindClosePuzzle: function() {
        T(!1);
    },
    bindTapChip: function(a) {
        if (l) {
            var t = a.target.dataset.index;
            if (n.length < 2 && (t != n[0] ? (n.push(t), r.data.chipShadows[t] = "shadow", r.data.chips[t].style.zIndex = 900, 
            this.setData({
                chips: r.data.chips,
                chipShadows: r.data.chipShadows
            })) : (r.data.chipShadows[n[0]] = "", r.data.chips[t].style.zIndex = 100, this.setData({
                chips: r.data.chips,
                chipShadows: r.data.chipShadows
            }), n = [])), 2 == n.length) {
                var e = n[0], s = n[1], o = r.data.chips[e].style;
                r.data.chips[e].style = r.data.chips[s].style, r.data.chips[s].style = o, r.data.chipShadows[e] = "", 
                r.data.chipShadows[s] = "", n = [], this.setData({
                    chipShadows: r.data.chipShadows,
                    chips: r.data.chips
                }), setTimeout(function() {
                    r.data.chips[e].style.zIndex = 100, r.data.chips[s].style.zIndex = 100, l && z() && (T(!1), 
                    r.data.isBeta || R(!0));
                }, 500);
            }
        }
    },
    bindTryAgain: function() {
        r.setData({
            showChipsOverlay: !1
        }), A(!1), h = !0, x();
    },
    bindLoadChip: function(a) {
        var t = a.target.dataset.index;
        r.data.chips[t].loaded = !0;
    },
    bindCloseRedPacket: function(a) {
        "close" == a.target.dataset.type && R(!1);
    },
    bindTapPay: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    bindSendRedPacket: function() {
        R(!1), 0 == r.data.self.creator ? r.bindPayTap() : parseFloat(r.data.remainAmount) > 0 ? r.bindShareTap() : r.bindPayTap();
    },
    close: function() {
        this.setData({
            navHeight: 140 * Math.max(r.data.sectionContents[0].items.length, r.data.sectionContents[1].items.length),
            showTips: !1
        });
    },
    bindReportTap: function(a) {
        wx.navigateTo({
            url: "/pages/report/report?page=red&redpackNo=" + r.data.redpackNo + "&t=" + new Date().getTime()
        });
    },
    bindReviewQuestion: function() {
        o.navigateTo("/pages/review/review?id=" + this.data.qaNo + "&navigateType=back&formType=1&creator=" + r.data.self.creator);
    },
    bindTapAd: function(a) {
        if (console.log(r.data), !r.data.ad || 1 != r.data.adStatus) return !1;
        e.request({
            url: s.service.hostUrl + "/user/adStat",
            data: {
                adNo: r.data.ad.adNo,
                ver: s.service.version
            },
            login: !0
        });
        var t = wx.getSystemInfoSync();
        if ("weapp" == r.data.ad.action && o.compareVersion(t.SDKVersion, "2.0.7") < 0) r.data.ad.appId && "" != r.data.ad.appId ? wx.navigateToMiniProgram({
            appId: r.data.ad.appId,
            path: r.data.ad.path ? r.data.ad.path : "",
            extraData: r.data.ad.extraData ? r.data.ad.extraData : {},
            success: function(a) {
                console.log(a);
            }
        }) : getApp().navigateTo(r.data.ad.path); else if ("webview" == r.data.ad.action) try {
            o.compareVersion(t.SDKVersion, "1.6.4") >= 0 ? getApp().navigateTo("/pages/webview/webview?redpackNo=" + r.data.redpackNo + "&title=" + (r.data.ad.navTitle ? r.data.ad.navTitle : "") + "&navBg=" + (r.data.ad.navBgColor ? r.data.ad.navBgColor : "") + "&navfront=" + (r.data.ad.navfrontColor ? r.data.ad.navfrontColor : "") + "&url=" + encodeURIComponent(r.data.ad.url) + "&shareImg=" + encodeURIComponent(r.data.shareImg)) : B("提示", "你的微信版本过低，请升级后重试");
        } catch (a) {} else "image" == r.data.ad.action && wx.previewImage({
            current: r.data.ad.url,
            urls: [ r.data.ad.url ],
            success: function(a) {}
        });
    },
    bindHeadPicTap: function(a) {
        wx.previewImage({
            urls: [ r.data.ownerAvatar ]
        });
    },
    toChatTap: function(a) {
        wx.navigateTo({
            url: "/pages/chat/chat?redpackNo=" + r.data.redpackNo + "&rid" + getApp().globalData.uid + "&t=" + new Date().getTime() + "&showQA=1&shareCardImg=" + r.data.shareCardImg
        });
    },
    bindAvatarTap: function(a) {
        console.log(r.data.currentTab);
        var t = r.data.currentTab;
        wx.previewImage({
            current: r.data.sectionContents[t].avatars[a.target.dataset.index],
            urls: r.data.sectionContents[t].avatars
        });
    },
    bindTapQuestion: function() {
        wx.navigateTo({
            url: "/pages/help/help"
        });
    },
    bindRecordTap: function(a) {
        var t = 1 == r.data.self.creator ? "0" : "1";
        wx.navigateTo({
            url: "/pages/record/record?tab=" + t + "&t=" + new Date().getTime()
        });
    },
    bindAuthEvent: function(a) {
        this.setData({
            nickName: a.detail.userInfo.nickName,
            avatarUrl: a.detail.userInfo.avatarUrl
        }), wx.setStorageSync("nickName", a.detail.userInfo.nickName), wx.setStorageSync("avatarUrl", a.detail.userInfo.avatarUrl), 
        r.setData({
            needAuth: !1
        }), w();
    },
    bindCheckQA: function() {
        o.navigateTo("/pages/review/review?id=" + this.data.qaNo + "&redpackNo=" + this.data.redpackNo + "&navigateType=back&formType=1&creator=" + r.data.self.creator);
    },
    bindCheckUserQA: function(a) {
        if (1 == this.data.self.creator) {
            var t = a.currentTarget.dataset.item;
            o.navigateTo("/pages/review/review?id=" + this.data.qaNo + "&redpackNo=" + this.data.redpackNo + "&uid=" + t.userId + "&navigateType=back&formType=1&creator=" + r.data.self.creator);
        }
    },
    confirmTap: function() {
        wx.canIUse("openSetting") ? wx.openSetting({
            success: function(a) {
                a.authSetting[r.data.auth] && (r.setData({
                    needAuth: !1
                }), "scope.userInfo" === r.data.auth && w());
            }
        }) : o.showModal("提示", "您的微信版本太低，为了保证您的体验，建议先升级您的微信到最新版本");
    },
    bindGuideTap: function() {
        r.setData({
            showGuide: !1
        });
    }
});

var w = function() {
    e.request({
        login: !0,
        url: s.service.hostUrl + "/redpack/getData",
        data: {
            redpackNo: r.data.redpackNo,
            ver: s.service.version
        },
        success: function(a) {
            if (wx.hideLoading(), r.data.isGetDataSuccess = !0, i = 1, r.data.isRefresh && (r.data.isRefresh = !1), 
            0 == a.data.code) {
                console.log("result.data", a.data);
                a.data.self;
                r.data.shareWay = a.data.shareWay, r.data.shareImg = a.data.shareImg, r.data.shareCardImg = a.data.shareCardImg, 
                r.data.shareImgUrl = a.data.shareImgUrl, r.data.redpackType = a.data.redpackType, 
                r.data.currentPage = [ 1, 1 ], a.data.uid && (getApp().globalData.uid = a.data.uid), 
                r.setData({
                    showMoreButton: a.data.showMoreButton || !1,
                    buttonInfo: a.data.button || ""
                });
                var t = a.data;
                0 == a.data.data.canShare ? (wx.hideShareMenu(), wx.updateShareMenu({
                    withShareTicket: !0
                })) : wx.showShareMenu({
                    withShareTicket: !0
                }), U(t), null !== a.data.self.status && -1 !== a.data.self.status || 2 !== a.data.data.redpackStatus || 0 !== a.data.self.creator ? 0 === r.data.hasGrab ? (setTimeout(function() {
                    r.setData({
                        navHeight: 140 * Math.max(r.data.sectionContents[0].items.length, r.data.sectionContents[1].items.length),
                        showTips: !0
                    });
                }, 500), r.data.hasGrab = 1) : 1 === r.data.hasGrab && r.setData({
                    navHeight: 140 * Math.max(r.data.sectionContents[0].items.length, r.data.sectionContents[1].items.length),
                    showTips: !1
                }) : (console.log("you can grab"), f || (f = !0, wx.navigateTo({
                    url: "/pages/chat/chat?redpackNo=" + r.data.redpackNo + "&rid" + getApp().globalData.uid + "&t=" + new Date().getTime() + "&shareCardImg=" + r.data.shareCardImg
                })));
            } else switch (a.data.code) {
              case 500:
                o.showFail("服务器繁忙\n请稍候重试");
                break;

              case 501:
                o.showFail("请求失败\n请稍候重试");
                break;

              case 601:
                r.setData({
                    isDel: !0,
                    bottomButtons: [ {
                        icon: "../../images/home_btn.jpg",
                        text: "返回首页",
                        action: "weapp",
                        path: "/pages/index/index"
                    } ]
                });
                break;

              default:
                wx.hideToast(), r.setData({
                    redpackStatus: -1
                }), a.data.msg && "" != a.data.msg && getApp().showModal("提示", a.data.msg);
            }
        },
        fail: function(a) {
            wx.hideLoading(), r.data.isRefresh ? r.data.isRefresh = !1 : "ERR_WX_GET_USER_INFO" === a.type ? (wx.hideToast(), 
            r.data.auth = "scope.userInfo", r.setData({
                needAuth: !0,
                content: "小程序需要获取用户信息权限，点击确认前往设置或退出程序？"
            })) : o.showFail("请求失败\n请稍候重试");
        }
    });
};

Date.prototype.Format = function(a) {
    var t = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var e in t) new RegExp("(" + e + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? t[e] : ("00" + t[e]).substr(("" + t[e]).length)));
    return a;
};

var T = function(a) {
    wx.setKeepScreenOn({
        keepScreenOn: a
    }), a ? (r.setData({
        showPuzzle: !0
    }), setTimeout(function() {
        r.setData({
            puzzleScale: 1
        });
    }, 100)) : (r.setData({
        showPuzzle: !1,
        puzzleScale: .3
    }), l = !1, A(!1), clearInterval(d), C(), I(), r.setData({
        chips: r.data.chips,
        showChipsOverlay: !1
    }));
}, I = function() {
    for (var a = r.data.puzzleSize * r.data.puzzleSize, t = 0; t < a; t++) {
        var e = parseInt(t / r.data.puzzleSize), s = t % r.data.puzzleSize;
        r.data.chips[t].style = {
            marginLeft: s * r.data.chipWidth - s,
            marginTop: e * r.data.chipWidth - e,
            currentIndex: t,
            zIndex: 100
        };
    }
}, D = function(a) {
    if (k() && a) a(); else if (u > 2 && a) a(); else if (u += 1, r.setData({
        chips: r.data.chips
    }), setTimeout(function() {
        S();
    }, 3e3), a) var t = 0, e = setInterval(function() {
        t++, (k() || t > 10) && (clearInterval(e), a());
    }, 300);
}, S = function() {
    for (var a = 0; a < r.data.chips.length; a++) {
        var t;
        !function(a) {
            r.data.chips[a].loaded || -1 == (t = r.data.chips[a].url).indexOf("://tmp/") && (t = t.replace("http://", "https://"), 
            wx.downloadFile({
                url: t,
                success: function(t) {
                    r.data.chips[a].url = t.tempFilePath, r.data.chips[a].loaded = !0, r.setData({
                        chips: r.data.chips
                    });
                },
                fail: function(a) {
                    console.log("fail download: ", a);
                }
            }));
        }(a);
    }
}, k = function() {
    for (var a = 0, t = 0; t < r.data.chips.length; t++) r.data.chips[t].loaded && a++;
    return a == r.data.chips.length;
}, x = function() {
    l = !1, n = [], r.data.puzzleSeconds = 0, r.data.chipShadows = Array(r.data.puzzleSize * r.data.puzzleSize).fill(""), 
    r.setData({
        chipShadows: r.data.chipShadows,
        puzzleSeconds: r.data.puzzleSeconds,
        showChipsOverlay: !1
    });
    var a = 0;
    h ? h = !1 : (I(), r.setData({
        chips: r.data.chips
    }), a += 800);
    for (var t = 0; t < 2; t += 1) p.push(setTimeout(function() {
        y(r.data.chips), r.setData({
            chips: r.data.chips
        });
    }, a)), a += 500;
    p.push(setTimeout(function() {
        clearInterval(d), l = !0, d = setInterval(N, 1e3);
    }, a));
}, N = function() {
    var a = r.data.puzzleSeconds + 1;
    r.setData({
        puzzleSeconds: a
    }), r.data.puzzleTimeLimit > 0 && a >= r.data.puzzleTimeLimit ? (l = !1, A(!0), 
    clearInterval(d), r.setData({
        showChipsOverlay: !0
    })) : a > 5 * (r.data.puzzleSize - 1) && r.data.challengeRight < -10 && A(!0);
}, y = function(a) {
    for (var t, e, s = a.length; 0 !== s; ) t = Math.floor(Math.random() * s), e = a[s -= 1].style, 
    a[s].style = a[t].style, a[t].style = e;
}, z = function() {
    for (var a = 0, t = 0; t < r.data.chips.length; t++) r.data.chips[t].originalIndex == r.data.chips[t].style.currentIndex && a++;
    return a == r.data.chips.length;
}, C = function() {
    for (var a = 0; a < p.length; a += 1) clearTimeout(p[a]);
    p = [];
}, A = function(a) {
    a ? (r.setData({
        showChallenge: !0
    }), setTimeout(function() {
        r.setData({
            challengeRight: 0
        });
    }, 300)) : (r.setData({
        challengeRight: -200
    }), setTimeout(function() {
        r.setData({
            showChallenge: !1
        });
    }, 1e3));
}, R = function(a) {
    a ? (r.setData({
        showRedPacket: !0
    }), setTimeout(function() {
        r.setData({
            redPacketScale: 1
        });
    }, 100)) : r.setData({
        showRedPacket: !1,
        redPacketScale: 0,
        openingRedPacket: !1
    });
}, U = function(a) {
    console.log(a), g = a.data.qaNum, a.self && a.self.amount && (a.self.amount = parseFloat(a.self.amount).toFixed(2)), 
    a.self && 0 === a.self.creator && (a.self.correctRate = (a.self.correctNum / a.data.qaNum * 100).toFixed(0)), 
    a.self && void 0 !== a.self.status && -1 !== a.self.status || 1 === a.self.creator ? r.setData({
        bottomHeight: 218 * parseFloat(a.self.correctRate / 100),
        haveAsk: !0
    }) : r.setData({
        bottomHeight: 218
    }), a.data.avatarUrl && "" !== a.data.avatarUrl || (a.data.avatarUrl = s.service.avatarUrl), 
    r.data.shareImgLoad || (r.data.shareImg = a.shareImg, r.data.shareBg = encodeURI(a.shareBg));
    var t = r.data.sectionContents;
    if (t[0].number = a.data.grabNum, t[0].avatars = [], a.successRecords) {
        var e = P(a.successRecords, 0);
        t[0].items = e, console.log(t);
    } else r.setData({
        currentTab: 1
    }), t[0].items = [];
    if (t[0].lastId = a.successLastId, t[0].loadStatus = -1 == a.successLastId ? "noMore" : "default", 
    t[1].number = a.data.totalPartake - a.data.grabNum, t[1].avatars = [], a.failRecords) {
        var i = P(a.failRecords, 1);
        t[1].items = i;
    } else t[1].items = [];
    t[1].lastId = a.failLastId, t[1].loadStatus = -1 == a.failLastId ? "noMore" : "default";
    var n = a.data.totalPartake > 0;
    if (r.data.isRefresh || (t[0].number > 0 && 0 == t[1].number ? r.setData({
        currentTab: 0
    }) : 0 == t[0].number && t[1].number > 0 && r.setData({
        currentTab: 1
    })), (-1 != a.self.status && -1 == a.self.amount || 0 == a.self.amount) && (console.log("fail"), 
    r.data.grabErrorTip = "很遗憾，你还不够了解Ta"), 2 != a.data.redpackStatus && -1 == a.self.status) {
        switch (a.data.redpackStatus) {
          case 3:
            r.data.grabErrorTip = "红包已经被抢光啦";
            break;

          case 4:
            r.data.grabErrorTip = "该红包已过期";
            break;

          default:
            r.data.grabErrorTip = "出现未知错误";
        }
        r.setData({
            haveAsk: !0
        });
    }
    if (console.log("data", a.data), r.setData({
        redpackData: a.data,
        qaNo: a.data.qaNo,
        grabErrorTip: r.data.grabErrorTip || "",
        ownerNickName: a.data.nickName,
        ownerAvatar: a.data.avatarUrl,
        avatar: a.self.avatarUrl || "",
        nickName: a.self.nickName || "",
        selfAmount: a.self.amount,
        desc: a.data.redpackTitle,
        allowCorrectNum: a.data.qaNum - a.data.limitWrongTimes,
        redpackStatus: a.data.redpackStatus,
        totalAmount: parseFloat(a.data.totalAmount).toFixed(2),
        remainAmount: parseFloat(a.data.remainAmount).toFixed(2),
        refundAmount: parseFloat(a.data.refundAmount).toFixed(2),
        packNum: a.data.totalNum,
        takeNum: a.data.grabNum,
        adStatus: a.data.adStatus,
        ad: a.data.ad || null,
        self: a.self,
        shareWay: a.shareWay,
        lastGrabberId: a.lastId || -1,
        failLastId: a.failLastId || -1,
        successLastId: a.successLastId || -1,
        loadStatus: -1 == a.lastId ? "noMore" : "default",
        currentPage: [ 1, 1 ],
        showSectionBar: n,
        sectionContents: r.data.sectionContents,
        correctRate: a.self.correctRate || 0,
        navHeight: 140 * Math.max(r.data.sectionContents[0].items.length, r.data.sectionContents[1].items.length),
        correctNum: a.self.correctNum || 0,
        bottomButtons: a.bottomBtn
    }), (a.self.amount > -1 || 2 != a.data.redpackStatus) && !b) {
        b = !0;
        var d = o.getGuideStatus();
        console.log("judge", d), d && (r.setData({
            showGuide: !0
        }), o.setGuideStatus());
    }
    m || (G(), m = !0), o.setUid(a.uid);
}, L = function(a) {
    r.setData({
        loadStatus: "loading"
    });
    var t = void 0;
    switch (a) {
      case 0:
        t = 1;
        break;

      case 1:
        t = 0;
    }
    e.request({
        login: !0,
        url: s.service.hostUrl + "/redpack/getPageData",
        data: {
            redpackNo: r.data.redpackNo,
            page: r.data.currentPage[a] + 1,
            lastId: r.data.lastGrabberId,
            ver: s.service.version,
            status: a
        },
        success: function(e) {
            if (0 == e.data.code) {
                var s = r.data.sectionContents;
                console.log(s[t]), r.data.lastGrabberId = e.data.lastId, r.data.currentPage[a]++;
                var o = P(e.data.records, t);
                s[t].items = s[t].items.concat(o), console.log(s[t]), 1 == t ? r.data.failLastId = e.data.lastId : r.data.successLastId = e.data.lastId, 
                console.log("pageLastId", r.data.successLastId), r.data.sectionContents = s, r.setData({
                    failLastId: r.data.failLastId,
                    successLastId: r.data.successLastId,
                    sectionContents: s,
                    loadStatus: -1 == e.data.lastId ? "noMore" : "default",
                    navHeight: 140 * Math.max(r.data.sectionContents[0].items.length, r.data.sectionContents[1].items.length)
                });
            } else r.setData({
                loadStatus: "default"
            });
        },
        fail: function(a) {
            r.setData({
                loadStatus: "default"
            });
        }
    });
}, P = function(a, t) {
    console.log(g);
    for (var e = 0; e < a.length; e++) a[e].id = e, a[e].createTime = new Date(a[e].createTime).Format("M月dd日 HH:mm"), 
    a[e].amount = parseFloat(a[e].amount).toFixed(2), a[e].correctRate = (a[e].correctNum / g * 100).toFixed(0), 
    a[e].avatarUrl && "" !== a[e].avatarUrl || (a[e].avatarUrl = s.service.avatarUrl), 
    r.data.sectionContents[t].avatars.push(a[e].avatarUrl);
    return a;
}, M = function() {
    if (r.data.puzzleTimeLimit) {
        for (var a = 0; a < r.data.limitTimeArray.length; a += 1) if (r.data.limitTimeArray[a].v == r.data.puzzleTimeLimit) return console.log("find time limit index: ", a), 
        void r.setData({
            limitTimeIndex: a
        });
        for (var t = 1; t < r.data.limitTimeArray.length; t += 1) {
            var e = r.data.limitTimeArray[t];
            if (r.data.puzzleTimeLimit > e.v) break;
        }
        var s = {
            t: r.data.puzzleTimeLimit + "秒内",
            v: r.data.puzzleTimeLimit
        };
        r.data.limitTimeArray.splice(t, 0, s), console.log("insert time limit at: ", t, s), 
        r.setData({
            limitTimeArray: r.data.limitTimeArray,
            limitTimeIndex: t
        });
    }
}, G = function() {
    var a = "";
    r.data.ad && (a = r.data.ad.adNo || ""), console.log("onShowOption", o.globalData.onShowOptions), 
    e.request({
        login: !0,
        url: s.service.hostUrl + "/redpack/visitStat",
        data: {
            redpackNo: r.data.redpackNo,
            redpackStatus: r.data.redpackStatus,
            adNo: a,
            rid: getApp().globalData.rid,
            sceneId: o.globalData.onShowOptions.scene || "",
            source: o.globalData.onShowOptions.query.source || "",
            shareTicket: o.globalData.onShowOptions.shareTicket || "",
            ver: s.service.version
        },
        success: function(a) {
            console.log("success to report visit stat");
        },
        fail: function(a) {
            console.log("fail to report visit stat");
        }
    });
}, B = function(a, t) {
    wx.hideToast(), wx.showModal({
        title: a,
        content: t,
        showCancel: !1
    });
};
var a = require("../../vendor/qcloud-weapp-client-sdk/index"), t = require("../../config"), e = require("../../vendor/qcloud-weapp-client-sdk/lib/session"), s = require("../../utils/md5"), i = getApp(), n = null, o = -1, n = null, r = [], d = !1, c = 0, l = 375, u = !1, h = !1, p = 4, g = 5, f = .3, m = .1, v = [ {
    size: 3,
    chance: .2
}, {
    size: 4,
    chance: .4
}, {
    size: 5,
    chance: .4
} ], D = "../../images/grab/win.png", k = "../../images/grab/sad.png", b = "../../images/grab/default-cover.png", w = 1e4;

Page({
    data: {
        avatar: "",
        nickName: "",
        desc: "",
        redpackNo: "",
        isDel: !1,
        redpackStatus: 0,
        totalAmount: 0,
        refundAmount: 0,
        packNum: 0,
        takeNum: 0,
        grabbers: [],
        showPuzzle: !1,
        puzzleScale: .3,
        gameCount: 0,
        gameCountLimit: -1,
        chips: [],
        chipWidth: 200,
        chipCover: b,
        showTryAgain: !1,
        puzzleTip: "",
        challengeRight: -200,
        showChallenge: !1,
        isStarting: !1,
        preloadCover: b,
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
        showSectionBar: !1,
        showFixedSectionBar: !1,
        sectionContents: [ {
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
        } ],
        currentSection: 0,
        sectionBarWidth: 375,
        swiperHeight: 130,
        diffOptions: [],
        diffValue: [ 0, 0 ],
        ShowGuide: !1,
        guideTip: !1,
        GuideShowNum: 1,
        showAmount: 0
    },
    onLoad: function(a) {
        n = this, hasShowGuide = !1, n.setData({
            show: a.show,
            isBeta: getApp().globalData.isBeta
        }), E(), i.globalData.frontImage && (k = i.globalData.frontImage), i.globalData.redpacketImage && (D = i.globalData.redpacketImage), 
        a.redpackNo && (n.data.redpackNo = a.redpackNo);
        var t = null;
        a.scene && (t = decodeURIComponent(a.scene)), t && "" == n.data.redpackNo && (t.length <= 8 || ("B_" === t.substring(0, 2) ? n.data.redpackNo = t.substring(2) : t.length > 20 && (n.data.redpackNo = t))), 
        a.shareImg && "" != a.shareImg && (this.data.shareImgLoad = !0, this.data.shareImg = a.shareImg, 
        a.shareBg && "" != a.shareBg && (this.data.shareBg = a.shareBg)), q(), i.globalData.localData.length > 4 && "" != getApp().globalData.appName && wx.setNavigationBarTitle({
            title: getApp().globalData.appName
        }), console.log("redpackNo: ", n.data.redpackNo), U(), setTimeout(function() {
            getApp().getShareTitle("pages/red/red");
        }, 800);
    },
    onShow: function(a) {
        console.log("onShow", a);
    },
    bindGuideTap: function(a) {
        n.setData({
            showguide: !0,
            guideTip: !1
        }), wx.setStorageSync("isClickGuid", !0), wx.setStorageSync("GuideShowNum", 1);
    },
    onReady: function() {
        for (var a = 0; a < 100; a += 1) {
            var t = wx.getSystemInfoSync();
            if (t.screenWidth > 0) {
                l = t.screenWidth, w = l / 750 * 788, i.globalData.screenWidth = l;
                break;
            }
        }
    },
    onPullDownRefresh: function() {
        n.data.showPuzzle ? wx.stopPullDownRefresh() : (n.data.isRefresh = !0, wx.showToast({
            title: "正在刷新",
            icon: "loading"
        }), U(), wx.stopPullDownRefresh());
    },
    onReachBottom: function() {
        var a = n.data.currentSection;
        "default" == n.data.sectionContents[a].loadStatus && F();
    },
    onPageScroll: function(a) {
        a.scrollTop > w ? n.setData({
            showFixedSectionBar: !0
        }) : n.setData({
            showFixedSectionBar: !1
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: getApp().globalData.shareTitle,
            path: "/pages/red/red?redpackNo=" + n.data.redpackNo + "&t=" + new Date().getTime() + "&rid=" + getApp().globalData.uid,
            success: function(e) {
                a.request({
                    login: !0,
                    url: t.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/red/red",
                        redpackNo: n.data.redpackNo,
                        shareTitle: getApp().globalData.shareTitle,
                        ver: t.service.version,
                        way: "0"
                    }
                }), getApp().getShareTitle("pages/red/red");
            }
        };
    },
    bindCashbackTap: function(a) {
        i.navigateTo("/pages/cashback/cashback");
    },
    bindPayTap: function(a) {
        wx.reLaunch({
            url: "/pages/index/index"
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
        n.data.shareImgLoad ? i.navigateTo("/pages/share/share?from=red&redpackNo=" + n.data.redpackNo + "&shareImg=" + n.data.shareImg + "&shareBg=" + n.data.shareBg) : (setTimeout(function() {
            i.showBusy("正在生成\n分享图片");
        }, 100), console.log("shareImg:", n.data.shareImg), wx.downloadFile({
            url: n.data.shareImg.replace("http://", "https://"),
            header: {
                "X-WX-Id": e.get().id,
                "X-WX-Skey": e.get().skey
            },
            success: function(a) {
                n.data.shareImg = encodeURI(a.tempFilePath), wx.hideToast(), n.data.shareImgLoad = !0, 
                i.navigateTo("/pages/share/share?from=red&redpackNo=" + n.data.redpackNo + "&shareImg=" + n.data.shareImg + "&shareBg=" + n.data.shareBg);
            },
            fail: function(a) {
                i.navigateTo("/pages/share/share?from=red&redpackNo=" + n.data.redpackNo);
            }
        }));
    },
    bindPickerChange: function(e) {
        console.log("picker change: ", e);
        var s = e.detail.value, o = n.data.diffOptions[0][s[0]].value, r = n.data.diffOptions[1][s[1]].value;
        console.log("level: ", o, ", count: ", r);
        var d = n.data.diffValue;
        n.setData({
            diffValue: s,
            gameCountLimit: r
        }), h = !0, a.request({
            url: t.service.hostUrl + "/redpack/setLevel",
            data: {
                redpackNo: n.data.redpackNo,
                limitTimes: r,
                grabLevel: o,
                ver: t.service.version
            },
            login: !0,
            success: function(a) {
                0 == a.data.code ? (a.data.uid && (getApp().globalData.uid = a.data.uid), a.data.playRule && (G(a.data.playRule), 
                T(), n.setData({
                    chips: n.data.chips
                }))) : (i.showFail("设置失败"), n.setData({
                    diffValue: d,
                    gameCountLimit: n.data.diffOptions[1][d[1]],
                    value: s
                }));
            },
            fail: function(a) {
                n.setData({
                    diffValue: d,
                    gameCountLimit: n.data.diffOptions[1][d[1]],
                    value: s
                }), "ERR_WX_GET_USER_INFO" === a.type ? (n.data.auth = "scope.userInfo", n.setData({
                    needAuth: !0,
                    content: "小程序需要获取用户信息权限，点击确认前往设置或退出程序？"
                })) : i.showFail("请求失败\n请稍候重试");
            },
            complete: function() {
                h = !1;
            }
        });
    },
    bindPlayPuzzle: function() {
        h || n.data.showPuzzle || (S(!0), I());
    },
    bindTapChip: function(a) {
        if (d) {
            d = !1, n.setData({
                isStarting: !1
            });
            var t = a.currentTarget.dataset.index, e = n.data.chips[t].originalIndex;
            n.data.chips[t].frontSide = !0, n.data.chips[t].style.selected = !0, n.setData({
                chips: n.data.chips
            }), r.push(setTimeout(function() {
                if (e == c) S(!1), n.data.isBeta || P(!0), B(!0); else {
                    for (var a = 0; a < n.data.chips.length; a += 1) n.data.chips[a].frontSide = !0;
                    n.setData({
                        chips: n.data.chips
                    }), B(!1), n.data.gameCountLimit > 0 && n.data.gameCount >= n.data.gameCountLimit ? r.push(setTimeout(function() {
                        n.setData({
                            showChipsOverlay: !0,
                            puzzleTip: ""
                        });
                    }, 1e3)) : (z(!0), n.setData({
                        showTryAgain: !0,
                        puzzleTip: A("lose")
                    }));
                }
            }, 500));
        }
    },
    bindPressChip: function(a) {
        console.log("long press chip: ", a);
    },
    bindTryAgain: function() {
        n.setData({
            showTryAgain: !1
        }), u = !0, I();
    },
    bindClosePuzzle: function() {
        S(!1);
    },
    bindCloseRedPacket: function(a) {
        "close" == a.target.dataset.type && P(!1);
    },
    bindPreloadCover: function() {
        if (n.data.preloadCover != b) {
            n.data.chipCover = n.data.preloadCover;
            for (var a = !1, t = 0; t < n.data.chips.length; t += 1) n.data.chips[t].backUrl == b && (n.data.chips[t].backUrl = n.data.preloadCover, 
            a = !0);
            a && n.setData({
                chips: n.data.chips
            });
        }
    },
    bindSendRedPacket: function() {
        P(!1), 0 == n.data.self.creator ? n.bindPayTap() : parseFloat(n.data.remainAmount) > 0 ? n.bindShareTap() : n.bindPayTap();
    },
    bindSwitchSection: function(a) {
        var t = parseInt(a.target.dataset.index);
        if (t == this.data.currentSection) return !1;
        this.setData({
            currentSection: t
        });
    },
    bindSwiperChange: function(a) {
        var t = a.detail.current;
        0 == n.data.sectionContents[t].items.length && F();
        var e = W(n.data.sectionContents[t].items.length);
        this.setData({
            currentSection: t,
            swiperHeight: e
        });
    },
    bindReportTap: function(a) {
        i.navigateTo("/pages/report/report?page=red&redpackNo=" + n.data.redpackNo);
    },
    bindTapAd: function(e) {
        if (a.request({
            login: !0,
            url: t.service.hostUrl + "/user/adStat",
            data: {
                redpackNo: n.data.redpackNo,
                adNo: n.data.ad.adNo,
                ver: t.service.version
            }
        }), this.data.ad.appId && "" != this.data.ad.appId) wx.navigateToMiniProgram({
            appId: n.data.ad.appId,
            path: n.data.ad.path ? n.data.ad.path : "",
            extraData: n.data.ad.extraData ? n.data.ad.extraData : {}
        }); else if (n.data.ad.url && "" != n.data.ad.url) try {
            if (wx.getSystemInfoSync().SDKVersion >= "1.6.4") {
                var s = "/pages/webview/webview";
                s += "?redpackNo=" + n.data.redpackNo, s += "&title=" + (n.data.ad.navTitle || ""), 
                s += "&navBg=" + (n.data.ad.navBgColor || ""), s += "&navfront=" + (n.data.ad.navfrontColor || ""), 
                s += "&url=" + encodeURIComponent(n.data.ad.url), s += "&shareImg=" + encodeURIComponent(n.data.shareImg), 
                getApp().navigateTo(s);
            }
        } catch (e) {}
    },
    bindAvatarTap: function(a) {
        var t = n.data.sectionContents[n.data.currentSection].avatars;
        wx.previewImage({
            current: t[a.target.dataset.index],
            urls: t
        });
    },
    bindTapQuestion: function() {
        i.navigateTo("/pages/help/help");
    },
    bindRecordTap: function(a) {
        var t = 1 == n.data.self.creator ? "0" : "1";
        i.navigateTo("/pages/record/record?tab=" + t);
    },
    confirmTap: function() {
        wx.canIUse("openSetting") ? wx.openSetting({
            success: function(a) {
                a.authSetting[n.data.auth] && (n.setData({
                    needAuth: !1
                }), "scope.userInfo" === n.data.auth && U());
            }
        }) : i.showModal("提示", "您的微信版本太低，为了保证您的体验，建议先升级您的微信到最新版本");
    }
});

var S = function(a) {
    if (wx.setKeepScreenOn({
        keepScreenOn: a
    }), a) n.setData({
        showPuzzle: !0
    }), setTimeout(function() {
        n.setData({
            puzzleScale: 1
        });
    }, 100); else {
        n.setData({
            showPuzzle: !1,
            puzzleScale: .3
        }), n.data.isStarting && B(!1), d = !1, n.setData({
            isStarting: !1
        }), x();
        for (var t = 0; t < n.data.chips.length; t += 1) n.data.chips[t].frontSide = !0, 
        n.data.chips[t].frontUrl = k, n.data.chips[t].style.flipAnimation = !1, n.data.chips[t].style.shake = !1, 
        n.data.chips[t].style.selected = !1;
        n.setData({
            chips: n.data.chips,
            showChallenge: !1,
            challengeRight: -200,
            showTryAgain: !1
        });
    }
}, T = function() {
    var a = 60 * parseInt(.85 * l / 60);
    n.setData({
        puzzleWidth: a + 5 * (p - 1),
        chipWidth: a / p
    });
    var t = p * p;
    if (n.data.chips.length != t) {
        n.data.chips = Array(t).fill({});
        for (var e = 0; e < t; e++) {
            n.data.chips[e] = {
                originalIndex: e,
                backUrl: n.data.chipCover,
                frontUrl: k,
                frontSide: !0
            };
            var s = parseInt(e / p), i = e % p;
            n.data.chips[e].style = {
                marginLeft: i * n.data.chipWidth + 5 * i,
                marginTop: s * n.data.chipWidth + 5 * s,
                currentIndex: e,
                zIndex: 100,
                transformTime: f,
                flipAnimation: !1,
                shake: !1,
                selected: !1
            };
        }
    }
}, C = function() {
    for (var a = 0; a < n.data.chips.length; a += 1) n.data.chips[a].style.zIndex = 100;
}, I = function() {
    if (n.data.gameCountLimit > 0 && n.data.gameCount >= n.data.gameCountLimit) n.setData({
        showChipsOverlay: !0,
        puzzleTip: ""
    }); else {
        d = !1, x(), n.setData({
            isStarting: !0,
            gameCount: n.data.gameCount + 1,
            showChipsOverlay: !1,
            puzzleTip: A("playing")
        });
        var a = n.data.chips.length, t = 0;
        if (u) {
            u = !1;
            for (var e = 0; e < n.data.chips.length; e += 1) n.data.chips[e].style.selected = !1;
            n.setData({
                chips: n.data.chips
            }), t += 500, r.push(setTimeout(function() {
                n.data.chips[c].style.shake = !0, n.setData({
                    chips: n.data.chips
                });
            }, t));
        } else {
            for (var s = 0; s < a; s += 1) n.data.chips[s].frontUrl = k, n.data.chips[s].backUrl = n.data.chipCover;
            c = Math.floor(Math.random() * n.data.chips.length), n.data.chips[c].frontSide = !1, 
            n.data.chips[c].backUrl = k, n.data.chips[c].frontUrl = D, n.setData({
                chips: n.data.chips
            });
            for (var i = 0; i < a; i += 1) n.data.chips[i].style.flipAnimation = !0;
            t += 500, t += 500, r.push(setTimeout(function() {
                n.data.chips[c].frontSide = !0, n.setData({
                    chips: n.data.chips
                });
            }, t)), t += 500, r.push(setTimeout(function() {
                n.data.chips[c].backUrl = n.data.chipCover, n.data.chips[c].style.shake = !0, n.setData({
                    chips: n.data.chips
                });
            }, t));
        }
        t += 500, r.push(setTimeout(function() {
            n.data.chips[c].style.shake = !1;
        }, t)), t += 800, r.push(setTimeout(function() {
            for (var t = 0; t < a; t += 1) n.data.chips[t].frontSide = !1;
            n.setData({
                chips: n.data.chips
            });
        }, t)), t += 500;
        for (var o = 1e3 * f, l = 0; l < g; l += 1) !function(a) {
            r.push(setTimeout(function() {
                C();
                for (var t = N(n.data.chips, a), e = 0; e < t.length; e += 1) {
                    var s = t[e];
                    n.data.chips[s].style.zIndex = 900;
                }
                n.setData({
                    chips: n.data.chips
                });
            }, t)), t += o;
        }(l);
        r.push(setTimeout(function() {
            d = !0;
        }, t));
    }
}, x = function() {
    for (var a = 0; a < r.length; a += 1) clearTimeout(r[a]);
    r = [];
}, y = function(a, t) {
    for (var e = [], s = 0; s < n.data.chips.length; s += 1) -1 == a.indexOf(s) && e.push(s);
    for (var i = [], o = 0; o < t; o += 1) {
        var r = Math.floor(Math.random() * e.length);
        i.push(e[r]), e.splice(r, 1);
    }
    return i;
}, N = function(a, t) {
    for (var e = Math.random(), s = 2, i = 0, n = 0; n < v.length; n += 1) {
        var o = v[n];
        if (i += o.chance, e < i) {
            s = o.size;
            break;
        }
    }
    var r = [ c ];
    e = Math.random();
    var d = 0;
    if (d = t < g / 3 ? 0 : t < 2 * g / 3 ? m / 2 : m, e < d) r = y(r, s); else {
        var l = y(r, s - 1);
        r = r.concat(l);
    }
    for (var u = 0; u < s - 1; u += 1) R(r[u], r[u + 1]);
    return r;
}, R = function(a, t) {
    var e = n.data.chips[a].style;
    n.data.chips[a].style = n.data.chips[t].style, n.data.chips[t].style = e;
}, z = function(a) {
    a ? (n.setData({
        showChallenge: !0
    }), setTimeout(function() {
        n.setData({
            challengeRight: 0
        });
    }, 300)) : (n.setData({
        challengeRight: -200
    }), setTimeout(function() {
        n.setData({
            showChallenge: !1
        });
    }, 1e3));
}, A = function(a) {
    var t = i.globalData.grabTips;
    return "playing" == a ? t[0] : "lose" == a ? t[Math.floor(Math.random() * (t.length - 1)) + 1] : void 0;
}, P = function(a) {
    a ? (n.setData({
        showRedPacket: !0
    }), setTimeout(function() {
        n.setData({
            redPacketScale: 1
        });
    }, 100)) : n.setData({
        showRedPacket: !1,
        redPacketScale: 0,
        openingRedPacket: !1
    });
}, U = function() {
    a.request({
        login: !0,
        url: t.service.hostUrl + "/redpack/getData",
        data: {
            redpackNo: n.data.redpackNo,
            ver: t.service.version
        },
        success: function(a) {
            if (n.data.isGetDataSuccess = !0, o = 1, wx.hideToast(), 0 == a.data.code) {
                a.data.uid && (getApp().globalData.uid = a.data.uid);
                var t = a.data;
                M(t), t.playRule && G(t.playRule), T(), n.setData({
                    chips: n.data.chips
                });
            } else switch (a.data.code) {
              case 500:
                i.showFail("服务器繁忙\n请稍候重试");
                break;

              case 501:
                i.showFail("请求失败\n请稍候重试");
                break;

              case 601:
                n.setData({
                    isDel: !0
                });
                break;

              default:
                wx.hideToast(), n.setData({
                    redpackStatus: -1
                }), a.data.msg && "" != a.data.msg && getApp().showModal("提示", a.data.msg);
            }
            n.data.isRefresh ? n.data.isRefresh = !1 : wx.hideToast();
        },
        fail: function(a) {
            wx.hideToast(), n.data.isRefresh ? n.data.isRefresh = !1 : "ERR_WX_GET_USER_INFO" === a.type ? (wx.hideToast(), 
            n.data.auth = "scope.userInfo", n.setData({
                needAuth: !0,
                content: "小程序需要获取用户信息权限，点击确认前往设置或退出程序？"
            })) : i.showFail("请求失败\n请稍候重试");
        }
    });
}, L = function() {
    var a = -1, t = n.data.diffOptions[0];
    if (n.data.gameLevel) for (var e = 0; e < t.length; e += 1) t[e].value == n.data.gameLevel && (a = e);
    a < 0 && (a = 0);
    var s = -1, i = n.data.diffOptions[1];
    if (n.data.gameCountLimit) {
        for (var o = 0; o < i.length; o += 1) i[o].value == n.data.gameCountLimit && (s = o);
        if (-1 == s) {
            for (var r = 1; r < i.length && !(n.data.gameCountLimit > i[r].value); r += 1) ;
            var d = {
                label: "最多挑战" + n.data.gameCountLimit + "次",
                value: n.data.gameCountLimit
            };
            n.data.diffOptions[1].splice(r, 0, d), s = r;
        }
    }
    s < 0 && (s = 0), n.setData({
        diffOptions: n.data.diffOptions,
        diffValue: [ a, s ]
    });
}, B = function(e) {
    e && n.setData({
        openingRedPacket: !0
    });
    var o = n.data.gameCount, r = "BleeGe.RedPack.";
    r += i.globalData.uid, r += n.data.redpackNo, r += o, r += e ? 1 : 0, r = s.hexMD5(r), 
    a.request({
        login: !0,
        url: t.service.hostUrl + "/redpack/grab",
        data: {
            redpackNo: n.data.redpackNo,
            tryTimes: o,
            status: e ? 1 : 0,
            ticket: r,
            ver: t.service.version
        },
        success: function(a) {
            var t = a.data, s = "";
            switch (t.code) {
              case 0:
                M(t), 3 == t.data.redpackStatus && (s = n.data.isBeta ? "任务已经结束了" : "手慢了，奖励领完了");
                break;

              case 500:
              case 501:
                s = "出错啦，请稍候重试";
                break;

              case 601:
                n.setData({
                    isDel: !0
                }), s = "该翻牌PK已被删除";
                break;

              case 602:
                M(t), s = "手慢了，该翻牌PK已过期";
                break;

              case 603:
                M(t), s = n.data.isBeta ? "任务已经结束了" : "手慢了，赏金领完了";
                break;

              default:
                wx.hideToast(), s = t.msg && "" != t.msg ? t.msg : "出错啦，请稍候重试";
            }
            e && n.setData({
                grabErrorTip: s,
                openingRedPacket: !1
            });
        },
        fail: function(a) {
            e && n.setData({
                grabErrorTip: "出错啦，请稍候重试",
                openingRedPacket: !1
            });
        }
    });
}, M = function(a) {
    a.self && a.self.amount && (a.self.amount = parseFloat(a.self.amount).toFixed(2)), 
    a.data.avatarUrl && "" !== a.data.avatarUrl || (a.data.avatarUrl = t.service.avatarUrl), 
    n.setData({
        avatar: a.data.avatarUrl,
        nickName: a.data.nickName,
        desc: a.data.redpackTitle,
        redpackStatus: a.data.redpackStatus,
        self: a.self,
        packNum: a.data.totalNum,
        takeNum: a.data.grabNum,
        totalAmount: parseFloat(a.data.totalAmount).toFixed(2),
        remainAmount: parseFloat(a.data.remainAmount).toFixed(2),
        refundAmount: parseFloat(a.data.refundAmount).toFixed(2),
        buttonInfo: a.button || {}
    }), i.globalData.maxGuideShowNum = a.guideShowNum;
    var e = n.data.sectionContents;
    if (e[0].number = a.data.grabNum, e[0].avatars = [], a.successRecords) {
        var s = O(a.successRecords, 0);
        e[0].items = s;
    } else e[0].items = [];
    if (e[0].lastId = a.successLastId, e[0].loadStatus = -1 == a.successLastId ? "noMore" : "default", 
    e[1].number = a.data.totalPartake - a.data.grabNum, e[1].avatars = [], a.failRecords) {
        var o = O(a.failRecords, 1);
        e[1].items = o;
    } else e[1].items = [];
    e[1].lastId = a.failLastId, e[1].loadStatus = -1 == a.failLastId ? "noMore" : "default";
    var r = a.data.totalPartake > 0;
    n.data.isRefresh || (e[0].number > 0 && 0 == e[1].number ? n.setData({
        currentSection: 0
    }) : 0 == e[0].number && e[1].number > 0 && n.setData({
        currentSection: 1
    }));
    var d = W(e[n.data.currentSection].items.length);
    n.setData({
        showSectionBar: r,
        sectionContents: n.data.sectionContents,
        swiperHeight: d,
        adStatus: a.data.adStatus,
        ad: a.data.ad,
        shareWay: a.shareWay
    });
    var c = a.self.tryTimes || 0;
    n.data.isStarting && (c += 1), n.setData({
        gameCount: c,
        gameCountLimit: a.data.limitTimes,
        chipCover: a.data.imgUrl,
        preloadCover: a.data.imgUrl
    }), n.data.diffOptions && n.data.diffOptions.length > 0 && L(), n.data.shareImgLoad || (n.data.shareImg = a.shareImg, 
    n.data.shareBg = encodeURI(a.shareBg));
    var l = "";
    l = 0 == n.data.self.creator ? "我也要发一个" : parseFloat(n.data.remainAmount) > 0 ? "邀请好友来玩" : "再发一个", 
    n.setData({
        sendRedPacketDesc: l
    });
}, F = function() {
    var e = n.data.currentSection;
    -1 != n.data.sectionContents[e].lastId && (n.data.sectionContents[e].loadStatus = "loading", 
    n.setData({
        sectionContents: n.data.sectionContents
    }), a.request({
        login: !0,
        url: t.service.hostUrl + "/redpack/getPageData",
        data: {
            redpackNo: n.data.redpackNo,
            lastId: n.data.sectionContents[e].lastId,
            status: 0 == e ? 1 : 0,
            ver: t.service.version
        },
        success: function(a) {
            if (0 == a.data.code) {
                n.data.sectionContents[e].lastId = a.data.lastId, n.data.sectionContents[e].loadStatus = -1 == a.data.lastId ? "noMore" : "default";
                var t = O(a.data.records, e);
                n.data.sectionContents[e].items = n.data.sectionContents[e].items.concat(t);
                var s = W(n.data.sectionContents[e].items.length);
                n.setData({
                    sectionContents: n.data.sectionContents,
                    swiperHeight: s
                });
            } else n.data.sectionContents[e].loadStatus = "default", n.setData({
                sectionContents: n.data.sectionContents
            });
        },
        fail: function(a) {
            n.data.sectionContents[e].loadStatus = "default", n.setData({
                sectionContents: n.data.sectionContents
            });
        }
    }));
}, O = function(a, e) {
    for (var s = 0; s < a.length; s++) a[s].id = s, a[s].createTime = new Date(a[s].createTime).Format("M月dd日 HH:mm"), 
    a[s].amount = parseFloat(a[s].amount).toFixed(2), a[s].avatarUrl && "" !== a[s].avatarUrl || (a[s].avatarUrl = t.service.avatarUrl), 
    n.data.sectionContents[e].avatars.push(a[s].avatarUrl);
    return a;
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

var W = function(a) {
    var t = n.data.sectionContents, e = Math.max(t[0].items.length, t[1].items.length), s = Math.min(e, 2);
    return 140 * (a = Math.max(s, a)) + 80;
}, q = function() {
    wx.request({
        url: t.service.hostUrl + "/init",
        data: {
            ver: t.service.version
        },
        success: function(a) {
            if (0 == a.data.code) {
                var t = JSON.stringify(a.data);
                if (t != getApp().globalData.localData) {
                    i.globalData.localData = t, i.setGlobalData(a.data);
                    var e = "";
                    a.data.appName && "" != a.data.appName && (e = a.data.appName), wx.setNavigationBarTitle({
                        title: e
                    }), i.globalData.frontImage && (k = i.globalData.frontImage), i.globalData.redpacketImage && (D = i.globalData.redpacketImage), 
                    E(), n.data.redpackStatus > 0 && L(), wx.setStorage({
                        key: "initData",
                        data: t
                    });
                }
            }
        },
        fail: function(a) {
            console.log("init fail", a);
        }
    });
}, E = function() {
    for (var a = [], t = 0; t < i.globalData.levelList.length; t += 1) {
        var e = i.globalData.levelList[t];
        a.push({
            label: e.text,
            value: e.level
        });
    }
    for (var s = [], o = 0; o < i.globalData.limitTimeArray.length; o += 1) {
        var r = i.globalData.limitTimeArray[o];
        s.push({
            label: r.t,
            value: r.v
        });
    }
    n.setData({
        diffOptions: [ a, s ]
    });
}, G = function(a) {
    console.log("set rule"), p = a.puzzleSize, g = a.shuffleCount, f = a.chipMoveTime, 
    m = a.fakeMoveChance, v = a.shuffleSizeChances;
};
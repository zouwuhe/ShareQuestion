var a = require("../../vendor/qcloud-weapp-client-sdk/index"), t = require("../../config"), e = (require("../../vendor/qcloud-weapp-client-sdk/lib/session"), 
getApp()), n = null, i = 375, o = 0, s = 0, r = t.service.host + "/" + t.name + "/api/qalib/getQASetList", c = t.service.host + "/" + t.name + "/api/qalib/delQASet";

Page({
    data: {
        avatarUrl: "",
        nickName: "",
        tips: "一个只有真的懂你的人才能玩儿得过的互动",
        qaList: [],
        authName: "",
        authContent: "",
        isBeta: !1,
        canCreate: 1,
        pageFrom: "index",
        imageOptions: [],
        imageStyles: [],
        pinyinRes: "",
        inputZh: "",
        pyToneMark: 0,
        showCustomBtn: !1,
        customBtnText: "去看看",
        onlyShowTip: !1,
        contactBtn: !0,
        stageCount: 0,
        ifIphoneX: !1,
        needAuth: !1,
        qaNum: 10,
        subscribeSession: ""
    },
    onLoad: function(a) {
        this.setData({
            subscribeSession: e.getSessionFrom("index")
        });
        try {
            var o = wx.getStorageSync("qaList");
            console.log(o), o ? this.setData({
                qaList: o
            }) : wx.showLoading({
                title: "加载数据中"
            });
        } catch (a) {}
        n = this;
        try {
            wx.getSystemInfoSync().model.indexOf("iPhone X") > -1 && this.setData({
                ifIphoneX: !0
            });
        } catch (a) {}
        var s = null;
        if (a.scene) if ((s = decodeURIComponent(a.scene)).length <= 8) ; else {
            if ("B_" === s.substring(0, 2)) return wx.navigateTo({
                url: "/pages/result/result?from=qrcode&isBeta=" + this.data.isBeta + "&redpackNo=" + s.substring(2) + "&t=" + new Date().getTime()
            }), !1;
            if (s.length > 20) return wx.navigateTo({
                url: "/pages/result/result?from=qrcode&isBeta=" + this.data.isBeta + "&redpackNo=" + s + "&t=" + new Date().getTime()
            }), !1;
        }
        this.data.pageFrom = a.from || "index", e.globalData.uid, e.configNavTitle(), e.globalData.screenWidth > 0 && (i = getApp().globalData.screenWidth), 
        n.setData({
            avatarUrl: wx.getStorageSync("avatarUrl") || "",
            nickName: wx.getStorageSync("nickName") || ""
        }), p(), l(), g(), n.setData({
            imageOptions: n.data.imageOptions
        }), wx.request({
            url: t.service.hostUrl + "/init",
            data: {
                ver: t.service.version
            },
            login: !0,
            success: function(a) {
                if (console.log("init res: ", a), 0 == a.data.code) {
                    n.data.canCreate = a.data.canCreate, a.data.appName && (e.globalData.appName = a.data.appName, 
                    e.globalData.minQANum = a.data.minQANum || e.globalData.minQANum, wx.setNavigationBarTitle({
                        title: a.data.appName + " - 答题红包"
                    })), a.data.canViewAnswer && (e.globalData.canViewAnswer = a.data.canViewAnswer), 
                    e.globalData.maxGuideShowNum = a.data.guideShowNum;
                    var t = JSON.stringify(a.data);
                    if (t != e.globalData.localData) {
                        var i = e.globalData.localData.length < 4;
                        e.globalData.isBeta != a.data.isBeta && (i = !0), e.globalData.localData = t, e.setGlobalData(a.data), 
                        l(), i && (g(), n.setData({
                            imageOptions: n.data.imageOptions
                        })), wx.setStorage({
                            key: "initData",
                            data: t
                        });
                    }
                }
            },
            fail: function(a) {
                console.log("init fail", a);
            }
        }), setTimeout(function() {
            e.getShareTitle("pages/index/index");
        }, 800);
    },
    bindgetuserinfo: function(a) {
        if (console.log("bindgetuserinfo", a), "getUserInfo:ok" == a.detail.errMsg) {
            n.setData({
                needAuth: !1,
                logo: a.detail.userInfo.avatarUrl
            }), n.setData({
                nickName: a.detail.userInfo.nickName,
                avatarUrl: a.detail.userInfo.avatarUrl
            }), wx.setStorageSync("userInfo", a.detail.userInfo);
            var t = this.data.qaNum;
            this.getQAList(), e.navigateTo("/pages/makeqa/makeqa?qaNum=" + t);
        } else wx.showToast({
            title: "请先允许授权",
            icon: "none"
        });
    },
    onReady: function() {
        for (var a = 0; a < 100; a += 1) {
            var t = wx.getSystemInfoSync();
            if (console.log(t, this.data.ifIphoneX, t.screenHeight - 30 * Number(this.data.ifIphoneX) - 200), 
            t.screenWidth > 0 && t.windowHeight > 0) {
                (i = t.screenWidth) != getApp().globalData.screenWidth && (getApp().globalData.screenWidth = t.screenWidth, 
                wx.setStorage({
                    key: "screenWidth",
                    data: t.screenWidth
                }), this.setData({
                    height: t.screenHeight - 30 * Number(this.data.ifIphoneX) - 150
                }));
                break;
            }
        }
    },
    onShow: function() {
        e.globalData.qaId = [ , , , , , , , , , ,  ];
        var a = getCurrentPages();
        e.globalData.curPage = a[a.length - 1].route, e.globalData.pageVal = "", this.getQAList();
    },
    onShareAppMessage: function() {
        return {
            title: e.globalData.shareTitle,
            path: "/pages/index/index?rid=" + e.globalData.uid + "&t=" + new Date().getTime(),
            success: function(a) {
                e.getShareTitle("pages/index/index");
            }
        };
    },
    getQAList: function() {
        a.request({
            url: r,
            login: !0,
            success: function(a) {
                if (wx.hideLoading(), console.log(a), 0 === a.data.code) {
                    var t = a.data.imgHost, i = a.data.imgStyle, o = a.data.data.map(function(a) {
                        a.picUrl = t + a.picUrl + i;
                        new Date(a.createTime);
                        return Object.assign(a, {});
                    });
                    try {
                        wx.setStorageSync("qaList", o);
                    } catch (a) {}
                    n.setData({
                        qaList: o
                    }), e.setUid(a.data.uid);
                } else e.showFail("请求失败\n请稍候重试");
            },
            fail: function(a) {
                "ERR_WX_GET_USER_INFO" === a.type && (console.log("fail", a), n.setData({
                    needAuth: !0
                })), wx.hideLoading();
            }
        });
    },
    bindAuthEvent: function(a) {
        this.setData({
            nickName: a.detail.userInfo.nickName,
            avatarUrl: a.detail.userInfo.avatarUrl
        }), wx.setStorageSync("nickName", a.detail.userInfo.nickName), wx.setStorageSync("avatarUrl", a.detail.userInfo.avatarUrl), 
        this.setData({
            needAuth: !1
        }), this.getQAList();
    },
    bindChooseImageTap: function(a) {
        if (0 == this.data.canCreate) return e.showModal("提示", e.globalData.homeTip), !1;
        var t = a.currentTarget.dataset.index;
        if (t == n.data.imageOptions.length - 1) wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                e.showBusy("正在加载");
                var t = a.tempFilePaths[0];
                e.checkImage(t, function() {
                    "red" == n.data.pageFrom ? wx.redirectTo({
                        url: "/pages/crop/crop?imagePath=" + t
                    }) : e.navigateTo("/pages/crop/crop?imagePath=" + t), wx.hideLoading();
                });
            }
        }); else {
            var i = n.data.imageOptions[t];
            i.url && i.imgNo && (e.globalData.cropResult = {
                imagePath: i.url,
                imageNo: i.imgNo
            }, e.navigateTo("/pages/pay/pay"));
        }
    },
    bind2RecordTap: function(a) {
        e.navigateTo("/pages/record/record?show=0");
    },
    bind2BalanceTap: function(a) {
        e.navigateTo("/pages/cashback/cashback?show=0");
    },
    bind2QuestionTap: function(a) {
        e.navigateTo("/pages/help/help?show=0");
    },
    toQA: function(a) {
        var t = this.data.qaNum;
        e.navigateTo("/pages/makeqa/makeqa?qaNum=" + t);
    },
    bindConfirmTap: function() {
        wx.openSetting({
            success: function(a) {
                console.log("open setting success"), a.authSetting[n.data.authName] && (n.setData({
                    needAuth: !1
                }), "scope.userInfo" == n.data.authName && setTimeout(function() {
                    p();
                }, 500));
            }
        });
    },
    payForQASet: function(a) {
        console.log(a), e.navigateTo("/pages/pay/pay?qaNo=" + a.currentTarget.dataset.id.qaNo + "&qaCount=" + a.currentTarget.dataset.id.qaListLength);
    },
    submitCopy: function(a) {
        wx.setClipboardData({
            data: this.data.pinyinRes,
            success: function(a) {
                m("复制成功");
            }
        });
    },
    submitTrans: function(a) {
        var n = this;
        if (n.data.inputZh.length < 1) return e.showFail("请输入内容"), !1;
        h("请稍候"), wx.request({
            url: t.service.hostUrl + "/getPinYin",
            data: {
                zh: n.data.inputZh,
                toneMark: n.data.pyToneMark,
                ver: t.service.version
            },
            success: function(a) {
                0 == a.data.code ? (m("转换成功"), n.setData({
                    pinyinRes: a.data.res
                })) : e.showFail("请求失败\n请稍候重试");
            },
            fail: function(a) {
                e.showFail("请求失败\n请稍候重试"), console.log("get fail", a);
            }
        });
    },
    bindTextAreaBlur: function(a) {
        this.data.inputZh = a.detail.value;
    },
    checkboxChange: function(a) {
        a.detail.value.length > 0 ? this.data.pyToneMark = 1 : this.data.pyToneMark = 0;
    },
    bindReviewQuestion: function(a) {
        var t = a.currentTarget.dataset.id;
        console.log(t), e.navigateTo("/pages/review/review?id=" + t + "&navigateType=navigate");
    },
    bindCustomBtnTap: function(a) {
        if (!getApp().globalData.customBtn) return this.setData({
            showCustomBtn: !1
        }), !1;
        "weapp" == getApp().globalData.customBtn.action ? wx.navigateToMiniProgram({
            appId: getApp().globalData.customBtn.appId,
            path: getApp().globalData.customBtn.path ? getApp().globalData.customBtn.path : "",
            extraData: getApp().globalData.customBtn.extraData ? getApp().globalData.customBtn.extraData : {},
            success: function(a) {
                console.log(a);
            }
        }) : "image" == getApp().globalData.customBtn.action && wx.previewImage({
            current: getApp().globalData.customBtn.url,
            urls: [ getApp().globalData.customBtn.url ],
            success: function(a) {}
        });
    },
    bindDeleteQuestion: function(t) {
        var i = this;
        wx.showModal({
            title: "提示",
            content: "您是否确定删除该条问题记录",
            success: function(o) {
                o.confirm ? (a.request({
                    url: c,
                    data: {
                        qaNo: t.currentTarget.dataset.id
                    },
                    success: function(t) {
                        console.log(t.data), a.request({
                            url: r,
                            login: !0,
                            success: function(a) {
                                if (console.log(a), 0 === a.data.code) {
                                    var t = a.data.imgHost, i = a.data.imgStyle, o = a.data.data.map(function(a) {
                                        a.picUrl = t + a.picUrl + i;
                                        new Date(a.createTime);
                                        return Object.assign(a, {});
                                    });
                                    try {
                                        wx.setStorageSync("qaList", o);
                                    } catch (a) {}
                                    n.setData({
                                        qaList: o
                                    });
                                } else e.showFail("请求失败\n请稍候重试");
                            }
                        });
                    }
                }), console.log(t.currentTarget.dataset.id), i.data.qaList = i.data.qaList.filter(function(a) {
                    return a.id != t.currentTarget.dataset.id;
                }), i.setData({
                    qaList: i.data.qaList
                })) : o.cancel && console.log("u r right");
            }
        });
    },
    qaNumChange: function(a) {
        this.setData({
            qaNum: a.detail.value
        });
    },
    toRecord: function(a) {
        wx.navigateTo({
            url: "/pages/record/record?tab=0",
            success: function(a) {},
            fail: function() {},
            complete: function() {}
        });
    },
    bindContact: function(a) {
        e.contactHandler(a, n, function(a) {
            a.vopwords && "" != a.vopwords && n.setData({
                wordsValue: decodeURI(a.vopwords)
            });
        });
    }
});

var l = function() {
    n.setData({
        tips: e.globalData.tip,
        isBeta: e.globalData.isBeta,
        onlyShowTip: e.globalData.onlyShowTip,
        contactBtn: e.globalData.contactBtn,
        showCustomBtn: !!e.globalData.customBtn,
        customBtnText: e.globalData.customBtn ? e.globalData.customBtn.btnText : "去看看"
    });
}, g = function() {
    n.data.isBeta ? n.data.imageOptions = [] : n.data.imageOptions = Array.isArray(e.globalData.imageOptions) && e.globalData.imageOptions.slice() || [], 
    n.data.imageOptions.push({
        url: "../../images/index/camera.png"
    }), u(), d();
}, u = function() {
    var a = n.data.imageOptions.length, t = parseInt(a / 3);
    a % 3 && (t += 1);
    var e = Math.min(a, 3), r = 3 * parseInt(.75 * i / 3);
    s = o = r / 3, n.setData({
        imageContainerWidth: o * e + 2 * (e + 1),
        imageContainerHeight: s * t + 2 * (t + 1),
        imageItemWidth: o,
        imageItemHeight: s
    });
}, d = function() {
    n.data.imageStyles = [];
    for (var a = 0; a < n.data.imageOptions.length; a += 1) {
        var t = parseInt(a / 3), e = (s + 2) * t + 2, i = (o + 2) * (a % 3) + 2;
        n.data.imageStyles.push({
            marginTop: e,
            marginLeft: i
        });
    }
    n.setData({
        imageStyles: n.data.imageStyles
    });
}, p = function() {
    wx.getUserInfo({
        withCredentials: !1,
        success: function(a) {
            n.setData({
                nickName: a.userInfo.nickName,
                avatarUrl: a.userInfo.avatarUrl
            }), wx.setStorageSync("nickName", a.userInfo.nickName), wx.setStorageSync("avatarUrl", a.userInfo.avatarUrl);
        },
        fail: function(a) {}
    });
}, h = function(a) {
    return wx.showToast({
        title: a,
        icon: "loading",
        duration: 1e4,
        mask: !0
    });
}, m = function(a) {
    return wx.showToast({
        title: a,
        icon: "success",
        duration: 1500
    });
};
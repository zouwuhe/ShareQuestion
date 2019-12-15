var a = require("./vendor/qcloud-weapp-client-sdk/index"), e = require("./config"), t = require("./vendor/qcloud-weapp-client-sdk/lib/session"), o = 0, i = null, n = [ {
    t: "不限制",
    v: -1
}, {
    t: "最多10次",
    v: 10
}, {
    t: "最多8次",
    v: 8
}, {
    t: "最多5次",
    v: 5
}, {
    t: "最多3次",
    v: 3
} ], l = [ {
    level: 0,
    text: "简单"
}, {
    level: 1,
    text: "正常"
}, {
    level: 2,
    text: "困难"
}, {
    level: 3,
    text: "变态"
} ], r = [ 1, 10, 50, 100 ], s = [ "找到躲起来的红包吧", "没有找到呢，再接再厉！", "没点中呢，看准不要走神哦" ], c = "你可以设置一个带奖励的翻牌PK，好友挑战成功才能领到奖励\n\n提示:可以通过调节难度、设置封面图来提高趣味性哦~";

App({
    globalData: {
        minQANum: 5,
        maxQANum: 10,
        isBeta: !1,
        canCreate: !0,
        tip: " ",
        descOptions: [],
        levelList: l,
        showFeeOptions: !0,
        amountList: r,
        minPacketAmount: 1,
        maxPacketAmount: 1e3,
        maxPacketQuantity: 50,
        coverOptions: [],
        serviceRate: .02,
        canUseBalance: !1,
        contactBtn: !0,
        shareTitle: "[答题红包]恭喜发财,大吉大利",
        cropResult: {},
        screenWidth: 0,
        limitTimeArray: n,
        avatarUrl: "",
        frontImage: "",
        redpacketImage: "",
        grabTips: s,
        playTip: c,
        onlyShowTip: !1,
        serverMsg: "",
        appName: "",
        uid: -1,
        rid: -1,
        curPage: "",
        pageVal: "",
        localData: "{}",
        customBtn: null,
        qaId: [ , , , , , , , , , ,  ],
        userId: "",
        grabErrorTip: "",
        onShowOptions: {},
        ifReport: !1,
        selectQAList: [],
        selectQAIds: [],
        qaSet: null,
        ifLibFinish: !1,
        imgHost: "",
        directBack: !1,
        canViewAnswer: {
            1: "抢完后可直接偷看",
            2: "不允许偷看"
        },
        showguide: !0,
        guideTip: !0,
        GuideShowNum: 1,
        isClickGuid: !1,
        maxGuideShowNum: 0,
        scene: 0
    },
    onLaunch: function(t) {
        console.log("onLaunch", t), i = this, o = 0, a.setLoginUrl(e.service.loginUrl), 
        t.query && t.query.rid && (i.globalData.rid = t.query.rid), i.globalData.systemInfo = i.computeSystemInfo(), 
        t.scene && (i.globalData.scene = t.scene);
        try {
            i.globalData.uid = wx.getStorageSync("uid") || -1, i.globalData.localData = wx.getStorageSync("initData"), 
            i.globalData.avatarUrl = wx.getStorageSync("avatarUrl") || "";
        } catch (a) {}
        this.setNavBarConfig(), i.setGlobalData(JSON.parse(i.globalData.localData || "{}"));
        var n = wx.getStorageSync("screenWidth");
        n && (i.globalData.screenWidth = parseInt(n));
    },
    setNavBarConfig: function() {
        if (!(++o >= 100)) try {
            var a = wx.getSystemInfoSync();
            if (!a) return console.log("getConfig Fail"), void i.setNavBarConfig();
            if (a.screenHeight <= 0 || a.screenWidth <= 0 || a.windowHeight <= 0 || a.windowWidth <= 0) return console.log("getConfig Fail"), 
            void i.setNavBarConfig();
            e.pixelRate = a.windowWidth / 750, e.platform = a.platform, e.statusBarHeight = a.statusBarHeight, 
            "android" == a.platform.toLowerCase() && (e.capsuleHeight += 4), e.titleHeight = (e.capsuleHeight + e.statusBarHeight) / e.pixelRate, 
            a.statusBarHeight >= 44 && (e.isHighHead = !0), a.windowHeight > 750 && (e.isAllScreen = !0), 
            e.systemHeight = a.windowHeight, i.globalData.navHeight = (e.statusBarHeight + e.capsuleHeight) / e.pixelRate;
        } catch (a) {
            console.log(a);
        }
    },
    onShow: function(a) {
        console.log("AppOnShow", a), i.globalData.onShowOptions = a, i.globalData.ifReport = !1, 
        null !== i.globalData.uid && -1 !== i.globalData.uid && (i.reportSource(i.globalData.onShowOptions), 
        i.globalData.ifReport = !0);
    },
    setGlobalData: function(a) {
        console.log("setGlobalData", a), i.globalData.isBeta = a.isBeta || !1, i.globalData.canCreate = 0 != a.canCreate, 
        i.globalData.onlyShowTip = a.canCreate >= 100, i.globalData.serverMsg = a.serverMsg || "", 
        i.globalData.tip = a.tips || "", i.globalData.appName = a.appName || "", i.globalData.descOptions = a.exampleDesc || [], 
        i.globalData.levelList = a.levelList || l, i.globalData.showFeeOptions = 2 == a.customAmount, 
        i.globalData.amountList = a.amountList || r, i.globalData.minPacketAmount = a.minAmount || 1, 
        i.globalData.maxPacketAmount = a.maxAmount || 1e3, i.globalData.maxPacketQuantity = a.maxNum || 50, 
        i.globalData.coverOptions = a.exampleCoverImgs || [], i.globalData.serviceRate = a.serviceRate || .02, 
        i.globalData.canUseBalance = 1 == a.balancePay, i.globalData.contactBtn = 0 != a.contactBtn, 
        i.globalData.playTip = a.playTips || c, i.globalData.limitTimeArray = a.limitTimeArray || n, 
        i.globalData.frontImage = a.frontImg || "", i.globalData.redpacketImage = a.redpackImg || "", 
        i.globalData.grabTips = a.grabTips || s, i.globalData.customBtn = a.customBtn, i.globalData.canViewAnswer = a.canViewAnswer || {
            1: "抢完后可直接偷看",
            2: "不允许偷看"
        }, i.globalData.maxGuideShowNum = a.guideShowNum;
    },
    getShareTitle: function(o) {
        a.request({
            url: e.service.hostUrl + "/redpack/getShareTitle?t=" + new Date().getTime(),
            data: {
                ver: e.service.version,
                path: o
            },
            header: {
                "X-WX-Id": t.get() ? t.get().id : "-",
                "X-WX-Skey": t.get() ? t.get().skey : "-"
            },
            success: function(a) {
                a.data.uid && "" != a.data.uid && (i.globalData.uid = a.data.uid), i.globalData.shareTitle = a.data.shareTitle;
            }
        });
    },
    showBusy: function(a) {
        wx.showLoading({
            title: a,
            mask: !0,
            complete: function(a) {}
        });
    },
    getWordsLib: function(t) {
        a.request({
            url: e.service.hostUrl + "/qalib/getSysQALib",
            data: {
                ver: e.service.version
            },
            success: function(a) {
                if (0 == a.data.code) {
                    if (t) {
                        JSON.parse(JSON.stringify(a.data));
                        t(a.data);
                    }
                    wx.setStorage({
                        key: "wordsLibrary",
                        data: a.data
                    });
                }
            },
            fail: function(a) {
                console.log("get words lib: fail");
            }
        });
    },
    showSuccess: function(a) {
        wx.showToast({
            title: a,
            image: "/images/common/success.png",
            duration: 1500
        });
    },
    showFail: function(a) {
        var e = arguments[1] ? arguments[1] : 1500;
        wx.showToast({
            title: a,
            image: "/images/common/fail.png",
            duration: e
        });
    },
    showModal: function(a, e, t) {
        wx.hideToast(), wx.showModal({
            title: a,
            content: e,
            showCancel: !1,
            success: function(a) {
                t && t();
            }
        });
    },
    navigateTo: function(a) {
        var e = a;
        -1 == e.indexOf("?t=") && -1 == e.indexOf("&t=") && (e += -1 == e.indexOf("?") ? "?" : "&", 
        e += "t=" + new Date().getTime()), console.log("url", a), wx.navigateTo({
            url: e,
            fail: function(a) {
                wx.redirectTo({
                    url: e
                });
            }
        });
    },
    checkImage: function(a, e) {
        wx.canIUse("getFileInfo") ? wx.getFileInfo({
            filePath: a,
            success: function(t) {
                if (t.size > 2097152) return i.showModal("提示", "你选择的照片太大了, 请选择小于2M的照片"), !1;
                g(a, e);
            }
        }) : g(a, e);
    },
    configNavTitle: function() {
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "答题红包", e = "";
        i.globalData.appName && (e += i.globalData.appName + " - "), e += a, wx.setNavigationBarTitle({
            title: e
        });
    },
    compareVersion: function(a, e) {
        a = a.split("."), e = e.split(".");
        for (var t = Math.max(a.length, e.length); a.length < t; ) a.push("0");
        for (;e.length < t; ) e.push("0");
        for (var o = 0; o < t; o++) {
            var i = parseInt(a[o]), n = parseInt(e[o]);
            if (i > n) return 1;
            if (i < n) return -1;
        }
        return 0;
    },
    getSessionFrom: function(a) {
        var e = a + "|";
        return i.globalData.systemInfo || (i.globalData.systemInfo = i.computeSystemInfo()), 
        e += i.globalData.systemInfo, e += "|" + i.globalData.networkType, console.log("session from: ", e), 
        e;
    },
    computeSystemInfo: function() {
        var a = wx.getSystemInfoSync(), t = "";
        if (a) {
            console.log("info", a), i.globalData.sWidth = a.screenWidth, i.globalData.localScreenWidth = a.screenWidth, 
            e.pixelRate = a.windowWidth / 750;
            var o = [];
            i.globalData.SDKVersion = a.SDKVersion, o.push(a.version.slice(0, 10) || ""), o.push(a.platform.slice(0, 10) || ""), 
            o.push(a.brand.slice(0, 10) || ""), t = o.join("|");
        }
        return t;
    },
    reportSource: function(a) {
        var t = "";
        t = a.query && a.query.source ? a.query.source : a.source;
        var o = {
            originalId: e.service.originalId,
            uid: i.globalData.uid,
            version: e.service.version,
            path: a.path,
            scene: a.scene,
            source: t || "",
            referrerAppid: a.referrerInfo && a.referrerInfo.appId ? a.referrerInfo.appId : "",
            query: JSON.stringify(a.query),
            rid: a.query.rid || i.globalData.rid
        };
        wx.request({
            url: e.service.hostUrl + "/sourceReport",
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: o,
            success: function(a) {},
            fail: function(a) {
                console.log("fail to report");
            }
        });
    },
    setUid: function(a) {
        null !== a && "" !== a && (i.globalData.uid = a, wx.setStorage({
            key: "uid",
            data: a
        }), i.globalData.ifReport || (i.reportSource(i.globalData.onShowOptions), i.globalData.ifReport = !0));
    },
    contactHandler: function(a, e, t) {
        console.log("tap contact: ", a);
        var o = a.detail.path, n = a.detail.query;
        if (o) {
            if (e && -1 != o.indexOf(e.route)) return console.log("page route: ", e.route), 
            void (t && t(n));
            var l = o, r = [];
            for (var s in n) if (n.hasOwnProperty(s)) {
                var c = s + "=" + n[s];
                r.push(c);
            }
            r.length > 0 && (l += "?" + r.join("&")), i.navigateTo(l);
        }
    },
    getGuideStatus: function() {
        var a = wx.getStorageSync("guideCount");
        return !(a && a >= 2);
    },
    setGuideStatus: function() {
        var a = wx.getStorageSync("guideCount");
        console.log("count", a), a ? a++ : a = 1, wx.setStorageSync("guideCount", a);
    }
});

var g = function(a, e) {
    wx.getImageInfo({
        src: a,
        success: function(a) {
            a.width, a.height;
            return a.width < 100 ? (i.showModal("提示", "你选择的照片太窄了"), !1) : a.width > 4096 ? (i.showModal("提示", "你选择的照片太宽了"), 
            !1) : a.height < 100 ? (i.showModal("提示", "你选择的照片太短了"), !1) : a.height > 4096 ? (i.showModal("提示", "你选择的照片太长了"), 
            !1) : void e();
        }
    });
};
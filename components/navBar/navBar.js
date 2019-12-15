var e = require("../../config"), t = getApp(), a = [];

Component({
    properties: {
        navColor: {
            type: String,
            value: "#F5535E"
        },
        showNavBar: {
            type: Boolean,
            value: !0
        },
        navTitle: {
            type: String,
            value: "包你唱"
        },
        titleColor: {
            type: String,
            value: "white"
        },
        fontAlign: {
            type: String,
            value: "center"
        },
        showHome: {
            type: Boolean,
            value: !1
        },
        showBack: {
            type: Boolean,
            value: !1
        },
        showMargin: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        homeTop: 18,
        titleFontSize: 30,
        titleFontWeight: 500,
        navBarTop: 0,
        titleTop: 20,
        capsuleHeight: e.capsuleHeight,
        statusBarHeight: e.statusBarHeight,
        pixelRate: e.pixelRate
    },
    ready: function() {
        a = getCurrentPages();
        var i = [ "pages/profile/profile", "pages/pay/pay", "pages/index/index" ];
        t.globalData.navHeight = (this.data.statusBarHeight + this.data.capsuleHeight) / this.data.pixelRate, 
        this.setData({
            capsuleHeight: e.capsuleHeight,
            statusBarHeight: e.statusBarHeight,
            pixelRate: e.pixelRate
        }), a.length > 2 ? this.setData({
            showBack: !0,
            showHome: !0
        }) : 2 === a.length ? this.setData({
            showBack: !0,
            showHome: !1
        }) : i.includes(a[0].route) ? this.setData({
            showBack: !1,
            showHome: !1
        }) : this.setData({
            showBack: !1,
            showHome: !0
        });
    },
    methods: {
        tapNavHome: function() {
            this.triggerEvent("unload"), t.globalData.curItem = null, wx.reLaunch({
                url: "/pages/index/index"
            });
        },
        tapNavBack: function() {
            this.triggerEvent("unload"), wx.navigateBack({
                delta: 1
            });
        }
    }
});
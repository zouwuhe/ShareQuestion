var e, a = require("../../vendor/qcloud-weapp-client-sdk/index"), t = require("../../config"), n = getApp();

Page({
    data: {
        cashBackRcord: []
    },
    onLoad: function(a) {
        e = this, n.configNavTitle("提现明细"), wx.showLoading({
            title: "加载中"
        }), e.cashBackRcord();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return console.log("cashback uid", getApp().globalData.uid), e.setData({
            isShare: !0
        }), {
            title: getApp().globalData.shareTitle,
            path: "/pages/index/index?t=" + new Date().getTime() + "&rid=" + getApp().globalData.uid,
            success: function(e) {
                a.request({
                    url: t.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/index/index",
                        redpackNo: "",
                        shareTitle: getApp().globalData.shareTitle,
                        ver: t.service.version,
                        way: "0"
                    },
                    login: !0
                }), getApp().getShareTitle("pages/index/index");
            }
        };
    },
    cashBackRcord: function() {
        a.request({
            url: t.service.hostUrl + "/user/cashbackRecord",
            data: {
                ver: t.service.version
            },
            login: !0,
            success: function(a) {
                wx.hideLoading(), 0 == a.data.code ? e.setData({
                    cashBackRcord: a.data.data
                }) : i("服务器繁忙\n请稍候重试");
            },
            fail: function(e) {
                wx.hideLoading();
            }
        });
    }
});

var i = function(e) {
    return wx.showToast({
        title: e,
        image: "../../images/common/fail.png",
        duration: 1500
    });
};
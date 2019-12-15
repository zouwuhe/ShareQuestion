var e = require("../../vendor/qcloud-weapp-client-sdk/index"), n = require("../../config"), o = getApp();

Page({
    data: {
        webUrl: ""
    },
    onLoad: function(t) {
        var i = this;
        o.configNavTitle("用户协议"), wx.hideShareMenu(), wx.showLoading({
            title: "加载中"
        }), e.request({
            url: n.service.hostUrl + "/protocol",
            data: {
                ver: n.service.version
            },
            success: function(e) {
                if (console.log("request success", e), 0 == e.data.code) {
                    var n = e.data.data.content;
                    i.setData({
                        article: n
                    });
                }
            },
            fail: function(e) {},
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
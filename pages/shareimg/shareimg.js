var e, a = require("../../vendor/qcloud-weapp-client-sdk/index"), t = require("../../config"), o = !0;

Page({
    data: {
        url: "",
        redpackType: "0",
        shareWay: "0",
        shareImg: "",
        redpackNo: "",
        version: t.service.version,
        shareUrl: "/pages/pay/pay",
        tmpFilePath: "",
        shareCardImg: "",
        shareTip: "点击下方按钮保存分享图到手机相册"
    },
    onLoad: function(a) {
        o = !0, console.log("shareimg options", a), a.navfront && a.navBg && "" != a.navfront && "" != a.navBg && wx.setNavigationBarColor({
            frontColor: a.navfront,
            backgroundColor: a.navBg,
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), a.title && "" != a.title ? wx.setNavigationBarTitle({
            title: a.title
        }) : wx.setNavigationBarTitle({
            title: "我最懂你"
        }), (e = this).data.redpackNo = a.redpackNo, e.data.shareImg = decodeURIComponent(a.shareImg), 
        e.data.shareCardImg = decodeURIComponent(a.shareCardImg), console.log("shareCardImg", e.data.shareCardImg), 
        e.data.shareWay = a.shareWay, e.data.redpackType = a.redpackType, e.setData({
            shareTip: a.shareTip || "点击下方按钮保存分享图到手机相册"
        }), console.log("shareUrl", e.data.shareUrl), this.downLoadShareImg(), setTimeout(function() {
            getApp().getShareTitle("pages/help/help");
        }, 800);
    },
    onReady: function() {},
    onShow: function() {
        e = this;
        var a = getCurrentPages();
        getApp().globalData.curPage = a[a.length - 1].route, getApp().globalData.pageVal = this.data.redpackNo;
    },
    onShareAppMessage: function() {
        return console.log("share uid", getApp().globalData.uid), console.log(this.data.shareCardImg), 
        {
            title: getApp().globalData.shareTitle,
            imageUrl: this.data.shareCardImg,
            path: "/pages/red/red?redpackNo=" + e.data.redpackNo + "&rid=" + getApp().globalData.uid + "&t=" + new Date().getTime(),
            success: function(o) {
                a.request({
                    url: t.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/shareimg/shareimg",
                        redpackNo: e.data.redpackNo,
                        shareTitle: getApp().globalData.shareTitle,
                        ver: t.service.version,
                        way: e.data.fromPay ? "1" : "3"
                    },
                    login: !0
                });
            },
            fail: function(e) {}
        };
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    bindWebviewMessage: function(e) {
        console.log(e);
    },
    saveFile: function() {
        console.log(this.data.tmpFilePath), wx.showLoading({
            title: "正在保存",
            mask: !0
        }), wx.saveImageToPhotosAlbum({
            filePath: this.data.tmpFilePath,
            success: function(e) {
                console.log(e), wx.hideLoading(), wx.showToast({
                    title: "保存成功",
                    type: "success",
                    duration: 1500
                });
            },
            fail: function(a) {
                e.toPreviewImage(), wx.hideLoading();
            },
            complete: function(e) {
                wx.hideLoading();
            }
        });
    },
    refreshShareImg: function() {
        var a = t.service.hostUrl + "/redpack/shareImg/1/" + e.data.redpackNo + ".jpg?refresh=1";
        e.data.shareImg = a, e.downLoadShareImg();
    },
    downLoadShareImg: function() {
        wx.showLoading({
            title: "正在加载",
            mask: !0
        });
        var a = e.data.shareImg.replace("http://", "https://");
        wx.downloadFile({
            url: a,
            success: function(a) {
                console.log(a.tempFilePath), wx.hideLoading(), wx.getFileInfo({
                    filePath: a.tempFilePath,
                    sucess: function(e) {
                        console.log("res", e);
                    },
                    fail: function(e) {
                        console.log("fail", e);
                    },
                    complete: function(t) {
                        if (console.log("res", t), t.size <= 0) wx.showToast({
                            title: "请求过快，请稍后重试",
                            icon: "none"
                        }); else {
                            if (e.setData({
                                shareImg: a.tempFilePath,
                                tmpFilePath: a.tempFilePath
                            }), o) return void (o = !1);
                            wx.showToast({
                                title: "已重新生成分享图",
                                icon: "none"
                            });
                        }
                    }
                });
            },
            fail: function() {
                wx.hideLoading();
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    toPreviewImage: function() {
        var e = this.data.shareImg;
        wx.previewImage({
            urls: [ e ],
            success: function(e) {},
            fail: function() {},
            complete: function() {}
        });
    }
});
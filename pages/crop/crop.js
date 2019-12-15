var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../vendor/weCropper/weCropper.js")), e = (getApp(), wx.getSystemInfoSync()), a = e.windowWidth, o = e.windowHeight - 50, i = null;

Page({
    data: {
        cropperOpt: {
            id: "cropper",
            width: a,
            height: o,
            scale: 2.5,
            zoom: 8,
            cut: {
                x: (a - 300) / 2,
                y: (o - 300) / 2,
                width: 300,
                height: 300
            }
        },
        imagePath: "",
        reChooseImage: !1
    },
    onLoad: function(e) {
        i = this;
        var a = this.data.cropperOpt;
        new t.default(a).on("beforeImageLoad", function(t) {
            wx.showToast({
                title: "上传中",
                icon: "loading",
                duration: 2e4
            });
        }).on("imageLoad", function(t) {
            wx.hideToast();
        }).updateCanvas(), this.data.reChooseImage = e.reChooseImage, this.data.imagePath = e.imagePath, 
        this.wecropper.pushOrign(this.data.imagePath);
    },
    touchStart: function(t) {
        this.wecropper.touchStart(t);
    },
    touchMove: function(t) {
        this.wecropper.touchMove(t);
    },
    touchEnd: function(t) {
        this.wecropper.touchEnd(t);
    },
    tapFinish: function() {
        this.wecropper.getCropperImage("position", function(t) {
            t ? (t.imagePath = i.data.imagePath, getApp().globalData.cropResult = t, wx.navigateBack({
                delta: -1
            })) : console.log("获取图片地址失败，请稍后重试");
        });
    },
    tapCancel: function() {
        wx.navigateBack({
            delta: -1
        });
    }
});
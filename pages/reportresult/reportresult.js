Page({
    data: {},
    onLoad: function(a) {},
    confirm: function(a) {
        wx.navigateBack({
            delta: 1
        });
    }
});
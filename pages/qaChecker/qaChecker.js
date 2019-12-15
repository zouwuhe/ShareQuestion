var t = getApp();

Page({
    data: {
        showList: [],
        qaItem: null,
        showChecker: !1,
        index: 0,
        deleteItem: [],
        imgHost: ""
    },
    onLoad: function(a) {
        var i = t.globalData.qaSet;
        this.data.imgHost = t.globalData.imgHost, t.globalData.ifLibFinish = !0, t.globalData.directBack = !0, 
        this.setData({
            imgHost: this.data.imgHost
        }), this.handleQAList(i), t.configNavTitle("已出题目");
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        console.log("qaChecker onUnload");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    handleQAList: function(t) {
        console.log("qaList from checker", t), this.data.showList = [], this.data.deleteItem = [];
        for (var a = 0; a < t.length; a++) t[a].id && this.data.showList.push(t[a]);
        this.setData({
            showList: this.data.showList
        });
    },
    toShowChecker: function(t) {
        var a = t.currentTarget.dataset.item, i = t.currentTarget.dataset.idx;
        this.data.index = i, this.data.qaItem = a, this.setData({
            showChecker: !0,
            qaItem: this.data.qaItem
        });
    },
    radioChange: function(t) {
        console.log("e", t);
        var a = t.currentTarget.dataset.idx, i = t.detail.value;
        this.data.showList[a].answer = i, this.setData({
            showList: this.data.showList
        });
    },
    doDelete: function(a) {
        var i = this, s = a.currentTarget.dataset.idx;
        wx.showModal({
            title: "提示",
            content: "确定删除该问题？",
            showCancel: !0,
            success: function(a) {
                if (a.confirm) {
                    console.log("确定删除");
                    var o = i.data.showList[s];
                    i.data.deleteItem.push(o), i.data.showList = i.data.showList.filter(function(t, a) {
                        return a != s;
                    }), i.setData({
                        showList: i.data.showList
                    }), t.globalData.qaSet = i.data.showList, t.globalData.ifLibFinish = !1, 0 == i.data.showList.length && i.bindConfirm();
                }
            }
        });
    },
    bindPickConfirm: function(t) {
        console.log(t.detail, t), this.data.showList[this.data.index] = t.detail, this.setData({
            showList: this.data.showList
        });
    },
    bindConfirm: function() {
        this.data.showList, this.data.deleteItem;
        t.globalData.qaSet = this.data.showList, t.globalData.directBack = !1, t.globalData.ifLibFinish = !1, 
        t.globalData.ifRefresh = !1, wx.navigateBack({
            delta: 1
        });
    },
    move: function(t) {}
});
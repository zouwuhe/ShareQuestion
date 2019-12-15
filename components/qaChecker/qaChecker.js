Component({
    properties: {
        qaList: {
            type: Array,
            observer: "handleQAList"
        },
        imgHost: {
            type: String
        },
        maxQANum: {
            type: Number
        }
    },
    data: {
        showList: [],
        qaItem: null,
        showChecker: !1,
        index: 0,
        deleteItem: [],
        maxQANum: 5
    },
    methods: {
        handleQAList: function(t) {
            console.log("qaList from checker", t), this.data.showList = [], this.data.deleteItem = [];
            for (var s = 0; s < t.length; s++) t[s].id && this.data.showList.push(t[s]);
            this.setData({
                showList: this.data.showList
            });
        },
        toShowChecker: function(t) {
            var s = t.currentTarget.dataset.item, a = t.currentTarget.dataset.idx;
            this.data.index = a, this.data.qaItem = s, this.setData({
                showChecker: !0,
                qaItem: this.data.qaItem
            });
        },
        radioChange: function(t) {
            console.log("e", t);
            var s = t.currentTarget.dataset.idx, a = t.detail.value;
            this.data.showList[s].answer = a, this.setData({
                showList: this.data.showList
            });
        },
        doDelete: function(t) {
            var s = this, a = t.currentTarget.dataset.idx;
            wx.showModal({
                title: "提示",
                content: "确定删除该问题？",
                showCancel: !0,
                success: function(t) {
                    if (t.confirm) {
                        console.log("确定删除");
                        var e = s.data.showList[a];
                        s.data.deleteItem.push(e), s.data.showList = s.data.showList.filter(function(t, s) {
                            return s != a;
                        }), s.setData({
                            showList: s.data.showList
                        }), 0 == s.data.showList.length && s.bindConfirm();
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
            var t = {
                showList: this.data.showList,
                deleteList: this.data.deleteItem
            };
            this.triggerEvent("confirm", t);
        },
        move: function(t) {}
    }
});
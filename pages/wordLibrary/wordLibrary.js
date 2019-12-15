function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var a = require("../../vendor/qcloud-weapp-client-sdk/index"), e = require("../../config"), i = null, s = !1, d = !1, o = getApp(), r = 0, n = "未分类";

Page({
    data: {
        categoryIndex: 0,
        wordsLib: [ {
            waWordsList: [ {
                createTime: 15211969e5,
                id: 1000006,
                options: [ "球类运动", "健身举铁", "田径运动", "我不爱运动" ],
                picUrl: "http://118.89.30.141/public/1522728003831.png",
                question: "我喜欢什么运动",
                type: "normal"
            }, {
                createTime: 15211969e5,
                id: 1000006,
                options: [ "球类运动", "健身举铁", "田径运动", "我不爱运动" ],
                picUrl: "http://118.89.30.141/public/1522728003831.png",
                question: "我喜欢什么运动",
                type: "normal"
            } ]
        } ],
        sessionFrom: "",
        wordsScrollTop: 0,
        updatedMyWords: !1,
        highlightSearchTip: !0,
        isBeta: 0,
        hideIndexBtn: !0,
        loading: !1,
        imgHost: "https://dtimg.bleege.com/wbnd/qaimg/",
        selectQAList: [],
        maxQANum: 5,
        qaItem: null,
        cur: 0,
        showCheckView: !1
    },
    onLoad: function(t) {
        i = this, this.data.maxQANum = o.globalData.maxQANum, o.globalData.qaSet = [], o.globalData.directBack = !1, 
        o.globalData.ifLibFinish = !1;
        var a = function(t) {
            var a = t.data;
            i.data.selectQAList = o.globalData.selectQAList, o.globalData.qaSet = i.data.selectQAList;
            for (var e in a) {
                a[e].page = 1;
                for (var s in a[e].items) "string" == typeof a[e].items[s].options && (!function() {
                    a[e].items[s].options = JSON.parse(a[e].items[s].options).data;
                    var t = o.globalData.selectQAIds.indexOf(a[e].items[s].id);
                    -1 != t && (a[e].items[s] = o.globalData.selectQAList[t], o.globalData.selectQAList = o.globalData.selectQAList.filter(function(a, e) {
                        return e != t;
                    }), o.globalData.selectQAIds = o.globalData.selectQAIds.filter(function(a, e) {
                        return e != t;
                    }));
                }(), a[e].items[s].index = [ e, s ]);
            }
            wx.getStorageSync("myWords:wordslib");
            var d = getCurrentPages().map(function(t) {
                return t.route;
            });
            console.log("getCurrentPages", d), -1 == d.indexOf("pages/pay/pay") && (i.data.hideIndexBtn = !1), 
            i.setData({
                isBeta: 1 == o.globalData.isBeta ? 1 : 0,
                wordsLib: a,
                selectQAList: i.data.selectQAList,
                highlightSearchTip: 1 == t.isReviewTime,
                hideIndexBtn: i.data.hideIndexBtn,
                maxQANum: i.data.maxQANum
            });
        }, e = wx.getStorageSync("wordsLibrary");
        e && a(e), o.getWordsLib(a), o.configNavTitle("题库"), i.setData({
            sessionFrom: o.getSessionFrom("apply_words")
        }), setTimeout(function() {
            getApp().getShareTitle("pages/wordLibrary/wordLibrary");
        }, 1500);
    },
    onShareAppMessage: function() {
        return {
            title: getApp().globalData.shareTitle,
            path: "/pages/pay/pay?rid=" + getApp().globalData.uid + "&t=" + new Date().getTime(),
            success: function(t) {
                a.request({
                    url: e.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/wordLibrary/wordLibrary",
                        redpackNo: "",
                        shareTitle: getApp().globalData.shareTitle,
                        ver: e.service.version,
                        way: "0"
                    },
                    login: !0
                }), getApp().getShareTitle("pages/wordLibrary/wordLibrary");
            },
            fail: function(t) {}
        };
    },
    bind2IndexTap: function(t) {
        wx.reLaunch({
            url: "/pages/pay/pay?source=wordslib2pay"
        });
    },
    getSysQALibByPage: function() {
        if (!d) if (d = !0, console.log("getSysQALibByPage"), i.data.wordsLib[i.data.categoryIndex].hasMore) {
            var r = i.data.categoryIndex;
            s || (s = !0, i.setData({
                loading: !0
            }), a.request({
                url: e.service.hostUrl + "/qalib/getSysQALib",
                data: {
                    labelId: this.data.wordsLib[r].id,
                    page: this.data.wordsLib[r].curPage + 1
                },
                success: function(a) {
                    if (0 == a.data.code) {
                        var e;
                        console.log(a.data);
                        for (var s in a.data.items) !function(t) {
                            a.data.items[t].options = JSON.parse(a.data.items[t].options).data;
                            var e = o.globalData.selectQAIds.indexOf(a.data.items[t].id);
                            -1 != e && (a.data.items[t] = o.globalData.selectQAList[e], o.globalData.selectQAList = o.globalData.selectQAList.filter(function(t, a) {
                                return a != e;
                            }), o.globalData.selectQAIds = o.globalData.selectQAIds.filter(function(t, a) {
                                return a != e;
                            })), a.data.items[t].index = [ r, t ];
                        }(s);
                        (e = i.data.wordsLib[r].items).push.apply(e, t(a.data.items)), i.data.wordsLib[r].curPage = a.data.curPage, 
                        i.data.wordsLib[r].hasMore = a.data.hasMore;
                    }
                    i.setData({
                        wordsLib: i.data.wordsLib
                    });
                },
                fail: function(t) {
                    console.log("get words lib: fail");
                },
                complete: function() {
                    s = !1, d = !1, i.setData({
                        loading: !1
                    });
                }
            }));
        } else d = !1;
    },
    bindTapSearch: function(t) {
        o.uploadFormId(t.detail.formId, "to_apply_words");
        var a = "/pages/search/search";
        a += "?categoryId=" + r, a += "&categoryName=" + n, wx.navigateTo({
            url: a
        });
    },
    bindTapCategory: function(t) {
        var a = t.target.dataset.index;
        if (a != i.data.categoryIndex) {
            if (100 == i.data.wordsLib[a].id && !i.data.updatedMyWords) {
                var e = function(t) {
                    i.data.wordsLib[a].waWordsList = t, i.setData({
                        wordsLib: i.data.wordsLib
                    });
                }, s = wx.getStorageSync("myWords:wordslib");
                s && e(s), o.getMyWords("wordslib", e), i.data.updatedMyWords = !0;
            }
            i.setData({
                wordsScrollTop: 0,
                categoryIndex: a
            }), r = i.data.wordsLib[a].id, n = i.data.wordsLib[a].label;
        }
    },
    radioChange: function(t) {
        if (console.log(t), this.data.selectQAList.length >= this.data.maxQANum) this.doFinish(); else {
            var a = t.currentTarget.dataset.idx, e = t.detail.value;
            this.data.wordsLib[this.data.categoryIndex].items[a].answer = e;
            var i = this.data.wordsLib[this.data.categoryIndex].items[a], s = !1;
            this.data.selectQAList.map(function(t, a) {
                if (t.id == i.id) return t = i, void (s = !0);
            }), s || this.data.selectQAList.push(i), o.globalData.qaSet = this.data.selectQAList, 
            this.setData({
                wordsLib: this.data.wordsLib,
                selectQAList: this.data.selectQAList
            }), console.log(this.data.selectQAList.length), console.log(this.data.maxQANum), 
            this.data.selectQAList.length == this.data.maxQANum && this.doFinish();
        }
    },
    cancelSelectQA: function(t) {
        var a = t.currentTarget.dataset.idx, e = this.data.wordsLib[this.data.categoryIndex].items[a];
        this.data.selectQAList = this.data.selectQAList.filter(function(t) {
            return t.id != e.id;
        }), delete this.data.wordsLib[this.data.categoryIndex].items[a].answer, this.data.wordsLib[this.data.categoryIndex].items[a].desc && delete this.data.wordsLib[this.data.categoryIndex].items[a].desc, 
        o.globalData.qaSet = this.data.selectQAList, this.setData({
            selectQAList: this.data.selectQAList,
            wordsLib: this.data.wordsLib
        });
    },
    bindDelete: function(t) {},
    bindTapWords: function(t) {
        var i = t.detail.target.dataset.index;
        o.globalData.qaSet = this.data.wordsLib[this.data.categoryIndex].items[i], console.log(o.globalData.qaSet);
        var s = o.globalData.qaSet.id;
        a.request({
            url: e.service.hostUrl + "/qalib/getSysQA",
            data: {
                id: s,
                ver: e.service.version
            },
            success: function(t) {
                0 == t.data.code && (-1 != o.globalData.qaId.indexOf(t.data.data.id) ? (o.showFail("您已经选择了\n该问题"), 
                o.globalData.qaSet = !1) : (o.globalData.qaSet = t.data.data, wx.navigateBack({
                    delta: 1
                })));
            },
            fail: function(t) {
                console.log("get words lib: fail");
            }
        });
    },
    bindContact: function(t) {
        o.contactHandler(t, i);
    },
    bindToAddWord: function() {
        wx.navigateTo({
            url: "/pages/addword/addword"
        });
    },
    bindSelectAnswer: function(t) {
        if (this.data.selectQAList.length != this.data.maxQANum) {
            this.data.wordsLib[this.data.categoryIndex].items[this.data.cur] = t.detail;
            var a = !1;
            this.data.selectQAList.map(function(e, i) {
                if (e.id == t.detail.id) return e = t.detail, void (a = !0);
            }), a || this.data.selectQAList.push(t.detail), o.globalData.qaSet = this.data.selectQAList, 
            this.setData({
                wordsLib: this.data.wordsLib,
                selectQAList: this.data.selectQAList
            }), this.data.selectQAList.length == this.data.maxQANum && this.doFinish();
        } else wx.showToast({
            title: "题目已选满！",
            icon: "none",
            duration: 1500
        });
    },
    doFinish: function() {
        var t = this;
        wx.showModal({
            title: "出题完成",
            content: "出题已完成。点击确定后进入红包设置页面，题目不能再更改。",
            confirmText: "确定",
            showCancel: !0,
            cancelText: "检查一下",
            success: function(a) {
                a.confirm ? (o.globalData.ifLibFinish = !0, wx.navigateBack({
                    delta: 1
                })) : t.checkQA();
            }
        });
    },
    bindToSelectAnswer: function(t) {
        if (this.data.selectQAList.length != this.data.maxQANum) {
            var a = t.currentTarget.dataset.idx;
            this.data.cur = a;
            var e = this.data.wordsLib[this.data.categoryIndex].items[a];
            this.data.qaItem = e, this.setData({
                qaItem: this.data.qaItem
            });
        } else wx.showToast({
            title: "题目已选满！",
            icon: "none",
            duration: 1500
        });
    },
    bindend: function(t) {
        var a = this;
        this.data.selectQAList.length < o.globalData.minQANum ? wx.showToast({
            title: "题目不得少于" + o.globalData.minQANum + "题",
            icon: "none",
            duration: 1500
        }) : wx.showModal({
            title: "提示",
            content: "确定停止出题吗？确定后无法再次编辑当前题目。直接进去红包设置页面。",
            confirmText: "确定",
            showCancel: !0,
            cancelText: "检查一下",
            success: function(t) {
                t.confirm ? (o.globalData.ifLibFinish = !0, o.globalData.directBack = !1, wx.navigateBack({
                    delta: 1
                })) : a.checkQA();
            }
        });
    },
    checkQA: function(t) {
        0 != this.data.selectQAList.length ? (this.setData({
            showCheckView: !0
        }), o.configNavTitle("已出题目")) : wx.showToast({
            title: "还没出题哦",
            icon: "none",
            duration: 1500
        });
    },
    bindCheckerFinish: function(t) {
        console.log("e", t);
        var a = t.detail.showList, e = t.detail.deleteList;
        for (var i in e) {
            var s = e[i];
            delete this.data.wordsLib[s.index[0]].items[s.index[1]].answer, this.data.wordsLib[s.index[0]].items[s.index[1]].desc && delete this.data.wordsLib[s.index[0]].items[s.index[1]].desc;
        }
        for (var d in a) {
            var r = a[d];
            r.index && (this.data.wordsLib[r.index[0]].items[r.index[1]].answer = r.answer);
        }
        this.data.selectQAList = a, o.globalData.qaSet = this.data.selectQAList, this.setData({
            showCheckView: !1,
            wordsLib: this.data.wordsLib,
            selectQAList: this.data.selectQAList
        }), this.data.selectQAList.length == this.data.maxQANum && wx.navigateBack({
            delta: 1
        });
    }
});
for (var t, a, i, s = require("../../utils/util.js"), e = require("../../vendor/qcloud-weapp-client-sdk/index"), n = require("../../config"), d = new Date(), r = [], o = [], h = "", c = "", l = 0, u = [], g = getApp(), L = n.service.host + "/" + n.name + "/api/qalib/getQAList", q = n.service.host + "/" + n.name + "/api/qalib/createQASet", p = 1950; p <= d.getFullYear(); p++) r.push(p);

for (var x = 1; x <= 12; x++) o.push(x);

Page({
    data: {
        region: [ "广东省", "广州市", "海珠区" ],
        used: [],
        networking: !1,
        qaNum: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
        qaSerial: [ "A", "B", "C", "D", "E", "F" ],
        qaList: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ],
        currentQA: {},
        tmpQAList: [],
        recycleList: [],
        years: r,
        year: 2e3,
        months: o,
        month: 1,
        provinces: s.province,
        province: "北京",
        citys: [],
        city: "北京市",
        location: [ 0, 0 ],
        date: [ 50, 0 ],
        selfQA: !1,
        backgroundUrl: "",
        selectedNum: "",
        selfQuesDesc: "",
        selfQuesList: [ "", "" ],
        ifIphoneX: !1,
        inputValue: "",
        focus: !0,
        currentX: 0,
        lastX: 0,
        currentIndex: 0,
        times: 1,
        MAX_QA_NUM: 10,
        MIN_QA_NUM: 4,
        rangeOption: [],
        rangeCur: [],
        showCheckView: !1,
        imgHost: "",
        qaItem: null
    },
    onLoad: function(i) {
        console.log("options", i), this.dealRangeOption({}), u = [], s = this, g.globalData.selectQAList = [], 
        this.setData({
            MIN_QA_NUM: g.globalData.minQANum
        }), wx.showLoading({
            title: "题目加载中"
        }), g.configNavTitle();
        var s = this;
        if (i.qaNum) {
            var n = parseInt(i.qaNum);
            this.data.qaNum = [], this.data.qaList = [];
            for (var d = 1; d <= n; d++) this.data.qaNum.push(d), this.data.qaList.push({});
            this.data.MAX_QA_NUM = n, g.globalData.maxQANum = n, this.setData({
                qaNum: this.data.qaNum,
                qaList: this.data.qaList,
                MAX_QA_NUM: this.data.MAX_QA_NUM
            });
        }
        try {
            wx.getSystemInfoSync().model.indexOf("iPhone X") > -1 ? this.setData({
                ifIphoneX: !0
            }) : console.log("other"), e.request({
                url: L,
                login: !0,
                success: function(i) {
                    if (console.log(i), 0 === i.data.code) {
                        s.data.tmpQAList = i.data.data, l = i.data.total, u.push(i.data.index);
                        for (var e in s.data.tmpQAList) s.data.tmpQAList[e].options = JSON.parse(s.data.tmpQAList[e].options).data, 
                        "" == !s.data.tmpQAList[e].picUrl && (s.data.tmpQAList[e].picUrl = s.data.tmpQAList[e].picUrl + i.data.imgStyle), 
                        t = i.data.imgHost, a = i.data.imgStyle, s.data.imgHost = t;
                        I(s.data.tmpQAList), s.data.qaList[0] = s.data.tmpQAList[0], s.data.currentQA = s.data.tmpQAList[0], 
                        s.data.tmpQAList.shift(), "range" == s.data.qaList[s.data.currentIndex].type && (console.log(s.data.qaList[s.data.currentIndex].options), 
                        s.dealRangeOption(s.data.qaList[s.data.currentIndex].options)), s.setData({
                            qaList: s.data.qaList,
                            imgHost: s.data.imgHost
                        }), console.log("lastQAList", s.data.qaList), wx.hideLoading();
                    } else wx.hideLoading(), g.showFail("请求失败\n请稍候重试");
                }
            });
        } catch (t) {
            console.log(t), g.showFail("获取手机信息失败");
        }
    },
    onReady: function() {
        this.setData({
            currentIndex: 0,
            citys: s.changeProvince("北京")
        });
    },
    onShow: function() {
        if (console.log("makeqa onShow"), console.log("app.globalData.qaSet", g.globalData.qaSet), 
        i = this, g.globalData.qaSet) {
            g.globalData.qaId = [];
            for (var t in g.globalData.qaSet) g.globalData.qaId.push(g.globalData.qaSet[t].id);
        }
        if (g.globalData.qaId.length > 0) {
            console.log("onshow", g.globalData.qaId, i.data.tmpQAList);
            var a = [];
            for (var s in i.data.tmpQAList) i.data.tmpQAList[s].id && -1 == g.globalData.qaId.indexOf(i.data.tmpQAList[s].id) && a.push(i.data.tmpQAList[s]);
            console.log(a), i.data.tmpQAList = a;
        }
        if (!g.globalData.directBack && g.globalData.qaSet) {
            var e = {
                detail: {
                    showList: g.globalData.qaSet
                }
            };
            g.globalData.qaSet = null, this.bindCheckerFinish(e);
        }
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: g.globalData.shareTitle,
            path: "/pages/index/index?rid=" + g.globalData.uid + "&t=" + new Date().getTime(),
            success: function(t) {
                g.getShareTitle("pages/index/index");
            }
        };
    },
    choosePic: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: "compressed",
            success: function(a) {
                t.setData({
                    backgroundUrl: a.tempFilePaths
                });
            }
        });
    },
    changeQuestion: function() {
        this.data.networking || (this.data.recycleList.push(this.data.qaList[this.data.currentIndex]), 
        this.data.qaList[this.data.currentIndex] = this.data.tmpQAList[0], this.data.currentQA = this.data.qaList[this.data.currentIndex], 
        "range" == this.data.qaList[this.data.currentIndex].type && this.dealRangeOption(this.data.qaList[this.data.currentIndex].options), 
        this.data.tmpQAList.shift(), this.data.tmpQAList.length <= 1 && this.getNextQAList(), 
        this.setData({
            qaList: this.data.qaList
        }));
    },
    bindTickTab: function(t) {
        var a = t.currentTarget.dataset.num;
        this.setData({
            selectedNum: a
        });
    },
    bindAddOptions: function() {
        this.data.selfQuesList.push(""), this.setData({
            selfQuesList: this.data.selfQuesList
        });
    },
    bindDeleteOption: function() {
        var t = [];
        console.log(this.data.selfQuesList.length);
        for (var a = 0; a < this.data.selfQuesList.length - 1; a++) t.push(this.data.selfQuesList[a]);
        this.setData({
            selfQuesList: t
        });
    },
    bindBackTap: function() {
        this.setData({
            selfQA: !1,
            selfQuesList: [ "", "" ],
            selectedNum: "",
            selfQuesDesc: "",
            backgroundUrl: ""
        });
    },
    bindSelfQATap: function() {
        this.setData({
            selfQA: !0
        });
    },
    bindCreditTap: function() {
        this.setData({
            selfQA: !0,
            selfQuesDesc: this.data.qaList[this.data.currentIndex].question,
            selfQuesList: this.data.qaList[this.data.currentIndex].options,
            backgroundUrl: this.data.qaList[this.data.currentIndex].url
        });
    },
    radioChange: function(t) {
        var a = this, i = t.detail.value;
        return this.data.qaList[this.data.currentIndex].answer = i, console.log("this.data.qaList", this.data.qaList), 
        g.globalData.qaId[this.data.currentIndex] = this.data.qaList[this.data.currentIndex].id, 
        this.data.currentIndex == this.data.MAX_QA_NUM - 1 ? (this.setData({
            qaList: this.data.qaList
        }), void this.bindFinish()) : (this.data.currentIndex++, this.data.qaList[this.data.currentIndex].id ? (this.setData({
            qaList: this.data.qaList
        }), console.log("here"), void setTimeout(function() {
            a.setData({
                currentIndex: Math.min(a.data.currentIndex, a.data.MAX_QA_NUM - 1)
            });
        }, 100)) : (this.data.qaList[this.data.currentIndex] = this.data.tmpQAList[0], this.data.currentQA = this.data.tmpQAList[0], 
        this.data.tmpQAList.shift(), "range" == this.data.qaList[this.data.currentIndex].type && (console.log(this.data.qaList[this.data.currentIndex].options), 
        this.dealRangeOption(this.data.qaList[this.data.currentIndex].options)), this.data.tmpQAList.length <= 1 && this.getNextQAList(), 
        this.setData({
            qaList: this.data.qaList
        }), void setTimeout(function() {
            a.setData({
                currentIndex: Math.min(a.data.currentIndex, a.data.MAX_QA_NUM - 1)
            });
        }, 500)));
    },
    bindChooseItem: function(t) {
        var a = this, i = t.currentTarget.dataset.option;
        return this.data.qaList[this.data.currentIndex].answer = i, g.globalData.qaId[this.data.currentIndex] = this.data.qaList[this.data.currentIndex].id, 
        this.data.currentIndex == this.data.MAX_QA_NUM - 1 ? (this.setData({
            qaList: this.data.qaList
        }), void this.bindFinish()) : (this.data.currentIndex++, this.data.qaList[this.data.currentIndex].id ? (this.setData({
            qaList: this.data.qaList
        }), console.log("here"), void setTimeout(function() {
            a.setData({
                currentIndex: Math.min(a.data.currentIndex, a.data.MAX_QA_NUM - 1)
            });
        }, 100)) : (this.data.qaList[this.data.currentIndex] = this.data.tmpQAList[0], this.data.currentQA = this.data.tmpQAList[0], 
        this.data.tmpQAList.shift(), "range" == this.data.qaList[this.data.currentIndex].type && (console.log(this.data.qaList[this.data.currentIndex].options), 
        this.dealRangeOption(this.data.qaList[this.data.currentIndex].options)), this.data.tmpQAList.length <= 1 && this.getNextQAList(), 
        this.setData({
            qaList: this.data.qaList
        }), void setTimeout(function() {
            a.setData({
                currentIndex: Math.min(a.data.currentIndex, a.data.MAX_QA_NUM - 1)
            });
        }, 100)));
    },
    bindChangeQuestion: function(t) {
        var a = t.currentTarget.dataset.index;
        console.log(a), 0 === a || this.data.qaList[a - 1].answer ? this.data.currentIndex != this.data.MAX_QA_NUM - 1 && this.data.qaList[this.data.currentIndex + 1].answer ? (console.log("here"), 
        this.data.qaList[this.data.currentIndex].answer ? (this.data.currentIndex = a, "range" == this.data.qaList[a].type && (console.log(this.data.qaList[a].options), 
        this.dealRangeOption(this.data.qaList[a].options)), this.setData({
            currentIndex: a
        })) : wx.showToast({
            title: "请选择或输入正确答案",
            icon: "none",
            duration: 2e3
        })) : (this.data.currentIndex = a, "range" == this.data.qaList[a].type && (console.log(this.data.qaList[a].options), 
        this.dealRangeOption(this.data.qaList[a].options)), this.setData({
            currentIndex: a
        }), this.setData({
            currentIndex: a
        })) : "normal" == this.data.qaList[this.data.currentIndex].type && this.data.qaList[this.data.currentIndex].options.length <= 4 ? wx.showToast({
            title: "请选择或输入正确答案",
            icon: "none",
            duration: 2e3
        }) : this.bindNextTap();
    },
    bindRegionChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            region: t.detail.value
        });
    },
    bindChangeProvince: function(t) {
        var a = t.detail.value;
        c != a[0] && this.setData({
            citys: s.changeProvince(this.data.provinces[a[0]])
        }), c = a[0], this.data.qaList[this.data.currentIndex].answer = [ a[0], a[1] ], 
        this.data.qaList[this.data.currentIndex].desc = this.data.provinces[a[0]] + "," + this.data.citys[a[1]].citysName, 
        this.setData({
            qaList: this.data.qaList
        });
    },
    bindChangeDate: function(t) {
        var a = t.detail.value;
        this.data.qaList[this.data.currentIndex].answer = [ a[0], a[1] ], this.setData({
            qaList: this.data.qaList
        }), console.log([ a[0], a[1] ]);
    },
    bindChangeRange: function(t) {
        var a = t.detail.value;
        this.data.qaList[this.data.currentIndex].answer = [], console.log(this.data.rangeOption);
        var i = "";
        for (var s in this.data.rangeOption) this.data.qaList[this.data.currentIndex].answer.push(this.data.rangeOption[s].option[a[s]]), 
        i += "" + this.data.rangeOption[s].option[a[s]] + this.data.rangeOption[s].unit;
        console.log("desc", i), this.data.qaList[this.data.currentIndex].desc = i, this.data.qaList[this.data.currentIndex].value = a;
    },
    bindToLibrary: function() {
        g.globalData.selectQAList = [], g.globalData.selectQAIds = [];
        for (var t in this.data.qaList) this.data.qaList[t].answer && (g.globalData.selectQAList.push(this.data.qaList[t]), 
        g.globalData.selectQAIds.push(this.data.qaList[t].id));
        wx.navigateTo({
            url: "/pages/wordLibrary/wordLibrary"
        });
    },
    bindInput: function(t) {
        h = t.detail.value;
    },
    checkDefaultAns: function() {
        if ("range" == this.data.qaList[this.data.currentIndex].type && !this.data.qaList[this.data.currentIndex].answer) {
            this.data.qaList[this.data.currentIndex].val = this.data.rangeCur, this.data.qaList[this.data.currentIndex].answer = [];
            var t = "";
            for (var a in this.data.rangeCur) this.data.qaList[this.data.currentIndex].answer.push(this.data.rangeOption[a].option[this.data.rangeCur[a]]), 
            t += "" + this.data.rangeOption[a].option[this.data.rangeCur[a]] + this.data.rangeOption[a].unit;
            this.data.qaList[this.data.currentIndex].desc = t;
        }
        "location" != this.data.qaList[this.data.currentIndex].type || this.data.qaList[this.data.currentIndex].answer || (this.data.qaList[this.data.currentIndex].answer = [ 0, 0 ]), 
        "date" != this.data.qaList[this.data.currentIndex].type || this.data.qaList[this.data.currentIndex].answer || (this.data.qaList[this.data.currentIndex].answer = [ 50, 0 ]), 
        "normal" == this.data.qaList[this.data.currentIndex].type && this.data.qaList[this.data.currentIndex].options.length > 4 && !this.data.qaList[this.data.currentIndex].answer && (this.data.qaList[this.data.currentIndex].answer = [ 0 ]);
    },
    modifyQaList: function() {
        for (var t = 0; t <= this.data.currentIndex; ++t) "normal" === this.data.qaList[t].type && this.data.qaList[t].options.length > 4 && (this.data.qaList[t].answer = this.data.qaList[t].answer[0]);
    },
    bindNextTap: function() {
        var t = this;
        if (this.checkDefaultAns(), this.data.qaList[this.data.currentIndex].answer) {
            if (g.globalData.qaId[this.data.currentIndex] = this.data.qaList[this.data.currentIndex].id, 
            this.data.currentIndex++, this.data.qaList[this.data.currentIndex].id) return this.setData({
                qaList: this.data.qaList
            }), void setTimeout(function() {
                t.setData({
                    currentIndex: Math.min(t.data.currentIndex, t.data.MAX_QA_NUM - 1)
                });
            }, 100);
            this.data.qaList[this.data.currentIndex] = this.data.tmpQAList[0], this.data.currentQA = this.data.tmpQAList[0], 
            this.data.tmpQAList.shift(), "range" == this.data.qaList[this.data.currentIndex].type && (console.log(this.data.qaList[this.data.currentIndex].options), 
            this.dealRangeOption(this.data.qaList[this.data.currentIndex].options)), this.data.tmpQAList.length <= 1 && this.getNextQAList(), 
            this.setData({
                qaList: this.data.qaList,
                currentIndex: Math.min(this.data.currentIndex, this.data.MAX_QA_NUM - 1)
            });
        } else wx.showToast({
            title: "请选择或输入正确答案",
            icon: "none",
            duration: 2e3
        });
    },
    getNextQAList: function() {
        var t = this;
        if (u.length >= l) {
            for (var a in t.data.recycleList) t.data.tmpQAList.push(t.data.recycleList[a]);
            t.data.recycleList = [];
        } else {
            var i = {
                index: f()
            };
            e.request({
                url: L,
                login: !0,
                data: i,
                success: function(a) {
                    if (console.log(a), 0 === a.data.code) {
                        l = a.data.total, u.push(a.data.index);
                        for (var i in a.data.data) a.data.data[i].options = JSON.parse(a.data.data[i].options).data, 
                        "" == !a.data.data[i].picUrl && (a.data.data[i].picUrl = a.data.data[i].picUrl + a.data.imgStyle), 
                        -1 == g.globalData.qaId.indexOf(a.data.data[i].id) && t.data.tmpQAList.push(a.data.data[i]);
                        I(t.data.tmpQAList);
                    } else g.showFail("请求失败\n请稍候重试");
                }
            });
        }
    },
    bindPreTap: function() {
        this.data.currentIndex > 0 ? (this.data.currentIndex--, this.setData({
            currentIndex: this.data.currentIndex
        })) : wx.showToast({
            title: "已是第一题",
            icon: "none",
            duration: 2e3
        });
    },
    packQAList: function(t) {
        var a = this;
        return this.data.qaList.filter(function(t) {
            return t.answer;
        }).map(function(t) {
            console.log(t);
            var i = "";
            return "date" === t.type ? i = t.answer[0] - 50 + 2e3 + "-" + (t.answer[1] + 1 < 10 ? "0" : "") + (t.answer[1] + 1) + "-01" : "normal" === t.type ? t.options.length <= 4 ? i = (t.answer - 1).toString() : void 0 === t.answer[0] ? (i = "0", 
            console.log("======== undefined")) : i = t.answer[0].toString() : "range" === t.type ? i = JSON.stringify(t.answer) : (i = s.changeProvince(a.data.provinces[t.answer[0]])[t.answer[1]].citysName, 
            console.log(i)), {
                id: t.id,
                answer: i
            };
        });
    },
    bindFinish: function(t) {
        var a = this;
        if (!this.data.networking) {
            this.data.networking = !0, console.log("finishData", this.data.qaList), this.data.qaList.length, 
            this.data.MAX_QA_NUM, console.log("data", this.data.qaList, this.data.currentIndex);
            var i = 0;
            for (var s in this.data.qaList) this.data.qaList[s].answer && i++;
            if (i < this.data.MIN_QA_NUM) return wx.showModal({
                title: "提示",
                content: "题目不得少于五题",
                showCancel: !1
            }), void (this.data.networking = !1);
            wx.showModal({
                title: "出题完成",
                content: "出题已完成。点击确定后进入红包设置页面，题目不能再更改",
                confirmText: "确定",
                showCancel: !0,
                cancelText: "检查一下",
                success: function(t) {
                    t.confirm ? a.doFinish(i) : (a.data.networking = !1, a.toQAChecker());
                }
            });
        }
    },
    toQAChecker: function() {
        g.globalData.qaSet = this.data.qaList.filter(function(t) {
            return t.answer;
        }), 0 != g.globalData.qaSet.length ? (g.globalData.imgHost = this.data.imgHost, 
        wx.navigateTo({
            url: "/pages/qaChecker/qaChecker"
        })) : wx.showToast({
            title: "你还没有出题哦",
            icon: "none",
            duration: 1500
        });
    },
    finishWithoutModal: function() {
        if (!this.data.networking) {
            this.data.networking = !0, console.log("finishData", this.data.qaList);
            var t = 0;
            for (var a in this.data.qaList) this.data.qaList[a].answer && t++;
            if (t + 1 < this.data.MIN_QA_NUM) return wx.showModal({
                title: "提示",
                content: "题目不得少于五题"
            }), void (this.data.networking = !1);
            this.doFinish(t);
        }
    },
    bindCheckerFinish: function(t) {
        console.log("checker", t);
        var a = t.detail.showList, i = !1;
        a.length == this.data.MAX_QA_NUM && (i = !0), console.log(a.length, this.data.MAX_QA_NUM, i, g.globalData.ifLibFinish);
        for (var s = 0; s < this.data.MAX_QA_NUM; s++) this.data.qaList[s] = a[s] || {};
        if (this.data.currentIndex = a.length - 1, this.setData({
            showCheckView: !1,
            qaList: this.data.qaList
        }), g.globalData.ifLibFinish) return g.globalData.ifLibFinish = !1, this.setData({
            currentIndex: Math.min(this.data.currentIndex, this.data.MAX_QA_NUM - 1)
        }), void this.finishWithoutModal();
        if (i) {
            var e = 0;
            for (var n in this.data.qaList) this.data.qaList[n].answer && e++;
            t.toFinish ? (this.setData({
                qaList: this.data.qaList,
                currentIndex: Math.min(this.data.currentIndex, this.data.MAX_QA_NUM - 1)
            }), this.bindFinish()) : (this.data.networking = !0, this.doFinish(e));
        } else this.data.currentIndex++, this.data.qaList[this.data.currentIndex] = this.data.tmpQAList[0], 
        this.data.currentQA = this.data.tmpQAList[0], this.data.tmpQAList.shift(), "range" == this.data.qaList[this.data.currentIndex].type && (console.log(this.data.qaList[this.data.currentIndex].options), 
        this.dealRangeOption(this.data.qaList[this.data.currentIndex].options)), this.data.tmpQAList.length <= 1 && this.getNextQAList(), 
        this.setData({
            qaList: this.data.qaList,
            currentIndex: Math.min(this.data.currentIndex, this.data.MAX_QA_NUM - 1)
        });
    },
    doFinish: function(t) {
        var a = this.packQAList(t);
        wx.showLoading({
            title: "请稍等"
        }), console.log(a), e.request({
            url: q,
            data: a,
            method: "POST",
            login: !0,
            success: function(t) {
                if (0 === t.data.code) {
                    var a = "";
                    console.log(t.data), a = t.data.qaNo;
                    var s = t.data.total;
                    console.log(a), wx.redirectTo({
                        url: "/pages/pay/pay?qaNo=" + a + "&qaCount=" + s
                    });
                } else if (-1 === t.data.code) {
                    var e = t.data.errorQAPos;
                    i.data.currentIndex = e, i.data.qaList[e].answer = "", i.data.qaList[e].val && (i.data.qaList[e].val = ""), 
                    "range" == i.data.qaList[e].type && (console.log(i.data.qaList[e].options), i.dealRangeOption(i.data.qaList[e].options)), 
                    i.setData({
                        currentIndex: e,
                        qaList: i.data.qaList
                    }), wx.showToast({
                        title: "第" + (t.data.errorQAPos + 1) + "题选择有误，请重新出题",
                        icon: "none",
                        duration: 1500
                    });
                }
                i.data.networking = !1, wx.hideLoading();
            },
            fail: function() {
                i.data.networking = !1, wx.hideLoading();
            },
            complete: function() {
                g.globalData.qaId = [ , , , , , , , , , ,  ];
            }
        });
    },
    bindChoose: function(t) {
        console.log("bindchoose"), this.data.qaList[this.data.currentIndex].answer = t.detail.value, 
        this.setData({
            qaList: this.data.qaList
        });
    },
    handleTouchStart: function(t) {
        this.data.lastX = t.touches[0].pageX;
    },
    handleTouchEnd: function(t) {
        this.data.currentX = t.changedTouches[0].pageX, this.data.currentX - this.data.lastX < -150 && (console.log(this.data.currentX - this.data.lastX), 
        console.log("right")), this.data.currentX - this.data.lastX > 150 && (console.log(this.data.currentX - this.data.lastX), 
        console.log("left"));
    },
    dealRangeOption: function(t) {
        this.data.rangeOption = [], this.data.rangeCur = [], console.log("cOption", t);
        var a = t;
        for (var i in a) {
            for (var s = [], e = 0, n = parseInt(a[i].start); n <= parseInt(a[i].end); n++) s.push(n);
            e = a[i].cur - a[i].start;
            var d = {
                option: s,
                unit: a[i].unit,
                cur: e
            };
            this.data.rangeCur.push(e), this.data.rangeOption.push(d);
        }
        this.data.qaList[this.data.currentIndex].value && (this.data.rangeCur = this.data.qaList[this.data.currentIndex].value), 
        console.log("rangOption", this.data.rangeOption), this.setData({
            rangeOption: this.data.rangeOption,
            rangeCur: this.data.rangeCur
        });
    },
    toShowChecker: function() {
        this.data.qaItem = this.data.qaList[this.data.currentIndex], console.log("qaItem", this.data.qaItem), 
        this.setData({
            qaItem: this.data.qaItem
        });
    },
    bindPickConfirm: function(t) {
        console.log("e", t), this.data.qaList[this.data.currentIndex] = t.detail, this.setData({
            qaList: this.data.qaList
        }), this.data.currentIndex == this.data.MAX_QA_NUM - 1 ? this.bindFinish() : this.bindNextTap();
    }
});

var f = function() {
    var t = ~~(3 * Math.random());
    for (3 === t && (t = 2); -1 != u.indexOf(t); ) 3 === (t = ~~(3 * Math.random())) && (t = 2);
    return t;
}, I = function(t) {
    for (var a = t, i = a.length, s = 0; s < i; s++) {
        var e = Math.round((i - 1) * Math.random()), n = a[s];
        a[s] = a[e], a[e] = n;
    }
    return a;
};
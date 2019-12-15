function a(a) {
    if (Array.isArray(a)) {
        for (var t = 0, e = Array(a.length); t < a.length; t++) e[t] = a[t];
        return e;
    }
    return Array.from(a);
}

var t = Object.assign || function(a) {
    for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t];
        for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (a[s] = e[s]);
    }
    return a;
}, e = require("../../utils/md5"), s = require("../../vendor/qcloud-weapp-client-sdk/index"), o = require("../../vendor/qcloud-weapp-client-sdk/lib/session"), i = require("../../config"), r = require("../../utils/util.js"), c = getApp(), n = null, d = [], u = !0, h = !1, l = void 0;

try {
    for (var p, g = r.area.provinces[Symbol.iterator](); !(u = (p = g.next()).done); u = !0) {
        var m = p.value;
        d.push.apply(d, a(m.citys.map(function(a) {
            return a.citysName;
        })));
    }
} catch (a) {
    h = !0, l = a;
} finally {
    try {
        !u && g.return && g.return();
    } finally {
        if (h) throw l;
    }
}

var f = i.service.host + "/" + i.name + "/api/redpack/getQuestionData";

i.service.host, i.name;

Page({
    data: {
        startAnswerQue: !1,
        nickName: "",
        showTips: !0,
        scrollTop: 0,
        correctNum: 0,
        avatarUrl: "",
        myAvatarUrl: "",
        quesNum: 0,
        curId: 0,
        qaNo: 0,
        redpackNo: "",
        redpackStatus: 2,
        participantCount: 0,
        participantList: [],
        chatList: [],
        letter: [ "A", "B", "C", "D", "E", "F" ],
        showChatList: [],
        answerList: [],
        isBottom: !1,
        loading: !0,
        redPacketScale: 0,
        windowHeight: wx.getSystemInfoSync().windowHeight,
        basicData: {
            hideAmount: !0,
            totalAmount: "1.00",
            nickName: ""
        },
        showBasicRecommand: !1,
        showBasic: !0,
        needAuth: !0,
        recommandList: [],
        goResult: !0
    },
    closeTips: function() {
        2 !== this.data.redpackStatus && wx.reLaunch({
            url: "/pages/index/index"
        }), this.data.loading || this.setData({
            showTips: !1,
            startAnswerQue: !0
        });
    },
    onShareAppMessage: function() {
        return {
            title: getApp().globalData.shareTitle,
            path: "/pages/chat/chat?redpackNo=" + n.data.redpackNo + "&rid=" + getApp().globalData.uid + "&t=" + new Date().getTime(),
            imageUrl: n.data.shareCardImg,
            success: function(a) {
                s.request({
                    login: !0,
                    url: i.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/chat/chat",
                        redpackNo: n.data.redpackNo,
                        shareTitle: getApp().globalData.shareTitle,
                        ver: i.service.version,
                        way: "0"
                    }
                }), getApp().getShareTitle("pages/chat/chat");
            }
        };
    },
    onReady: function(a) {},
    onLoad: function(a) {
        var t = this;
        n = this;
        var e = wx.getStorageSync("avatarUrl") || "";
        this.setData({
            myAvatarUrl: e
        }), c.configNavTitle(), a.redpackNo && (console.log("redpackNo:", a.redpackNo), 
        this.data.redpackNo = a.redpackNo, this.setData({
            redpackNo: this.data.redpackNo
        })), console.log("data.scene", a.scene), a.scene && "" == n.data.redpackNo && (a.scene.length <= 8 || ("B_" === a.scene.substring(0, 2) ? n.data.redpackNo = a.scene.substring(2) : a.scene.length > 20 && (n.data.redpackNo = a.scene))), 
        wx.canIUse("getSetting") && this.getSetting("scope.userInfo").then(function(a) {
            console.log("getSetting", a);
            var t = wx.getStorageSync("avatarUrl");
            N(), n.setData({
                needAuth: !1,
                myAvatarUrl: t
            });
        }).catch(function(a) {
            o.clear(), t.setData({
                showBasic: !0,
                needAuth: !0
            }), setTimeout(function() {
                getApp().getShareTitle("pages/red/red");
            }, 100), n.data.redpackNo && k();
        }), n.data.shareCardImg = a.shareCardImg, a.qaNo && (this.data.qaNo = a.qaNo), setTimeout(function() {
            n.getBottomHeight();
        }, 100), a.showQA && 1 == a.showQA && this.setData({
            showTips: !1,
            startAnswerQue: !0
        });
    },
    getSetting: function(a) {
        return new Promise(function(t, e) {
            wx.getSetting({
                success: function(s) {
                    console.log(s), s.errMsg.match(/ok/g) ? a ? s.authSetting[a] ? t() : e() : t(s.authSetting) : e();
                },
                fail: function(a) {
                    console.log(a), e(a);
                }
            });
        });
    },
    getQdata: function() {
        s.request({
            url: f,
            data: {
                redpackNo: this.data.redpackNo,
                qaNo: this.data.qaNo
            },
            login: !0,
            success: function(a) {
                if (0 === a.data.code) {
                    a.data.data;
                    n.data.chatList = a.data.qaList;
                    for (var t in n.data.chatList) n.data.chatList[t].options = JSON.parse(n.data.chatList[t].options), 
                    n.data.chatList[t].picUrl && (n.data.chatList[t].picUrl = a.data.imgHost + n.data.chatList[t].picUrl + a.data.imgStyle);
                    n.data.nickName = a.data.data.nickName, n.data.correctNum = a.data.data.qaNum - a.data.data.limitWrongTimes, 
                    n.data.participantCount = a.data.data.totalPartake, n.data.participantList = a.data.lastGrabRecords, 
                    n.data.avatarUrl = a.data.data.avatarUrl, n.data.qaNo = a.data.data.qaNo, console.log(n.data.participantList), 
                    n.setData({
                        chatList: n.data.chatList,
                        loading: !1,
                        nickName: n.data.nickName,
                        correctNum: n.data.correctNum,
                        participantCount: n.data.participantCount,
                        participantList: n.data.participantList,
                        avatarUrl: n.data.avatarUrl
                    }), n.showQues(), setTimeout(function() {
                        n.setData({
                            redPacketScale: 1
                        });
                    }, 100);
                } else c.showModal("提示", "该红包已过期\n请稍候重试");
                wx.hideLoading();
            },
            fail: function() {
                wx.hideLoading(), c.showFail("请求失败\n请稍候重试");
            }
        });
    },
    scrollToBottom: function() {
        wx.pageScrollTo({
            scrollTop: 1e5,
            duration: 100
        });
    },
    finishAns: function() {
        var a = this;
        console.log(this.data.answerList);
        var t = this.data.answerList.map(function(a) {
            return a.ansno;
        }), o = "BleeGe.RedPack.";
        o += a.data.redpackNo, o += c.globalData.uid, o = e.hexMD5(o), console.log("userId", c.globalData.userId);
        var r = {
            redpackNo: a.data.redpackNo,
            qaNo: a.data.qaNo,
            ticket: o,
            answer: JSON.stringify(t)
        };
        c.globalData.redpackNo = a.data.redpackNo, s.request({
            login: !0,
            url: i.service.hostUrl + "/redpack/grab",
            data: r,
            success: function(t) {
                wx.hideLoading();
                var e = t.data, s = "";
                switch (e.code) {
                  case 0:
                    -1 == e.self.amount && (s = "很遗憾，你还不够了解Ta");
                    break;

                  case 500:
                  case 501:
                    s = "出错啦，请稍候重试";
                    break;

                  case 601:
                    a.setData({
                        isDel: !0
                    }), s = "该问题集已被删除";
                    break;

                  case 602:
                    s = "手慢了，该问题集已过期";
                    break;

                  case 603:
                    s = a.data.isBeta ? "任务已经结束了" : "手慢了，赏金领完了";
                    break;

                  default:
                    s = e.msg && "" != e.msg ? e.msg : "出错啦，请稍候重试";
                }
                c.globalData.grabErrorTip = s, wx.redirectTo({
                    url: "/pages/result/result",
                    success: function(a) {}
                });
            }
        });
    },
    selectAnswer: function(a) {
        var t = this;
        if (console.log(a), a.currentTarget.dataset.ques == this.data.curId && this.data.curId < this.data.quesNum) {
            var e = {
                answer: a.currentTarget.dataset.answer,
                ansno: a.currentTarget.dataset.ansno
            };
            this.data.answerList.push(e), this.data.showChatList[this.data.curId].isAnser = !0, 
            ++this.data.curId < this.data.quesNum ? this.showQues() : (this.data.showChatList[this.data.curId - 1].nextQues = "回答结束", 
            this.finishAns(), console.log("回答结束")), this.setData({
                answerList: this.data.answerList,
                showChatList: this.data.showChatList,
                curId: this.data.curId
            }), setTimeout(function() {
                t.scrollToBottom();
            }, 100);
        }
    },
    showQues: function() {
        console.log(this.data.chatList), this.data.chatList.length && (this.data.chatList[this.data.curId].isAnser = !1, 
        this.data.chatList[this.data.curId].nextQues = "下一题", this.data.showChatList.push(this.data.chatList[this.data.curId]), 
        this.setData({
            showChatList: this.data.showChatList,
            quesNum: this.data.chatList.length
        }), this.setData({
            showChatList: this.data.showChatList,
            curId: this.data.curId,
            isBottom: !1
        }));
    },
    measureBox: function(a) {
        return new Promise(function(t, e) {
            var s = wx.createSelectorQuery();
            s.select(a).fields({
                dataset: !0,
                size: !0,
                scrollOffset: !0,
                properties: [ "scrollX", "scrollY" ],
                computedStyle: [ "margin", "backgroundColor" ],
                context: !0
            }, function(a) {
                t(a);
            }), s.exec();
        });
    },
    getBottomHeight: function() {
        var a = this;
        this.measureBox("#basic-bottom").then(function(t) {
            console.log("res", t), t ? a.measureBox("#basic-btn").then(function(e) {
                console.log("res1", e), e ? (t.height - e.height) / i.pixelRate > 313 && a.setData({
                    showBasicRecommand: !0
                }) : a.getBottomHeight();
            }) : a.getBottomHeight();
        });
    },
    bindgetuserinfo: function(a) {
        console.log("u", a), "getUserInfo:ok" == a.detail.errMsg ? (this.setData({
            needAuth: !1
        }), w("正在加载"), this.getQdata(), N(), n.setData({
            showBasic: !1,
            nickName: a.detail.userInfo.nickName,
            myAvatarUrl: a.detail.userInfo.avatarUrl
        })) : (console.log("here", a), wx.showToast({
            title: "请先允许授权",
            icon: "none"
        }));
    },
    bindGoAn: function() {
        this.getQdata(), N(), n.setData({
            showBasic: !1
        });
    },
    getUserIV: function() {
        wx.getUserInfo({
            withCredentials: !0,
            success: function(a) {
                n.data.iv = a.iv, n.data.encryptedData = a.encryptedData;
            },
            fail: function() {},
            complete: function() {}
        });
    }
});

var w = function(a) {
    return wx.showToast({
        title: a,
        icon: "loading",
        duration: 1e4
    });
}, k = function() {
    s.request({
        url: i.service.hostUrl + "/redpack/getInvalidSessionInfo",
        data: {
            redpackNo: n.data.redpackNo,
            ver: i.service.version
        },
        success: function(a) {
            if (console.log("getInitData", a), 200 == a.statusCode) {
                for (var e in a.data.successRecords) a.data.successRecords[e].amount = parseFloat(a.data.successRecords[e].amount).toFixed(2);
                a.data.data && a.data.data.totalAmount && (a.data.data.totalAmount = parseFloat(a.data.data.totalAmount).toFixed(2)), 
                console.log("getInitData", a), n.setData(t({}, n.data.basicData, {
                    showAmount: a.data.showAmount || 0,
                    basicData: a.data.data || "",
                    recommandList: a.data.successRecords || ""
                })), console.log("basicData", n.data.basicData), console.log("recommandList", n.data.recommandList), 
                0 == a.data.data.canShare ? (wx.hideShareMenu(), wx.updateShareMenu({
                    withShareTicket: !0
                })) : wx.showShareMenu({
                    withShareTicket: !0
                });
            } else switch (a.data.code) {
              case 500:
                c.showFail("服务器繁忙\n请稍候重试");
                break;

              case 501:
                c.showFail("请求失败\n请稍候重试");
                break;

              case 601:
                n.setData({
                    isDel: !0
                });
                break;

              default:
                wx.hideToast(), n.setData({
                    redpackStatus: -1
                }), a.data.msg && "" != a.data.msg && getApp().showModal("提示", a.data.msg);
            }
        },
        fail: function(a) {
            console.log("getInitData", a), wx.hideToast(), n.data.isRefresh ? n.data.isRefresh = !1 : "ERR_WX_GET_USER_INFO" === a.type ? (wx.hideToast(), 
            n.data.auth = "scope.userInfo", n.setData({
                needAuth: !0,
                content: "小程序需要获取用户信息权限，点击确认前往设置或退出程序？"
            })) : c.showFail("请求失败\n请稍候重试");
        },
        complete: function() {}
    });
}, N = function() {
    s.request({
        login: !0,
        url: i.service.hostUrl + "/redpack/getData",
        data: {
            redpackNo: n.data.redpackNo,
            ver: i.service.version
        },
        success: function(t) {
            if (wx.hideToast(), 0 == t.data.code) {
                n.data.qaNo = t.data.data.qaNo, t.data.uid && (getApp().globalData.uid = t.data.uid);
                var e = t.data;
                console.log("self", e.self);
                var s = e.self;
                1 === s.creator || 2 != e.data.redpackStatus || "number" == typeof s.correctNum ? wx.redirectTo({
                    url: "/pages/result/result?redpackNo=" + n.data.redpackNo + "&hasGrab=1"
                }) : n.setData({
                    goResult: !1
                }), 0 == t.data.data.canShare ? (wx.hideShareMenu(), wx.updateShareMenu({
                    withShareTicket: !0
                })) : wx.showShareMenu({
                    withShareTicket: !0
                });
                var o = [];
                if (e.failRecords && "" != e.failRecords && o.push.apply(o, a(e.failRecords)), e.successRecords && "" != e.successRecords && o.push.apply(o, a(e.successRecords)), 
                o.length <= 5) n.data.participantList = o; else for (var i in 4) n.data.participantList.push(o[i]);
                n.data.nickName = e.data.nickName, n.data.avatarUrl = e.data.avatarUrl, n.data.correctNum = e.data.qaCount - e.data.limitWrongTimes, 
                e.data.totalAmount = parseFloat(e.data.totalAmount).toFixed(2);
                var r = e.data.redpackStatus;
                n.setData({
                    participantList: n.data.participantList,
                    participantCount: o.length,
                    redpackStatus: r,
                    nickName: n.data.nickName,
                    avatarUrl: n.data.avatarUrl,
                    correctNum: n.data.correctNum,
                    basicData: e.data,
                    myAvatarUrl: e.self.avatarUrl || ""
                });
            } else switch (t.data.code) {
              case 500:
                c.showFail("服务器繁忙\n请稍候重试");
                break;

              case 501:
                c.showFail("请求失败\n请稍候重试");
                break;

              case 601:
                n.setData({
                    isDel: !0
                });
                break;

              default:
                wx.hideToast(), n.setData({
                    redpackStatus: -1
                }), t.data.msg && "" != t.data.msg && getApp().showModal("提示", t.data.msg);
            }
        },
        fail: function(a) {
            wx.hideToast(), n.data.isRefresh ? n.data.isRefresh = !1 : "ERR_WX_GET_USER_INFO" === a.type ? (wx.hideToast(), 
            n.data.auth = "scope.userInfo", n.setData({
                needAuth: !0,
                content: "小程序需要获取用户信息权限，点击确认前往设置或退出程序？"
            })) : c.showFail("请求失败\n请稍候重试");
        },
        complete: function() {}
    });
};
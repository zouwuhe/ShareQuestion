var a, t = require("../../vendor/qcloud-weapp-client-sdk/index"), e = require("../../config"), n = null, r = !1, o = getApp(), d = -1, i = e.service.host + "/" + e.name + "/api/qalib/getQASetList", s = e.service.host + "/" + e.name + "/api/qalib/delQASet";

Page({
    data: {
        navbar: [ "我发出的", "我答过的" ],
        currentTab: 0,
        avatar: "",
        name: "",
        amount_send: 0,
        num_send: 0,
        data_send: [],
        amount_recv: 0,
        num_recv: 0,
        data_recv: [],
        hasGetSendRecord: !1,
        hasGetRecvRecord: !1,
        content: "",
        needAuth: !1,
        auth: "",
        errMsg: "",
        confirmDelete: !1,
        contentConfirm: "",
        show: 1,
        hasGetQAList: !1
    },
    onLoad: function(t) {
        a = this, o.configNavTitle("我的记录"), t.tab && 0 !== t.tab && a.setData({
            currentTab: t.tab
        }), 0 == a.data.currentTab && g(), 1 == a.data.currentTab && f(), 2 == a.data.currentTab && (g(), 
        h()), t.show && a.setData({
            show: t.show
        }), setTimeout(function() {
            getApp().getShareTitle("pages/record/record");
        }, 800);
    },
    onReady: function() {},
    onShow: function() {
        a = this;
        var t = getCurrentPages();
        getApp().globalData.curPage = t[t.length - 1].route, getApp().globalData.pageVal = "";
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return console.log("record uid", getApp().globalData.uid), {
            title: getApp().globalData.shareTitle,
            path: "/pages/record/record?t=" + new Date().getTime() + "&rid=" + getApp().globalData.uid + "&tab=" + a.data.currentTab,
            success: function(a) {
                t.request({
                    url: e.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/record/record",
                        redpackNo: "",
                        shareTitle: getApp().globalData.shareTitle,
                        ver: e.service.version,
                        way: "0"
                    },
                    login: !0
                }), getApp().getShareTitle("pages/record/record");
            },
            fail: function(a) {}
        };
    },
    bindAuthEvent: function(t) {
        this.setData({
            nickName: t.detail.userInfo.nickName,
            avatarUrl: t.detail.userInfo.avatarUrl
        }), wx.setStorageSync("nickName", t.detail.userInfo.nickName), wx.setStorageSync("avatarUrl", t.detail.userInfo.avatarUrl), 
        this.setData({
            needAuth: !1
        }), 0 == a.data.currentTab && g();
    },
    navbarTap: function(a) {
        this.setData({
            currentTab: a.currentTarget.dataset.idx
        });
    },
    swiperChange: function(t) {
        this.setData({
            currentTab: t.detail.current
        }), 0 != a.data.currentTab || a.data.hasGetSendRecord || g(), 1 != a.data.currentTab || a.data.hasGetRecvRecord || f(), 
        2 != a.data.currentTab || a.data.hasGetQAList || h();
    },
    bindPackTap: function(a) {
        r || (u("正在加载"), getApp().navigateTo("/pages/result/result?hasGrab=1&show=0&redpackNo=" + a.currentTarget.dataset.idx));
    },
    bindDeleteTap: function(t) {
        for (var e = 0; e < a.data.data_send.length; e++) if (a.data.data_send[e].redpackNo === t.currentTarget.dataset.idx) {
            n = a.data.data_send[e], d = e;
            break;
        }
        r = !0, this.setData({
            confirmDelete: !0,
            contentConfirm: "确认删除“答题红包-答对" + (n.qaNum - n.limitWrongTimes) + "题可抢”？删除后将不可恢复"
        });
    },
    bindDeleteQuestion: function(e) {
        r = !0;
        var n = this;
        wx.showModal({
            title: "提示",
            content: "您是否确定删除该条问题记录",
            success: function(d) {
                d.confirm ? (t.request({
                    url: s,
                    data: {
                        qaNo: e.currentTarget.dataset.idx
                    },
                    success: function(e) {
                        console.log(e.data), t.request({
                            url: i,
                            login: !0,
                            success: function(t) {
                                if (console.log(t), 0 === t.data.code) {
                                    var e = t.data.imgHost, n = t.data.imgStyle, r = t.data.data.map(function(a) {
                                        a.picUrl = e + a.picUrl + n;
                                        new Date(a.createTime);
                                        return Object.assign(a, {});
                                    });
                                    try {
                                        wx.setStorageSync("qaList", r);
                                    } catch (t) {}
                                    a.setData({
                                        qaList: r
                                    });
                                } else o.showFail("请求失败\n请稍候重试");
                            }
                        });
                    }
                }), n.data.qaList = n.data.qaList.filter(function(a) {
                    return a.id != e.currentTarget.dataset.id;
                }), n.setData({
                    qaList: n.data.qaList
                }), r = !1) : d.cancel && (console.log("u r right"), r = !1);
            }
        });
    },
    bindTapHelp: function() {
        getApp().navigateTo("/pages/help/help");
    },
    confirmDeleteTap: function(a) {
        r = !1, this.setData({
            confirmDelete: !1
        }), p();
    },
    bindCancelTap: function(a) {
        r = !1, this.setData({
            confirmDelete: !1
        });
    },
    confirmTap: function() {
        wx.openSetting({
            success: function(t) {
                t.authSetting[a.data.auth] && (a.setData({
                    needAuth: !1
                }), 0 == a.data.currentTab && g(), 1 == a.data.currentTab && f());
            }
        });
    },
    reviewQuestion: function(a) {
        if (!r) {
            var t = a.currentTarget.dataset.idx;
            o.navigateTo("/pages/review/review?id=" + t + "&navigateType=navigate&formType=1");
        }
    }
});

var c = function(a) {
    return wx.showToast({
        title: a,
        icon: "success",
        duration: 1500
    });
}, u = function(a) {
    return wx.showToast({
        title: a,
        icon: "loading",
        duration: 1e4
    });
}, l = function(a) {
    return wx.showToast({
        title: a,
        image: "../../images/common/fail.png",
        duration: 1500
    });
}, g = function() {
    u("正在加载"), t.request({
        url: e.service.hostUrl + "/user/sendRecord",
        data: {
            ver: e.service.version
        },
        login: !0,
        success: function(t) {
            if (0 == t.data.code) {
                wx.hideToast(), t.data.uid && (getApp().globalData.uid = t.data.uid);
                for (var n = t.data.records, r = 0; r < n.length; r++) n[r].id = r, n[r].totalAmount = parseFloat(n[r].totalAmount).toFixed(2), 
                n[r].amount = parseFloat(n[r].amount).toFixed(2);
                t.data.data.avatarUrl && "" !== t.data.data.avatarUrl || (t.data.data.avatarUrl = e.service.avatarUrl), 
                a.setData({
                    avatar: t.data.data.avatarUrl,
                    name: t.data.data.nickName,
                    amount_send: parseFloat(t.data.data.totalSendAmount).toFixed(2),
                    num_send: t.data.data.totalSendNum,
                    amount_recv: parseFloat(t.data.data.totalGetAmount).toFixed(2),
                    num_recv: t.data.data.totalGetNum,
                    data_send: n
                }), a.data.hasGetSendRecord = !0;
            } else switch (t.data.code) {
              case 500:
              case 501:
                l("服务器繁忙\n请稍候重试");
                break;

              default:
                wx.hideToast();
            }
        },
        fail: function(t) {
            "ERR_WX_GET_USER_INFO" === t.type ? (wx.hideToast(), a.data.auth = "scope.userInfo", 
            a.setData({
                needAuth: !0,
                content: "小程序需要获取用户信息权限，点击确认前往设置或退出程序？"
            })) : l("请求失败\n请稍候重试");
        }
    });
}, f = function() {
    u("正在加载"), t.request({
        url: e.service.hostUrl + "/user/getRecord",
        data: {
            ver: e.service.version
        },
        login: !0,
        success: function(t) {
            if (0 == t.data.code) {
                wx.hideToast(), t.data.uid && (getApp().globalData.uid = t.data.uid);
                for (var n = t.data.records, r = 0; r < n.length; r++) n[r].id = r, n[r].amount = parseFloat(n[r].amount).toFixed(2);
                t.data.data.avatarUrl && "" !== t.data.data.avatarUrl || (t.data.data.avatarUrl = e.service.avatarUrl), 
                a.setData({
                    avatar: t.data.data.avatarUrl,
                    name: t.data.data.nickName,
                    amount_send: parseFloat(t.data.data.totalSendAmount).toFixed(2),
                    num_send: t.data.data.totalSendNum,
                    amount_recv: parseFloat(t.data.data.totalGetAmount).toFixed(2),
                    num_recv: t.data.data.totalGetNum,
                    data_recv: n
                }), a.data.hasGetRecvRecord = !0;
            } else switch (t.data.code) {
              case 500:
              case 501:
                l("服务器繁忙\n请稍候重试");
                break;

              default:
                wx.hideToast();
            }
        },
        fail: function(t) {
            "ERR_WX_GET_USER_INFO" === t.type ? (wx.hideToast(), a.data.auth = "scope.userInfo", 
            a.setData({
                needAuth: !0,
                content: "小程序需要获取用户信息权限，点击确认前往设置或退出程序？"
            })) : l("请求失败\n请稍候重试");
        }
    });
}, h = function() {
    t.request({
        url: i,
        login: !0,
        success: function(t) {
            if (wx.hideLoading(), console.log(t), 0 === t.data.code) {
                a.data.hasGetQAList = !0;
                var e = t.data.imgHost, n = t.data.imgStyle, r = t.data.data.map(function(a) {
                    a.picUrl = e + a.picUrl + n;
                    new Date(a.createTime);
                    return Object.assign(a, {});
                });
                try {
                    wx.setStorageSync("qaList", r);
                } catch (t) {}
                a.setData({
                    qaList: r
                }), o.setUid(t.data.uid);
            } else o.showFail("请求失败\n请稍候重试");
        },
        fail: function(t) {
            "ERR_WX_GET_USER_INFO" === t.type && (console.log("fail", t), a.setData({
                needAuth: !0
            })), wx.hideLoading();
        }
    });
}, p = function() {
    d < 0 || (u("请稍候"), t.request({
        url: e.service.hostUrl + "/redpack/delete",
        data: {
            redpackNo: n.redpackNo,
            ver: e.service.version
        },
        login: !0,
        success: function(t) {
            if (0 == t.data.code) {
                a.data.data_send.splice(d, 1);
                for (var e = 0; e < a.data.data_send.length; e++) a.data.data_send[e].id = e;
                a.setData({
                    data_send: a.data.data_send
                }), c("删除成功");
            } else switch (t.data.code) {
              case -1:
                l("操作失败\n请稍候重试");
                break;

              case 500:
              case 501:
                l("服务器繁忙\n请稍候重试");
                break;

              default:
                wx.hideToast();
            }
        },
        fail: function(t) {
            "ERR_WX_GET_USER_INFO" === t.type ? (wx.hideToast(), a.data.auth = "scope.userInfo", 
            a.setData({
                needAuth: !0,
                content: "小程序需要获取用户信息权限，点击确认前往设置或退出程序？"
            })) : l("请求失败\n请稍候重试");
        }
    }));
};
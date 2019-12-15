var a, t, e, n = getApp(), o = require("../../config"), i = require("../../vendor/qcloud-weapp-client-sdk/index"), s = 0, d = 0, r = null;

Page({
    data: {
        hideContainer: !1,
        qaNo: 0,
        qaList: [],
        navigateType: "navigate",
        formType: "",
        showBtn: !1,
        ifIphoneX: !1,
        uid: "",
        redpackNo: "",
        grabber: {
            avatar: !1,
            nickName: !1
        },
        isPaying: !1,
        canViewAnswer: 1,
        amount: 0,
        redpackAmounts: [],
        showPayModal: !1,
        showTips: "",
        creator: 0
    },
    onLoad: function(e) {
        console.log("options", e);
        try {
            wx.getSystemInfoSync().model.indexOf("iPhone X") > -1 && this.setData({
                ifIphoneX: !0
            });
        } catch (a) {}
        n.configNavTitle(), console.log(e), this.setData({
            qaNo: e.id,
            navigateType: e.navigateType
        }), e.creator && this.setData({
            creator: e.creator
        }), e.redpackNo && (this.data.redpackNo = e.redpackNo), e.uid && (this.data.uid = e.uid);
        var s = this;
        wx.showLoading({
            title: "正在加载"
        });
        var d = {
            qaNo: this.data.qaNo,
            redpackNo: this.data.redpackNo,
            uid: this.data.uid
        };
        this.data.redpackNo && (console.log("here"), d.redpackNo = this.data.redpackNo), 
        i.request({
            login: !0,
            url: o.service.hostUrl + "/qalib/getQASet",
            data: d,
            success: function(e) {
                if (wx.hideLoading(), 0 === e.data.code) {
                    s.data.canViewAnswer = e.data.canViewAnswer, a = e.data.imgHost, t = e.data.imgStyle;
                    for (var n in e.data.data) e.data.data[n].options = JSON.parse(e.data.data[n].options), 
                    e.data.data[n].picUrl && (e.data.data[n].picUrl = a + e.data.data[n].picUrl + t);
                    var o = c(e.data.data);
                    if (e.data.selectAnswer) {
                        var i = JSON.parse(e.data.selectAnswer);
                        for (var d in i) o[d].selectAnswer = o[d].options[i[d]];
                    }
                    e.data.avatar && e.data.nickName && (s.data.grabber.avatar = e.data.avatar, s.data.grabber.nickName = e.data.nickName), 
                    console.log("redpackAmount", e.data.redpackAmounts), s.data.redpackAmounts = e.data.redpackAmounts, 
                    s.setData({
                        qaList: o,
                        showBtn: !0,
                        grabber: s.data.grabber,
                        canViewAnswer: e.data.canViewAnswer,
                        showTips: e.data.showTips || ""
                    }), u();
                }
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    bindback: function() {
        "navigate" === this.data.navigateType ? n.navigateTo("../pay/pay?qaNo=" + this.data.qaNo + "&qaCount=" + this.data.qaList.length) : "back" === this.data.navigateType && wx.navigateBack({
            delta: -1
        });
    },
    bindtap: function() {},
    bindOpenPayModel: function() {
        u(), this.setData({
            showPayModal: !0
        });
    },
    bindClosePayModal: function() {
        this.setData({
            showPayModal: !1
        });
    },
    bindPay: function(a) {
        console.log("e", a);
        var t = this;
        if (!this.data.isPaying) {
            var e = this.data.amount;
            t.setData({
                isPaying: !0
            }), n.showBusy("请稍候"), i.request({
                url: o.service.hostUrl + "/qalib/lookAnswerPrePay",
                data: {
                    redpackNo: t.data.redpackNo,
                    totalAmount: t.data.isBeta ? 1 : e,
                    qaNo: t.data.qaNo,
                    wxFormId: a.detail.formId
                },
                login: !0,
                success: function(a) {
                    if (0 == a.data.code) {
                        d = 0, s = 0;
                        var e = a.data.outTradeNo;
                        0 == a.data.payWay ? wx.requestPayment({
                            timeStamp: a.data.jsPay.timeStamp,
                            nonceStr: a.data.jsPay.nonceStr,
                            package: a.data.jsPay.package,
                            signType: a.data.jsPay.signType,
                            paySign: a.data.jsPay.paySign,
                            success: function(a) {
                                n.showBusy("支付成功\n请稍等"), l(e);
                            },
                            fail: function(a) {
                                t.setData({
                                    isPaying: !1
                                }), t.data.isBeta ? n.showFail("生成失败") : n.showFail("支付失败");
                            },
                            complete: function(a) {
                                t.setData({
                                    isPaying: !1
                                }), "requestPayment:cancel" == a.errMsg && (t.data.isBeta ? n.showFail("生成失败") : n.showFail("支付失败"));
                            }
                        }) : (t.data.isBeta ? showBusy("生成成功\n请稍等") : showBusy("支付成功\n请稍等"), l(e));
                    } else switch (t.setData({
                        isPaying: !1
                    }), a.data.code) {
                      case 500:
                      case 501:
                        n.showFail("服务器繁忙\n请稍候重试");
                        break;

                      case 509:
                        showModel("提示", "语音口令不允许输入敏感字词");
                        break;

                      default:
                        wx.hideToast(), a.data.msg && "" != a.data.msg && getApp().showModal("提示", a.data.msg);
                    }
                },
                fail: function(a) {
                    t.setData({
                        isPaying: !1
                    }), n.showFail("请求失败\n请稍候重试");
                }
            });
        }
    },
    onReady: function() {},
    onShow: function() {
        e = this;
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});

var c = function(a) {
    return a.map(function(a) {
        switch (e.data.canViewAnswer) {
          case -1:
            break;

          case 0:
            a.answer = "***";
            break;

          case 1:
            a.answer = a.options[a.answer];
            break;

          case 2:
            a.answer = "[红包抢完后可见]";
        }
    }), a;
}, l = function(a) {
    !function t() {
        if (++s > 10) return clearTimeout(r), !1;
        i.request({
            url: o.service.hostUrl + "/qalib/checkLookAnswerOrderStatus",
            data: {
                redpackNo: e.data.redpackNo,
                ver: o.service.version,
                n: s,
                outTradeNo: a
            },
            login: !0,
            success: function(a) {
                if (console.log(a), 1 !== d) if (0 == a.data.code) if (2 == a.data.payStatus) {
                    if (d = 1, clearTimeout(r), wx.showToast({
                        title: "支付成功",
                        icon: "none",
                        duration: 1500
                    }), e.data.canViewAnswer = a.data.canViewAnswer, 1 == a.data.canViewAnswer) for (var n in e.data.qaList) e.data.qaList[n].answer = a.data.answer[n];
                    e.data.qaList = c(e.data.qaList), e.setData({
                        canViewAnswer: e.data.canViewAnswer,
                        qaList: e.data.qaList,
                        showPayModal: !1
                    });
                } else r = setTimeout(t, 300); else wx.showModal({
                    content: "支付失败\n请联系客服处理",
                    showCancel: !0
                }), clearTimeout(r); else clearTimeout(r);
            },
            fail: function(a) {
                0 === checkFail ? (checkFail = 1, n.showFail("请求失败\n请稍候重试")) : wx.hideToast();
            }
        });
    }();
}, u = function() {
    var a = e.data.redpackAmounts.length, t = Math.round(Math.random() * a);
    t === a && t--, e.data.amount = e.data.redpackAmounts[t].toFixed(2), e.setData({
        amount: e.data.amount
    });
};
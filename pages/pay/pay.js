var a = require("../../vendor/qcloud-weapp-client-sdk/index"), t = require("../../config"), e = require("../../vendor/qcloud-weapp-client-sdk/lib/session"), i = getApp(), n = null, o = 0, s = 0, u = null, l = 0, r = {};

Page({
    data: {
        array: [ 1, 2, 3, 4, 5 ],
        index: 0,
        viewArray: [ "抢完后可直接偷看", "不允许偷看" ],
        viewIndex: 0,
        viewResult: [ 1, 2 ],
        invalidInput: !1,
        invalidHint: "",
        tipstimeout: null,
        rightNum: 0,
        num: 0,
        desc: "",
        descOptions: [],
        maxDescLength: 25,
        diffIndex: 2,
        diffOptions: [],
        showFeeOptions: !0,
        feeIndex: -1,
        feeOptions: [],
        inputAmount: "",
        amount: "0.00",
        minAmount: 1,
        maxAmount: 1e4,
        inputNum: "",
        maxlength: 5,
        maxNum: 1e4,
        coverUrl: "",
        coverIndex: 0,
        coverOptions: [],
        pocket: "0.00",
        rate: .02,
        serviceFee: "0.00",
        payment: 0,
        needAuth: !1,
        auth: "",
        content: "",
        isPaying: !1,
        hideContainer: !1,
        redpackNo: "",
        isBeta: !1,
        onlyShowTip: !1,
        canUseBalance: !1,
        contactBtn: !0,
        hideRule: !0,
        initFlag: !1,
        qaCount: 0,
        qaNo: "",
        pinyinRes: "",
        inputZh: "",
        pyToneMark: 0,
        showCustomBtn: !1,
        customBtnText: "去看看",
        inputFocus: !1
    },
    onLoad: function(a) {
        n = this;
        var t = null;
        if (console.log(a), a.scene && !((t = decodeURIComponent(a.scene)).length <= 8)) return wx.redirectTo({
            url: "/pages/result/result?from=qrcode&isBeta=" + this.data.isBeta + "&redpackNo=" + t + "&t=" + new Date().getTime()
        }), !1;
        if (i.configNavTitle(), a.qaNo && this.setData({
            qaNo: a.qaNo
        }), a.qaCount) {
            for (var e = [], o = 1; o <= a.qaCount; o++) e.push(o);
            e.pop(), console.log(e.length), this.setData({
                qaCount: a.qaCount,
                array: e,
                index: Math.ceil(e.length / 2) - 1
            });
        }
        f(), v(), w(i.globalData.avatarUrl), n.setData({
            coverIndex: 0
        });
        var s = i.globalData.descOptions;
        Math.floor(Math.random() * s.length);
        this.setData({
            descOptions: s,
            inputAmount: a.amount && "." != a.amount ? parseFloat(a.amount) + "" : "",
            inputNum: a.num ? a.num : ""
        }), g(), setTimeout(function() {
            getApp().getShareTitle("pages/pay/pay");
        }, 1500), setTimeout(function() {
            n.data.initFlag || n.setData({
                initFlag: !0
            });
        }, 1e3), console.log(this.data.diffOptions);
    },
    bindgetuserinfo: function(a) {
        if ("getUserInfo:ok" == a.detail.errMsg) {
            n.setData({
                needAuth: !1
            }), n.setData({
                nickName: a.detail.userInfo.nickName,
                avatarUrl: a.detail.userInfo.avatarUrl
            }), wx.setStorageSync("userInfo", a.detail.userInfo);
            this.data.qaNum;
            g(1);
        }
    },
    onReady: function() {
        for (var a = 0; a < 100; a += 1) {
            var t = wx.getSystemInfoSync();
            if (t.screenWidth > 0) {
                i.globalData.screenWidth = t.screenWidth;
                break;
            }
        }
    },
    onShow: function() {
        if (i.globalData.cropResult.imagePath) {
            var a = (r = i.globalData.cropResult).imagePath && "" != r.imagePath ? decodeURI(r.imagePath) : "";
            w(a, r), i.globalData.cropResult = {}, n.data.coverOptions.push({
                imgNo: "",
                url: a,
                rect: Object.assign({}, r)
            }), n.data.coverIndex = n.data.coverOptions.length - 1;
        }
        this.setData({
            isPaying: !1
        });
        var t = getCurrentPages();
        getApp().globalData.curPage = t[t.length - 1].route, getApp().globalData.pageVal = "";
    },
    bindPickerChange: function(a) {
        this.setData({
            index: Number(a.detail.value)
        });
    },
    bindViewPickerChange: function(a) {
        this.setData({
            viewIndex: Number(a.detail.value)
        });
    },
    bindViewPickerTap: function() {
        console.log("tap"), this.setData({
            inputFocus: !1
        });
    },
    bindPickerTap: function() {
        console.log("tap"), this.setData({
            inputFocus: !1
        });
    },
    handleCanViewList: function() {
        this.data.viewArray = [], this.data.viewResult = [];
        for (var a in i.globalData.canViewAnswer) this.data.viewArray.push(i.globalData.canViewAnswer[a]), 
        this.data.viewResult.push(parseInt(a));
        this.setData({
            viewArray: this.data.viewArray,
            viewResult: this.data.viewResult
        });
    },
    bindNumChange: function(a) {
        this.setData({
            num: a.detail.value
        });
    },
    bindFeeOptionChange: function(a) {
        var t = a.target.dataset.value;
        if (t < 0) n.setData({
            showFeeOptions: !1,
            feeInputFocus: !0
        }); else {
            n.setData({
                feeValue: t
            });
            var a = {
                detail: {
                    value: t += ""
                }
            };
            n.bindAmountInput(a);
        }
    },
    bindAmountInput: function(a) {
        var t = a.detail.value, e = t.search(/\.{2,}/);
        -1 !== e && (t = t.replace(/\.{1,}/g, "."));
        var i = t.replace(/(^[0-9]*\.?([0-9]{0,2}))/g, "");
        if (i.length > 0) {
            var o = new RegExp(i + "$", "");
            t = t.replace(o, "");
        }
        n.data.inputAmount = t;
        var s = "" != n.data.inputAmount && "." != n.data.inputAmount ? parseFloat(n.data.inputAmount).toFixed(2) : "0.00", u = parseFloat(s * n.data.rate).toFixed(2), l = parseFloat(s) + parseFloat(u);
        n.data.canUseBalance && (l -= parseFloat(n.data.pocket));
        var r = l > 0 ? l : 0;
        return this.setData({
            inputAmount: n.data.inputAmount,
            amount: s,
            serviceFee: u,
            payment: parseFloat(r).toFixed(2)
        }), s > this.data.maxAmount ? (this.setData({
            invalidInput: !0,
            invalidHint: "红包总金额不能超过" + this.data.maxAmount + "元"
        }), clearTimeout(this.data.tipstimeout), this.data.tipstimeout = setTimeout(function() {
            this.setData({
                invalidInput: !1
            });
        }.bind(this), 3e3)) : s < n.data.minAmount ? "" != n.data.inputAmount && "." != n.data.inputAmount && (this.setData({
            invalidInput: !0,
            invalidHint: "红包总金额不能低于" + n.data.minAmount + "元"
        }), clearTimeout(this.data.tipstimeout), this.data.tipstimeout = setTimeout(function() {
            this.setData({
                invalidInput: !1
            });
        }.bind(this), 3e3)) : "" != this.data.inputNum && s < n.data.minAmount * parseInt(this.data.inputNum) ? (this.setData({
            invalidInput: !0,
            invalidHint: "每人获得的红包不能低于" + n.data.minAmount + "元"
        }), clearTimeout(this.data.tipstimeout), this.data.tipstimeout = setTimeout(function() {
            this.setData({
                invalidInput: !1
            });
        }.bind(this), 3e3)) : (clearTimeout(this.data.tipstimeout), this.setData({
            invalidInput: !1
        })), {
            value: t
        };
    },
    bindNumberInput: function(a) {
        this.data.inputNum = a.detail.value;
        var t = parseInt(this.data.inputNum), e = "", i = "" != n.data.inputAmount && "." != n.data.inputAmount ? n.data.inputAmount : "0.00";
        t < 1 ? e = "数量至少1个" : t > this.data.maxNum ? e = "数量最多" + this.data.maxNum + "个" : "" != n.data.inputAmount && parseFloat(i) < this.data.minAmount * t && (e = "每人获得的红包不得低于" + this.data.minAmount + "元"), 
        "" != e ? (this.setData({
            invalidInput: !0,
            invalidHint: e
        }), clearTimeout(this.data.tipstimeout), this.data.tipstimeout = setTimeout(function() {
            this.setData({
                invalidInput: !1
            });
        }.bind(this), 3e3)) : (clearTimeout(this.data.tipstimeout), this.setData({
            invalidInput: !1
        }));
    },
    bindPayTap: function(e) {
        if (console.log("is paying: ", e), i.globalData.canCreate) {
            var n = "";
            if (e && (n = e.detail.formId), !this.data.isPaying) {
                var s = 0, u = parseInt(this.data.inputNum), r = (this.data.desc, this);
                if (-1 !== this.data.inputAmount.search(/[^0-9.]/) || "." == this.data.inputAmount) return void p("提示", "请输入正确的金额");
                if ("" == this.data.inputAmount) return void p("提示", "请输入红包总金额");
                if ("" == this.data.inputNum) return void p("提示", "请输入正确的数量");
                if ((s = parseFloat(this.data.inputAmount)) > this.data.maxAmount) return void p("提示", "红包总金额不得超过" + this.data.maxAmount + "元");
                if (u > this.data.maxNum || u < 1) return void p("提示", "请输入 1 - " + this.data.maxNum + "的数量");
                if (s < this.data.minAmount * u) return void p("提示", "每人获得的红包不得低于" + this.data.minAmount + "元");
                r.setData({
                    isPaying: !0
                }), m(function() {
                    c("请稍候"), a.request({
                        url: t.service.hostUrl + "/prepay",
                        data: {
                            title: r.data.desc,
                            level: r.data.diffIndex,
                            totalAmount: s,
                            totalNum: u,
                            qaNo: r.data.qaNo,
                            formId: n,
                            ver: t.service.version,
                            allowWrongNum: r.data.qaCount - r.data.array[r.data.index],
                            canViewAnswer: r.data.viewResult[r.data.viewIndex]
                        },
                        login: !0,
                        success: function(a) {
                            if (0 == a.data.code) {
                                o = 0, l = 0;
                                var t = a.data.redpackNo;
                                0 == a.data.payWay ? wx.requestPayment({
                                    timeStamp: a.data.jsPay.timeStamp,
                                    nonceStr: a.data.jsPay.nonceStr,
                                    package: a.data.jsPay.package,
                                    signType: a.data.jsPay.signType,
                                    paySign: a.data.jsPay.paySign,
                                    success: function(a) {
                                        c("支付成功\n请稍等"), h(t);
                                    },
                                    fail: function(a) {
                                        r.setData({
                                            isPaying: !1
                                        }), i.showFail("支付失败");
                                    },
                                    complete: function(a) {
                                        r.setData({
                                            isPaying: !1
                                        }), "requestPayment:cancel" == a.errMsg && i.showFail("支付失败");
                                    }
                                }) : (c("支付成功\n请稍等"), h(t));
                            } else switch (r.setData({
                                isPaying: !1
                            }), a.data.code) {
                              case 500:
                              case 501:
                                i.showFail("服务器繁忙\n请稍候重试");
                                break;

                              case 509:
                                p("提示", "语音口令不允许输入敏感字词");
                                break;

                              default:
                                wx.hideToast(), a.data.msg && "" != a.data.msg && getApp().showModal("提示", a.data.msg);
                            }
                        },
                        fail: function(a) {
                            r.setData({
                                isPaying: !1
                            }), i.showFail("请求失败\n请稍候重试");
                        }
                    });
                });
            }
        } else wx.showModal({
            title: "提示",
            content: i.globalData.tip,
            showCancel: !1
        });
    },
    bindReportTap: function(a) {
        getApp().navigateTo("/pages/report/report?page=pay");
    },
    bindRecordTap: function(a) {
        getApp().navigateTo("/pages/record/record?show=0&tab=0");
    },
    bindCashbackTap: function(a) {
        getApp().navigateTo("/pages/cashback/cashback?show=0");
    },
    bindHelpTap: function(a) {
        getApp().navigateTo("/pages/help/help?");
    },
    bindCustomBtnTap: function(a) {
        if (!getApp().globalData.customBtn) return this.setData({
            showCustomBtn: !1
        }), !1;
        "weapp" == getApp().globalData.customBtn.action ? wx.navigateToMiniProgram({
            appId: getApp().globalData.customBtn.appId,
            path: getApp().globalData.customBtn.path ? getApp().globalData.customBtn.path : "",
            extraData: getApp().globalData.customBtn.extraData ? getApp().globalData.customBtn.extraData : {},
            success: function(a) {
                console.log(a);
            }
        }) : "image" == getApp().globalData.customBtn.action && wx.previewImage({
            current: getApp().globalData.customBtn.url,
            urls: [ getApp().globalData.customBtn.url ],
            success: function(a) {}
        });
    },
    confirmTap: function() {
        wx.openSetting({
            success: function(a) {
                a.authSetting[n.data.auth] && (n.setData({
                    needAuth: !1
                }), g());
            }
        });
    },
    openRuleTap: function(a) {
        this.setData({
            hideRule: !1
        });
    },
    agreeTap: function(a) {
        this.setData({
            hideRule: !0
        });
    },
    bindRightNumChange: function(a) {
        this.setData({
            rightNum: a.detail.value > Number(this.data.qaCount) ? Number(this.data.qaCount) : a.detail.value
        });
    },
    bindTapGenerate: function(a) {
        console.log(a);
    },
    reviewQuestion: function(a) {
        i.navigateTo("/pages/review/review?id=" + this.data.qaNo + "&navigateType=back&formType=1");
    },
    submitCopy: function(a) {
        wx.setClipboardData({
            data: this.data.pinyinRes,
            success: function(a) {
                d("复制成功");
            }
        });
    },
    submitTrans: function(a) {
        var e = this;
        if (e.data.inputZh.length < 1) return i.showFail("请输入内容"), !1;
        c("请稍候"), wx.request({
            url: t.service.hostUrl + "/getPinYin",
            data: {
                zh: e.data.inputZh,
                toneMark: e.data.pyToneMark,
                ver: t.service.version
            },
            success: function(a) {
                0 == a.data.code ? (d("转换成功"), e.setData({
                    pinyinRes: a.data.res
                })) : i.showFail("请求失败\n请稍候重试");
            },
            fail: function(a) {
                i.showFail("请求失败\n请稍候重试"), console.log("get fail", a);
            }
        });
    },
    bindTextAreaBlur: function(a) {
        this.data.inputZh = a.detail.value;
    },
    checkboxChange: function(a) {
        a.detail.value.length > 0 ? this.data.pyToneMark = 1 : this.data.pyToneMark = 0;
    }
});

var c = function(a) {
    return wx.showToast({
        title: a,
        icon: "loading",
        duration: 1e4,
        mask: !0
    });
}, d = function(a) {
    return wx.showToast({
        title: a,
        icon: "success",
        duration: 1500
    });
}, p = function(a, t) {
    wx.hideToast(), wx.showModal({
        title: a,
        content: t,
        showCancel: !1
    });
}, h = function(e) {
    !function n() {
        if (++l > 10) return clearTimeout(u), wx.redirectTo({
            url: "/pages/result/result?redpackNo=" + e + "&t=" + new Date().getTime()
        }), !1;
        a.request({
            url: t.service.hostUrl + "/redpack/getStatus",
            data: {
                redpackNo: e,
                ver: t.service.version,
                n: l
            },
            login: !0,
            success: function(a) {
                1 !== o ? 2 === a.data.data.redpackStatus ? (wx.hideToast(), o = 1, clearTimeout(u), 
                1 === a.data.redirect ? wx.redirectTo({
                    url: "/pages/result/result?redpackNo=" + e + "&t=" + new Date().getTime()
                }) : wx.redirectTo({
                    url: "/pages/share/share?from=pay&redpackNo=" + e + "&shareWay=" + a.data.shareWay + "&t=" + new Date().getTime()
                })) : u = setTimeout(n, 300) : clearTimeout(u);
            },
            fail: function(a) {
                0 === s ? (s = 1, i.showFail("请求失败\n请稍候重试")) : wx.hideToast();
            }
        });
    }();
}, g = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
    a.request({
        url: t.service.hostUrl + "/user/balance",
        data: {
            ver: t.service.version
        },
        login: !0,
        success: function(a) {
            if (wx.hideToast(), 0 == a.data.code) {
                a.data.uid && (getApp().globalData.uid = a.data.uid);
                var t = "" == n.data.inputAmount || "." == n.data.inputAmount ? 0 : n.data.inputAmount, o = parseFloat(t) + parseFloat(n.data.serviceFee) - parseFloat(a.data.balance), s = o > 0 ? o : 0;
                n.setData({
                    pocket: parseFloat(a.data.balance).toFixed(2),
                    payment: parseFloat(s).toFixed(2)
                });
            } else switch (a.data.code) {
              case 500:
              case 501:
                i.showFail("服务器繁忙\n请稍候重试");
            }
            D(), setTimeout(function() {
                1 == e && n.bindPayTap();
            }, 500);
        },
        fail: function(a) {
            "ERR_WX_GET_USER_INFO" === a.type ? (wx.hideToast(), n.data.auth = "scope.userInfo", 
            n.setData({
                needAuth: !0,
                content: "小程序需要获取用户信息权限，点击确认前往设置或退出程序？"
            })) : i.showFail("请求失败\n请稍候重试");
        }
    });
}, m = function(a) {
    var o = 0, s = n.data.coverOptions[n.data.coverIndex];
    (s ? s.imgNo : "AVATAR") && a ? a() : (i.showBusy("上传封面..."), function a(s) {
        o++, wx.uploadFile({
            url: t.service.hostUrl + "/redpack/uploadTmpImg",
            filePath: n.data.coverOptions[n.data.coverIndex].url,
            name: "file",
            header: {
                "X-WX-Id": e.get().id,
                "X-WX-Skey": e.get().skey
            },
            formData: {
                x: r.x,
                y: r.y,
                w: r.width,
                ver: t.service.version
            },
            success: function(a) {
                console.log("successs upload image: ", a);
                var t = JSON.parse(a.data);
                0 == t.code ? (wx.hideLoading(), n.data.coverOptions[n.data.coverIndex].imgNo = t.imgNo, 
                console.log("success callback"), s()) : (n.data.isPaying = !1, t.msg ? i.showModal("提示", t.msg) : i.showModal("提示", "上传图片失败，请尝试不要选择原图或者更换其他图片"));
            },
            fail: function(t) {
                console.log("fail upload image: ", t), o < 3 ? a(s) : (n.data.isPaying = !1, i.showFail("网络出错\n再试一次"));
            }
        });
    }(a));
}, v = function() {
    wx.request({
        url: t.service.hostUrl + "/init",
        data: {
            ver: t.service.version
        },
        success: function(a) {
            if (console.log("init res pay init: ", a), 0 == a.data.code) {
                var t = JSON.stringify(a.data);
                t != getApp().globalData.localData && (getApp().globalData.localData = t, i.setGlobalData(a.data), 
                f(), wx.setStorage({
                    key: "initData",
                    data: t
                })), n.setData({
                    initFlag: !0
                });
            }
        },
        fail: function(a) {
            console.log("init fail", a);
        }
    });
}, f = function() {
    if (!n.data.desc) {
        var a = i.globalData.descOptions, t = Math.floor(Math.random() * a.length);
        n.setData({
            desc: a[t] || ""
        });
    }
    n.handleCanViewList();
    for (var e = [], o = 0; o < i.globalData.amountList.length; o += 1) e.push({
        name: i.globalData.amountList[o],
        value: i.globalData.amountList[o]
    });
    e.push({
        name: "...",
        value: -1
    }), n.setData({
        isBeta: i.globalData.isBeta,
        onlyShowTip: i.globalData.onlyShowTip,
        serverMsg: i.globalData.serverMsg,
        descOptions: i.globalData.descOptions,
        diffOptions: i.globalData.levelList,
        showFeeOptions: i.globalData.showFeeOptions,
        feeOptions: e,
        minAmount: i.globalData.minPacketAmount,
        maxAmount: i.globalData.maxPacketAmount,
        maxNum: i.globalData.maxPacketQuantity,
        maxlength: i.globalData.maxPacketQuantity.toString().length,
        coverOptions: i.globalData.coverOptions,
        rate: i.globalData.serviceRate,
        canUseBalance: i.globalData.canUseBalance,
        contactBtn: i.globalData.contactBtn,
        showCustomBtn: !!i.globalData.customBtn,
        customBtnText: i.globalData.customBtn ? i.globalData.customBtn.btnText : "去看看"
    }), i.globalData.localData.length > 4 && (wx.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#d85940"
    }), i.configNavTitle());
}, D = function() {
    wx.getUserInfo({
        success: function(a) {
            var t = a.userInfo.avatarUrl;
            t != i.globalData.avatarUrl && (n.setData({
                coverUrl: t
            }), i.globalData.avatarUrl = t, wx.setStorage({
                key: "avatarUrl",
                data: t
            }));
        }
    });
}, w = function(a, t) {
    if (i.globalData.screenWidth < 10) for (var e = 0; e < 100; e += 1) {
        var o = wx.getSystemInfoSync();
        if (o.screenWidth > 0) {
            i.globalData.screenWidth = o.screenWidth;
            break;
        }
    }
    var s = parseInt(140 / 750 * i.globalData.screenWidth);
    if (t) {
        var u = s / t.width;
        wx.getImageInfo({
            src: a,
            success: function(e) {
                var i = e.width, o = e.height;
                n.setData({
                    coverUrl: a,
                    coverWidth: parseInt(i * u),
                    coverHeight: parseInt(o * u),
                    coverTop: parseInt(-t.y * u),
                    coverLeft: parseInt(-t.x * u)
                });
            }
        });
    } else n.setData({
        coverUrl: a,
        coverWidth: s,
        coverHeight: s,
        coverTop: 0,
        coverLeft: 0
    });
};
function a() {
    i.request({
        url: o.service.hostUrl + "/redpack/getShareInfo",
        data: {
            redpackNo: s.data.redpackNo,
            ver: o.service.version
        },
        login: !0,
        success: function(a) {
            if (console.log("here"), console.log("request success", a), 0 == a.data.code) a.data.uid && (getApp().globalData.uid = a.data.uid), 
            s.data.shareWay = a.data.shareWay, s.data.shareImg = a.data.shareImg, s.data.shareCardImg = a.data.shareCardImg, 
            s.data.shareImgUrl = a.data.shareImgUrl, s.data.redpackType = a.data.redpackType, 
            s.setData({
                shareWay: s.data.shareWay
            }), e(a.data.shareCardImg), t(a.data.shareImg), s.data.isWaitImg && (s.data.isWaitImg = !1, 
            wx.hideToast(), s.bindShareImage()); else switch (a.data.code) {
              case 500:
              case 501:
                d("服务器繁忙\n请稍候重试");
                break;

              default:
                wx.hideToast();
            }
        },
        fail: function(a) {
            "ERR_WX_GET_USER_INFO" === a.type ? (wx.hideToast(), s.data.auth = "scope.userInfo", 
            s.setData({
                needAuth: !0
            })) : d("请求失败\n请稍候重试");
        }
    });
}

function e(a) {
    var e = a.replace("http://", "https://");
    wx.downloadFile({
        url: e,
        header: {
            "X-WX-Id": r.get().id,
            "X-WX-Skey": r.get().skey
        },
        success: function(a) {
            s.data.shareCardImg = encodeURI(a.tempFilePath);
        },
        fail: function(a) {
            console.log("fail!", a);
        }
    });
}

function t(a) {
    var e = a.replace("http://", "https://");
    wx.downloadFile({
        url: e,
        header: {
            "X-WX-Id": r.get().id,
            "X-WX-Skey": r.get().skey
        },
        success: function(a) {
            s.data.fromRed ? s.data.shareImg = encodeURI(a.tempFilePath) : s.setData({
                shareImg: encodeURI(a.tempFilePath)
            });
        },
        fail: function(a) {
            console.log("fail!", a);
        }
    });
}

var s, i = require("../../vendor/qcloud-weapp-client-sdk/index"), o = require("../../config"), r = require("../../vendor/qcloud-weapp-client-sdk/lib/session"), n = getApp();

Page({
    data: {
        isAbove2: wx.canIUse("button.open-type.share"),
        showSharePage: !1,
        img_height: 135,
        top_margin: 494,
        showShareInfo: !1,
        shareImg: "",
        shareBg: "../../images/share/background.png",
        needAuth: !1,
        auth: "",
        errMsg: "",
        fromRed: !1,
        fromPay: !1,
        needDownload: !0,
        shareImgDlAgain: !1,
        shareImgLoad: !1,
        shareImgUrl: "",
        redpackNo: "",
        showSaveBtn: !0,
        limitTimeArray: n.globalData.limitTimeArray,
        limitTimeIndex: 0,
        systemInfo: "",
        shareCardImg: "",
        guideTip: !1,
        isShare: !1,
        showGuide: !1,
        needShowGuide: !1,
        note: "未领取的红包，将于24小时后退回小程序余额",
        isWaitImg: !1,
        showShareBtn: !1,
        isLoading: !1,
        canRefresh: !1
    },
    onLoad: function(e) {
        console.log("share options", e), wx.showLoading({
            title: "正在加载",
            mask: !0
        });
        try {
            this.data.systemInfo = wx.getSystemInfoSync();
        } catch (a) {}
        e.shareWay && 0 == e.shareWay && this.setData({
            showSaveBtn: !1
        }), s = this, n.configNavTitle(), s.data.redpackNo = e.redpackNo, s.setData({
            limitTimeArray: n.globalData.limitTimeArray
        }), e && e.redpackNo && s.setData({
            showShareBtn: !0
        }), wx.showLoading(), this.data.needDownload ? (a(), setTimeout(function() {
            s.data.shareImgLoad;
        }, 300)) : wx.hideLoading(), setTimeout(function() {
            getApp().getShareTitle("pages/share/share");
        }, 100), setTimeout(function() {
            s.setData({
                canRefresh: !0
            });
        }, 2e3);
    },
    onReady: function() {
        for (var a = null, e = 0; e < 100 && (a = wx.getSystemInfoSync(), console.log("w, h", a.windowWidth, a.windowHeight), 
        !(a.windowWidth > 0 && a.windowHeight > 0)); e++) ;
        var t = parseInt(a.windowWidth / 960 * 1200);
        console.log("w, h", parseInt(a.windowHeight - t), t), this.setData({
            img_height: parseInt(a.windowHeight - t),
            top_margin: parseInt(.82 * a.windowWidth),
            share_img_height: t
        });
    },
    onShow: function() {
        s = this;
        var a = getCurrentPages();
        getApp().globalData.curPage = a[a.length - 1].route, getApp().globalData.pageVal = s.data.redpackNo, 
        this.data.needShowGuide && n.getGuideStatus() && (this.data.showGuide || (this.setData({
            showGuide: !0
        }), n.setGuideStatus()));
    },
    bindGuideTap: function() {
        s.setData({
            showGuide: !1
        });
    },
    imgLoad: function() {
        console.log("imgLoad"), wx.hideLoading(), s.setData({
            canRefresh: !0,
            isLoading: !1
        });
    },
    refreshShareImg: function() {
        if (!s.data.isLoading) {
            s.setData({
                isLoading: !0
            });
            var a = o.service.hostUrl + "/redpack/shareImg/1/" + s.data.redpackNo + ".jpg?refresh=1";
            s.data.shareImg = a;
            var e = s.data.shareImg.replace("http://", "https://");
            wx.downloadFile({
                url: e,
                success: function(a) {
                    wx.getFileInfo({
                        filePath: a.tempFilePath,
                        sucess: function(a) {
                            console.log("res", a);
                        },
                        fail: function(a) {
                            console.log("fail", a);
                        },
                        complete: function(e) {
                            console.log("res", e), e.size <= 0 ? wx.showToast({
                                title: "请求过快，请稍后重试",
                                icon: "none",
                                duration: 1200
                            }) : s.setData({
                                shareImg: a.tempFilePath,
                                tmpFilePath: a.tempFilePath
                            }, function() {
                                setTimeout(function() {
                                    wx.showToast({
                                        title: "已重新生成分享图",
                                        icon: "none",
                                        duration: 1200
                                    });
                                }, 100);
                            });
                        }
                    });
                },
                fail: function() {
                    wx.hideLoading();
                }
            });
        }
    },
    bindAuthEvent: function(e) {
        this.setData({
            nickName: e.detail.userInfo.nickName,
            avatarUrl: e.detail.userInfo.avatarUrl
        }), wx.setStorageSync("nickName", e.detail.userInfo.nickName), wx.setStorageSync("avatarUrl", e.detail.userInfo.avatarUrl), 
        s.setData({
            needAuth: !1
        }), a();
    },
    onShareAppMessage: function() {
        return console.log("share uid", getApp().globalData.uid), n.getGuideStatus() && (this.data.showGuide || (this.setData({
            showGuide: !0
        }), n.setGuideStatus())), console.log(this.data.shareCardImg), s.setData({
            isShare: !0
        }), {
            title: getApp().globalData.shareTitle,
            path: "/pages/chat/chat?redpackNo=" + s.data.redpackNo + "&rid=" + getApp().globalData.uid + "&t=" + new Date().getTime() + "&hasGrab=1",
            imageUrl: this.data.shareCardImg,
            success: function(a) {
                i.request({
                    url: o.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/share/share",
                        redpackNo: s.data.redpackNo,
                        shareTitle: getApp().globalData.shareTitle,
                        ver: o.service.version,
                        way: s.data.fromPay ? "1" : "3"
                    },
                    login: !0
                }), s.data.needDownload ? getApp().getShareTitle("pages/share/share") : (console.log(s.data), 
                wx.navigateBack({
                    delta: 1
                }));
            },
            fail: function(a) {}
        };
    },
    shareInfoTap: function(a) {
        s.setData({
            showShareInfo: !0
        });
    },
    bindPickerChange: function(a) {
        var e = a.detail.value, t = s.data.limitTimeArray[e].v, r = s.data.limitTimeIndex;
        s.setData({
            limitTimeIndex: e
        }), i.request({
            url: o.service.hostUrl + "/redpack/setLimitTimes",
            data: {
                redpackNo: s.data.redpackNo,
                limitTimes: t,
                ver: o.service.version
            },
            login: !0,
            success: function(a) {
                0 == a.data.code ? a.data.uid && (getApp().globalData.uid = a.data.uid) : (d("设置失败"), 
                s.setData({
                    limitTimeIndex: r
                }));
            },
            fail: function(a) {
                s.setData({
                    limitTimeIndex: r
                }), "ERR_WX_GET_USER_INFO" === a.type ? (s.data.auth = "scope.userInfo", s.setData({
                    needAuth: !0,
                    content: "小程序需要获取用户信息权限，点击确认前往设置或退出程序？"
                })) : d("请求失败\n请稍候重试");
            }
        });
    },
    closeShareInfoTap: function(a) {
        s.setData({
            showShareInfo: !1
        });
    },
    bindDetailTap: function(a) {
        wx.redirectTo({
            url: "/pages/result/result?hasGrab=1&show=0&redpackNo=" + this.data.redpackNo
        });
    },
    bindOpenTap: function(a) {
        s.data.shareImgDlAgain = !1, wx.redirectTo({
            url: "/pages/result/result?hasGrab=1&show=0&redpackNo=" + s.data.redpackNo + "&t=" + new Date().getTime() + "&shareImg=" + encodeURI(this.data.shareImg) + "&shareBg=" + encodeURI(this.data.shareBg)
        });
    },
    bindToShare: function() {
        s.setData({
            isShare: !0
        }), s.data.shareImgUrl ? this.bindShareImage() : (wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 3e3,
            mask: !0
        }), s.data.isWaitImg = !0);
    },
    bindShareImage: function() {
        if (getApp().compareVersion(s.data.systemInfo.version, "1.6.4") >= 0) {
            var a = "/pages/shareimg/shareimg?from=red";
            a += "&redpackNo=" + s.data.redpackNo, a += "&shareWay=" + s.data.shareWay, a += "&redpackType=" + s.data.redpackType, 
            a += "&shareImg=" + encodeURIComponent(s.data.shareImg), a += "&shareCardImg=" + encodeURIComponent(s.data.shareCardImg), 
            a += "&url=" + encodeURIComponent(s.data.shareImgUrl), wx.navigateTo({
                url: a,
                fail: function(e) {
                    wx.redirectTo({
                        url: a
                    });
                }
            }), i.request({
                url: o.service.hostUrl + "/user/share",
                data: {
                    page: "/pages/share/share",
                    redpackNo: s.data.redpackNo,
                    shareTitle: "share_img_webview",
                    ver: o.service.version,
                    way: "11"
                },
                login: !0
            });
        } else wx.previewImage({
            urls: [ s.data.shareImg ],
            success: function(a) {},
            complete: function(a) {
                i.request({
                    url: o.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/share/share",
                        redpackNo: s.data.redpackNo,
                        shareTitle: "share_img_preview",
                        ver: o.service.version,
                        way: "10"
                    },
                    login: !0
                });
            }
        });
    },
    returnRedTap: function(a) {
        s.data.shareImgDlAgain = !1, wx.navigateBack({
            delta: 1
        });
    },
    shareTap: function(a) {
        wx.showModal({
            title: "提示",
            content: "点击屏幕右上方即可转发给好友哦",
            showCancel: !1
        });
    },
    saveImgTap: function(a) {
        this.data.needShowGuide = !0, wx.previewImage({
            urls: [ s.data.shareImg ],
            success: function(a) {
                console.log(a);
            },
            complete: function(a) {
                i.request({
                    url: o.service.hostUrl + "/user/share",
                    data: {
                        page: "/pages/share/share",
                        redpackNo: s.data.redpackNo,
                        shareTitle: getApp().globalData.shareTitle,
                        ver: o.service.version,
                        way: s.data.fromPay ? "2" : "4"
                    },
                    login: !0
                });
            }
        });
    },
    shareImgTap: function(a) {
        wx.previewImage({
            current: s.data.shareImg,
            urls: [ s.data.shareImg ],
            success: function(a) {},
            fail: function(a) {
                d("查看图片失败");
            }
        });
    },
    shareImgError: function(e) {
        s.data.shareImg = "", s.data.shareImgDlAgain || (s.data.shareImgDlAgain = !0, s.data.needDownload = !0, 
        a());
    },
    confirmTap: function() {
        wx.openSetting({
            success: function(e) {
                e.authSetting[s.data.auth] && (s.setData({
                    needAuth: !1
                }), a());
            }
        });
    },
    saveFile: function() {
        console.log(this.data.shareImg), wx.showLoading({
            title: "正在保存",
            mask: !0
        }), wx.saveImageToPhotosAlbum({
            filePath: this.data.shareImg,
            success: function(a) {
                console.log(a), wx.hideLoading(), wx.showToast({
                    title: "保存成功",
                    type: "success",
                    duration: 1500
                });
            },
            fail: function(a) {
                s.toPreviewImage(), wx.hideLoading();
            },
            complete: function(a) {}
        });
    },
    toPreviewImage: function() {
        var a = this.data.shareImg;
        wx.previewImage({
            urls: [ a ],
            success: function(a) {},
            fail: function() {},
            complete: function() {}
        });
    }
});

var d = function(a) {
    return wx.showToast({
        title: a,
        image: "../../images/common/fail.png",
        duration: 1500
    });
};
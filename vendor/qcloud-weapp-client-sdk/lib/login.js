var e = require("./utils"), n = require("./constants"), o = require("./session"), s = require("../../../config"), r = function() {
    function e(e, n) {
        Error.call(this, n), this.type = e, this.message = n;
    }
    return e.prototype = new Error(), e.prototype.constructor = e, e;
}(), i = function(e) {
    wx.login({
        success: function(o) {
            wx.getUserInfo({
                success: function(n) {
                    console.log("userResult", n), e(null, {
                        code: o.code,
                        encryptedData: n.encryptedData,
                        iv: n.iv,
                        userInfo: n.userInfo
                    });
                },
                fail: function(o) {
                    var s = new r(n.ERR_WX_GET_USER_INFO, "获取微信用户信息失败，请检查网络状态");
                    s.detail = o, e(s, null);
                }
            });
        },
        fail: function(o) {
            var s = new r(n.ERR_WX_LOGIN_FAILED, "微信登录失败，请检查网络状态");
            s.detail = o, e(s, null);
        }
    });
}, t = function() {}, l = {
    method: "GET",
    success: t,
    fail: t,
    loginUrl: null
};

module.exports = {
    LoginError: r,
    login: function(t) {
        if (t = e.extend({}, l, t), console.log("login", t), l.loginUrl) {
            var a = function() {
                return i(function(e, i) {
                    if (console.log("dologin", e, i), e) t.fail(e); else {
                        var l = i.userInfo, a = i.code, c = i.encryptedData, u = i.iv, f = {};
                        f[n.WX_HEADER_CODE] = a, f[n.WX_HEADER_ENCRYPTED_DATA] = c, f[n.WX_HEADER_IV] = u, 
                        f["x-wxa-ver"] = s.service.version, f["x-vrp-rid"] = getApp().globalData.rid, f["x-vrp-page"] = getApp().globalData.curPage, 
                        f["x-vrp-pageval"] = getApp().globalData.pageVal, wx.request({
                            url: t.loginUrl,
                            header: f,
                            method: t.method,
                            data: t.data,
                            success: function(e) {
                                var s = e.data;
                                if (s && s[n.WX_SESSION_MAGIC_ID]) if (s.session) s.session.userInfo = l, o.set(s.session), 
                                t.success(l); else {
                                    var i = "登录失败(" + s.error + ")：" + (s.message || "未知错误"), a = new r(n.ERR_LOGIN_SESSION_NOT_RECEIVED, i);
                                    t.fail(a);
                                } else {
                                    var i = "登录请求没有包含会话响应，请确保服务器处理 `" + t.loginUrl + "` 的时候正确使用了 SDK 输出登录结果", a = new r(n.ERR_LOGIN_SESSION_NOT_RECEIVED, i);
                                    t.fail(a);
                                }
                            },
                            fail: function(e) {
                                var o = new r(n.ERR_LOGIN_FAILED, "登录失败，可能是网络错误或者服务器发生异常");
                                t.fail(o);
                            }
                        });
                    }
                });
            }, c = o.get();
            c ? wx.checkSession({
                success: function() {
                    t.success(c.userInfo);
                },
                fail: function() {
                    o.clear(), a();
                }
            }) : a();
        } else t.fail(new r(n.ERR_INVALID_PARAMS, "登录错误：缺少登录地址，请通过 setLoginUrl() 方法设置登录地址"));
    },
    setLoginUrl: function(e) {
        l.loginUrl = e;
    }
};
var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = require("./constants"), r = require("./utils"), t = require("./session"), n = require("./login"), i = function() {}, l = function(e) {
    var r = {};
    return e && e.id && e.skey && (r[o.WX_HEADER_ID] = e.id, r[o.WX_HEADER_SKEY] = e.skey), 
    r;
}, u = function() {
    function e(e, o) {
        Error.call(this, o), this.type = e, this.message = o;
    }
    return e.prototype = new Error(), e.prototype.constructor = e, e;
}();

module.exports = {
    RequestError: u,
    request: function(s) {
        function c() {
            n.login({
                success: f,
                fail: m
            });
        }
        function f() {
            var e = l(t.get());
            wx.request(r.extend({}, s, {
                header: r.extend({}, _, e),
                success: function(e) {
                    var r = e.data;
                    if (r && r[o.WX_SESSION_MAGIC_ID]) {
                        t.clear();
                        var n, i;
                        if (r.error === o.ERR_INVALID_SESSION) {
                            if (!I) return I = !0, void c();
                            i = "登录态已过期", n = new u(r.error, i);
                        } else i = "鉴权服务器检查登录态发生错误(" + (r.error || "OTHER") + ")：" + (r.message || "未知错误"), 
                        n = new u(o.ERR_CHECK_LOGIN_FAILED, i);
                        m(n);
                    } else S.apply(null, arguments);
                },
                fail: m,
                complete: i
            }));
        }
        if ("object" !== (void 0 === s ? "undefined" : e(s))) {
            var a = "请求传参应为 object 类型，但实际传了 " + (void 0 === s ? "undefined" : e(s)) + " 类型";
            throw new u(o.ERR_INVALID_PARAMS, a);
        }
        var p = s.login, y = s.success || i, E = s.fail || i, d = s.complete || i, _ = s.header || {}, S = function() {
            y.apply(null, arguments), d.apply(null, arguments);
        }, m = function(e) {
            console.log("here", e), E.call(null, e), d.call(null, e);
        }, I = !1;
        p ? c() : f();
    }
};
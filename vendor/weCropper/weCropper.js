var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(e, o) {
    "object" === ("undefined" == typeof exports ? "undefined" : t(exports)) && "undefined" != typeof module ? module.exports = o() : "function" == typeof define && define.amd ? define(o) : e.weCropper = o();
}(void 0, function() {
    function e(t) {
        return t.charAt(0).toUpperCase() + t.slice(1);
    }
    function o(t) {
        for (var e = arguments.length, o = Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++) o[n - 1] = arguments[n];
        u.forEach(function(e, n) {
            void 0 !== o[n] && (t[e] = o[n], t[e] && (r = e));
        });
    }
    function n(t, e) {
        Object.defineProperties(t, e);
    }
    function i() {
        return a || (a = wx.getSystemInfoSync()), a;
    }
    var r = "touchended", c = 1, a = void 0, u = [ "touchstarted", "touchmoved", "touchended" ], d = "function" == typeof Symbol && "symbol" === t(Symbol.iterator) ? function(e) {
        return void 0 === e ? "undefined" : t(e);
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
    }, s = function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }, l = function() {
        function t(t, e) {
            for (var o = 0; o < e.length; o++) {
                var n = e[o];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                Object.defineProperty(t, n.key, n);
            }
        }
        return function(e, o, n) {
            return o && t(e.prototype, o), n && t(e, n), e;
        };
    }(), f = function() {
        function t(t, e) {
            var o = [], n = !0, i = !1, r = void 0;
            try {
                for (var c, a = t[Symbol.iterator](); !(n = (c = a.next()).done) && (o.push(c.value), 
                !e || o.length !== e); n = !0) ;
            } catch (t) {
                i = !0, r = t;
            } finally {
                try {
                    !n && a.return && a.return();
                } finally {
                    if (i) throw r;
                }
            }
            return o;
        }
        return function(e, o) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return t(e, o);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        };
    }(), h = {}, g = {
        id: {
            default: "cropper",
            get: function() {
                return h.id;
            },
            set: function(t) {
                "string" != typeof t && console.error("id：" + t + " is invalid"), h.id = t;
            }
        },
        width: {
            default: 750,
            get: function() {
                return h.width;
            },
            set: function(t) {
                "number" != typeof t && console.error("width：" + t + " is invalid"), h.width = t;
            }
        },
        height: {
            default: 750,
            get: function() {
                return h.height;
            },
            set: function(t) {
                "number" != typeof t && console.error("height：" + t + " is invalid"), h.height = t;
            }
        },
        scale: {
            default: 2.5,
            get: function() {
                return h.scale;
            },
            set: function(t) {
                "number" != typeof t && console.error("scale：" + t + " is invalid"), h.scale = t;
            }
        },
        zoom: {
            default: 5,
            get: function() {
                return h.zoom;
            },
            set: function(t) {
                "number" != typeof t ? console.error("zoom：" + t + " is invalid") : (t < 0 || t > 10) && console.error("zoom should be ranged in 0 ~ 10"), 
                h.zoom = t;
            }
        },
        src: {
            default: "cropper",
            get: function() {
                return h.src;
            },
            set: function(t) {
                "string" != typeof t && console.error("id：" + t + " is invalid"), h.src = t;
            }
        },
        cut: {
            default: {},
            get: function() {
                return h.cut;
            },
            set: function(t) {
                "object" !== (void 0 === t ? "undefined" : d(t)) && console.error("id：" + t + " is invalid"), 
                h.cut = t;
            }
        },
        onReady: {
            default: null,
            get: function() {
                return h.ready;
            },
            set: function(t) {
                h.ready = t;
            }
        },
        onBeforeImageLoad: {
            default: null,
            get: function() {
                return h.beforeImageLoad;
            },
            set: function(t) {
                h.beforeImageLoad = t;
            }
        },
        onImageLoad: {
            default: null,
            get: function() {
                return h.imageLoad;
            },
            set: function(t) {
                h.imageLoad = t;
            }
        },
        onBeforeDraw: {
            default: null,
            get: function() {
                return h.beforeDraw;
            },
            set: function(t) {
                h.beforeDraw = t;
            }
        }
    }, v = {
        touchStart: function(t) {
            var e = this, n = f(t.touches, 2), i = n[0], r = n[1];
            o(e, !0, null, null), e.__oneTouchStart(i), t.touches.length >= 2 && e.__twoTouchStart(i, r);
        },
        touchMove: function(t) {
            var e = this, n = f(t.touches, 2), i = n[0], r = n[1];
            o(e, null, !0), 1 === t.touches.length && e.__oneTouchMove(i), t.touches.length >= 2 && e.__twoTouchMove(i, r);
        },
        touchEnd: function(t) {
            var e = this;
            o(e, !1, !1, !0), e.__xtouchEnd();
        }
    }, p = function() {
        function t(e) {
            s(this, t);
            var o = this, i = {};
            return n(o, g), Object.keys(g).forEach(function(t) {
                i[t] = g[t].default;
            }), Object.assign(o, i, e), o.prepare(), o.attachPage(), o.createCtx(), o.observer(), 
            o.cutt(), o.methods(), o.init(), o.update(), o;
        }
        return l(t, [ {
            key: "init",
            value: function() {
                var t = this, e = t.src;
                return t.version = "1.1.4", "function" == typeof t.onReady && t.onReady(t.ctx, t), 
                e && t.pushOrign(e), o(t, !1, !1, !1), t.oldScale = 1, t.newScale = 1, t;
            }
        } ]), t;
    }();
    return Object.assign(p.prototype, v), p.prototype.prepare = function() {
        var t = this, e = i().windowWidth;
        t.attachPage = function() {
            var e = getCurrentPages();
            e[e.length - 1].wecropper = t;
        }, t.createCtx = function() {
            var e = t.id;
            e ? t.ctx = wx.createCanvasContext(e) : console.error("constructor: create canvas context failed, 'id' must be valuable");
        }, t.deviceRadio = e / 750;
    }, p.prototype.observer = function() {
        var t = this, o = [ "ready", "beforeImageLoad", "beforeDraw", "imageLoad" ];
        t.on = function(n, i) {
            return o.indexOf(n) > -1 ? "function" == typeof i && ("ready" === n ? i(t) : t["on" + e(n)] = i) : console.error("event: " + n + " is invalid"), 
            t;
        };
    }, p.prototype.methods = function() {
        var t = this, e = t.deviceRadio, o = t.width, n = t.height, i = t.cut, r = i.x, a = void 0 === r ? 0 : r, u = i.y, d = void 0 === u ? 0 : u, s = i.width, l = void 0 === s ? o : s, f = i.height, h = void 0 === f ? n : f;
        t.updateCanvas = function() {
            return t.croperTarget && t.ctx.drawImage(t.croperTarget, t.imgLeft, t.imgTop, t.scaleWidth, t.scaleHeight), 
            "function" == typeof t.onBeforeDraw && t.onBeforeDraw(t.ctx, t), t.setBoundStyle(), 
            t.ctx.draw(), t;
        }, t.pushOrign = function(e) {
            return t.src = e, "function" == typeof t.onBeforeImageLoad && t.onBeforeImageLoad(t.ctx, t), 
            wx.getImageInfo({
                src: e,
                success: function(e) {
                    var o = e.width / e.height;
                    t.croperTarget = e.path, console.log(a, d), o < l / h ? (t.rectX = a, t.baseWidth = l, 
                    t.baseHeight = l / o, t.rectY = d - Math.abs((h - t.baseHeight) / 2), c = l / e.width) : (t.rectY = d, 
                    t.baseWidth = h * o, t.baseHeight = h, t.rectX = a - Math.abs((l - t.baseWidth) / 2), 
                    c = h / e.height), t.imgLeft = t.rectX, t.imgTop = t.rectY, t.scaleWidth = t.baseWidth, 
                    t.scaleHeight = t.baseHeight, t.updateCanvas(), "function" == typeof t.onImageLoad && t.onImageLoad(t.ctx, t);
                }
            }), t.update(), t;
        }, t.getCropperImage = function() {
            for (var o = arguments.length, n = Array(o), i = 0; i < o; i++) n[i] = arguments[i];
            var r = t.id;
            switch (toString.call(n[1])) {
              case "[object Object]":
                var u = n[1].quality, s = void 0 === u ? 10 : u;
                "number" != typeof s ? console.error("quality：" + s + " is invalid") : (s < 0 || s > 10) && console.error("quality should be ranged in 0 ~ 10"), 
                wx.canvasToTempFilePath({
                    canvasId: r,
                    x: a,
                    y: d,
                    width: l,
                    height: h,
                    destWidth: l * s / (10 * e),
                    destHeight: h * s / (10 * e),
                    success: function(t) {
                        "function" == typeof n[n.length - 1] && n[n.length - 1](t.tempFilePath);
                    }
                });
                break;

              case "[object Function]":
                var f = n[0];
                if ("position" == f) {
                    var g = c * t.oldScale, v = {
                        x: parseInt((a - t.imgLeft) / g),
                        y: parseInt((d - t.imgTop) / g),
                        width: parseInt(l / g),
                        height: parseInt(h / g)
                    };
                    "function" == typeof n[n.length - 1] && n[n.length - 1](v);
                } else "image" == f && wx.canvasToTempFilePath({
                    canvasId: r,
                    x: a,
                    y: d,
                    width: l,
                    height: h,
                    destWidth: l / e,
                    destHeight: h / e,
                    success: function(t) {
                        "function" == typeof n[n.length - 1] && n[n.length - 1](t.tempFilePath);
                    }
                });
            }
            return t;
        };
    }, p.prototype.cutt = function() {
        var t = this, e = (t.deviceRadio, t.width), o = t.height, n = t.cut, c = n.x, a = void 0 === c ? 0 : c, u = n.y, d = void 0 === u ? 0 : u, s = n.width, l = void 0 === s ? e : s, f = n.height, h = void 0 === f ? o : f;
        t.outsideBound = function(e, o) {
            t.imgLeft = e >= a ? a : t.scaleWidth + e - a <= l ? a + l - t.scaleWidth : e, t.imgTop = o >= d ? d : t.scaleHeight + o - d <= h ? d + h - t.scaleHeight : o;
        }, t.setBoundStyle = function() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, c = n.color, u = void 0 === c ? "white" : c, s = n.mask, f = void 0 === s ? "rgba(0, 0, 0, 0.8)" : s, g = n.lineWidth, v = void 0 === g ? 2 : g;
            if ("touchended" == r) {
                t.ctx.beginPath(), t.ctx.setFillStyle(f), t.ctx.fillRect(0, 0, a, o), t.ctx.fillRect(a, 0, l, d), 
                t.ctx.fillRect(a, d + h, l, o - d - h), t.ctx.fillRect(a + l, 0, e - a - l, o), 
                t.ctx.fill();
                var p = "移动、缩放图片进行裁剪", y = (i().windowWidth - 10 * p.length) / 2;
                t.ctx.setFontSize(12), t.ctx.setFillStyle("white"), t.ctx.fillText(p, y, 20);
            }
            for (x = 0; x < 2; x++) t.ctx.beginPath(), t.ctx.setStrokeStyle(u), t.ctx.setLineWidth(1), 
            t.ctx.moveTo(a, d + x * h), t.ctx.lineTo(a + l, d + x * h), t.ctx.stroke();
            for (var x = 0; x < 2; x++) t.ctx.beginPath(), t.ctx.setStrokeStyle(u), t.ctx.setLineWidth(1), 
            t.ctx.moveTo(a + x * l, d), t.ctx.lineTo(a + x * l, d + h), t.ctx.stroke();
            t.ctx.beginPath(), t.ctx.setStrokeStyle(u), t.ctx.setLineWidth(v), t.ctx.moveTo(a - v, d + 10 - v), 
            t.ctx.lineTo(a - v, d - v), t.ctx.lineTo(a + 10 - v, d - v), t.ctx.stroke(), t.ctx.beginPath(), 
            t.ctx.setStrokeStyle(u), t.ctx.setLineWidth(v), t.ctx.moveTo(a - v, d + h - 10 + v), 
            t.ctx.lineTo(a - v, d + h + v), t.ctx.lineTo(a + 10 - v, d + h + v), t.ctx.stroke(), 
            t.ctx.beginPath(), t.ctx.setStrokeStyle(u), t.ctx.setLineWidth(v), t.ctx.moveTo(a + l - 10 + v, d - v), 
            t.ctx.lineTo(a + l + v, d - v), t.ctx.lineTo(a + l + v, d + 10 - v), t.ctx.stroke(), 
            t.ctx.beginPath(), t.ctx.setStrokeStyle(u), t.ctx.setLineWidth(v), t.ctx.moveTo(a + l + v, d + h - 10 + v), 
            t.ctx.lineTo(a + l + v, d + h + v), t.ctx.lineTo(a + l - 10 + v, d + h + v), t.ctx.stroke();
        };
    }, p.prototype.update = function() {
        var t = this;
        t.src && (t.__oneTouchStart = function(e) {
            t.touchX0 = e.x, t.touchY0 = e.y;
        }, t.__oneTouchMove = function(e) {
            var o = void 0, n = void 0;
            if (t.touchended) return t.updateCanvas();
            o = e.x - t.touchX0, n = e.y - t.touchY0;
            var i = t.rectX + o, r = t.rectY + n;
            t.outsideBound(i, r), t.updateCanvas();
        }, t.__twoTouchStart = function(e, o) {
            var n = void 0, i = void 0, r = void 0;
            t.touchX1 = t.rectX + t.scaleWidth / 2, t.touchY1 = t.rectY + t.scaleHeight / 2, 
            n = o.x - e.x, i = o.y - e.y, r = Math.sqrt(n * n + i * i), t.oldDistance = r;
        }, t.__twoTouchMove = function(e, o) {
            var n = void 0, i = void 0, r = void 0, c = t.scale, a = t.zoom;
            n = o.x - e.x, i = o.y - e.y, r = Math.sqrt(n * n + i * i), t.newScale = t.oldScale + .001 * a * (r - t.oldDistance), 
            t.newScale <= 1 && (t.newScale = 1), t.newScale >= c && (t.newScale = c), t.scaleWidth = t.newScale * t.baseWidth, 
            t.scaleHeight = t.newScale * t.baseHeight;
            var u = t.touchX1 - t.scaleWidth / 2, d = t.touchY1 - t.scaleHeight / 2;
            t.outsideBound(u, d), t.updateCanvas();
        }, t.__xtouchEnd = function() {
            t.oldScale = t.newScale, t.rectX = t.imgLeft, t.rectY = t.imgTop, t.updateCanvas();
        });
    }, p;
});
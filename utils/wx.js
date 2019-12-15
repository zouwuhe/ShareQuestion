function n(n, o) {
    if (!(n instanceof o)) throw new TypeError("Cannot call a class as a function");
}

var o, t, e = Object.assign || function(n) {
    for (var o = 1; o < arguments.length; o++) {
        var t = arguments[o];
        for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (n[e] = t[e]);
    }
    return n;
}, i = function() {
    function n(n, o) {
        for (var t = 0; t < o.length; t++) {
            var e = o[t];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(n, e.key, e);
        }
    }
    return function(o, t, e) {
        return t && n(o.prototype, t), e && n(o, e), o;
    };
}(), r = require("../config.js"), u = function() {
    function u() {
        n(this, u), this.audioContext = null, this.stopCallBack = null, this.record = wx.getRecorderManager();
    }
    return i(u, [ {
        key: "authorize",
        value: function(n) {
            return new Promise(function(o, t) {
                wx.authorize({
                    scope: n,
                    success: function() {
                        o(!0);
                    },
                    fail: function(n) {
                        t(n);
                    }
                });
            });
        }
    }, {
        key: "openSetting",
        value: function() {
            return new Promise(function(n, o) {
                wx.openSetting({
                    success: function() {
                        n();
                    },
                    fail: function() {
                        o();
                    }
                });
            });
        }
    }, {
        key: "getSetting",
        value: function(n) {
            return new Promise(function(o, t) {
                wx.getSetting({
                    success: function(e) {
                        e.errMsg.match(/ok/g) ? n ? e.authSetting[n] ? o() : t() : o(e.authSetting) : t();
                    },
                    fail: function(n) {
                        console.log(n), t(n);
                    }
                });
            });
        }
    }, {
        key: "saveFile",
        value: function(n) {
            return new Promise(function(o, t) {
                wx.saveFile({
                    tempFilePath: n,
                    success: function(n) {
                        n.errMsg.match(/ok/) && o(n.savedFilePath);
                    },
                    fail: function(n) {
                        console.log(n), t(n);
                    }
                });
            });
        }
    }, {
        key: "startRecord",
        value: function() {
            return new Promise(function(n, o) {
                wx.startRecord({
                    success: function(t) {
                        t.errMsg.match(/ok/) ? n(t.tempFilePath) : o();
                    },
                    fail: function() {
                        o();
                    }
                });
            });
        }
    }, {
        key: "uploadFile",
        value: function(n) {
            return new Promise(function(o, t) {
                wx.uploadFile(e({}, n, {
                    success: function(n) {
                        o(n);
                    },
                    fail: function() {
                        t();
                    }
                }));
            });
        }
    }, {
        key: "downloadFile",
        value: function(n) {
            return new Promise(function(o, i) {
                t = wx.downloadFile(e({}, n, {
                    success: function(n) {
                        200 === n.statusCode ? o(n) : i();
                    },
                    fail: function(n) {
                        i(n);
                    }
                }));
            });
        }
    }, {
        key: "playVoice",
        value: function(n) {
            var o = this, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            return null != this.audioContext && this.audioContext.destroy(), this.audioContext = wx.createInnerAudioContext(), 
            "function" == typeof wx.setInnerAudioOption && wx.setInnerAudioOption({
                obeyMuteSwitch: !1
            }), t && (this.stopCallBack = t), console.log("path", n), this.audioContext && this.audioContext.destroy(), 
            this.audioContext = wx.createInnerAudioContext(), new Promise(function(e, i) {
                console.log("startPlay"), o.audioContext.src = n, o.audioContext.play(), o.audioContext.onPlay(function(n) {
                    console.log(n, "开始播放");
                }), o.audioContext.onStop(function(n) {
                    console.log("停止播放"), t && t();
                }), o.audioContext.onEnded(function(n) {
                    console.log(n, "播放结束"), e();
                }), o.audioContext.onError(function(n) {
                    console.log(n), i();
                });
            });
        }
    }, {
        key: "recorderOnStart",
        value: function(n) {
            n.onStart(function() {
                console.log("recorder start");
            });
        }
    }, {
        key: "recorderStart",
        value: function() {
            var n = this;
            return console.log("**recordStart"), new Promise(function(o, t) {
                var e = {
                    sampleRate: r.sampleRate,
                    numberOfChannels: 1,
                    encodeBitRate: r.encodeBitRate,
                    format: "mp3"
                };
                n.record.start(e), n.record.onStart(function(n) {
                    o({
                        code: 1001,
                        msg: "start Recorde"
                    });
                }), n.record.onError(function(n) {
                    t({
                        code: 500,
                        msg: n
                    });
                });
            });
        }
    }, {
        key: "recorderStop",
        value: function() {
            var n = this;
            return console.log("**recordStop"), new Promise(function(o, t) {
                var e = void 0, i = void 0;
                n.record.onStop(function(n) {
                    console.log("res", n), i = n.tempFilePath, e = n.duration, o({
                        tempFilePath: i,
                        duration: e
                    });
                }), n.record.stop();
            });
        }
    }, {
        key: "onPlayVoice",
        value: function(n) {
            "function" == typeof n && (o = n);
        }
    }, {
        key: "stopVoice",
        value: function() {
            null != this.audioContext && this.audioContext.stop();
        }
    } ]), u;
}();

module.exports = new u();
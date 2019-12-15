var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../utils/util"));

Component({
    properties: {
        qaItem: {
            type: Object,
            observer: "qaChange"
        },
        showChecker: {
            type: Boolean,
            observer: "doShowChecker"
        }
    },
    data: {
        qa: {},
        show: !1,
        rangeOption: [],
        rangeCur: [],
        provinces: a.default.province,
        province: "北京",
        citys: [],
        city: "北京市",
        recordPro: ""
    },
    methods: {
        dowShowChecker: function(a) {
            console.log("showChecker", a), this.data.show = a, this.setData({
                show: this.data.show
            });
        },
        qaChange: function(t) {
            if (null != t) if (console.log("qaChange", t), this.data.recordPro = "", this.data.qa = JSON.parse(JSON.stringify(t)), 
            this.setData({
                qa: this.data.qa,
                show: !0
            }), "normal" == this.data.qa.type) this.data.qa.answer = "0"; else if ("range" == this.data.qa.type) this.dealRangeOption(this.data.qa.options); else if ("location" == this.data.qa.type) {
                this.data.citys = a.default.changeProvince(this.data.provinces[this.data.qa.answer ? this.data.qa.answer[0] : 0]);
                var i = [ 0, 0 ];
                this.data.qa.answer = [ i[0], i[1] ], this.data.qa.desc = this.data.provinces[i[0]] + "," + this.data.citys[i[1]].citysName, 
                this.setData({
                    citys: this.data.citys
                });
            }
        },
        bindChangeRange: function(a) {
            var t = a.detail.value;
            this.data.qa.answer = [], console.log(a.detail.value), console.log(this.data.rangeOption);
            var i = "";
            for (var e in this.data.rangeOption) this.data.qa.answer.push(this.data.rangeOption[e].option[t[e]]), 
            i += "" + this.data.rangeOption[e].option[t[e]] + this.data.rangeOption[e].unit;
            this.data.qa.value = t, this.data.qa.desc = i;
        },
        catchtap: function(a) {},
        cancel: function() {
            this.setData({
                show: !1
            });
        },
        confirm: function() {
            console.log("confirm"), this.setData({
                show: !1
            }), this.triggerEvent("confirm", this.data.qa);
        },
        bindChoose: function(a) {
            var t = a.detail.value;
            this.data.qa.answer = t;
        },
        dealRangeOption: function(a) {
            this.data.rangeOption = [], this.data.rangeCur = [], this.setData({
                rangeOption: this.data.rangeOption,
                rangeCur: this.data.rangeCur
            });
            var t = a;
            for (var i in t) {
                for (var e = [], s = 0, n = parseInt(t[i].start); n <= parseInt(t[i].end); n++) e.push(n);
                s = t[i].cur - t[i].start;
                var r = {
                    option: e,
                    unit: t[i].unit,
                    cur: s
                };
                this.data.rangeCur.push(s), this.data.rangeOption.push(r);
            }
            this.data.qa.value && (this.data.rangeCur = this.data.qa.value), console.log("rangOption", this.data.rangeOption), 
            this.setData({
                rangeOption: this.data.rangeOption,
                rangeCur: this.data.rangeCur
            });
            var o = {
                detail: {
                    value: this.data.rangeCur
                }
            };
            this.bindChangeRange(o);
        },
        bindChangeProvince: function(t) {
            var i = t.detail.value;
            this.data.recordPro != i[0] && this.setData({
                citys: a.default.changeProvince(this.data.provinces[i[0]])
            }), this.data.recordPro = i[0], this.data.qa.answer = [ i[0], i[1] ], this.data.qa.desc = this.data.provinces[i[0]] + "," + this.data.citys[i[1]].citysName, 
            this.setData({
                qa: this.data.qa
            });
        }
    }
});
Component({
    properties: {
        needAuth: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        success: ""
    },
    methods: {
        bindgetuserinfo: function(e) {
            "getUserInfo:ok" === e.detail.errMsg ? (this.setData({
                nickName: e.detail.userInfo.nickName,
                avatarUrl: e.detail.userInfo.avatarUrl
            }), wx.setStorageSync("nickName", e.detail.userInfo.nickName), wx.setStorageSync("avatarUrl", e.detail.userInfo.avatarUrl), 
            this.triggerEvent("authevent", e.detail)) : this.triggerEvent("authfailevent", e.detail);
        }
    }
});
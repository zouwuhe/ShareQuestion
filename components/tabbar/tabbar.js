var e = getApp();

Component({
    properties: {
        tabbar: {
            type: Object,
            value: {
                backgroundColor: "#f7f7fa",
                color: "rgb(136, 136, 136)",
                selectedColor: "#F5535E",
                list: [ {
                    pagePath: "/pages/index/index",
                    iconPath: "../../images/home_redpack_default.png",
                    selectedIconPath: "../../images/home_redpack_active.png",
                    text: "发红包"
                }, {
                    pagePath: "/pages/logs/logs",
                    iconPath: "../../images/more.png",
                    selectedIconPath: "../../images/more_active.png",
                    text: "更多好玩"
                }, {
                    pagePath: "/pages/mine/mine",
                    iconPath: "../../images/ic_my_default.png",
                    selectedIconPath: "../../images/ic_my_active.png",
                    text: "我的"
                } ]
            }
        }
    },
    data: {
        ifIphoneX: !!e.globalData.ifIphoneX
    },
    methods: {}
});
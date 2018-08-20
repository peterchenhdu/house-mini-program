const app = getApp();

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
    }
  },
  data: {
    charts: [{
      id: 'bar1',
      name: '挂牌签约/时'
    }, {
        id: 'bar2',
      name: '挂牌均价/天'
    }, {
        id: 'bar3',
      name: '挂牌签约/天'
    }, {
        id: 'bar4',
      name: '累计挂牌/天'
    }]
  },

  onReady() {
  },

  open: function (e) {
    wx.navigateTo({
      url: '../' + e.target.dataset.chart.id + '/index'
    });
  }
});

import * as echarts from '../../ec-canvas/echarts';

const util = require('../../utils/util.js');
const api = require('../../config/api.js');

let chart = null;



function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var xAxisData = [];
  var data1 = [];
  var data2 = [];

  var option = {
    color: ['#ED1C24', '#00B26A'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['挂牌', '签约']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: xAxisData,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '挂牌',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: data1,
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      {
        name: '签约',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: data2,
        // itemStyle: {
        //   emphasis: {
        //     color: '#00B26A'
        //   }
        // }
      }
    ]
  };
  chart.showLoading();
  util.request(api.GetLast24HourUrl, {}, "POST").then(function (res) {
    if (res.code === '0000') {
      var result = res.data;
      for (var i = result.length -1 ; i >=0; i--) {
        xAxisData.push(result[i].hour);
      }
      for (var i = result.length - 1; i >= 0; i--) {
        data2.push(result[i].todaySign);
        data1.push(result[i].todayListCount);
      }
      chart.hideLoading();
      chart.setOption(option);
    }
  });

  
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },
  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  }
});

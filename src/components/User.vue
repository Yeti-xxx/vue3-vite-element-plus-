<template>
  <div class="userMain">
    <el-card class="box-card">
      <div class="block">
        <el-avatar class="avater" :size="70" :src="userInfo.user_pic" />
        <span class="nickname">{{ userInfo.nickname }}</span>
        <span class="email">邮箱：{{ userInfo.email }}</span>
      </div>

    </el-card>
    <div class="map">
      <div id="main" style="width: 100%; height: 400px;">
      </div>
    </div>
  </div>
</template>

<script>
import service from '../axiosChange/axiosconfig.js'
import * as echarts from "echarts"
import { onMounted } from 'vue';
// import from '../lib/echarts.js'
export default {
  name: 'User',
  data() {
    return {
      userInfo: {

      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      service({
        methods: 'get',
        url: '/my/userinfo'
      }).then(res => {
        if (res.data.status !== 0) {
          return this.$message.error('获取用户信息失败')
        } else {
          this.userInfo = res.data.data

        }
      })
    }
  },
  setup() {
    //methods
    const echartInit = () => {
      var myChart = echarts.init(document.getElementById('main'));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '本月数据'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['用户数量', '文章数量']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          
        },
        series: [
          {
            name: '用户数量',
            type: 'line',
            data: [12078, 13209, 14044, 16078, 19560, 23075, 27056]
          },
          {
            name: '文章数量',
            type: 'line',
            data: [3104, 4409, 4207, 5200, 2156, 6105, 4556]
          }

        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
    //onMounted
    onMounted(() => {
      echartInit()
    })
    //return
    return {
      echartInit
    };
  }


}

</script>

<style lang='less' scoped>
.box-card {
  width: 1280px;
  height: 200px;
  background: url('../assets/img/userBack.webp')
}

.userMain {
  height: 100%;
}

.block {
  position: relative;
  margin-top: 103px;
}

.nickname {
  position: absolute;
  color: #fff;
  font-size: 19px;
  top: 7px;
  left: 83px;
}

.email {
  position: absolute;
  color: #000;
  top: 36px;
  left: 83px;
  font-size: 10px;
}

.map {
  margin-top: 80px;
}
</style>

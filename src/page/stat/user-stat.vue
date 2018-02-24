<template>
  <div id="statistical-index">
    <title-bar title="统计首页" @refresh="refresh"></title-bar>
    <Row :gutter="20" type="flex" style="margin-bottom: 20px;">
      <Col class="card-col" span="12">
        <Card>
          <h2 class="card-title">总注册用户</h2>
          <p class="card-number">{{ BigCount.all_reg_count }}人</p>
          <div class="card-content">
            <p class="info-txt">
                <span class="half">
                  <span class="label">总付费用户</span>
                  <span class="value">{{ BigCount.all_recharge_count }} 人</span>
                </span>
              <span class="half">
                  <span class="label">总提现用户</span>
                  <span class="value">{{ BigCount.all_withdraw_count }} 人</span>
                </span>
            </p>
          </div>
          <div class="card-footer">
          </div>
        </Card>
      </Col>
      <Col class="card-col" span="12">
        <Card>
          <h2 class="card-title">总利润</h2>
          <p class="card-number">{{ BigCount.all_profit }}元</p>
          <div class="card-content">
            <p class="info-txt">
                <span class="half">
                  <span class="label">总充值金额</span>
                  <span class="value">{{ BigCount.all_recharge }} 元</span>
                </span>
              <span class="half">
                  <span class="label">总提现金额</span>
                  <span class="value">{{ BigCount.all_withdraw }} 元</span>
                </span>
            </p>
          </div>
          <div class="card-footer">
          </div>
        </Card>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col :span="12">
        <Card>
          <p class="chart-tit" slot="title">总计</p>
          <Row :gutter="10">
            <Col v-for="item in TodayCount" :key="item.tips" class="count-info" :span="12">
            <div class="record">
              <span class="icon-box"><Icon :type="item.icon"></Icon></span>
              <div class="info-box">
                <p class="num">{{item.value}}</p>
                <p class="tips">{{item.tips}}</p>
              </div>
            </div>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col :span="12">
        <Card>
          <p ref="PieTitle" class="chart-tit" slot="title">用户年龄段分布</p>
          <div id="pieChart" class="chart-box" :style="{width: chartWidth+'px'}"></div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import qs from 'qs'
  import {formateDate, copyObj} from '@/utils/common'

  export default {
    name: 'withdraw-stat',
    data () {
      return {
        title: '统计首页',
        auth_id: '',
        avg_sum: '',
        BigCount: {
          all_reg_count: '',
          all_recharge_count: '',
          all_withdraw_count: '',
          all_profit: '',
          all_recharge: '',
          all_withdraw: ''
        },
        TodayCount:[{
          id: 'today_reg_count',
          icon: 'ios-list',
          tips: '今日注册用户',
          value: '0'
        },{
          id: 'today_recharge_money',
          icon: 'social-usd',
          tips: '今日充值金额',
          value: '0'
        },{
          id: 'today_recharge_count',
          icon: 'ios-list',
          tips: '今日充值人数',
          value: '0'
        },{
          id: 'today_recharge_money',
          icon: 'social-usd',
          tips: '今日提现金额',
          value: '0'
        },{
          id: 'today_withdraw_count',
          icon: 'ios-list',
          tips: '今日提现人数',
          value: '0'
        }],
        chartWidth: '',
        options: {
          title : {
            text: '用户年龄段分布',
            x:'center'
          },
          color: ['#85B5E7','#434347','#A7E989','#EDA568','#7E88E3','#E16681','#E3D269','#488E8E','#E46560','#A3E6E1'],
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: []
          },
          series : [
            {
              name: '年龄段',
              type: 'pie',
              radius : '75%',
              center: ['50%', '45%'],
              data:[
                {value:1, name:'支付宝'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    mounted(){
      this.InitData();
      this.chartWidth = this.$refs['PieTitle'].offsetWidth;
    },
    methods: {
      //初始化数据
      refresh(){
        this.InitData();
      },
      InitData(){
        //列表数据获取
        this.getStatDetail();
      },
      DrawChart(){
        let PieChart = echarts.init(document.getElementById('pieChart'));
        PieChart.setOption(this.options, true);
      },
      getStatDetail(){
        this.axios.get(`front-detail`).then((d)=>{
          let res = d.data.detail;
          if(d.status === 1){
            Object.keys(this.BigCount).forEach(index=>{
              this.BigCount[index] = res[index];
            });
            Object.values(this.TodayCount).forEach((val, index)=>{
              this.TodayCount[index].value = res[val.id];
            });
            let age_data = [],
                legend_data = [];
            res.age_reg_chart.forEach(val=>{
              age_data.push({
                name: val.age,
                value: val.value
              });
              legend_data.push(val.age);
            });
            this.options.legend.data = legend_data;
            this.options.series[0].data = age_data;
            this.DrawChart();
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card-col{
    padding-bottom: 10px;
  }
  .card-title{
    color: rgba(0, 0, 0, 0.45);
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
  }
  .card-number{
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.85);
    margin: 20px 0;
    font-size: 36px;
    line-height: 50px;
  }
  .card-content{
    margin-bottom: 12px;
    position: relative;
    width: 100%;
    height: 42px;
    .info-txt{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      flex-direction: row;
      color: #333;
      .half{
        width: 50%;
        color: #333;
        .value{
          margin-left:8px;
        }
      }
    }
  }
  .card-footer{
    border-top: 1px solid #e8e8e8;
    padding-top: 9px;
    margin-top: 8px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
    .value{
      margin: 0 8px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .pie-box{
    margin-top: 10px;
  }
  .chart-tit{
    width: 100%;
    font-size: 18px;
  }
  .count-all{
    width: 100%;
    border: 1px solid #e3e3e3;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .single{
      width: 50%;
      display: block;
      font-size: 14px;
      padding-bottom: 10px;
      .icon{
        font-size: 40px;
        padding: 0 8px;
        color: #259bf1;
      }
      .text{
        display: inline-block;
        margin-bottom: 5px;
      }
    }
  }
  .divide-box{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 16px;
    .side-part{
      width: 48%;
      border: 1px solid #e3e3e3;
      padding: 10px;
      border-radius: 5px;
      .sub-title{
        font-size: 20px;
        padding: 0 0 10px 10px;
      }
      .line{
        font-size: 14px;
        padding-bottom: 5px;
        text-align: center;
        .icon{
          font-size: 40px;
          padding: 0 8px;
          color: #259bf1;
        }
      }
    }
  }
  .chart-out{
    display: inline-block;
  }
  .count-info{
    padding: 0 10px;
    .record{
      padding-top: 10px;
      border-bottom: 2px solid #e3e3e3;
      .icon-box{
        width: 60px;
        margin-bottom: -2px;
        display: inline-block;
        height: 60px;
        text-align: center;
        font-size: 40px;
        color: #259bf1;
        border-bottom: 2px solid #259bf1;
      }
      .info-box{
        display: inline-block;
        padding-left: 20px;
        .num{
          font-size: 20px;
        }
      }
    }
  }
  .search-data{
    display: flex;
    flex-direction: row-reverse;
    padding-bottom: 20px;
  }
  .search-data .chose-box{
    margin-right: 20px;
  }
  .search-data .chose-box .single{
    cursor: pointer;
    display: inline-block;
    line-height: 35px;
    height: 35px;
    font-size: 14px;
    width: 60px;
    text-align: center;
    border-radius: 5px;
  }
  .search-data .chose-box .single.cur,.search-data .chose-box .single:hover{
    color: #1890ff;
  }
  .chart-box{
    height: 250px;
  }
</style>

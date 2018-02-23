<template>
  <div id="recharge-stat">
    <title-bar title="用户秘币消费统计" @refresh="refresh"></title-bar>
    <Row type="flex" justify="space-between">
      <Col span="8">
        <div class="chose-line">
          <Select style="width: 150px"
                  v-model="data_type"
                  @on-change="choseType">
            <Option :value="0">全部</Option>
            <Option :value="1">礼物</Option>
            <Option :value="4">偷听</Option>
            <Option :value="5">普通通话</Option>
            <Option :value="6">随机电话</Option>
            <Option :value="9">聊天消息（文本）</Option>
            <Option :value="10">聊天消息（语音）</Option>
            <Option :value="11">偷听解锁头像</Option>
          </Select>
          <Select style="width: 150px;margin-left: 10px"
                  v-model="product_id" v-show="giftShow">
            <Option :value="0">全部</Option>
            <Option v-for="item in product_list" :value="item.id" :key="item.id">{{item.title}}</Option>
          </Select>
        </div>
      </Col>
      <Col span="16">
        <div class="search-data">
          <div class="range-box">
            <DatePicker :value="date_range"
                        format="yyyy-MM-dd"
                        type="daterange"
                        placement="bottom-end"
                        placeholder="选择时间"
                        @on-change="choseDate"
                        style="width: 200px"></DatePicker>
          </div>
          <div class="chose-box">
          <span class="single"
                :class="{cur: date_type.today}"
                @click="choseRange('today')">今日</span>
            <span class="single"
                  :class="{cur: date_type.yesterday}"
                  @click="choseRange('yesterday')">昨日</span>
            <span class="single"
                  :class="{cur: date_type.week}"
                  @click="choseRange('week')">本周</span>
            <span class="single"
                  :class="{cur: date_type.all}"
                  @click="choseRange('all')">全部</span>
          </div>
        </div>
      </Col>
    </Row>
    <Row id="normal-detail" :gutter="20" style="margin-bottom: 20px;">
      <Col class="card-col" :span="colWidth1">
        <Card v-show="!giftShow">
          <h2 class="card-title">消费总秘币</h2>
          <p class="card-number">{{ all_money }}元</p>
          <div class="card-footer">
          </div>
        </Card>
        <Card v-show="giftShow">
          <h2 class="card-title">礼物金额</h2>
          <p class="card-number">{{ product_data.all_money }}</p>
          <div class="card-footer">
          </div>
        </Card>
      </Col>
      <Col :span="colWidth2">
        <Card v-show="!giftShow">
          <p class="chart-tit" slot="title">详情</p>
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
        <Card v-show="giftShow">
          <p class="chart-tit" slot="title">详情</p>
          <Row :gutter="10">
            <Col v-for="item in product_data.det_list" :key="item.tips" class="count-info" :span="12">
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
      <Col span="8" v-if="pieShow">
        <Card>
          <p ref="PieTitle" class="chart-tit" slot="title">渠道占比</p>
          <div id="pieChart" class="chart-box" :style="{width: chartWidth+'px'}"></div>
        </Card>
      </Col>
    </Row>
    <Card id="normal-line" class="line-area">
      <div ref="LineTitle" class="chart-tit" slot="title">
        <div class="label">
          时间段统计
        </div>
        <div class="btn-group">
          <Select style="width: 200px"
                  v-model="time_type"
                  @on-change="choseTimeType">
            <Option :value="1">按消费秘币数</Option>
            <Option :value="2">按消费平均秘币数</Option>
            <Option :value="3">消费秘币人数</Option>
          </Select>
        </div>
      </div>
      <div id="LineChart" class="chart-box2" :style="{width: chartWidth2+'px'}"></div>
    </Card>
    <table-container title="统计列表" @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
  </div>
</template>

<script>
  import qs from 'qs'
  import {formateDate, copyObj} from '@/utils/common'

  export default {
    name: 'recharge-stat',
    data () {
      return {
        title: '统计首页',
        data_type: 0,
        time_type: 1,
        product_id: 0,
        product_list: [],
        product_data:{
          all_money: '',
          det_list: [{
            icon: 'ios-list',
            tips: '礼物消费总笔数',
            value: '0'
          },{
            icon: 'social-usd',
            tips: '礼物消费总秘币',
            value: '0'
          },{
            icon: 'ios-list',
            tips: '礼物总人数',
            value: '0'
          },{
            icon: 'social-usd',
            tips: '人均送礼金额',
            value: '0'
          }]
        },
        auth_id: '',
        all_money: '',
        date_type: {
          today: false,
          yesterday: false,
          week: false,
          all: true
        },
        chartWidth: '',
        chartWidth2: '',
        TodayCount:[{
          icon: 'social-usd',
          tips: '人均消费秘币',
          value: '0'
        },{
          icon: 'ios-list',
          tips: '秘币消费人数',
          value: '0'
        }],
        tableLoading: true,
        columns: [{
          title: '日期',
          key: 'date',
          align: 'center'
        },{
          title: '消费总秘币',
          key: 'all_money',
          align: 'center'
        },{
          title: '人均消费秘币',
          key: 'avg_money',
          align: 'center'
        },{
          title: '秘币消费人数',
          key: 'all_people',
          align: 'center'
        }],
        myData: [],
        options: {
          title : {
            text: '充值渠道占比情况',
            x:'center'
          },
          color: ['#3366CC','#3399CC','#33CC66','#6633CC','#993333','#99CC33'],
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
              name: '充值金额',
              type: 'pie',
              radius : '75%',
              center: ['60%', '55%'],
              data:[],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
        options2:{
          xAxis: {
            type: 'category',
            data: []
          },
          color: ['#13c2c2'],
          tooltip: {
            trigger: 'axis',
            formatter: "{a} <br/>{b} : {c} (元)"
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '金额',
            data: [],
            type: 'line'
          }]
        },
        date_range: [],
        pageprops: { //分页配置
          showSizer:true,
          total:0,
          current: 1,
          pageSize: 10,
        },
        fy: { //当前分页属性
          page: 1,
          size: 10
        },
        searchForm: {} //搜索框属性
      }
    },
    mounted(){
      this.getGiftIds();
      this.InitData();
      this.chartWidth = this.$refs['PieTitle'].offsetWidth;
      this.chartWidth2 = this.$refs['LineTitle'].offsetWidth;
    },
    computed: {
      searchData () {
        let fy = copyObj(this.fy);
        return Object.assign(fy, this.searchForm);
      },
      giftShow(){
        return this.data_type === 1?true:false;
      },
      pieShow(){
        return (this.data_type === 0 || (this.data_type === 1 && this.product_id === 0))?true:false;
      },
      colWidth1(){
        if(this.data_type === 0 || (this.data_type === 1 && this.product_id === 0)){
          return 6;
        }else{
          return 10;
        }
      },
      colWidth2(){
        if(this.data_type === 0 || (this.data_type === 1 && this.product_id === 0)){
          return 10;
        }else{
          return 14;
        }
      }
    },
    methods: {
      //初始化数据
      choseType(type){
        this.pageprops.current = 1;
        this.pageprops.pageSize = 10;
        this.fy = {
          page: 1,
          size: 10
        };
        this.InitData();
      },
      choseTimeType(type){
        this.getStatTimes();
      },
      choseRange(type){
        if(this.date_type[type]) return;
        for(let i in this.date_type){
          this.date_type[i] = i === type?true:false;
        }
        this.fy = {
          page: 1,
          size: 10
        };
        this.searchForm = this.getTime(type);
        this.InitData();
      },
      choseDate(data){
        let res = {
          start_time: data[0] + ' 00:00:00',
          end_time: data[1] + ' 23:59:59'
        };
        for(let i in this.date_type){
          this.date_type[i] = false;
        }
        this.fy = {
          page: 1,
          size: 10
        };
        this.searchForm = res;
        this.InitData();
      },
      getTime(type) {
        if (type == 'today') {
          let time = formateDate(new Date())
          return {
            start_time: time + ' 00:00:00',
            end_time: time + ' 23:59:59'
          }
        } else if (type == 'yesterday') {
          let date = new Date()
          date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
          let time = formateDate(date);
          return {
            start_time: time + ' 00:00:00',
            end_time: time + ' 23:59:59'
          }
        } else if (type == 'week') {
          let date = new Date();
          let days = date.getDay() == 0 ? 6 : date.getDay() - 1;
          let time_end = formateDate(date, 2)
          date.setTime(date.getTime() - days * 24 * 60 * 60 * 1000)
          let time_start = formateDate(date, 1)
          return {
            start_time: time_start,
            end_time: time_end
          }
        }else{
          return {}
        }
      },
      pageChange(page) {
        this.fy.page = page;
        this.pageprops.current = page;
        this.InitData();
      },
      pageSizeChange(size) {
        this.fy.size = size;
        this.pageprops.pageSize = size;
        this.InitData();
      },
      refresh(){
        this.InitData();
      },
      InitData(){
        //列表数据获取
        if(this.data_type === 1){
          this.getGiftDetail();
          this.getGiftTimes();
          this.getGiftList();
        }else{
          this.getStatDetail();
          this.getStatList();
          this.getStatTimes();
        }
      },
      DrawChart(){
        let PieChart = echarts.init(document.getElementById('pieChart'));
        PieChart.setOption(this.options, true);
      },
      DrawChart2(){
        let LineChart = echarts.init(document.getElementById('LineChart'));
        LineChart.setOption(this.options2, true);
      },
      getGiftIds(){
        this.axios.get('get-gifts').then(d=>{
          if(d.status === 1){
            this.product_list = d.data.list;
          }
        })
      },
      getStatDetail(){
        let params_list = this.searchForm;
        params_list.type = this.data_type;
        this.axios.get(`expense-detail?${qs.stringify(params_list)}`).then((d)=>{
          let res = d.data;
          if(d.status === 1){
            this.TodayCount[0].value = res.avg_money;
            this.TodayCount[1].value = res.all_people;
            this.all_money = res.all_money;

            if(this.data_type === 0){
              let pieData = [],
                legend = [];
              res.detail.forEach(val=>{
                pieData.push({
                  value: val.price,
                  name: val.name
                });
                legend.push(val.name);
              });
              this.options.legend.data = legend;
              this.options.series[0].data = pieData;
              this.DrawChart();
            }
          }
        });
      },
      getGiftDetail(){
        let params_list = this.searchForm;
        params_list.product_id = this.product_id;
        this.axios.get(`product-detail?${qs.stringify(params_list)}`).then((d)=>{
          //console.log(d);
          if(d.status === 1){
            this.product_data.all_money = d.data.sum;
            this.product_data.det_list[0].value = d.data.count;
            this.product_data.det_list[1].value = d.data.sum;
            this.product_data.det_list[2].value = d.data.person;
            this.product_data.det_list[3].value = d.data.per;

            if(this.product_id === 0){
              let pieData = [],
                legend = [];
              Object.values(d.data.group).forEach(val=>{
                pieData.push({
                  value: val.buy_price,
                  name: val.name
                });
                legend.push(val.name);
              });
              this.options.legend.data = legend;
              this.options.series[0].data = pieData;
              this.DrawChart();
            }
          }
        })
      },
      getStatTimes(){
        let params_list = this.searchData;
        params_list.type = this.data_type;
        params_list.time_type = this.time_type;
        this.axios.get(`expense-time?${qs.stringify(params_list)}`).then((d)=>{
          let res = d.data.info_list;
          if(d.status === 1){
            let date_line = res.map(val=>{
              return val.date;
            });
            let money_line = res.map(val=>{
              return val.value;
            });
            this.options2.xAxis.data = date_line;
            this.options2.series[0].data = money_line;
            this.DrawChart2();
          }
        })
      },
      getGiftTimes(){

      },
      getStatList(){
        this.tableLoading = true;
        let params_list = this.searchData;
        params_list.type = this.data_type;
        this.axios.get(`expense-list?${qs.stringify(params_list)}`).then((d)=>{
          let res = d.data;
          if(d.status === 1){
            this.myData = res.info_list;
            this.pageprops.total = res.total;
            this.tableLoading = false;
          }
        })
      },
      getGiftList(){

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
    height: 200px;
  }
  .chart-box2{
    height: 300px;
  }
  .line-area{
    margin-bottom: 20px;
  }

  .chart-tit {
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .label {
      font-size: 15px;
    }
  }
  .chose-line{
    display: flex;
    flex-direction: row;
  }
</style>

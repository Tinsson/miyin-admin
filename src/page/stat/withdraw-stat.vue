<template>
  <div id="statistical-index">
    <title-bar title="提现统计" @refresh="refresh"></title-bar>
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
    <Row :gutter="20" style="margin-bottom: 20px;">
      <Col class="card-col" span="10">
        <Card>
          <h2 class="card-title">平均提现金额</h2>
          <p class="card-number">{{ avg_sum }}元</p>
          <div class="card-footer">
          </div>
        </Card>
      </Col>
      <Col span="14">
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
    </Row>
    <table-container title="统计列表" @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
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
        date_type: {
          today: false,
          yesterday: false,
          week: false,
          all: true
        },
        TodayCount:[{
          icon: 'social-usd',
          tips: '提现金额',
          value: '0'
        },{
          icon: 'ios-list',
          tips: '提现笔数',
          value: '0'
        },{
          icon: 'social-usd',
          tips: '提现请求金额',
          value: '0'
        },{
          icon: 'ios-list',
          tips: '提现请求笔数',
          value: '0'
        }],
        tableLoading: true,
        columns: [{
          title: '日期',
          key: 'date',
          align: 'center'
        },{
          title: '请求提现金额',
          key: 'all_sum',
          align: 'center'
        },{
          title: '请求提现笔数',
          key: 'all_times',
          align: 'center'
        },{
          title: '提现金额',
          key: 'sum',
          align: 'center'
        },{
          title: '提现笔数',
          key: 'times',
          align: 'center'
        },{
          title: '平均提现金额',
          key: 'avg_sum',
          align: 'center'
        }],
        myData: [],
        date_range: [],
        pageprops: { //分页配置
          showSizer:true,
          total:0,
        },
        fy: { //当前分页属性
          page: 1,
          size: 10
        },
        searchForm: {} //搜索框属性
      }
    },
    mounted(){
      this.InitData();
    },
    computed: {
      searchData () {
        let fy = copyObj(this.fy);
        return Object.assign(fy, this.searchForm);
      }
    },
    methods: {
      //初始化数据
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
        this.InitData();
      },
      pageSizeChange(size) {
        this.fy.size = size;
        this.InitData();
      },
      refresh(){
        this.InitData();
      },
      InitData(){
        //列表数据获取

        this.getStatDetail();
        this.getStatList();
      },
      getStatDetail(){
        let params_list = this.searchForm;
        this.axios.get(`withdraw-detail?${qs.stringify(params_list)}`).then((d)=>{
          let res = d.data.detail;
          if(d.status === 1){
            this.TodayCount[0].value = res.sum;
            this.TodayCount[1].value = res.times;
            this.TodayCount[2].value = res.all_sum;
            this.TodayCount[3].value = res.all_times;
            this.avg_sum = res.avg_sum;
          }
        });
      },
      getStatList(){
        this.tableLoading = true;

        let params_list = this.searchData;
        console.log(params_list);
        this.axios.get(`withdraw-list?${qs.stringify(params_list)}`).then((d)=>{
          let res = d.data;
          if(d.status === 1){
            this.myData = res.info_list;
            this.pageprops.total = res.total;
            this.tableLoading = false;
          }
        })
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
</style>

<template>
<div id="anchorDetail">
  <Modal v-model="if_show" title="女主播详情" width="1200px" class-name="no-auto" @on-visible-change="modalChange" style="margin-top:-100px">
    <div style="height:700px;overflow-y: auto;">
      <div class="top-container">
        <div class="base-info-container">
          <div class="photo background-cover" :style="'background-image:url('+user_info[0].portrait+')'">

          </div>
          <Table :columns="columns" :data="user_info" width="1000">

          </Table>
        </div>
        <div class="card-container">
          <div class="search-group">
            <div class="search-item" v-for="(item,index) in search_list" :class="{active:active_index==index}" @click="btn_search(item,index)">
              {{item.title}}
            </div>
            <DatePicker type="daterange" placeholder="选择时间查找" :editable="false" style="width:200px" @on-change="input_search"></DatePicker>
          </div>
          <new-table-card @change="changeCard" @changeKey="changeCardKey" :columns="cardColumns" :data="cardData" container_style="padding:0 60px;justify-content:space-around;margin-top:20px;" card_style="width:30%"></new-table-card>
        </div>
      </div>
      <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" :pageprops="pageprops" :page="cardType=='user-anchor-talk-log'||cardType=='user-anchor-withdraw'">
        <Table v-if="cardType=='user-anchor-talk-log'||cardType=='user-anchor-withdraw'||cardType=='user-anchor-gift'" :columns="cardChildColumns" :data="tableData" />
        <div style="width:1133px;height:500px;" id="pie" v-else></div>
      </table-container>
    </div>
    <div slot="footer">
    </div>
  </Modal>
</div>
</template>
<script>
import {
  formateDate
} from '@/utils/common'

export default {
  name: "anchorDetail",
  data: () => ({
    if_show: false,
    uuid: '',
    user_info: [{}],
    columns: [{
      key: 'nick_name',
      title: '昵称',
      align: 'center'
    }, {
      key: "uuid",
      title: '用户id',
      align: 'center'
    }, {
      key: 'mobile',
      title: '手机号',
      align: 'center'
    }, {
      key: 'level',
      title: '等级',
      align: 'center'
    }, {
      key: 'price',
      title: '收费标准',
      align: 'center'
    }, {
      key: 'certed_at',
      title: '认证日期',
      align: 'center'
    }, {
      key: 'balance',
      title: '秘币余额',
      align: 'center'
    }, {
      key: 'status',
      title: '是否黑名单',
      align: 'center',
      render: (h, params) => {
        return h('span', params.row.status == 1 ? '否' : '是')
      }
    }],
    search_list: [{
      title: '今日',
      type: 'today'
    }, {
      title: '昨日',
      type: 'yesterday'
    }, {
      title: '本周',
      type: 'week'
    }, {
      title: '全部',
      type: 'all'
    }],
    active_index: 0,
    cardKey: 'talk_mins_times',
    cardColumns: [{
      title: '接听总时长/次数',
      key: 'talk_mins_times',
      type: 'user-anchor-talk-log',
    }, {
      title: '通话总收入',
      key: 'talk_sum',
      type: 'user-anchor-talk-log',
    }, {
      title: '偷听总收入',
      key: 'tap_sum',
      type: 'user-anchor-talk-log',
    }, {
      title: '秘币总收入',
      key: 'all_sum',
      type: 'user-anchor-income',
    }, {
      title: '礼物总收入',
      key: 'gift_sum',
      type: 'user-anchor-gift',
    }, {
      title: '提现总金额',
      key: 'withdraw_sum',
      type: 'user-anchor-withdraw',
    }, ],
    cardData: {},
    search_time: {},
    cardType: '',
    card1Colmuns: [{
      title: '通话开始时间',
      key: 'start_time',
      align: 'center'
    }, {
      title: '通话结束时间',
      key: 'end_time',
      align: 'center'
    }, {
      title: '通话时长',
      key: 'talk_mins',
      align: 'center'
    }, {
      title: '通话收入',
      key: 'talk_sum',
      align: 'center',
      render: (h,params)=>{
        let sum = params.row.talk_sum;
        return h('span',{
          style:{
            color: sum[0]=='-'?'red':'green'
          }
        },sum[0]=='-'?sum:'+'+sum)
      }
    }, {
      title: '通话类型',
      key: 'talk_type',
      align: 'center',
      render: (h, params)=>{
        let text = '';
        if(params.row.talk_type === 5){
          text = '普通电话';
        }else if(params.row.talk_type === 6){
          text = '随机电话';
        }else{
          text = '未知'
        }
        return h('span', text);
      }
    }],
    detailColumns1: [{
      title: '通话开始时间',
      key: 'start_time',
      align: 'center'
    }, {
      title: '通话结束时间',
      key: 'end_time',
      align: 'center'
    }, {
      title: '通话时长',
      key: 'talk_mins',
      align: 'center'
    }, {
      title: '通话类型',
      key: 'talk_type',
      align: 'center',
      render: (h, params)=>{
        let text = '';
        if(params.row.talk_type === 5){
          text = '普通电话';
        }else if(params.row.talk_type === 6){
          text = '随机电话';
        }else{
          text = '未知'
        }
        return h('span', text);
      }
    }, {
      title: '偷听人数',
      key: 'tap_users',
      align: 'center'
    }, {
      title: '偷听时长',
      key: 'tap_mins',
      align: 'center'
    }, {
      title: '偷听收入',
      key: 'tap_sum',
      align: 'center'
    }],
    detailColumns2: [{
      title: '提现申请时间',
      key: 'created_at',
      align: 'center'
    }, {
      title: '提现金额',
      key: 'money',
      align: 'center'
    }, {
      title: '提现通过时间',
      key: 'updated_at',
      align: 'center'
    }],
    giftColumns: [{
      title: '礼物名称',
      key: 'name',
      align: 'center'
    },{
      title: '数量',
      key: 'num',
      align: 'center'
    },{
      title: '礼物价值',
      key: 'price',
      align: 'center'
    },{
      title: '赠送时间',
      key: 'created_at',
      align: 'center'
    }, {
      title: '赠送人',
      key: 'to_uuid',
      align: 'center'
    }],
    fy: {
      page: 1,
      size: 10
    },
    pageprops: { //分页配置
      total: 0,
    },
    detailData: {
      'user-anchor-talk-log': [],
      'user-anchor-income': [],
      'user-anchor-gift': [],
      'user-anchor-withdraw': []
    }
  }),
  computed: {
    cardChildColumns(){
      if(this.cardType=='user-anchor-withdraw'){
        return this.detailColumns2;
      }else if(this.cardType == 'user-anchor-gift'){
        return this.giftColumns;
      }else{
        if(this.cardKey == 'tap_sum'){
          return this.detailColumns1;
        }else{
          return this.card1Colmuns;
        }

      }
    },
    tableData(){
      let data = this.detailData[this.cardType];
      if(this.cardKey === 'talk_mins_times' || this.cardKey === 'talk_sum'){
        let newArr = [];
        data.forEach(val=>{
          if(val.talk_sum > 0){
            newArr.push(val)
          }
        });
        return newArr;
      }else{
        return data;
      }

    }
  },
  methods: {
    modalChange(show) {
      if (!show) {
        this.$set(this.$data, 'cardData', {})
      }
    },
    show(item) {
      this.$set(this.user_info, 0, item)
      this.if_show = true;
      this.uuid = item.uuid;
      this.search_time = this.getTime('today');
      this.getCardData();
    },
    btn_search(item, index) {
      this.active_index = index;
      this.search_time = this.getTime(item.type)
      this.getCardData();
      this.getDetailData();
    },
    input_search(time) {
      if (time[0]) {
        this.active_index = null;
        this.search_time = {
          start_time: time[0] + ' 00:00:00',
          end_time: time[1] + ' 23:59:59'
        }
      } else {
        this.search_time = {};
        this.active_index = 3;
      }
      this.getCardData();
      this.getDetailData();
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
          time_start,
          time_end
        }
      }
      return {};
    },
    getCardData() {
      this.axios.get('user-anchor-stats', {
        params: {
          ...this.search_time,
          uuid: this.uuid
        }
      }).then(res => {
        let data = res.data.anchor_stats
        this.cardData = {
          ...data,
          talk_mins_times: data.talk_mins + '/' + data.talk_times
        }
      })
    },
    changeCard(type) {
      console.log(type);
      this.cardType = type
      this.fy.page = 1;
      this.getDetailData();
    },
    changeCardKey(key){
      this.cardKey = key;
      console.log(key);
    },
    pageChange(page) {
      this.fy.page = page;
      this.getDetailData();
    },
    pageSizeChange(size) {
      this.fy.page = 1;
      this.fy.size = size;
      this.getDetailData();
    },
    getDetailData() {
      if (!this.cardType) return;
      this.axios.get(this.cardType, {
        params: {
          ...this.search_time,
          ...this.fy,
          uuid: this.uuid
        }
      }).then(res => {
        if (res) {
          console.log(res);
          if(this.cardType == 'user-anchor-gift'){
            this.$set(this.detailData, this.cardType, res.data.list);
          }else{
            this.$set(this.detailData, this.cardType, res.data.log_list)
            this.pageprops.total = res.data.total
          }
          if (this.cardType == 'user-anchor-income') {
            this.initPie();
          }
        }
      })
    },
    initPie() {
      let myChart = echarts.init(document.getElementById('pie'))
      let list = this.detailData[this.cardType];
      let arr1 = [];
      let data = [];
      for (let i = 0; i < list.length; i++) {
        arr1.push(list[i].title + ' ' + list[i].value + '秘币 ' + list[i].percent)
        data.push({
          value: list[i].value,
          name: list[i].title + ' ' + list[i].value + '秘币 ' + list[i].percent
        })
      }

      let option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: arr1
        },
        series: [{
          name: this.cardType == 'user-anchor-income'?'秘币收入':'礼物收入',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: function(params) {
                console.log(params)
                return params.data.name.split(' ')[0]
              },
            },

            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: data
        }]
      }
      myChart.setOption(option)
    },
  }
}
</script>
<style lang="scss" scoped>
.top-container {
    border: 1px solid #ddd;
    .base-info-container {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ddd;
        justify-content: space-around;
        padding: 10px 0;
        .photo {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-right: 20px;
        }
    }
    .card-container {
        padding: 10px 20px;
        .search-group {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .search-item {
                width: 80px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #ddd;
                margin-right: 10px;
                border-radius: 10px;
                cursor: pointer;
                &.active {
                    color: #fff;
                    background-color: rgb(20,145,207);
                    border-color: rgb(20,145,207);
                }
            }
        }
    }
}
</style>

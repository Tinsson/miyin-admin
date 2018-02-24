<template>
  <div id="statistical-index">
    <title-bar title="用户行为统计" @refresh="refresh"></title-bar>
    <Row type="flex" :gutter="20" style="margin-bottom: 30px;">
      <Col class="card-col" span="12" v-for="item in card_list" :key="item.id">
        <router-link :to="item.url">
          <Card>
            <h2 class="card-title">{{item.title}}</h2>
            <p class="card-number">{{item.value}}</p>
            <div class="card-content">
              <p class="info-txt">
                <span class="half">
                  <span class="label">{{item.label1}}</span>
                  <span class="value">{{item.value1}}</span>
                </span>
                <span class="half" v-if="item.label2 !== ''">
                  <span class="label">{{item.label2}}</span>
                  <span class="value">{{item.value2}}</span>
                </span>
              </p>
            </div>
            <div class="card-footer">
            </div>
          </Card>
        </router-link>
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
        avg_sum: '111',
        date_type: {
          today: false,
          yesterday: false,
          week: false,
          all: true
        },
        card_list: [{
          id: 1,
          title: '随机电话总时长',
          value: '10',
          label1: '随机电话拨打次数',
          label2: '随机电话接通率',
          value1: '11',
          value2: '11',
          url: '/action/talk-list?type=6',
        },{
          id: 2,
          title: '普通电话总时长',
          value: '10',
          label1: '普通电话拨打次数',
          label2: '普通电话接通率',
          value1: '11',
          value2: '11',
          url: '/action/talk-list?type=5'
        },{
          id: 3,
          title: '偷听电话总时长',
          value: '10',
          label1: '偷听总人数',
          label2: '单位电话偷听人数',
          value1: '11',
          value2: '11',
          url: '/action/tap-list'
        },{
          id: 4,
          title: '发送动态总量',
          value: '10',
          label1: '人均发送动态条数',
          label2: '',
          value1: '11',
          value2: '',
          url: '/action/circles-list'
        }]
      }
    },
    mounted(){
      this.InitData();
    },
    computed: {
    },
    methods: {
      refresh(){
        this.InitData();
      },
      //初始化数据
      InitData(){

        this.axios.get(`action-all`).then((d)=>{
          let res = d.data.detail;
          if(d.status === 1){
            this.card_list[0].value = res.rand_talk.all_mins;
            this.card_list[0].value1 = res.rand_talk.all_times;
            this.card_list[0].value2 = res.rand_talk.rate;
            this.card_list[1].value = res.common_talk.all_mins;
            this.card_list[1].value1 = res.common_talk.all_times;
            this.card_list[1].value2 = res.common_talk.rate;
            this.card_list[2].value = res.tap.all_mins;
            this.card_list[2].value1 = res.tap.all_people;
            this.card_list[2].value2 = res.tap.rate;
            this.card_list[3].value = res.circles.all_count;
            this.card_list[3].value1 = res.circles.rate;
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card-col{
    padding-bottom: 20px;
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
    margin: 10px 0;
    font-size: 36px;
    line-height: 45px;
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

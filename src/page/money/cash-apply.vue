<template>
  <div id="cash-apply">
    <title-bar title="提现申请" @refresh="refresh"></title-bar>
    <table-card :columns="cardColumns" :data="cardData" card_style="width:40%;" container_style="justify-content:space-around;" @change="cardChange"></table-card>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <div slot="btn">
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
    <user-detail ref="userDetail"></user-detail>
  </div>
</template>
<script>
import userDetail from '@/page/user/components/user-detail'
export default {
  name: "cash-apply",
  data() {
    return {
      cardColumns: [
        {
          title: '审核中',
          unit: '人',
          key: 'waite',
          type: 0,
          icon:'ios-timer'
        },{
          title: '不通过',
          unit: '人',
          key: 'no',
          type: 2,
          icon: 'ios-close'
        }
      ],
      cardData: {},

      columns: [
        {
          title: 'id',
          key: 'id',
          align: 'center'
        },{
          title: '昵称',
          key: 'nick_name',
          align: 'center'
        }, {
          title: '姓名',
          key: 'name',
          align: 'center'
        }, {
          title: '绑定手机号',
          key: 'user_mobile',
          align: 'center'
        }, {
          title: '联系手机号',
          key: 'mobile',
          align: 'center'
        }, {
          title: '支付宝账号',
          key: 'alipay',
          align: 'center'
        }, {
          title: '提现订单号',
          key: 'uuid',
          align: 'center'
        }, {
          title: '提现金额（rmb）',
          key: 'money',
          align: 'center'
        },{
          title: '申请时间',
          key: 'created_at',
          align: 'center'
        },{
          title: '订单状态',
          key: 'status',
          align: 'center',
          render: (h,params)=>{
            let status;
            switch(params.row.status) {
              case 1: status='通过';break;
              case 0: status="待审核";break;
              case 2: status="不通过";break
            }
            return h('span',status)
          }
        },{
          title: '操作',
          key: 'operation',
          align: 'center',
          width:250,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text'
                },
                on:{
                  click:()=>{
                    this.$refs.userDetail.show(params.row.uuid);
                  }
                }
              }, '查看信息'),
              h('Poptip', {
                props:{
                  confirm: true,
                  title: '确定通过吗？'
                },
                on: {
                  'on-ok': ()=>{
                    this.editStatus(params,1)
                  }
                }
              },[
                h('Button',{
                  props: {
                    type: 'text'
                  }
                },'通过')
              ]),
              h('Poptip', {
                props:{
                  confirm: true,
                  title: '确定拒绝吗',
                  placement: 'left'
                },
                on: {
                  'on-ok': ()=>{
                    this.editStatus(params,2)
                  }
                }
              },[
                h('Button',{
                  props: {
                    type: 'text'
                  }
                },'不通过')
              ]),
            ])
          }
        }
      ],
      myData: [{uuid:1}],
      tableLoading: false,
      searchList: [
        {
          label: '昵称',
          type: 'input',
          placeholder: '用户昵称',
          model: 'nick_name'
        },{
          label: '支付宝账号',
          type: 'input',
          placeholder: '支付宝账号',
          model: 'alipay'
        },{
          label: '联系手机号',
          type: 'input',
          placeholder: '联系手机号',
          model: 'mobile'
        },{
          label: '姓名',
          type: 'input',
          placeholder: '姓名',
          model: 'name'
        },{
          label: '绑定手机号',
          type: 'input',
          placeholder: '绑定手机号',
          model: 'user_mobile'
        },{
          label: '申请时间',
          type: 'daterange',
          placeholder: '请选择时间',
          model: 'apply_time',
          start_end: ['start_time','end_time']
        }
      ],
      pageprops: { //分页配置
        showSizer:true,
        total:0,
      },
      fy: { //当前分页属性
        page: 1,
        size: 10
      },
      searchForm: {}, //搜索框属性
      cardsearch: {
        status: 0
      }
    }
  },
  computed: {
    searchData () {
      return Object.assign(this.fy,this.searchForm,this.cardsearch);
    }
  },
  methods: {
    cardChange(type) {
      this.cardsearch.status = type
      this.getData();
    },
    editStatus(params,status) {
      this.tableLoading = true;
      this.axios.post('wallet-editStatus',{
        status:status,
        user_uuid: params.row.user_uuid,
        uuid: params.row.uuid
      }).then(res=>{
        if(res){
          this.$Message.success('操作成功');
          this.getData();
        }
      })
    },


    refresh() {
      this.getData();
    },
    search(data) {
      this.searchForm = data;
      this.getData();
    },
    pageChange(page) {
      this.fy.page = page;
      this.getData();
    },
    pageSizeChange(size) {
      this.fy.size = size;
      this.getData();
    },
    getData() {
      this.tableLoading = true;
      this.axios.get('wallet-withdrawing',{
        params: this.searchData
      }).then(res=>{
        this.tableLoading = false;
        if(res){
          this.myData = res.data.list
        }
      })
    },
    getNum() {
      this.axios.get('wallet-count').then(res=>{
        if(res){
          this.$set(this.cardData,'waite',res.data.list[0]);
          this.$set(this.cardData,'no',res.data.list[2]);
        }
      })
    }
  },
  mounted() {
    this.getNum();
  },
  components: {
    userDetail
  }
}
</script>
<style lang="scss" scoped>
</style>

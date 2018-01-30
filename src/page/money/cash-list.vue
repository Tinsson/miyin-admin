<template>
  <div id="cash-apply">
    <title-bar title="提现列表" @refresh="refresh"></title-bar>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
  </div>
</template>
<script>
export default {
  name: "cash-apply",
  data() {
    return {
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
          title: '提现通过时间',
          key: 'updated_at',
          align:'center'
        }
      ],
      myData: [],
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
        status: 1
      }
    }
  },
  computed: {
    searchData () {
      return Object.assign(this.fy,this.searchForm,this.cardsearch);
    }
  },
  methods: {
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
        console.log(res);
        if(res){
          this.myData = res.data.log_list
        }
      })
    },
  },
  mounted() {
    this.getData();
  }
}
</script>
<style lang="scss" scoped>
</style>

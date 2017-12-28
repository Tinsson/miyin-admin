<template>
  <div id="cash-list">
    <title-bar title="提现列表" @refresh="refresh"></title-bar>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <div slot="btn">
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
  </div>
</template>
<script>
export default {
  name: "cash-list",
  data() {
    return {
      columns: [
        {
          title: 'id',
          key: 'uuid',
          align: 'center'
        },{
          title: '昵称',
          key: 'account',
          align: 'center'
        }, {
          title: '姓名',
          key: 'user_name',
          align: 'center'
        }, {
          title: '绑定手机号',
          key: 'register_time',
          align: 'center'
        }, {
          title: '联系手机号',
          key: 'mobile',
          align: 'center'
        }, {
          title: '支付宝账号',
          key: 'wx',
          align: 'center'
        }, {
          title: '提现订单号',
          key: 'pic',
          align: 'center'
        }, {
          title: '提现金额（rmb）',
          key: 'status',
          align: 'center'
        },{
          title: '申请时间',
          key: 'status',
          align: 'center'
        },{
          title: '提现通过时间',
          key: 'status',
          align: 'center'
        }
      ],
      myData: [{uuid:1}],
      tableLoading: false,
      searchList: [
        {
          label: '昵称',
          type: 'input',
          placeholder: '昵称',
          model: 'uuid'
        },{
          label: '支付宝账号',
          type: 'input',
          placeholder: '支付宝账号',
          model: 'nickname'
        },{
          label: '联系手机号',
          type: 'input',
          placeholder: '联系手机号',
          model: 'nickname'
        },{
          label: '姓名',
          type: 'input',
          placeholder: '姓名',
          model: 'nickname'
        },{
          label: '绑定手机号',
          type: 'input',
          placeholder: '绑定手机号',
          model: 'nickname'
        },{
          label: '通过时间',
          type: 'daterange',
          placeholder: '请选择时间',
          model: 'register_time',
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
      searchForm: {} //搜索框属性
    }
  },
  computed: {
    searchData () {
      return Object.assign(this.fy,this.searchForm);
    }
  },
  methods: {
    refresh() {
      console.log('刷新')
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
      console.log(this.searchData)
    },
  }
}
</script>
<style lang="scss" scoped>
</style>

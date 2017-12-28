<template>
  <div id="alipay">
    <title-bar title="支付宝充值列表" @refresh="refresh"></title-bar>
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
  name: "alipay",
  data() {
    return {
      columns: [
        {
          title: '用户昵称',
          key: 'uuid',
          align: 'center'
        },{
          title: '用户id',
          key: 'account',
          align: 'center'
        }, {
          title: '绑定手机号',
          key: 'user_name',
          align: 'center'
        }, {
          title: '交易流水号',
          key: 'register_time',
          align: 'center'
        }, {
          title: '充值金额',
          key: 'mobile',
          align: 'center'
        }, {
          title: '用户唯一支付宝号',
          key: 'wx',
          align: 'center'
        }, {
          title: '时间',
          key: 'pic',
          align: 'center'
        }
      ],
      myData: [{uuid:1}],
      tableLoading: false,
      searchList: [
        {
          label: '用户昵称',
          type: 'input',
          placeholder: '用户昵称',
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

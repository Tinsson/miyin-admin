<template>
  <div id="cash-apply">
    <title-bar title="提现申请" @refresh="refresh"></title-bar>
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
  name: "cash-apply",
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
          title: '订单状态',
          key: 'status',
          align: 'center'
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
              }, '查看信息'),
              h('Button', {
                props: {
                  type: 'text'
                }
              }, '通过'),
              h('Button', {
                props: {
                  type: 'text'
                }
              }, '不通过')
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
          label: '申请时间',
          type: 'daterange',
          placeholder: '请选择时间',
          model: 'apply_time',
          start_end: ['start_time','end_time']
        },{
          label: '订单状态',
          type: 'select',
          placeholder: '选择订单状态',
          model: 'status',
          options:[{
            label: '待审核',
            value: '1'
          },{
            label: '不通过',
            value: '0'
          }]
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

<template>
  <div id="wx-recharge">
    <title-bar title="微信充值列表" @refresh="refresh"></title-bar>
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
  name: "wx-recharge",
  data() {
    return {
      columns: [
        {
          title: '交易流水号',
          key: 'flow_uuid',
          align: 'center'
        },{
          title: '昵称',
          key: 'nick_name',
          align: 'center'
        },{
          title: '手机号',
          key: 'user_mobile',
          align: 'center'
        }, {
          title: '充值金额',
          key: 'money',
          align: 'center'
        }, {
          title: '时间',
          key: 'updated_at',
          align: 'center'
        }
      ],
      myData: [],
      tableLoading: false,
      searchList: [
        {
          label: '用户昵称',
          type: 'input',
          placeholder: '用户昵称',
          model: 'nick_name'
        },{
          label: '用户id',
          type: 'input',
          placeholder: '用户id',
          model: 'user_uuid'
        },{
          label: '绑定手机号',
          type: 'input',
          placeholder: '绑定手机号',
          model: 'user_mobile'
        },{
          label: '订单时间',
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
      searchForm: {}, //搜索框属性
      my_search: {
        type: 2,
        status: 1
      }
    }
  },
  computed: {
    searchData () {
      return Object.assign(this.fy,this.searchForm,this.my_search);
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
      this.tableLoading = true
      this.axios.get('wallet-recharge',{
        params: this.searchData
      }).then(res=>{
        this.tableLoading = false;
        if(res){
          this.myData = res.data.list;
          this.pageprops.total = res.data.total
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

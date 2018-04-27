<template>
  <div id="consumer-detail">
    <title-bar title="消费明细" @refresh="refresh"></title-bar>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <div slot="btn">
        消费总秘币：{{Math.abs(all_price)}}
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
  </div>
</template>
<script>
export default {
  name: "consumer-detail",
  data() {
    return {
      all_price: '',
      columns: [
        {
          title: '昵称',
          key: 'nick_name',
          align: 'center'
        },{
          title: '手机号',
          key: 'mobile',
          align: 'center'
        }, {
          title: '消费类型',
          key: 'remark',
          align: 'center'
        }, {
          title: '消费秘币',
          key: 'price',
          align: 'center'
        }, {
          title: '秘币余额',
          key: 'balance',
          align: 'center'
        }, {
          title: '消费时间',
          key: 'created_at',
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
          model: 'uuid'
        },{
          label: '绑定手机号',
          type: 'input',
          placeholder: '绑定手机号',
          model: 'mobile'
        },{
          label: '消费类型',
          type: 'select',
          placeholder: '请选择',
          options: [{
            label: '充值',
            value: 1
          },{
            label: '提现',
            value: 2
          },{
            label: '礼物支出',
            value: 3
          },{
            label: '偷听扣款',
            value: 4
          },{
            label: '普通电话扣款',
            value: 5
          }],
          model: 'type'
        },{
          label: '消费时间',
          type: 'daterange',
          placeholder: '请选择时间',
          model: 'created_time',
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
        pay_type: 1
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
      this.axios.get('bill-user-log-list',{
        params:this.searchData
      }).then(res=>{
        if(res){
          this.tableLoading = false
          this.all_price = res.data.all_price
          this.myData = res.data.log_list
          this.pageprops.total = res.data.total;
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

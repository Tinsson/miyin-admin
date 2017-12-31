<template>
  <div id="gift-detail">
    <title-bar title="礼物明细" @refresh="refresh"></title-bar>
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
  name: "gift-detail",
  data() {
    return {
      columns: [
        {
          title: '用户昵称',
          key: 'nick_name',
          align: 'center'
        },{
          title: '用户id',
          key: 'from_uuid',
          align: 'center'
        }, {
          title: '绑定手机号',
          key: 'user_mobile',
          align: 'center'
        }, {
          title: '礼物名称',
          key: 'name',
          align: 'center'
        }, {
          title: '礼物价值',
          key: 'price',
          align: 'center'
        }, {
          title: '赠送时间',
          key: 'created_at',
          align: 'center'
        }, {
          title: '赠送人',
          key: 'to_uuid',
          align: 'center'
        },{
          title: '秘币变化',
          key: 'buy_price',
          align: 'center'
        },{
          title: '秘币余额',
          key: 'balance',
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
          model: 'user_uuid'
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
          label: '礼物名称',
          type: 'select',
          placeholder: '姓名',
          model: 'product_id',
          options: []
        },{
          label: '赠送时间',
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
      this.axios.get('product-search',{
        params:this.searchData
      }).then(res=>{
        this.tableLoading = false;
        if(res){
          this.myData = res.data.list
        }
      })
    },
    set_gift_name() {
      this.axios.get('product-drop').then(res=>{
        if(res){
          for(let i = 0;i<this.searchList.length;i++){
            if(this.searchList[i].label=="礼物名称"){
              for(let key in res.data.list) {
                this.searchList[i].options.push({
                  label:res.data.list[key],
                  value: key
                })
              }
              break;
            }
          }
        }
      })
    }

  },
  mounted() {
    this.getData();
    this.set_gift_name()
  }
}
</script>
<style lang="scss" scoped>
</style>

<template>
<div id="anchor">
  <title-bar title="主播管理" @refresh="refresh">

  </title-bar>
  <search-group :searchList="searchList" @search="search">
    <!-- <Button type="warning" icon="pinpoint" @click="senior_search=true">高级检索</Button> -->
  </search-group>
  <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
    <div slot="btn">
      <msg-btn :select="select_arr" :type="my_search.type" :total="pageprops.total" :search="searchForm"></msg-btn>
    </div>
    <Table :columns="columns" :data="myData" border :loading="tableLoading" @on-selection-change="select"></Table>
  </table-container>

  <anchor-detail ref="anchorDetail"></anchor-detail>

</div>
</template>
<script>
import msgBtn from './components/user-msg-btn.vue'
import anchorDetail from './components/anchor-detail.vue'
export default {
  name: "anchor",
  data (){
    return {
      select_arr: [], //选择的用户列表
      // 高级筛选
      senior_search: false,  //高级检索模态框是否显示
      tableLoading: false, //表格是否加载

      // user_detail_show: false,

      columns: [
        {
        type: 'selection',
        width: 60,
        align: 'center'
        },{
          title: '昵称',
          key: 'nick_name',
          align: 'center'
        }, {
          title: '手机号',
          key: 'mobile',
          align: 'center'
        },{
          title: '主播等级',
          key: 'level',
          align: 'center'
        }, {
          title: '秘币余额',
          key: 'balance',
          align: 'center'
        }, {
          title: '注册时间',
          key: 'created_at',
          align: 'center'
        }, {
          title: '操作',
          key: 'operation',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.$refs.anchorDetail.show(params.row)
                  }
                }
              }, '查看')
            ])
          }
        }
      ], //列配置数据

      myData: [], //表格数据

      searchList: [{   //搜索列表配置
        label: '用户信息',
        type: 'input',
        placeholder: '用户ID/手机号',
        model: 'username'
      }, {
        label: '用户昵称',
        type: 'input',
        placeholder: '用户昵称',
        model: 'nick_name'
      }, {
        label: '注册时间',
        type: 'daterange',
        placeholder: '请选择注册时间',
        model: 'register_time',
        start_end: ['start_time','end_time']
      }],

      pageprops: { //分页配置
        showSizer:true,
        total:0,
      },
      fy: { //当前分页属性
        page: 1,
        size: 10
      },
      searchForm: {}, //搜索框属性
      my_search: {type:2} //固定搜索女主播
    }
  },
  computed: {
    searchData () {
      return Object.assign(this.fy,this.searchForm,this.my_search);
    }
  },
  methods: {
    select(selection) {
      this.select_arr = selection
    },
    search(data) {
      this.searchForm = data;
      this.getData();
    },
    refresh() {
      console.log('刷新')
    },
    pageChange(page) {
      this.fy.page = page;
      this.getData();
    },
    pageSizeChange(size) {
      this.fy.size = size;
      this.getData();
    },
    getData () {
      this.tableLoading = true
      this.axios.get(`user-list`,{
        params: this.searchData
      }).then(res => {
        this.tableLoading = false;
        if(res) {
          this.myData = res.data.user_ist
          this.pageprops.total = res.data.total;
        }
      })
    }
  },
  mounted() {
    this.getData();
  },
  components: {
    msgBtn,
    anchorDetail
  }
}
</script>
<style lang="scss" scoped>
.red {
    color: red;
}
.senior-search-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    > div {
        width: 40%;
        margin-bottom: 10px;
        .label {
            white-space: nowrap;
            margin-bottom: 10px;
            font-size: 14px;
        }
    }
}
.app-container{
  .chose-btn{
    height:33px;
    background:#eee;
    border-radius:5px;
    cursor: pointer;
  }
}


</style>

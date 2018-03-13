<template>
  <div id="voice-verify">
    <title-bar title="录音审核" @refresh="refresh"></title-bar>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <div slot="btn">
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>

  </div>
</template>
<script>
import userDetail from '@/page/user/components/user-detail'
export default {
  name: "voice-verify",
  data() {
    return {
      columns: [
        {
          title: '序号',
          key: 'id',
          align: 'center'
        },{
          title: '录音',
          key: 'url',
          align: 'center',
          width:320,
          render: (h,params)=>{
            return h('audio',{
              attrs:{
                controls:"controls",
                src: params.row.url
              }
            })
          }
        }, {
          title: '用户id',
          key: 'uuid',
          align: 'center'
        },{
          title: '昵称',
          key: 'nick_name',
          align: 'center'
        }, {
          title: '绑定手机号',
          key: 'mobile',
          align: 'center'
        }, {
          title: '录音时间',
          key: 'created_at',
          align: 'center'
        },{
          title: '操作',
          key: 'operation',
          align: 'center',
          width:170,
          render: (h, params) => {
            return h('div', [
              /*h('Poptip', {
                props: {
                  confirm: true,
                  title: '确定要通过吗？',
                  placement: 'left'
                },
                on: {
                  'on-ok': ()=>{
                    this.verify(params.row,'2')
                  }
                }
              }, [
                h('Button',{
                  props: {
                    type: 'text'
                  }
                },'通过')
              ]),*/
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '确定要拒绝吗',
                  placement: 'left'
                },
                on: {
                  'on-ok': ()=>{
                    this.verify(params.row,'3')
                  }
                }
              }, [
                h('Button',{
                  props: {
                    type: 'text'
                  }
                },'不通过')
              ])
            ])
          }
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
          label: '发送时间',
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
    verify(item,status) {
      this.tableLoading = true
      this.axios.post('user-set-record-status',{
        uuid:item.uuid,
        id:item.id,
        status:status,
      }).then(res=>{
        this.tableLoading = false
        if(res){
          this.getData()
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
      this.fy.page = 1;
      this.fy.size = size;
      this.getData();
    },
    getData() {
      this.tableLoading = true;
      this.axios.get('user-record-list',{
        params: this.searchData
      }).then(res=>{
        this.tableLoading = false;
        if(res){
          this.myData = res.data.log_list
          this.pageprops.total = res.data.total
        }
      })
    },
  },
  mounted() {
    this.getData();
  },
  components: {
    userDetail
  }
}
</script>
<style lang="scss" scoped>
</style>

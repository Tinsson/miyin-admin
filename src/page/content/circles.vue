<template>
  <div id="circles">
    <title-bar title="动态管理" @refresh="refresh"></title-bar>
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
  name: "circles",
  data() {
    return {
      columns: [
        {
          title: '序号',
          key: 'id',
          align: 'center'
        },{
          title: '图片',
          key: 'img',
          align: 'center',
          render: (h,params)=>{
            return h('img',{
              attrs: {
                src: params.row.img
              },
              style: {
                width:'50px'
              }
            })
          }
        }, {
          title: '内容',
          key: 'content',
          align: 'center'
        }, {
          title: '动态id',
          key: 'uuid',
          align: 'center'
        }, {
          title: '昵称',
          key: 'nick_name',
          align: 'center'
        }, {
          title: '用户id',
          key: 'user_uuid',
          align: 'center'
        }, {
          title: '绑定手机号',
          key: 'mobile',
          align: 'center'
        }, {
          title: '发送时间',
          key: 'updated_at',
          align: 'center'
        },{
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
                  click: ()=>{
                    this.$refs.userDetail.show(params.row.user_uuid)
                  }
                }
              }, '查看用户'),
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '确定要删除这条评论吗？',
                  placement: 'left'
                },
                on: {
                  'on-ok': ()=>{
                    this.del(params.row.uuid)
                  }
                }
              }, [
                h('Button',{
                  props: {
                    type: 'text'
                  }
                },'删除')
              ])
            ])
          }
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
          label: '用户id',
          type: 'input',
          placeholder: '用户id',
          model: 'user_uuid'
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
    del(id) {
      this.tableLoading = true;
      this.axios.get('circles-del',{
        params: {
          uuid : [id]
        }
      }).then(res=>{
        this.tableLoading = false;
        if(res){
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
      this.fy.page = 1;
      this.fy.size = size;
      this.getData();
    },
    getData() {
      this.tableLoading = true;
      this.axios.get('circles-list',{
        params: this.searchData
      }).then(res=>{
        this.tableLoading = false;
        if(res){
          this.myData = res.data.list
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

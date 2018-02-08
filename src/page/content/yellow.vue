<template>
  <div id="yellow">
    <title-bar title="涉黄管理" @refresh="refresh"></title-bar>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <div slot="btn">
        <Button type="error" @click="del_select">删除勾选项</Button>
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading" @on-selection-change="select"></Table>
    </table-container>
    <playground ref="playground"></playground>
  </div>
</template>
<script>
export default {
  name: "yellow",
  data() {
    return {
      columns: [
        {
        type: 'selection',
        width: 60,
        align: 'center'
        },{
          title: '序号',
          key: 'id',
          align: 'center'
        },{
          title: '类型',
          key: 'type',
          align: 'center',
          render: (h,params)=>{
            let type_name = '';
            switch(params.row.type) {
              case 1: type_name = '评论';break;
              case 2: type_name = '动态';break;
              case 3: type_name = '照片墙';break;
              case 4: type_name = '个人签名';break;
              case 5: type_name = '聊天内容';break;
            }
            return h('span',type_name)
          }
        }, {
          title: '文本内容',
          key: 'content',
          align: 'center'
        }, {
          title: '视频文件名',
          key: 'video_name',
          align: 'center',
          render: (h,params)=>{
            return h('span',{
              style: {
                cursor:'pointer'
              },
              on: {
                click: ()=>{
                  this.$refs.playground.show(params.row.video_name,'video')
                }
              }
            },params.row.video_name)
          }
        }, {
          title: '图片文件名',
          key: 'img_name',
          align: 'center',
          render: (h,params)=>{
            return h('span',{
              style: {
                cursor: 'pointer'
              },
              on: {
                click:()=>{
                  this.$refs.playground.show(params.row.img_name)
                }
              }
            },params.row.img_name)
          }
        }, {
          title: '昵称',
          key: 'nick_name',
          align: 'center'
        }, {
          title: '用户id',
          key: 'user_uuid',
          align: 'center'
        },{
          title: '绑定手机号',
          key: 'mobile',
          align: 'center'
        },{
          title: '发送时间',
          key: 'created_at',
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
                on:{
                  click:()=>{
                    this.del(params.row.id);
                  }
                }
              }, '删除')
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
        },{
          label: '审核状态',
          type: 'select',
          placeholder: '选择审核状态',
          model: 'type',
          options:[
            {
              label: '请选择',
              value: ''
            },{
              label: '评论',
              value: 1
            },{
              label: '动态',
              value: 2
            },{
              label: '照片墙',
              value: 3
            },{
              label: '个人签名',
              value: 4
            },{
              label: '聊天内容',
              value: 5
            }
          ]
        }
      ],
      select_arr: [], //选择的用户列表
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
      this.tableLoading = true
      this.axios.get(`porn-log-del?id=${id}`).then(res=>{
        this.tableLoading = false;
        if(res){
          this.getData();
        }
      })
    },
    del_select() {
      let arr = [];
      for(let i=0;i<this.select_arr.length;i++) {
        arr.push(this.select_arr[i].id)
      }
      this.tableLoading = true
      this.axios.get(`porn-log-del?id=${arr}`).then(res=>{
        this.tableLoading = false;
        if(res){
          this.getData();
        }
      })
    },

    refresh() {
      this.getData();
    },
    select(selection) {
      this.select_arr = selection
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
      this.axios.get('porn-log-list',{
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
  }
}
</script>
<style lang="scss" scoped>
</style>

<template>
  <div id="task-stat">
    <title-bar title="动态列表" @refresh="refresh">
      <Button slot="btn"
              type="warning"
              icon="log-out"
              size="large" @click="backToAll">返回</Button>
    </title-bar>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <div slot="btn">
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
    <playground ref="playground"></playground>
  </div>
</template>
<script>
export default {
  name: "task-stat",
  data() {
    return {
      columns: [{
        title: '序号',
        align: 'center',
        render: (h, params)=>{
          return h('span', params.index+1);
        }
      },{
        title: '动态类型',
        key: 'type',
        align: 'center',
        render: (h, params) =>{
          let type = params.row.type;
          switch(type){
            case 1:
              type = '文字';
              break;
            case 2:
              type = '图片';
              break;
            case 3:
              type = '视频';
              break;
          }
          return h('span', type)
        }
      },{
        title: '内容',
        key: 'content',
        align: 'center'
      },{
        title: '图片',
        key: 'img',
        align: 'center',
        render: (h, params)=>{
          let url = params.row.img;
          console.log(url);
          if(url !== ''){
            return h('img',{
              style: {
                width: '60px',
                marginTop: '5px',
                cursor: 'pointer'
              },
              attrs: {
                src: url
              },
              on: {
                click:()=>{
                  this.$refs.playground.show(url)
                }
              }
            });
          }else{
            return h('span', '无');
          }
        }
      },{
        title: '视频',
        key: 'live_url',
        align: 'center',
        render: (h, params)=>{
          let url = params.row.live_url;
          console.log(url);
          if(url !== ''){
            return h('span',{
              style:{
                cursor:'pointer'
              },
              on: {
                click:()=>{
                  this.$refs.playground.show(url,'video')
                }
              }
            },'点击查看');
          }else{
            return h('span', '无');
          }
        }
      },{
        title: '点赞数',
        key: 'liked',
        align: 'center'
      },{
        title: '用户昵称',
        key: 'nick_name',
        align: 'center'
      },{
        title: '用户id',
        key: 'uuid',
        align: 'center'
      }, {
        title: '绑定手机号码',
        key: 'mobile',
        align: 'center'
      }, {
        title: '创建时间',
        key: 'created_at',
        align: 'center'
      }, {
        title: '更新时间',
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
          placeholder: '',
          model: 'nick_name'
        },{
          label: '用户ID',
          type: 'input',
          placeholder: '',
          model: 'user_uuid'
        },{
          label: '绑定手机号',
          type: 'input',
          placeholder: '',
          model: 'mobile'
        },{
          label: '时间',
          type: 'daterange',
          placeholder: '请选择时间',
          model: 'register_time',
          start_end: ['start_time','end_time']
        }
      ],
      pageprops: { //分页配置
        current: 1,
        pageSize: 10,
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
    backToAll(){
      this.$router.push('/action/action-all');
    },
    search(data) {
      this.searchForm = data;
      this.pageprops.current = 1;
      this.pageprops.pageSize = 10;
      this.fy = {
        page: 1,
        size: 10
      };
      this.getData();
    },
    pageChange(page) {
      this.fy.page = page;
      this.pageprops.current = page;
      this.getData();
    },
    pageSizeChange(size) {
      this.fy.size = size;
      this.pageprops.pageSize = size;
      this.getData();
    },
    getData() {
      this.tableLoading = true;
      this.axios.get('circles-list',{
        params:this.searchData
      }).then(res=>{
        this.tableLoading = false;
        if(res){
          this.myData = res.data.list;
          this.pageprops.total = res.data.total;
        }
      })
    }

  },
  mounted() {
    this.getData();
  }
}
</script>
<style lang="scss" scoped>
</style>

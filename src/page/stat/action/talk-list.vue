<template>
  <div id="task-stat">
    <title-bar :title="titleTxt" @refresh="refresh"></title-bar>
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
  name: "task-stat",
  data() {
    return {
      talk_type: 5,
      columns: [{
          title: '序号',
          align: 'center',
          render: (h, params)=>{
            return h('span', params.index+1);
          }
        },{
          title: '拨打人昵称',
          key: 'nick_name',
          align: 'center'
        },{
          title: '拨打人ID',
          key: 'uuid',
          align: 'center'
        },{
          title: '接听人昵称',
          key: 'to_nick_name',
          align: 'center'
        },{
          title: '接听人ID',
          key: 'to_uuid',
          align: 'center'
        },{
          title: '聊天状态',
          key: 'status',
          align: 'center',
          render: (h, params)=>{
            let status = params.row.status;
            if(status === 2){
              status = '接通';
            }else if(status === 3){
              status = '挂断';
            }
            return h('span', status);
          }
        },{
          title: '通话时长',
          key: 'mins',
          align: 'center'
        },{
          title: '通话ID',
          key: 'room_id',
          align: 'center'
        },{
          title: '消费秘币',
          key: 'price',
          align: 'center'
        },{
          title: '开始时间',
          key: 'start_time',
          align: 'center'
        },{
          title: '结束时间',
          key: 'end_time',
          align: 'center'
      }],
      myData: [],
      tableLoading: false,
      searchList: [
        {
          label: '拨打人昵称',
          type: 'input',
          placeholder: '',
          model: 'nick_name'
        },{
          label: '拨打人ID',
          type: 'input',
          placeholder: '',
          model: 'uuid'
        },{
          label: '接听人昵称',
          type: 'input',
          placeholder: '',
          model: 'to_nick_name'
        },{
          label: '接听人ID',
          type: 'input',
          placeholder: '',
          model: 'to_uuid'
        },{
          label: '聊天状态',
          type: 'select',
          placeholder: '',
          model: 'status',
          options: [{
            label: '接通',
            value: '2'
          },{
            label: '挂断',
            value: '3'
          }]
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
      searchForm: {
        type: 5
      } //搜索框属性
    }
  },
  computed: {
    searchData () {
      return Object.assign(this.fy,this.searchForm);
    },
    titleTxt(){
      return this.talk_type === 5?'普通电话统计':'随机电话统计';
    }
  },
  created(){
    const type = this.$route.query.type;
    this.searchForm.type = type;
    this.talk_type = type;
    //console.log(this.$route.query.type);
  },
  methods: {
    refresh() {
      this.getData();
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
      this.axios.get('talk-list',{
        params:this.searchData
      }).then(res=>{
        this.tableLoading = false;
        if(res){
          this.myData = res.data.info_list;
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

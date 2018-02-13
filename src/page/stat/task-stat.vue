<template>
  <div id="task-stat">
    <title-bar title="任务统计" @refresh="refresh"></title-bar>
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
      columns: [{
          title: '序号',
          align: 'center',
          render: (h, params)=>{
            return h('span', params.index+1);
          }
        },{
          title: '昵称',
          key: 'nick_name',
          align: 'center'
        },{
          title: '用户id',
          key: 'uuid',
          align: 'center'
        }, {
          title: '完成时间',
          key: 'created_at',
          align: 'center'
        }, {
          title: '任务名称',
          key: 'name',
          align: 'center'
        }, {
          title: '任务类型',
          key: 'type',
          align: 'center',
          render: (h, params)=>{
            let type = params.row.type;
            if(type === 1){
              type = '新手任务';
            }else if(type === 2){
              type = '每日任务';
            }
            return h('span', type);
          }
        }, {
          title: '奖励秘币',
          key: 'price',
          align: 'center'
        }
      ],
      myData: [],
      tableLoading: false,
      searchList: [
        {
          label: '完成人昵称',
          type: 'input',
          placeholder: '',
          model: 'nick_name'
        },{
          label: '完成人id',
          type: 'input',
          placeholder: '',
          model: 'uuid'
        },{
          label: '时间',
          type: 'daterange',
          placeholder: '请选择时间',
          model: 'register_time',
          start_end: ['start_time','end_time']
        },{
          label: '任务类型',
          type: 'select',
          placeholder: '',
          model: 'type',
          options: [{
            label: '新手任务',
            value: '1'
          },{
            label: '每日任务',
            value: '2'
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
      this.axios.get('task-count',{
        params:this.searchData
      }).then(res=>{
        this.tableLoading = false;
        if(res){
          this.myData = res.data.stats_list;
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

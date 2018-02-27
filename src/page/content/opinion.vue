<template>
  <div id="opinion">
    <title-bar title="意见反馈" @refresh="refresh"></title-bar>
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
  name: "opinion",
  data() {
    return {
      columns: [{
          title: '序号',
          align: 'center',
          render: (h, params)=>{
            return h('span', params.index+1);
          }
        },{
          title: '手机号',
          key: 'mobile',
          align: 'center'
        },{
          title: '用户id',
          key: 'mid',
          align: 'center'
        }, {
          title: '分类名称',
          key: 'cate_name',
          align: 'center'
        }, {
          title: '联系方式',
          key: 'tel_phone',
          align: 'center'
        }, {
          title: '内容',
          key: 'content',
          align: 'center'
        }
      ],
      myData: [],
      tableLoading: false,
      searchList: [{
          label: '反馈类别',
          type: 'select',
          placeholder: '',
          model: 'cate_id',
          options: []
        },{
          label: '时间',
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
      this.axios.get('opinion-cates').then(d=>{
        console.log(d);
        if(d.status === 1){
          let res = d.data.info_list;
          this.searchList[0].options = res.map(val=>{
            return {
              label: val.name,
              value: val.id
            }
          });
        }
      });
      this.tableLoading = true;
      this.axios.get('opinion-list',{
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

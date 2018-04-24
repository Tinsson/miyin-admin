<template>
  <div id="opinion">
    <title-bar title="投诉管理" @refresh="refresh"></title-bar>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <div slot="btn">
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
    <playground ref="playground"></playground>
    <user-detail ref="userDetail"></user-detail>
  </div>
</template>
<script>
import userDetail from '@/page/user/components/user-detail'

export default {
  name: "opinion",
  components: {
    userDetail
  },
  data() {
    return {
      columns: [{
          title: '序号',
          align: 'center',
          render: (h, params)=>{
            return h('span', params.index+1);
          }
        },{
          title: '投诉发起人手机号',
          key: 'mobile',
          align: 'center',
          render: (h, params)=>{
            return h('span', {
              style: {
                cursor: 'pointer',
                color: '#3baaff'
              },
              on: {
                click: ()=>{
                  this.$refs.userDetail.show(params.row.uuid)
                }
              }
            }, params.row.mobile)
          }
        },{
          title: '投诉项',
          key: 'cate_name',
          align: 'center'
        }, {
          title: '图片',
          key: 'img',
          align: 'center',
          render: (h, params)=>{
            return h('img',{
              style:{
                marginTop: '5px',
                width: '50px',
                height: '50px'
              },
              attrs: {
                src: params.row.img_path
              },
              on: {
                click: ()=>{
                  this.$refs.playground.show(params.row.img_path)
                }
              }
            })
          }
        }, {
          title: '被投诉人手机号',
          key: 'to_mobile',
          align: 'center',
          render: (h, params)=>{
            return h('span', {
              style: {
                cursor: 'pointer',
                color: '#3baaff'
              },
              on: {
                click: ()=>{
                  this.$refs.userDetail.show(params.row.to_uuid)
                }
              }
            }, params.row.to_mobile)
          }
        }, {
          title: '时间',
          key: 'created_at',
          align: 'center'
        }
      ],
      myData: [],
      tableLoading: false,
      searchList: [{
          label: '投诉发起人',
          type: 'input',
          placeholder: '手机号',
          model: 'mobile'
        },{
          label: '被投诉人',
          type: 'input',
          placeholder: '手机号',
          model: 'to_mobile'
        },{
          label: '投诉项',
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
      this.axios.get('complain-cate').then(d=>{
        console.log(d);
        if(d.status === 1){
          let res = d.data.cate_list;
          this.searchList[2].options = res.map(val=>{
            return {
              label: val.name,
              value: val.id
            }
          });
        }
      });
      this.tableLoading = true;
      this.axios.get('complain-list',{
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

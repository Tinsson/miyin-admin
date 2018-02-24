<template>
  <div id="tap-list">
    <title-bar title="偷听列表" @refresh="refresh">
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
    <Modal v-model="detail_show" width="600" title="偷听详情">
      <div class="det-area">
        <div class="single-block" v-for="item in detail_data" :key="item.label">
          <span class="label-txt">{{item.label}}</span>
          <span class="value-txt">{{item.value}}</span>
        </div>
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "tap-list",
  data() {
    return {
      detail_show: false,
      detail_data:[{
        label: '用户昵称：',
        value: ''
      },{
        label: '偷听总时长：',
        value: ''
      },{
        label: '偷听费用：',
        value: ''
      },{
        label: '解锁费用：',
        value: ''
      },{
        label: '总花费：',
        value: ''
      }],
      columns: [{
        title: '序号',
        align: 'center',
        render: (h, params)=>{
          return h('span', params.index+1);
        }
      },{
        title: '通话类型',
        key: 'type',
        align: 'center',
        render: (h, params)=>{
          let row = params.row,
              text = '';
          switch(row.type){
            case 5:
              text = '普通电话';
              break;
            case 6:
              text = '随机电话'
              break;
          }
          return h('span', text);
        }
      },{
        title: '偷听人数',
        key: 'tap_count',
        align: 'center'
      },{
        title: '偷听总时长',
        key: 'tap_duration',
        align: 'center'
      }, {
        title: '偷听总收入',
        key: 'tap_pay',
        align: 'center'
      }, {
        title: '解锁总收入',
        key: 'tap_lock_sum',
        align: 'center'
      }, {
        title: '总收入',
        key: 'tap_sum',
        align: 'center'
      },{
        title: '操作',
        key: 'operation',
        align: 'center',
        render: (h, params)=>{
          return h('Button',{
            props:{
              'type': 'info'
            },
            on:{
              click:()=>{
                this.checkMore(params.row);
              }
            }
          },'查看更多')
        }
      }
      ],
      myData: [],
      tableLoading: false,
      searchList: [
        {
          label: '通话类型',
          type: 'select',
          placeholder: '',
          model: 'type',
          options: [{
            label: '随机',
            value: '5'
          },{
            label: '普通',
            value: '6'
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
    checkMore(row){
      let room_id = row.room_id;
      this.axios.get('tap-detail',{
        params: {room_id}
      }).then(d=>{
        if(d.status === 1){
          let res = d.data.info_list[0];
          this.detail_data[0].value = res.nick_name;
          this.detail_data[1].value = res.tap_duration;
          this.detail_data[2].value = res.tap_price;
          this.detail_data[3].value = res.lock_price;
          this.detail_data[4].value = res.all_price;
          this.detail_show = true;
        }
      })
    },
    getData() {
      this.tableLoading = true;
      this.axios.get('tap-list',{
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
  .det-area{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    font-size: 16px;
  }
  .det-area .single-block{
    width: 50%;
    padding-bottom: 20px;
  }
  .det-area .single-block .label-txt{
    display: inline-block;
    width: 120px;
    text-align: right;
  }
  .det-area .single-block .value-txt{
    padding-left: 10px;
  }
</style>

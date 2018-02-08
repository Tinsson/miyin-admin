<template>
<div id="user">
  <title-bar title="用户管理" @refresh="refresh">

  </title-bar>
  <search-group :searchList="searchList" @search="search">
  </search-group>
  <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
    <div slot="btn">
      <msg-btn :select="select_arr" :total="pageprops.total" @refresh="getData"></msg-btn>
    </div>
    <Table :columns="columns" :data="myData" border :loading="tableLoading" @on-selection-change="select"></Table>
  </table-container>

  <!-- 高级检索模态框 -->
  <!-- <Modal v-model="senior_search" title="高级检索" ok-text="开始检索" cancel-text="重置">
    <div class="senior-search-container">
      <div>
        <div class="label">
          用户账号:
        </div>
        <Input placeholder="用户ID/账号"></Input>
      </div>
      <div>
        <div class="label">
          用户昵称:
        </div>
        <Input placeholder="用户昵称"></Input>
      </div>
      <div>
        <div class="label">
          用户来源:
        </div>
        <Select>
          <Option value='PC'>PC端</Option>
          <Option value="web">WEB端</Option>
        </Select>
      </div>
      <div>
        <div class="label">
          会员等级:
        </div>
        <Select>
          <Option value="pt">普通会员</Option>
          <Option value="hj">黄金会员</Option>
          <Option value="bj">白金会员</Option>
          <Option value="zs">钻石会员</Option>
        </Select>
      </div>
      <div>
        <div class="label">
          用户标签:
        </div>
        <Select>
        </Select>
      </div>
      <div>
        <div class="label">
          注册时间:
        </div>
        <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width:100%"></DatePicker>
      </div>
    </div>
  </Modal> -->

  <user-detail ref="userDetail"></user-detail>

</div>
</template>
<script>
import msgBtn from './components/user-msg-btn.vue'
import userDetail from './components/user-detail.vue'
export default {
  name: "user",
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
        }, {
          title: '用户ID',
          key: 'uuid',
          align: 'center'
        }, {
          title: '用户昵称',
          key: 'nick_name',
          align: 'center'
        },{
          title: '用户来源',
          key: 'source',
          align:'center',
          render: (h,params)=>{
            let ly;
            switch(params.row.source) {
              case 0:ly = '未知';break;
              case 1:ly = '安卓';break;
              case 2:ly = 'IOS';break;
              case 3:ly = '后台';break;
            }
            return h('span',ly)
          }
        }, {
          title: '注册时间',
          key: 'created_at',
          align: 'center'
        }, {
          title: '绑定手机号',
          key: 'mobile',
          align: 'center'
        }, {
          title: '授权微信',
          key: 'is_bind_wx',
          align: 'center',
          render: (h,params)=>{
            return h('span',params.row.is_bind_wx==1?'是':'否')
          }
        },{
          title: '性别',
          key: 'sex',
          align: 'center',
          render: (h,params)=>{
            let sex;
            switch(params.row.sex){
              case 0:sex = '未知';break;
              case 1:sex = '男';break;
              case 2:sex = '女';break;
            }
            return h('span',sex)
          }
        }, {
          title: '秘币余额',
          key: 'balance',
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
                    this.$refs.userDetail.show(params.row.uuid)
                  }
                }
              }, '查看')
            ])
          }
        }
      ], //列配置数据

      myData: [], //表格数据

      searchList: [{   //搜索列表配置
        label: '用户账号',
        type: 'input',
        placeholder: '用户ID/账号',
        model: 'username'
      }, {
        label: '用户昵称',
        type: 'input',
        placeholder: '用户昵称',
        model: 'nick_name'
      },{
        label: '用户来源',
        type: 'select',
        placeholder: '请选择',
        options: [{
          label: '请选择',
          value: '',
        },{
          label: '未知',
          value: 0
        },{
          label: '安卓',
          value: 1
        },{
          label: 'IOS',
          value: 2
        },{
          label: '后台',
          value: 3
        }],
        model: 'source'
      },{
        label: '微信授权',
        type: 'select',
        placeholder: '请选择',
        options: [{
          label: '请选择',
          value: '',
        },{
          label: '是',
          value: 1
        },{
          label: '否',
          value: 0
        }],
        model: 'is_bind_wx'
      },{
        label: '性别',
        type: 'select',
        placeholder: '请选择',
        options: [{
          label: '请选择',
          value: '',
        },{
          label: '未知',
          value: 0
        },{
          label: '男',
          value: 1
        },{
          label: '女',
          value: 2
        }],
        model: 'sex'
      },{
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
      my_search: {type:1} //固定搜索用户
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
      this.getData()
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
    userDetail
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

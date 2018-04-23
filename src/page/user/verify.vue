<template>
  <div id="verify">
    <title-bar title="主播审核" @refresh="refresh"></title-bar>
    <table-card :columns="card_columns" :data="card_data" @change="cardChange"></table-card>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <div slot="btn">
        <msg-btn :select="select_arr" :type="my_search.type" :total="pageprops.total" :search="searchForm"></msg-btn>
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading" @on-selection-change="select"></Table>
    </table-container>

    <Modal v-model="verify_show" title="审核" width="600">
      <div class="verify-container">
        <div class="top">
          <div class="photo background-contain" :style="'background-image:url('+verify_user.portrait+')'">

          </div>
          <div class="detail">
            <div class="line">
              <div class="label">
                昵称:
              </div>
              <div class="text">
                {{verify_user.nick_name}}
              </div>
            </div>
            <div class="line">
              <div class="label">
                注册时间:
              </div>
              <div class="text">
                {{verify_user.created_at}}
              </div>
            </div>
            <div class="line">
              <div class="label">
                绑定手机号:
              </div>
              <div class="text">
                {{verify_user.mobile}}
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="title">
            审核照片:
          </div>
          <div class="pic background-contain" :style="'background-image:url('+verify_user.img_path+')'">

          </div>
        </div>
      </div>
      <div class="verify-footer" slot="footer">
        <div>
          <Button size="large" type="warning" long @click="verify(5)">待定</Button>
        </div>
        <div>
          <Button size="large" type="error" long @click="verify(4)">不通过</Button>
        </div>
        <div>
          <Button size="large" type="success" long @click="verify(3)">通过</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import msgBtn from './components/user-msg-btn.vue'
export default {
  name: "verify",
  data() {
    return {
      verify_user: {},
      card_columns: [
        {
          title: '待审核',
          unit: '人',
          key: 'k2',
          type: 2,
          icon:'ios-timer'
        },{
          title: '通过',
          unit: '人',
          key: 'k3',
          type: 3,
          icon: 'ios-close'
        },{
          title: '不通过',
          unit: '人',
          key: 'k4',
          type: 4,
          icon: 'ios-checkmark'
        },{
          title: '挂起',
          unit: '人',
          key: 'k5',
          type: 5,
          icon: 'android-sync'
        }
      ],
      card_data: {},

      verify_show: false,
      columns: [
        {
        type: 'selection',
        width: 60,
        align: 'center'
        },{
          title: '用户ID',
          key: 'uuid',
          align: 'center'
        }, {
          title: '用户昵称',
          key: 'nick_name',
          align: 'center'
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
        }, {
          title: '审核状态',
          key: 'is_auth',
          align: 'center',
          render: (h,params)=>{
            let status;
            switch(params.row.is_auth){
              case 2: status = '审核中';break;
              case 3: status = '审核通过';break;
              case 4: status = '审核不通过';break;
              case 5: status = '待定';break;
            }
            return h('div',status)
          }
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
                  click: () => {
                    this.verify_user = params.row;
                    this.verify_show = true;
                  }
                }
              }, '审核')
            ])
          }
        }
      ],
      myData: [{uuid:1}],
      tableLoading: false,
      searchList: [
        {
          label: '用户信息',
          type: 'input',
          placeholder: '用户ID/手机号',
          model: 'username'
        },{
          label: '用户昵称',
          type: 'input',
          placeholder: '用户昵称',
          model: 'nick_name'
        },{
          label: '注册时间',
          type: 'daterange',
          placeholder: '请选择时间',
          model: 'register_time',
          start_end: ['start_time','end_time']
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
      searchForm: {}, //搜索框属性
      card_search: {
        is_auth: 2,
        type: 3
      },
      my_search: {type:3} //固定搜索认证列表
    }
  },
  computed: {
    searchData () {
      return Object.assign(this.fy,this.searchForm,this.card_search);
    }
  },
  methods: {
    cardChange(type) {
      this.card_search.is_auth = type;
      this.getData();
    },
    verify(type) {
      this.axios.post('user-audit-cert',{
        uuid: this.verify_user.uuid,
        auth: type
      }).then(res=>{
        if(res){
          this.verify_show=false;
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
    },
    getCardData() {
      this.axios.get('user-cert-group-count').then(res=>{
        if(res){
          this.card_data = res.data.count_list;
        }
      })
    }
  },
  mounted() {
    this.getCardData();
    // this.getData()
  },
  components: {
    msgBtn
  }
}
</script>
<style lang="scss" scoped>
.verify-container{
  .top{
    padding-bottom:10px;
    border-bottom:1px solid #ddd;
    display:flex;
    align-items: center;
    padding-left:20px;
    .photo{
      width:80px;
      height:80px;
      margin-right:20px;
    }
    .detail{
      font-size:14px;
      line-height:25px;
      .line{
        display:flex;
        .label{
          margin-right:15px;
        }
      }
    }
  }
  .bottom{
    .title{
      font-size:14px;
      padding-left:20px;
      margin:10px 0;
    }
    .pic{
      width:400px;
      height:400px;
      margin:0 auto;
    }
  }
}
.verify-footer{
  display:flex;
  justify-content: space-around;
  >div{
    width:120px;
  }
}
</style>

<template>
  <div id="userDetail">
    <Modal v-model="if_show" title="用户详情" width="1200px" class-name="no-auto">
      <div class="user-detail-container">
        <div class="left">
          <table-card :columns="cardColumns" :data="cardData" @change="card_change"></table-card>
          <table-container page :pageprops="pageprops">
            <Table :columns="$data['columns']" :data="myData" :loading="tableLoading"></Table>
          </table-container>
          <Spin size="large" fix v-if="left_loading"></Spin>
        </div>
        <div class="right">
          <Tabs>
            <TabPane label="个人资料">
              <div class="tab-container">
                <div class="input-group">
                  <div class="label">
                    头像:
                  </div>
                  <div class="content">
                    <div class="photo" @click="showImg">

                    </div>
                  </div>
                </div>
                <div class="input-group">
                  <div class="label">
                    昵称:
                  </div>
                  <div class="content">
                    <div class="text" v-if="!edit_user_info">
                      {{user_info_form.nickname}}
                    </div>
                    <div v-else>
                      <Input v-model="user_info_form.nickname"></Input>
                    </div>
                  </div>
                </div>
                <div class="input-group">
                  <div class="label">
                    手机号
                  </div>
                  <div class="content">
                    <div class="text" v-if="!edit_user_info">
                      {{user_info_form.mobile}}
                    </div>
                    <div v-else>
                      <Input v-model="user_info_form.mobile"></Input>
                    </div>
                  </div>
                </div>
                <div class="input-group">
                  <div class="label">
                    性别
                  </div>
                  <div class="content">
                    <div class="text"  v-if="!edit_user_info">
                      {{user_info_form.sex=='1'?'男':'女'}}
                    </div>
                    <div v-else>
                      <Select v-model="user_info_form.sex">
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                      </Select>
                    </div>
                  </div>
                </div>
                <div class="input-group">
                  <div class="label">
                    是否黑名单
                  </div>
                  <div class="content">
                    <div class="text"  v-if="!edit_user_info">
                      {{user_info_form.blacklist=='1'?'是':'否'}}
                    </div>
                    <div v-else>
                      <Select v-model="user_info_form.blacklist">
                        <Option value="1">是</Option>
                        <Option value="2">否</Option>
                      </Select>
                    </div>
                  </div>
                </div>
                <div class="input-group">
                  <div class="label">
                    用户id
                  </div>
                  <div class="content">
                    <div class="text">
                      {{user_info_form.uuid}}
                    </div>
                  </div>
                </div>
                <div class="input-group">
                  <div class="label">
                    微信授权
                  </div>
                  <div class="content">
                    <div class="text">
                      未授权
                    </div>
                  </div>
                </div>
                <div class="input-group">
                  <div class="label">
                    认证状态
                  </div>
                  <div class="content">
                    <div class="text">
                      未认证
                    </div>
                  </div>
                </div>
                <div class="input-group">
                  <div class="label">
                    注册时间
                  </div>
                  <div class="content">
                    <div class="text">
                      2017-11-17 23:20:00
                    </div>
                  </div>
                </div>
                <div class="input-group">
                  <div class="label">
                    充值状态
                  </div>
                  <div class="content">
                    <div class="text">
                      已充值
                    </div>
                  </div>
                </div>
                <div class="input-group">
                  <div class="label">
                    首充时间
                  </div>
                  <div class="content">
                    <div class="text">
                      2017-11-17 23:20:00
                    </div>
                  </div>
                </div>
                <div style="margin-top:20px;">
                  <Button @click="edit('user_info')" v-show="!edit_user_info" type="info">编辑</Button>
                  <Button @click="save('user_info')" v-show="edit_user_info" type="success">保存</Button>
                  <Button @click="cancle('user_info')" v-show="edit_user_info" style="margin-left:20px;">取消</Button>
                </div>
              </div>
            </TabPane>
            <TabPane label="个性化数据">
              <div class="tab-container">
                <div class="data-title">
                  他的标签：
                </div>
                <div class="tips-container">
                  <div class="tip" v-for="item in 3">
                    二次元
                  </div>
                </div>
                <div class="data-title" style="margin-top:10px;">
                  他的签名:
                </div>
                <div class="sign">
                  <div class="text" v-show="!edit_user_data" v-html="user_data_sign_html">
                    <!-- {{user_data_form.sign}} -->
                  </div>
                  <div class="font-12" v-show="edit_user_data">
                    <Input v-model="user_data_form.sign" type="textarea" :autosize="{minRows:2}"></Input>
                  </div>
                </div>
                <div class="data-title" style="margin-top:10px;">
                  他的照片墙:
                </div>
                <div class="photo-wall">
                  <div class="background-contain" v-for="item in 5">
                    <div class="close">
                      <Icon type="close-circled" color="#ff0000" size="20" v-show="edit_user_data"></Icon>
                    </div>
                  </div>
                </div>
                <div style="margin-top:20px;">
                  <Button @click="edit('user_data')" v-show="!edit_user_data" type="info">编辑</Button>
                  <Button @click="save('user_data')" v-show="edit_user_data" type="success">保存</Button>
                  <Button @click="cancle('user_data')" v-show="edit_user_data" style="margin-left:20px;">取消</Button>
                </div>
              </div>
            </TabPane>
            <TabPane label="他的动态">
              <div class="tab-container">
                <div class="trends">
                  <div class="line1">
                    <span>2017-11-17 12:30:31</span>
                    <Icon type="close-circled" color="#ff0000" size="20" v-show="edit_user_trends"></Icon>
                  </div>
                  <div class="line2">
                    今天觉得自己萌萌哒，超级帅，你们觉得呢！啦啦啦啦啦啦啦啦啦啦
                  </div>
                  <div class="line3">
                    <div v-for="item in 5"></div>
                  </div>
                </div>
                <div style="margin-top:20px;">
                  <Button @click="edit('user_trends')" v-show="!edit_user_trends" type="info">编辑</Button>
                  <Button @click="save('user_trends')" v-show="edit_user_trends" type="success">保存</Button>
                  <Button @click="cancle('user_trends')" v-show="edit_user_trends" style="margin-left:20px;">取消</Button>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div slot="footer">
      </div>

    </Modal>
    <Modal v-model="imgShow" title="图片查看" width="600">
      12312312
    </Modal>
  </div>
</template>
<script>
export default {
  name: "userDetail",
  data: () => ({
    uuid: '',
    table_type: '',
    columns: [],
    columns0: [
      {
        title: '类型',
        key: 'remark',
        align:'center'
      },{
        title: '秘币变化',
        key: 'price',
        align:'center',
        render: (h,params)=>{
          return h('span',{
            style:{
              color: params.row.price[0]=='-'?'red':'green'
            }
          },params.row.price)
        }
      }
    ],
    myData: [],
    imgShow: false,

    if_show: true,
    left_loading: false,
    cardData:{},
    cardColumns: [
      {
        title: '秘币余额',
        key: 'balance',
        type: '0'
      },{
        title: '充值总额',
        unit: '（人民币）',
        key: 'recharge_money',
        type: '1'
      },{
        title: '秘币消费',
        key: 'all_expense',
        type: '3'
      },{
        title: '在线时长',
        unit: '分钟',
        key: '',
        type: ''
      },{
        title: '聊天时长',
        key: 'talk_mins',
        type: '5'
      },{
        title: '偷听时长',
        key: 'tap_mins',
        type: '7'
      }
    ],
    pageprops: {
      total: 0,
      showSizer:true
    },
    tableLoading: false,


    edit_user_info: false,
    user_info_form:{
      nickname: '孙玉杰',
      mobile: '18768582761',
      uuid: '123123123123',
      sex: '1',
      blacklist: '1'
    },
    user_info_form_copy:{},

    edit_user_data: false,
    user_data_form: {
      sign: '我是一个大帅比，快来撩我啊'
    },
    user_data_form_copy: {

    },

    edit_user_trends: false,
    user_trends_form:{},
    user_trends_form_copy:{}
  }),
  computed: {
    user_data_sign_html() {
      return this.user_data_form.sign.replace(/\n/g,'<br>')
    }
  },
  methods: {
    showImg() {
      this.imgShow = true;
    },
    edit(item) {
      for(let key in this.$data[item+'_form']){
        this.$set(this.$data[item+'_form_copy'],key,this.$data[item+'_form'][key])
      }
      this.$data['edit_'+item] = true;
    },
    save(item){
      this.$data['edit_'+item] = false;
    },
    cancle(item) {
      for(let key in this.$data[item+'_form_copy']){
        this.$set(this.$data[item+'_form'],key,this.$data[item+'_form_copy'][key])
      }
      this.$data['edit_'+item] = false;
    },
    card_change(key) {
      console.log(key);
      this.tableLoading = true
      this.table_type = key
      this.axios.get('user-card-table',{
        params:{
          uuid: this.uuid,
          type: key
        }
      }).then(res=>{
        this.tableLoading = false;
        if(res){
          console.log(res)
        }
      })
    },
    show(id) {
      this.uuid = 'P15141873551220443';
      this.if_show = true;
      this.left_loading = true;
      this.axios.get(`get-user-card?uuid=${this.uuid}`).then(res=>{
        this.left_loading = false;
        if(res){
          this.cardData = res.data.user_stats
        }
      })
    }
  },
  mounted() {
    this.show();
  }
}
</script>
<style lang="scss" scoped>
.tab-container{
  padding:10px;
  padding-top:0;
  .photo{
    width:50px;
    height:50px;
    background:#000;
  }
  .input-group{
    display:flex;
    align-items: center;
    padding:5px 0;
    .label{
      width:80px;
      // text-align: right;
      // border:1px solid #ddd;
    }
    .content{
      .text{
        height:32px;
        line-height: 32px;
        padding-left:7px;
      }
    }
  }
  .data-title{
    font-size:13px;
    margin-bottom:15px;
  }
  .tips-container{
    display:flex;
    flex-wrap: wrap;
    .tip{
      margin-left:15px;
      white-space: nowrap;
      padding:10px;
      border:1px solid #ddd;
      border-radius: 10px;
      min-width:70px;
      text-align:center;
      margin-bottom:10px;
    }
  }
  .sign{
    .text{
      min-height:46px;
      padding:4px 7px;
    }
  }
  .photo-wall{
    display:flex;
    flex-wrap: wrap;
    >div{
      width:110px;
      height:110px;
      background-color:#000;
      margin-bottom:10px;
      margin-left:10px;
      position:relative;
      .close{
        position:absolute;
        top:0;
        left:0;
      }
    }
  }
  .trends{
    .line1{
      display:flex;
      align-items: center;
      justify-content: space-between;
      font-size:13px;
    }
    .line2{
      padding:5px;
    }
    .line3{
      display:flex;
      flex-wrap: wrap;
      >div{
        width:80px;
        height:80px;
        background-color:#000;
        margin-bottom:10px;
        margin-left:10px;
        position:relative;
        .close{
          position:absolute;
          top:0;
          left:0;
        }
      }
    }
  }
}

.user-detail-container{
  display:flex;
  justify-content: space-around;
  .left{
    width:750px;
    padding-top:10px;
    position:relative;
  }
  .right{
    position:relative;
    width:400px;
    border:1px solid #ddd;
    border-radius: 5px;
    // border-top:0;
  }
}
</style>

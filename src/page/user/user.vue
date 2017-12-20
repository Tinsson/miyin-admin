<template>
<div id="user">
  <title-bar title="用户管理" @refresh="refresh">

  </title-bar>
  <search-group :searchList="searchList" @search="search">
    <Button type="warning" icon="pinpoint" @click="senior_search=true">高级检索</Button>
  </search-group>
  <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page>
    <div slot="btn">
      <msg-btn></msg-btn>
    </div>
    <Table :columns="columns" :data="myData" border :loading="$store.state.common.table_loading"></Table>
  </table-container>

  <!-- 高级检索模态框 -->
  <Modal v-model="senior_search" title="高级检索" ok-text="开始检索" cancel-text="重置">
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
  </Modal>

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
      // 高级筛选
      senior_search: false,

      // user_detail_show: false,

      columns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '用户ID',
        key: 'userID',
        align: 'center'
      }, {
        title: '用户账号',
        key: 'mobile',
        align: 'center'
      }, {
        title: '用户昵称',
        key: 'user_name',
        align: 'center'
      }, {
        title: '注册时间',
        key: 'register_time',
        align: 'center'
      }, {
        title: '是否绑定手机',
        key: 'apply_num',
        align: 'center'
      }, {
        title: '性别',
        key: 'register_num',
        align: 'center'
      }, {
        title: '迷币余额',
        key: 'love_money',
        align: 'center'
      }, {
        title: '账户启用状态',
        key: 'love_time',
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
            }, '删除'),
            h('Button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.$refs.userDetail.show = true
                }
              }
            }, '查看')
          ])
        }
      }],

      myData: [{
        userID: '1'
      }],

      searchList: [{
        label: '用户账号',
        type: 'input',
        placeholder: '用户ID/账号',
        model: 'userId'
      }, {
        label: '用户昵称',
        type: 'input',
        placeholder: '用户昵称',
        model: 'userName'
      }, {
        label: '注册时间',
        type: 'daterange',
        placeholder: '请选择注册时间',
        model: 'register_time'
      }],

      // pageprops: {
      //   current: 3,
      //   total: 1000,
      //   showSizer: true
      // }
    }
  },
  methods: {
    show(index) {
      console.log(index);
    },
    search(data) {
      this.$store.dispatch('table_axios', {
        path: '/Auth/authList',
        data: data
      }).then(res => {
        console.log(res)
      })
    },
    refresh() {
      console.log('刷新')
    },
    pageChange(page) {
      console.log(page)
    },
    pageSizeChange(size) {
      console.log(size)
    }
  },
  mounted() {
    // console.log(this.axios.defaults.headers);
    this.axios.get('/user/list').then(res => {
      console.log(res)
    })
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

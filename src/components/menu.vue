<template>
<div id="my-menu">
  <Menu theme="dark" @on-select="goRoute" accordion :active-name="cur_path" :open-names="cur_open">
    <div class="layout-logo-left">
      <img class="logo" src="../assets/images/logo.png" alt=""> 秘音后台管理
    </div>
    <div class="user-panel">
      <div class="pull-left">
        <p class="text">{{user_name}}</p>
        <p class="state"><i class="icon-state"></i>online</p>
      </div>
    </div>
    <Submenu v-for="(group,pindex) in arr" :name="group.path" :key="pindex">
      <template slot="title">
          <Icon type="ios-paper"></Icon>
          {{group.name}}
      </template>
      <MenuItem v-for="(item,index) in group.children" :name="group.path+item.path" :key="index">{{item.name}}</MenuItem>
    </Submenu>
  </Menu>
</div>
</template>
<script>
export default {
  name: "my-menu",
  data: () => ({
    arr: [{
      id: '1',
      name: '用户',
      path: '/user',
      children: [{
        id: '2',
        name: '用户管理',
        path: '/users'
      },{
        id:'5',
        name: '女主播列表',
        path: '/anchor'
      },{
        id: '6',
        name: '真人审核列表',
        path: '/verify'
      }]
    },{
      id: '7',
      name: '礼物管理',
      path: '/gift',
      children: [{
        id: '8',
        name: '礼物管理',
        path: '/gifts'
      }]
    },{
      id: '9',
      name: '资金管理',
      path: '/money',
      children: [{
        id: '10',
        name: '提现申请',
        path: '/cash-apply'
      },{
        id: '11',
        name: '提现列表',
        path: '/cash-list'
      },{
        id: '12',
        name: '支付宝充值列表',
        path: '/alipay'
      },{
        id: '17',
        name: '微信充值列表',
        path: '/wx-recharge'
      },{
        id: '18',
        name: '礼物明细',
        path: '/gift-detail'
      },{
        id: '19',
        name: '消费明细',
        path: '/consumer-detail'
      },{
        id: '20',
        name: '收入明细',
        path: '/income-detail'
      }]
    },{
      id:'13',
      name: '配置管理',
      path: '/config',
      children: [
        {
          id: '15',
          name: '全局配置',
          path: '/global-config'
        },{
          id: '14',
          name: '新手任务',
          path: '/task-newcomer'
        },{
          id: '16',
          name: '每日任务',
          path: '/task-daily'
        },{
          id: '17',
          name: '头像配置',
          path: '/avatar-config'
        }, {
          id: '18',
          name: '标签配置',
          path: '/tag-config'
        },{
          id:'25',
          name:'充值比例',
          path:'/recharge-ratio'
        }
      ]
    },{
      id: '3',
      name: '内容管理',
      path: '/content',
      children: [{
        id: '4',
        name: '文章分类管理',
        path: '/article-class'
      },{
        id:'17',
        name: '评论管理',
        path: '/comment'
      },{
        id: '18',
        name: '动态管理',
        path: '/circles'
      },{
        id: '19',
        name: '录音审核',
        path: '/voice-verify'
      },{
        id: '20',
        name: '涉黄管理',
        path: '/yellow'
      }]
    }, {
      id: '25',
      name: '消息管理',
      path: '/message',
      children: [{
        id: '26',
        name: '消息模板',
        path: '/msg-template'
      },{
        id: '27',
        name: '推送列表',
        path: '/push-list'
      }]
    },{
      id: '21',
      name: '权限管理',
      path: '/authority',
      children: [
        {
          id: '22',
          name: '角色列表',
          path: '/role'
        },{
          id: '23',
          name: '权限列表',
          path: '/authority'
        },{
          id: '24',
          name: '账户列表',
          path: '/admin'
        }
      ]
    }],
    user_name: sessionStorage.getItem('user_name')
  }),
  computed: {
    cur_path() {
      return this.$store.state.common.cur_path
    },
    cur_open() {
      return ['/'+this.$store.state.common.cur_path.split('/')[1]]
    }
  },
  methods: {
    goRoute(path) {
      this.$router.push(path);
    }
  }
}
</script>
<style lang="scss" scoped>
#my-menu {
    background-color: #373e4f;
    position:fixed;
    top:0;
    left:0;
    height: 100vh;
    overflow: auto;
}

.layout-logo-left {
    width: 90%;
    font-size: 18px;
    color: #FFF;
    text-align: center;
    border-radius: 3px;
    height:60px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
        width: 35px;
        height: 35px;
        margin-right: 5px;
    }
}
/*右边用户信息*/
.user-panel {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px;
    overflow: hidden;
    background-color: #283238;
    justify-content: center;
    .pull-left {
        padding-right: 10%;
        color: #FFF;
        &.hand {
            cursor: pointer;
        }
        .avator {
            width: 45px;
            object-fit: cover;
            border-radius: 50%;
            margin-right: 3px;
        }
        .text {
            font-size: 16px;
        }
        .state {
            font-size: 14px;
            .icon-state {
                width: 12px;
                height: 12px;
                margin-right: 5px;
                vertical-align: middle;
                border-radius: 50%;
                display: inline-block;
                background-color: #3c763d;
            }
        }
    }
}
</style>

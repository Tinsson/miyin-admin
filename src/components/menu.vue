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
          <Icon :type="group.icon"></Icon>
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
      icon: "person-stalker",
      path: '/user',
      children: [{
        id: '2',
        name: '用户管理',
        path: '/users'
      },{
        id:'3',
        name: '女主播列表',
        path: '/anchor'
      },{
        id: '4',
        name: '真人审核列表',
        path: '/verify'
      }]
    },{
      id: '5',
      name: '礼物管理',
      icon: "ios-heart",
      path: '/gift',
      children: [{
        id: '6',
        name: '礼物管理',
        path: '/gifts'
      }]
    },{
      id: '7',
      name: '资金管理',
      icon: "card",
      path: '/money',
      children: [{
        id: '8',
        name: '提现申请',
        path: '/cash-apply'
      },{
        id: '9',
        name: '提现列表',
        path: '/cash-list'
      },{
        id: '10',
        name: '支付宝充值列表',
        path: '/alipay'
      },{
        id: '11',
        name: '微信充值列表',
        path: '/wx-recharge'
      },{
        id: '12',
        name: '礼物明细',
        path: '/gift-detail'
      },{
        id: '13',
        name: '消费明细',
        path: '/consumer-detail'
      },{
        id: '14',
        name: '收入明细',
        path: '/income-detail'
      }]
    },{
      id:'15',
      name: '配置管理',
      icon: "settings",
      path: '/config',
      children: [
        {
          id: '16',
          name: '全局配置',
          path: '/global-config'
        },{
          id: '17',
          name: '新手任务',
          path: '/task-newcomer'
        },{
          id: '18',
          name: '每日任务',
          path: '/task-daily'
        },{
          id: '19',
          name: '头像配置',
          path: '/avatar-config'
        }, {
          id: '20',
          name: '标签配置',
          path: '/tag-config'
        },{
          id: '21',
          name: '女主播等级配置',
          path: '/anchor-level'
        },{
          id:'22',
          name:'充值比例',
          path:'/recharge-ratio'
        },{
          id: '23',
          name: '昵称词库配置',
          path: '/nick-name'
        }
      ]
    },{
      id: '24',
      name: '任务统计',
      icon: "ios-list",
      path: '/stat',
      children: [{
        id: '25',
        name: '任务统计',
        path: '/task-stat'
      }]
    },{
      id: '26',
      name: '财务数据统计',
      icon: "pie-graph",
      path: '/finance',
      children: [{
        id: '27',
        name: '用户秘币消费统计',
        path: '/consume-stat'
      },{
        id: '28',
        name: '提现统计',
        path: '/withdraw-stat'
      },{
        id: '29',
        name: '充值统计',
        path: '/recharge-stat'
      }]
    },{
      id: '30',
      name: '用户数据统计',
      icon: 'stats-bars',
      path: '/statistics',
      children: [{
        id: '31',
        name: '统计首页',
        path: '/user-stat'
      }]
    },{
      id: '32',
      name: '用户行为数据统计',
      icon: "levels",
      path: '/action',
      children: [{
        id: '33',
        name: '用户行为统计',
        path: '/action-all'
      }]
    },{
      id: '34',
      name: '内容管理',
      icon: "filing",
      path: '/content',
      children: [{
        id: '35',
        name: '文章分类管理',
        path: '/article-class'
      },{
        id:'36',
        name: '评论管理',
        path: '/comment'
      },{
        id: '37',
        name: '动态管理',
        path: '/circles'
      },{
        id: '38',
        name: '录音审核',
        path: '/voice-verify'
      },{
        id: '39',
        name: '涉黄管理',
        path: '/yellow'
      }]
    }, {
      id: '40',
      name: '消息管理',
      icon: "chatbox-working",
      path: '/message',
      children: [{
        id: '41',
        name: '消息模板',
        path: '/msg-template'
      },{
        id: '42',
        name: '推送列表',
        path: '/push-list'
      }]
    },{
      id: '43',
      name: '权限管理',
      icon: "person-add",
      path: '/authority',
      children: [
        {
          id: '44',
          name: '角色列表',
          path: '/role'
        },{
          id: '45',
          name: '权限列表',
          path: '/authority'
        },{
          id: '46',
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

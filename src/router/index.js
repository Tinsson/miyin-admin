import Vue from '@/assets/js/vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

// 主页
import home from '@/page/home'  //主页
import login from '@/page/login' //登录页面
import defaultPage from '@/page/default-page' //默认模块

// 用户
import user from '@/page/user/user' //用户管理
import anchor from '@/page/user/anchor' //女主播列表
import verify from '@/page/user/verify' //真人审核列表

//礼物管理
import gifts from '@/page/gift/gifts' //礼物管理

//资金管理
import cashApply from '@/page/money/cash-apply' //提现申请
import cashList from '@/page/money/cash-list'  //提现列表
import alipay from '@/page/money/alipay' //支付宝充值列表
import wxRecharge from '@/page/money/wx-recharge' //微信充值列表
import giftDetail from '@/page/money/gift-detail' //礼物明细
import consumerDetail from '@/page/money/consumer-detail' //消费明细
import incomeDetail from '@/page/money/income-detail' //收入明细

//配置管理
import globalConfig from '@/page/config/global-config' //全局配置
import taskNewcomer from '@/page/config/task-newcomer' //新手任务配置
import taskDaily from '@/page/config/task-daily' //每日任务配置
import avatarConfig from '@/page/config/avatar-config' //头像配置
import tagConfig from '@/page/config/tag-config'   //标签配置
import anchorLevel from '@/page/config/anchor-level'  //女主播等级配置
import rechargeRatio from '@/page/config/recharge-ratio' //充值比例配置
import nickName from '@/page/config/nick-name'    //昵称词库配置

// 内容管理
import articleClass from '@/page/content/articleClass' //文章分类管理
import comment from '@/page/content/comment' //评论管理
import circles from '@/page/content/circles' //动态管理
import voiceVerify from '@/page/content/voice-verify' //录音审核
import yellow from '@/page/content/yellow' //涉黄管理
import opinion from '@/page/content/opinion' //意见反馈

// 任务统计
import taskStat from '@/page/stat/task-stat' //任务统计

// 财务统计
import consumeStat from '@/page/stat/consume-stat'  //用户秘币消费统计
import withdrawStat from '@/page/stat/withdraw-stat' //提现统计
import rechargeStat from '@/page/stat/recharge-stat' //充值统计

//用户数据统计
import userStat from '@/page/stat/user-stat'   //统计首页

//用户行为统计
import actionAll from '@/page/stat/action-all' //行为统计
import circlesList from '@/page/stat/action/circles-list' //动态列表
import talkList from '@/page/stat/action/talk-list' //通话统计
import tapList from '@/page/stat/action/tap-list'  //偷听统计列表

//女主播直播数据统计】
import anchorStat from '@/page/stat/anchor-stat'  //统计总览

// 消息管理
import msgTemplate from '@/page/message/msg-template'
import pushList from '@/page/message/push-list'

//权限管理
import role from '@/page/authority/role' //角色管理
import authority from '@/page/authority/authority' //权限列表
import admin from '@/page/authority/admin' //账户列表

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: function(path) {
        console.log(path);
        return sessionStorage.getItem('token')
          ? '/home'
          : '/login'
      }
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/',
          name: 'defaultPage',
          component: defaultPage
        }, {
          path: '/user/users',
          name: 'user',
          component: user
        },{
          path: '/user/anchor',
          name: 'anchor',
          component: anchor
        },{
          path: '/user/verify',
          name: 'verify',
          component: verify
        }, {
          path: '/content/article-class',
          name: 'articleClass',
          component: articleClass
        },{
          path: '/content/comment',
          name: 'comment',
          component: comment
        },{
          path: '/content/circles',
          name: 'circles',
          component: circles
        },{
          path: '/content/voice-verify',
          name:'voiceVerify',
          component: voiceVerify
        },{
          path: '/content/yellow',
          name: 'yellow',
          component:yellow
        },{
          path: '/content/opinion',
          name: 'opinion',
          component: opinion
        },{
          path: '/gift/gifts',
          name: 'gifts',
          component: gifts
        }, {
          path: '/money/cash-apply',
          name: 'cashApply',
          component: cashApply
        }, {
          path: '/money/cash-list',
          name: 'cashList',
          component: cashList
        }, {
          path: '/money/alipay',
          name: 'alipay',
          component: alipay
        }, {
          path: '/money/wx-recharge',
          name: 'wxRecharge',
          component: wxRecharge
        },{
          path: '/money/gift-detail',
          name: 'giftDetail',
          component: giftDetail
        },{
          path: '/money/consumer-detail',
          name: 'consumerDetail',
          component: consumerDetail
        },{
          path: '/money/income-detail',
          name: 'incomeDetail',
          component: incomeDetail
        },{
          path: '/config/task-newcomer',
          name: 'taskNewcomer',
          component: taskNewcomer
        },{
          path: '/config/task-daily',
          name: 'taskDaily',
          component:taskDaily
        },{
          path: '/config/global-config',
          name: 'globalConfig',
          component: globalConfig
        },{
          path: '/config/anchor-level',
          name: 'anchorLevel',
          component: anchorLevel
        },{
          path: '/config/avatar-config',
          name: 'avatarConfig',
          component: avatarConfig
        },{
          path: '/config/tag-config',
          name: 'tagConfig',
          component: tagConfig
        },{
          path: '/config/nick-name',
          name: 'nickName',
          component: nickName
        }, {
          path: '/message/msg-template',
          name: 'msgTemplate',
          component: msgTemplate
        }, {
          path: '/message/push-list',
          name: 'pushList',
          component: pushList
        },{
          path: '/stat/task-stat',
          name: 'taskStat',
          component: taskStat
        },{
          path: '/statistics/user-stat',
          name: 'userStat',
          component: userStat
        },{
          path: '/anchor/anchor-stat',
          name: 'anchorStat',
          component: anchorStat
        },{
          path: '/finance/consume-stat',
          name: 'consumeStat',
          component: consumeStat
        },{
          path: '/finance/withdraw-stat',
          name: 'withdrawStat',
          component: withdrawStat
        },{
          path: '/finance/recharge-stat',
          name: 'rechargeStat',
          component: rechargeStat
        },{
          path: '/action/action-all',
          name: 'actionAll',
          component: actionAll
        },{
          path: '/action/circles-list',
          name: 'circlesList',
          component: circlesList
        },{
          path: '/action/talk-list',
          name: 'talkList',
          component: talkList
        },{
          path: '/action/tap-list',
          name: 'tapList',
          component: tapList
        },{
          path: '/config/recharge-ratio',
          name: 'rechargeRatio',
          component: rechargeRatio
        },{
          path: '/authority/role',
          name: 'role',
          component: role
        },{
          path: '/authority/authority',
          name: 'authority',
          component:authority
        },{
          path: '/authority/admin',
          name: 'admin',
          component:admin
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem('token') && to.path != '/login') {
    router.push('/login')
  }
  sessionStorage.setItem('cur_path', to.path)
  store.commit('SET_CUR_PATH', to.path)
  next(() => {
    console.log(123123123);
  });
})

export default router;

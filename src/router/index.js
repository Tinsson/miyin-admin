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

// 内容管理
import articleClass from '@/page/content/articleClass' //文章分类管理


const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: function(path) {
        console.log(path);
        return sessionStorage.getItem('user_id')
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
        }, {
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
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to.hash)
  if (!sessionStorage.getItem('user_id') && to.path != '/login') {
    router.push('/login')
  }
  sessionStorage.setItem('cur_path', to.path)
  store.commit('SET_CUR_PATH', to.path)
  next(() => {
    console.log(123123123);
  });
})

export default router;

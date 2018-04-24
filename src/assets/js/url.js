const urlList = {
  'admin-login': '/admin/login',//用户登录

  //权限管理
  'role-list': '/role/list', //角色列表
  'role-html': '/role/html', //角色权限的详情
  'role-permission-all': '/role/permission-all', //获取权限配置列表
  'role-permission-add': '/role/permission-add', //配置权限
  'role-delete': '/role/delete', //角色删除
  'role-edit': '/role/edit', //角色编辑
  'role-add': '/role/add', //角色添加
  'permission-list': '/permission/list', //获取权限列表
  'permission-add': '/permission/add', //添加节点
  'permission-edit': '/permission/edit', //修改节点
  'admin-list': '/admin/list', //获取后台账号列表
  'admin-add': '/admin/add', //后台用户添加
  'admin-edit': '/admin/edit', //后台用户修改
  'admin-delete': '/admin/delete', //删除用户
  'admin-role-all': '/admin/role-all', //获取所有角色
  'admin-admin-role-add': '/admin/admin-role-add', //分配角色
  'admin-set-status': '/admin/set-status', //设置用户是否禁用

  //图片上传
  'upload-img': '/product/upload',

  //用户
  'user-list': '/user/list', //获取用户列表
  'get-user-card': '/user/stats', //获取用户统计数据
  'user-card-table': '/user/stats-log', //获取用户数据详情
  'user-detail': '/user/detail', //用户个人信息
  'edit-user-detail': '/user/edit-detail', //修改用户个人信息
  'user-set-status': '/user/set-status', //拉黑/移出黑名单
  'user-audit-cert': '/user/audit-cert', //改变用户审核状态
  'user-cert-group-count': '/user/cert-group-count', //获取用户各个审核状态的数量
  'user-anchor-stats': '/user/anchor-stats', //获取女主播统计数据
  'user-anchor-talk-log': '/user/anchor-talk-log', //获取主播聊天记录
  'user-anchor-income': '/user/anchor-income', //获取主播收入
  //'user-anchor-gift': '/user/anchor-gift', //获取主播礼物收入
  'user-anchor-gift': '/product/search', //获取主播礼物收入
  'user-anchor-withdraw': '/user/anchor-withdraw', //获取主播提现记录
  'send-letter': '/user/send-letter', //发送站内信
  'send-msm': '/user/send-sms',    //发送短信
  'user-give-gold':'/user/give-gold',//赠送秘币
  'export-excel': '/user/export-excel', //导出数据

  //动态
  'get-circles': '/circles/list',  //获取动态列表

  // 礼物管理

  'get-gifts': '/product/all', //获取礼物列表
  'gift-edit-status': '/product/edit-status', //修改礼物上下架状态
  'add-gift': '/product/add', //添加礼物
  'del-gift': '/product/del', //删除礼物
  'edit-gift': '/product/edit', //编辑礼物

  //资金管理

  'wallet-withdrawing': '/wallet/withdrawing', //获取提现列表
  'wallet-editStatus': '/wallet/editStatus', //编辑提现状态
  'wallet-count': '/wallet/count', //获取各状态的订单数
  'product-drop': '/product/drop', //获取礼物名称下拉列表
  'product-search': '/product/search', //获取礼物明细
  'bill-user-log-list': '/bill/user-log-list', //消费/收入明细
  'wallet-recharge': '/wallet/recharge', //微信/支付宝充值记录

  //配置管理

  'system-config-list': '/system/config-list', //获取全局配置列表
  'system-edit-config': '/system/edit-config', //修改全局配置
  'task-name-list': '/task/name-list', //获取任务配置选项
  'task-list': '/task/list', //获取任务列表
  'task-add': '/task/add', //添加任务
  'task-edit': '/task/edit', //修改任务
  'avatar-list': '/system/portrait-list', //默认头像列表
  'avatar-add': '/system/add-portrait', //默认头像添加
  'avatar-del': '/system/del-portrait', //默认头像删除
  'avatar-edit': '/system/edit-portrait', //默认头像修改
  'tag-list':  '/tag/list', //标签列表
  'tag-add': '/tag/add',  //添加标签
  'tag-del': '/tag/del',  //删除标签
  'refig-list': '/system/refig-list', //充值比例列表
  'refig-add': '/system/add-refig',   //充值比例添加
  'refig-del': '/system/del-refig',   //充值比例删除
  'level-list': '/level/level-list',  //主播等级列表
  'level-edit': '/level/edit-level', //修改主播等级
  'level-add': '/level/add-level',   //添加主播等级
  'upgrade-list': '/level/upgrade-list', //主播升级配置

  //消息管理
  'temp-kw-list': '/template-keyword/list',
  'temp-kw-add': '/template-keyword/add',
  'temp-kw-edit': '/template-keyword/edit',
  'temp-kw-del': '/template-keyword/delete',
  'temp-kw-detail': '/template-keyword/detail',
  'temp-kw-all': '/template-keyword/all',

  'temp-list': '/template/list',
  'temp-add': '/template/add',
  'temp-edit': '/template/edit',
  'temp-delete': '/template/delete',
  'temp-switch': '/template/switch',
  'temp-detail': '/template/detail',

  'push-list': '/message/push-list',
  'push-delete': '/message/push-delete',

  //统计
  'task-count': '/stats/task-list',  //任务统计
  'withdraw-list': '/stats/withdraw-list', //提现统计列表
  'withdraw-detail': '/stats/withdraw', //提现统计详情
  'recharge-list': '/stats/recharge-list', //充值统计列表
  'recharge-detail': '/stats/recharge', //充值统计详情
  'recharge-time': '/stats/recharge-time', //充值时间段统计
  'action-all': '/stats/detail', //用户行为数据统计
  'talk-list': '/stats/talk-list', //通话统计列表
  'talk-detail': '/stats/talk-detail', //通话统计总数
  'tap-list': '/stats/tap-list',   //偷听统计列表
  'tap-detail': '/stats/tap-detail', //偷听统计详情
  'expense-list': '/stats/user-expense-list', //用户秘币消费列表
  'expense-time': '/stats/user-expense-time', //用户秘币消费时间段
  'expense-detail': '/stats/user-expense-detail', //用户秘币消费详情
  'product-list': '/stats/product-list',  //礼物消费列表
  'product-chart': '/stats/product-chart',  //礼物消费图表
  'product-detail': '/stats/product-detail', //礼物消费详情
  'front-detail': '/stats/front-detail',    //首页统计
  'anchor-detail': '/stats/anchor-detail',  //女主播总览
  'anchor-chart': '/stats/anchor-chart',  //女主播折线图

  //内容管理
  'article-class': '/article-class/all',//文章分类管理
  'article-add': '/article-class/add', //文章分类添加
  'article-edit': '/article-class/edit', //文章分类编辑
  'article-del': '/article-class/del', //文章分类删除
  'comment-list': '/comment/list', //获取评论列表
  'comment-del': '/comment/del', //删除评论
  'circles-list': '/circles/list', //获取动态列表
  'circles-del': '/circles/del', //删除动态
  'user-record-list': '/user/record-list', //获取录音列表
  'user-set-record-status': '/user/set-record-status', //审核录音
  'porn-log-list': '/porn-log/list', //涉黄管理列表获取
  'porn-log-del': '/porn-log/del', //删除涉黄项目
  'opinion-cates': '/user/opinion-cates', //意见反馈类别
  'opinion-list': '/user/opinion-list',   //意见反馈列表
  'complain-cate': '/user/report-cate-list', //举报分类列表
  'complain-list': '/user/report-list' //举报列表
}

export default urlList;

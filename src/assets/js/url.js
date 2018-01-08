const urlList = {

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

  //内容管理
  'comment-list': '/comment/list', //获取评论列表
  'comment-del': '/comment/del', //删除评论
  'circles-list': '/circles/list', //获取动态列表
  'circles-del': '/circles/del', //删除动态
  'user-record-list': '/user/record-list', //获取录音列表
  'user-set-record-status': '/user/set-record-status', //审核录音
  'porn-log-list': '/porn-log/list', //涉黄管理列表获取
  'porn-log-del': '/porn-log/del', //删除涉黄项目
}

export default urlList;

const urlList = {

  //图片上传
  'upload-img': '/product/upload',

  //用户
  'user-list': '/user/list', //获取用户列表
  'get-user-card': '/user/stats', //获取用户统计数据
  'user-card-table': '/user/stats-log', //获取用户数据详情
  'user-detail': '/user/detail', //用户个人信息
  'edit-user-detail': '/user/edit-detail', //修改用户个人信息


  //动态
  'get-circles': '/circles/list',  //获取动态列表

  // 礼物管理

  'get-gifts': '/product/all', //获取礼物列表
  'gift-edit-status': '/product/edit-status', //修改礼物上下架状态
  'add-gift': '/product/add', //添加礼物
  'del-gift': '/product/del', //删除礼物
  'edit-gift': '/product/edit', //编辑礼物
}

export default urlList;

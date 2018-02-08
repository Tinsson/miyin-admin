<template>
  <div id="recharge-ratio">
    <title-bar title="基础" @refresh="refresh"></title-bar>
    <table-container>
      <div slot="btn">
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
  </div>
</template>
<script>
export default {
  name: "recharge-ratio",
  data() {
    return {
      columns: [
        {
          title: '用户ID',
          key: 'uuid',
          align: 'center'
        },{
          title: '用户账号',
          key: 'account',
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
          title: '绑定手机号',
          key: 'mobile',
          align: 'center'
        }, {
          title: '授权微信',
          key: 'wx',
          align: 'center'
        }, {
          title: '认证图',
          key: 'pic',
          align: 'center'
        }, {
          title: '审核状态',
          key: 'status',
          align: 'center'
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
              }, '查看'),
              h('Button', {
                props: {
                  type: 'text'
                }
              }, '删除')
            ])
          }
        }
      ],
      myData: [{uuid:1}],
      tableLoading: false,
    }
  },
  methods: {
    refresh() {
      console.log('刷新')
    },
    getData() {
      
    },
  }
}
</script>
<style lang="scss" scoped>
</style>

<template>
  <div id="role">
    <title-bar title="角色列表" @refresh="refresh"></title-bar>
    <table-container>
      <div slot="btn">
        <Button type="primary">添加角色</Button>
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
  </div>
</template>
<script>
export default {
  name: "role",
  data() {
    return {
      columns: [
        {
          title: '角色编号',
          key: 'uuid',
          align: 'center'
        },{
          title: '角色名称',
          key: 'account',
          align: 'center'
        }, {
          title: '状态',
          key: 'user_name',
          align: 'center'
        }, {
          title: '排序',
          key: 'register_time',
          align: 'center'
        }, {
          title: '创建时间',
          key: 'mobile',
          align: 'center'
        }, {
          title: '修改时间',
          key: 'wx',
          align: 'center'
        },{
          title: '操作',
          key: 'operation',
          align: 'center',
          width:230,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text'
                },
              }, '查看'),
              h('Button',{
                props: {
                  type: 'text'
                }
              },'权限分配'),
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
      searchList: [
        {
          label: '用户账号',
          type: 'input',
          placeholder: '用户ID/账号',
          model: 'uuid'
        },{
          label: '用户昵称',
          type: 'input',
          placeholder: '用户昵称',
          model: 'nickname'
        },{
          label: '注册时间',
          type: 'daterange',
          placeholder: '请选择时间',
          model: 'register_time',
          start_end: ['start_time','end_time']
        },{
          label: '审核状态',
          type: 'select',
          placeholder: '选择审核状态',
          model: 'status',
          options:[{
            label: '通过',
            value: '1'
          },{
            label: '未通过',
            value: '0'
          }]
        }
      ],
    }
  },
  methods: {
    refresh() {
      console.log('刷新')
    },
    getData() {
      console.log(this.searchData)
    },
  }
}
</script>
<style lang="scss" scoped>
</style>

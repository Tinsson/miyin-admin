<template>
  <div id="task-newcomer">
    <title-bar title="新手任务" @refresh="refresh"></title-bar>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <div slot="btn">
        <Button type="primary" @click="add_task">新增任务</Button>
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>

    <add-task ref="add_task"></add-task>
  </div>
</template>
<script>
import addTask from './components/add-task.vue'
export default {
  name: "task-newcomer",
  data() {
    return {
      columns: [
        {
          title: 'id',
          key: 'uuid',
          align: 'center'
        },{
          title: '任务名称',
          key: 'account',
          align: 'center'
        }, {
          title: '任务条件',
          key: 'user_name',
          align: 'center'
        }, {
          title: '秘币奖励',
          key: 'register_time',
          align: 'center'
        }, {
          title: '创建时间',
          key: 'mobile',
          align: 'center'
        }, {
          title: '状态',
          key: 'status',
          align: 'center'
        },{
          title: '操作',
          key: 'operation',
          align: 'center',
          width:220,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: ()=>{
                    params.row.status = params.row.status==1?0:1
                  }
                }
              }, params.row.status==0?'上架':'下架'),
              h('Button', {
                props: {
                  type: 'text'
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'text'
                }
              }, '删除')
            ])
          }
        }
      ],
      myData: [{uuid:1,status:1}],
      tableLoading: false,
      pageprops: { //分页配置
        showSizer:true,
        total:0,
      },
      fy: { //当前分页属性
        page: 1,
        size: 10
      },
    }
  },
  methods: {
    add_task() {
      this.$refs.add_task.show();
    },

    refresh() {
      console.log('刷新')
    },
    pageChange(page) {
      this.fy.page = page;
      this.getData();
    },
    pageSizeChange(size) {
      this.fy.size = size;
      this.getData();
    },
    getData() {

    },
  },
  components: {
    addTask
  }
}
</script>
<style lang="scss" scoped>
</style>

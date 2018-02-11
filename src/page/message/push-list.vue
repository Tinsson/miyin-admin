<template>
  <div id="push-list">
    <table-container>
      <div slot="btn">
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
  </div>
</template>
<script>


export default {
  name: "push-list",
  components:{

  },
  data() {
    return {
      columns: [
        {
          title: '序号',
          key: 'id',
          align: 'center'
        },{
          title: '类型',
          key: 'type',
          align: 'center'
        }, {
          title: '用户ID',
          key: 'user_uuid',
          align: 'center'
        },{
          title: '内容',
          key: 'content',
          align: 'center'
        }, {
          title: '发送时间',
          key: 'send_time',
          align: 'center'
        },{
          title: '状态',
          key: 'status',
          align: 'center'
        },{
          title: '操作',
          key: 'operation',
          width: '220',
          align: 'center',
          render: (h, params)=>{
            return this.render_btn(h, params, this.btnData);
          }
        }
      ],
      myData: [],
      btnData: [{
        type: 'error',
        func: 'DelOpt',
        text: '删除'
      }],
      kwTableLoading: false,
      tableLoading: false
    }
  },
  methods: {
    render_btn(h, params, bdata){
      let res = [];
      bdata.forEach(val=>{
        const btn = h('Button',{
          props: {
            type: val.type
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: ()=>{
              this[val.func](params.row)
            }
          },
        },val.text);
        res.push(btn);
      });
      return res;
    },
    refresh() {
      this.getData();
    },
    getData() {
      this.tableLoading = true;
      this.kwTableLoading = true;
      this.axios.get(`push-list`).then(res=>{
        this.tableLoading = false;
        if(res.status === 1){
          this.myData = res.data.record_list;
        }
      });
    },

    //删除模板
    DelOpt(row){
      this.$Modal.confirm({
        title: '温馨提示',
        content: '<p class="confirm-text">确认删除这条记录吗？</p>',
        onOk: ()=>{
          this.$uploadData('push-delete',{id: row.id}).then(()=>{
            this.getData();
          });
        }
      })
    },
  },
  mounted() {
    this.getData();
  }
}
</script>
<style lang="scss" scoped>
</style>

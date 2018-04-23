<template>
  <div id="recharge-ratio">
    <table-container title="充值比例">
      <div slot="btn">
        <Button type="primary" @click="add_refig_btn">新增充值选项</Button>
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
    <add-refig ref="add_refig"
             :edit_info="refig_edit"
             @editOver="refig_edit_over"
             @subOver="refig_add_over"
             @modal-close="modalClose"></add-refig>
  </div>
</template>
<script>
import addRefig from './components/add-refig.vue'

export default {
  name: "recharge-ratio",
  data() {
    return {
      columns: [
        {
          title: '用户ID',
          key: 'id',
          align: 'center'
        },{
          title: '充值金额',
          key: 'money',
          align: 'center'
        }, {
          title: '对应秘币',
          key: 'value',
          align: 'center'
        },{
          title: '操作',
          key: 'operation',
          width: '200',
          align: 'center',
          render: (h, params) => {
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
      refig_edit: {
        status: false,
        money: '',
        value: '',
        id: ''
      },
      tableLoading: false,
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
      console.log('刷新');
    },
    add_refig_btn(){
      this.refig_edit = {
        type: false,
        id: '',
        money: '',
        value: ''
      };
      this.$refs.add_refig.show();
    },
    refig_add_over(data){
      this.axios.post('refig-add', data).then(() => {
        this.getData();
        this.$refs.add_refig.close();
      })
    },
    modalClose(){

    },
    EditOpt(row){
      this.refig_edit = {
        type: true,
        id: row.id,
        money: row.money,
        value: row.value
      };
      this.$refs.add_refig.show();
    },
    refig_edit_over(data){
      console.log(data);
    },
    DelOpt(row){
      this.$Modal.confirm({
        title: '温馨提示',
        content: '<p class="confirm-text">确认删除此项充值选项吗？</p>',
        onOk: ()=>{
          this.axios.post('refig-del', {id: row.id}).then(() => {
            this.getData();
          })
        }
      })
    },
    getData(){
      this.axios.get('refig-list').then(d=>{
        console.log(d);
        if(d.status === 1){
          this.myData = d.data.refig_list;
        }
      })
    },
  },
  mounted(){
    this.getData();
  },
  components: {
    addRefig
  }
}
</script>
<style lang="scss" scoped>
</style>

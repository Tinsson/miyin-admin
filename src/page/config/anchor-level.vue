<template>
  <div id="recharge-ratio">
    <title-bar title="女主播等级配置" @refresh="refresh"></title-bar>
    <table-container title="等级收费标准配置">
      <div slot="btn">
        <Button type="primary" @click="add_level_btn">新增等级标准</Button>
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
    <table-container title="女主播升级配置">
      <Table :columns="columns_up" :data="myData_up" border :loading="tableLoading_up"></Table>
    </table-container>
    <add-level ref="add_level"
             :edit_info="level_edit"
             @editOver="level_edit_over"
             @subOver="level_add_over"
             @modal-close="modalClose"></add-level>
  </div>
</template>
<script>
import addLevel from './components/add-level.vue'

export default {
  name: "recharge-ratio",
  data() {
    return {
      columns: [
        {
          title: '收费等级',
          key: 'level',
          align: 'center'
        },{
          title: '接听聊天收费标准（秘币/分钟）',
          key: 'standard',
          align: 'center',
          render: (h, params)=>{
            let row = params.row;
            return h('span', `${row.talk_fee_start} 至 ${row.talk_fee_end}`)
          }
        }, {
          title: '偷听收费标准（秘币/分钟）',
          key: 'tap_fee',
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
      columns_up: [{
        title: '等级',
        key: 'level',
        align: 'center'
      },{
        title: '标题',
        key: 'title',
        align: 'center'
      },{
        title: '数量',
        key: 'count',
        align: 'center'
      }],
      myData: [],
      myData_up: [],
      btnData: [{
        type: 'info',
        func: 'EditOpt',
        text: '编辑'
      }],
      level_edit: {
        status: false,
        money: '',
        value: '',
        id: ''
      },
      tableLoading: false,
      tableLoading_up: false
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
    add_level_btn(){
      this.level_edit = {
        type: false,
        id: '',
        level: '',
        tap_fee: 0,
        talk_fee_start: 0,
        talk_fee_end: 0
      };
      this.$refs.add_level.show();
    },
    level_add_over(data){
      this.axios.post('level-add', data).then(d => {
        if(d.status === 1){
          this.$Message.success(d.message);
          this.getData();
          this.$refs.add_level.close();
        }else{
          this.$Message.error(d.message);
        }
      })
    },
    modalClose(){

    },
    EditOpt(row){
      this.level_edit = {
        type: true,
        id: row.id,
        level: row.level,
        tap_fee: row.tap_fee,
        talk_fee_start: row.talk_fee_start,
        talk_fee_end: row.talk_fee_end
      };
      this.$refs.add_level.show();
    },
    level_edit_over(data){
      //console.log(data);
      this.axios.post('level-edit', data).then(d => {
        if(d.status === 1){
          this.$Message.success(d.message);
          this.getData();
          this.$refs.add_level.close();
        }else{
          this.$Message.error(d.message);
        }
      })
    },
    DelOpt(row){
      this.$Modal.confirm({
        title: '温馨提示',
        content: '<p class="confirm-text">确认删除此项充值选项吗？</p>',
        onOk: ()=>{
          this.axios.post('level-del', {id: row.id}).then(() => {
            this.getData();
          })
        }
      })
    },
    getData(){
      this.axios.get('level-list').then(d=>{
        if(d.status === 1){
          this.myData = d.data.level_list;
        }
      })
    },
    getUpgrade(){
      this.axios.get('upgrade-list').then(d=>{
        if(d.status === 1){
          this.myData_up = d.data.config_list;
        }
      })
    }
  },
  mounted(){
    this.getData();
    this.getUpgrade();
  },
  components: {
    addLevel
  }
}
</script>
<style lang="scss" scoped>
</style>

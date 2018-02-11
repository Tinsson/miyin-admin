<template>
  <div id="task-newcomer">
    <title-bar title="标签配置" @refresh="refresh"></title-bar>
    <table-container>
      <div slot="btn">
        <Button type="primary" @click="add_tag">新增标签</Button>
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
    <add-tag ref="add_tag"
            :edit_info="tag_edit"
            :task_form="task_form"
            :type="1"
            @editOver="edit_edit"
            @subOver="tag_over"
            @modal-close="modalClose"></add-tag>
  </div>
</template>
<script>
import addTag from './components/add-tag.vue'
export default {
  name: "tag-config",
  data() {
    return {
      task_form: {
        task_type: [],
        money: null,
        num: null
      },
      tag_edit: {
        status: false,
        id: ''
      },
      columns: [
        {
          title: 'id',
          key: 'id',
          align: 'center'
        }, {
          title: '标签名',
          key: 'name',
          align: 'center'
        }, {
          title: '创建时间',
          key: 'created_at',
          align: 'center'
        }, {
          title: '类型',
          key: 'type',
          align: 'center',
          render: (h, params)=>{
            let type = params.row.type;
            switch (type){
              case 1:
                type = '用户标签';
                break;
              case 2:
                type = '系统标签';
                break;
              case 3:
                type = '姓氏标签';
                break;
              case 4:
                type = '名氏标签';
                break;
              default:
                type = '未知';
                break;
            }
            return h('span', type);
          }
        },{
          title: '操作',
          key: 'operation',
          align: 'center',
          width:220,
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
    modalClose() {

    },
    add_tag() {
      this.tag_edit = {
        type: 1,
        name: '',
        id: ''

      };
      this.$refs.add_tag.show();
    },
    EditOpt(row){
      this.tag_edit = {
        type: true,
        id: row.id,
        sex: row.sex,
        status: row.status,
        img_path: row.img_path
      };
      //console.log(this.tag_edit);
      this.$refs.add_tag.show();
    },

    DelOpt(row){
      this.$Modal.confirm({
        title: '温馨提示',
        content: '<p class="confirm-text">确认删除此项标签吗？</p>',
        onOk: ()=>{
          this.axios.post('tag-del', {id: row.id}).then(() => {
            this.getData();
            //this.$Message.success(d.message);
            //this.getData();
          })
        }
      })
    },
    edit_edit(data){
      this.axios.post("tag-edit",data).then(res=>{
        console.log(res);
        this.$refs.add_tag.close();
        this.getData();
      })
    },
    tag_over(data){
      this.axios.post("tag-add",data).then(res=>{
        console.log(res);
        this.$refs.add_tag.close();
        this.getData();
      })
    },

    refresh() {
      this.getData();
    },
    getData() {
      this.tableLoading = true;
      this.axios.get(`tag-list`).then(res=>{
        this.tableLoading = false;
        console.log(res);
        if(res){
          this.myData = res.data.tag_list;
        }
      })
    },
  },
  components: {
    addTag
  },
  mounted() {
    this.getData();
  }
}
</script>
<style lang="scss" scoped>
  .tb-image{
    width: 60px;
    height: 60px;
  }
</style>

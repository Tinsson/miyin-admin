<template>
  <div id="msg-template">
    <title-bar title="消息模板" @refresh="refresh"></title-bar>
    <table-container title="关键词列表">
      <div slot="btn">
        <Button type="warning" @click="add_keyword">添加关键词</Button>
      </div>
      <Table :columns="columns_kw" :data="myData_kw" border :loading="kwTableLoading"></Table>
    </table-container>
    <table-container>
      <div slot="btn">
        <Button type="warning" @click="add_template">添加模板</Button>
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
    <template-modal ref="template_modal"
                    :is_edit="temp_modal.isEdit"
                    :init_data="temp_modal.data"
                    :edit_id="temp_modal.id"
                    @sub-data="SubTemp"></template-modal>
    <keyword-modal ref="keyword_modal"
                   :is_edit="kw_modal.isEdit"
                   :init_data="kw_modal.data"
                   :edit_id="kw_modal.id"
                   @sub-data="SubKeyword"></keyword-modal>
  </div>
</template>
<script>
  import templateModal from './components/template-modal'
  import keywordModal from './components/keyword-modal'

export default {
  name: "task-newcomer",
  components:{
    templateModal,
    keywordModal
  },
  data() {
    return {
      columns_kw: [
        {
          title: '序号',
          key: 'keyword_id',
          align: 'center'
        },
        {
          title: '关键字',
          key: 'keyword_name'
        },{
          title: '关键字解释',
          key: 'keyword_zh'
        },
        {
          title: '添加时间',
          key: 'created_at'
        }
      ],
      myData_kw: [],
      columns: [
        {
          title: '序号',
          key: 'id',
          align: 'center'
        },{
          title: '模板名称',
          key: 'title',
          align: 'center'
        }, {
          title: '消息标签',
          key: 'msg_tag',
          align: 'center'
        },{
          title: '预发节点',
          key: 'prepare_node',
          align: 'center'
        },{
          title: '消息模版类型',
          align: 'center',
          key: 'type',
          render: (h,params)=>{
            let text = '';
            switch(params.row.type){
              case 0:
                text = 'app推送模板';
                break;
              case 1:
                text = '短信模板';
                break;
            }
            return h('span',text);
          }
        },{
          title: '启用状态',
          key: 'status',
          align: 'center',
          render: (h,params)=>{
            let text = '';
            switch(params.row.status){
              case 0:
                text = '关闭';
                break;
              case 1:
                text = '开启';
                break;
            }
            return h('span', text);
          }
        }, {
          title: '内容',
          key: 'content',
          align: 'center'
        },{
          title: '操作',
          key: 'operation',
          width: '160',
          align: 'center',
          render: (h, params)=>{
            return this.render_btn(h, params, this.btnData);
          }
        }
      ],
      myData: [],
      btnData: [{
        type: 'primary',
        func: 'EditOpt',
        text: '编辑'
      },{
        type: 'error',
        func: 'DelOpt',
        text: '删除'
      }],
      kwTableLoading: false,
      tableLoading: false,
      kw_modal: {
        isEdit: false,
        id: '',
        data: {
          keyword_name: '',
          keyword_zh: ''
        }
      },
      temp_modal:{
        isEdit: false,
        id: '',
        data: {
          status: 1,
          type: 1,
          prepare_node: '',
          msg_tag: '',
          title: '',
          content: ''
        }
      }
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
    toggle_task_status(task) {
      this.tableLoading = true;
      this.axios.post('task-edit',{
        id: task.id,
        status: task.status==1?2:1,
      }).then(res=>{
        this.tableLoading = false
        if(res){
          this.getData();
        }
      })
    },
    refresh() {
      this.getData();
    },
    getData() {
      this.tableLoading = true;
      this.kwTableLoading = true;
      this.axios.get(`temp-list`).then(res=>{
        this.tableLoading = false;
        if(res.status === 1){
          this.myData = res.data.template_list;
        }
      });
      this.axios.get('temp-kw-list').then(res=>{
        this.kwTableLoading = false;
        if(res.status === 1){
          this.myData_kw = res.data.keyword_list;
        }
      });
    },
    //添加关键字
    add_keyword(){
      this.kw_modal.isEdit = false;
      this.kw_modal.data = {
        keyword_name: '',
        keyword_zh: ''
      };
      this.$refs.keyword_modal.show();
    },
    SubKeyword(){

    },
    //添加模板
    add_template() {
      this.temp_modal.isEdit = false;
      this.temp_modal.data = {
        status: 1,
        type: 1,
        prepare_node: '',
        msg_tag: '',
        title: '',
        content: ''
      };
      this.$refs.template_modal.show();
    },
    SubTemp(data, edit){
      console.log(data, edit);
      let url = '',
          params = data;
      if(edit.status){
        url = 'temp-edit';
        params.id = edit.id;
      }else{
        url = 'temp-add';
      }
      this.axios.post(url, params).then((d)=>{
        if(d.status === 1){
          this.$Message.success(d.message);
          this.$refs.template_modal.close();
          this.getData();
        }else{
          this.$Message.error(d.message);
        }
      })
    },
    //编辑模板
    EditOpt(row){
      this.temp_modal.isEdit = true;
      this.temp_modal.id = row.id;
      this.temp_modal.data = this.$crossObj(this.temp_modal.data,row);
      this.$refs.template_modal.show();
    },
    //删除模板
    DelOpt(row){
      this.$Modal.confirm({
        title: '温馨提示',
        content: '<p class="confirm-text">确认删除此项模板吗？</p>',
        onOk: ()=>{
          this.$uploadData('temp-delete',{id: row.id}).then(()=>{
            this.getData();
          });
        }
      })
    }
  },
  mounted() {
    this.getData();
  }
}
</script>
<style lang="scss" scoped>
</style>

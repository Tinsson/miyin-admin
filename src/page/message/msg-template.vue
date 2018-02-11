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
        },
        {
          title: '操作',
          key: 'operation',
          width: '160',
          align: 'center',
          render: (h, params)=>{
            return this.render_btn(h, params, this.btnData_kw);
          }
        }
      ],
      myData_kw: [],
      btnData_kw: [{
        type: 'primary',
        func: 'EditOptKw',
        text: '编辑'
      },{
        type: 'error',
        func: 'DelOptKw',
        text: '删除'
      }],
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
          width: '220',
          align: 'center',
          render: (h, params)=>{
            return this.render_btn(h, params, this.btnData);
          }
        }
      ],
      myData: [],
      btnData: [{
        type1: 'success',
        type2: 'error',
        func: 'ChangeStatus',
        text1: '启用',
        text2: '禁用'
      },{
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
        if(val.func === "ChangeStatus") {
          if(params.row.status === 0){
            val.type = val.type1;
            val.text = val.text1;
          }else if(params.row.status === 1){
            val.type = val.type2;
            val.text = val.text2;
          }
        }
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
    SubKeyword(info,sign){
      if(sign.status){
        let params = {
          keyword_id: sign.id,
          ...info
        };
        this.$uploadData('temp-kw-edit',params).then(()=>{
          this.$refs.keyword_modal.close();
          this.getData();
        });
      }else{
        this.$uploadData('temp-kw-add',info).then(()=>{
          this.$refs.keyword_modal.close();
          this.getData();
        });
      }

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
    EditOptKw(row){
      this.kw_modal.isEdit = true;
      this.kw_modal.data = {
        keyword_name: row.keyword_name,
        keyword_zh: row.keyword_zh
      };
      this.kw_modal.id = row.keyword_id;
      this.$refs.keyword_modal.show();
    },
    DelOptKw(row){
      this.$Modal.confirm({
        title: '温馨提示',
        content: '<p class="confirm-text">确认删除此关键词吗？</p>',
        onOk: ()=>{
          this.$uploadData('temp-kw-del',{keyword_id: row.keyword_id}).then(()=>{
            this.getData();
          });
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
    },
    ChangeStatus(row){
      let status = row.status;
      if(status === 1){
        status = 0;
      }else if(status === 0){
        status = 1;
      }
      this.$uploadData('temp-switch',{id: row.id, status}).then(()=>{
        this.getData();
      });
    }
  },
  mounted() {
    this.getData();
  }
}
</script>
<style lang="scss" scoped>
</style>

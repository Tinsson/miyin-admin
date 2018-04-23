<template>
  <div id="task-newcomer">
    <title-bar title="个人信息配置" @refresh="refresh"></title-bar>
    <table-container title="头像配置">
      <div slot="btn">
        <Button type="primary" @click="add_avatar_btn">新增头像</Button>
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
    <add-avatar ref="add_avatar"
                :edit_info="avatar_edit"
                :task_form="task_form"
                :type="1"
                @editOver="edit_edit"
                @subOver="avatar_over"
                @modal-close="modalClose"></add-avatar>

    <tag-config ref="tag_conf"></tag-config>
    <nick-name ref="nick_name"></nick-name>
  </div>
</template>
<script>
import addAvatar from './components/add-avatar.vue'
import tagConfig from './tag-config'
import nickName from './nick-name'
import Tag from "iview/src/components/tag/tag";

export default {
  name: "avatar-config",
  data() {
    return {
      task_form: {
        task_type: [],
        money: null,
        num: null
      },
      avatar_edit: {
        status: false,
        id: ''
      },
      columns: [
        {
          title: 'id',
          key: 'id',
          align: 'center'
        },{
          title: '头像图',
          key: 'img_path',
          align: 'center',
          render: (h, params)=>{
            return h('img',{
              style:{
                width: '50px',
                height: '50px',
                marginTop: '5px'
              },
              attrs:{
                src: params.row.img_path
              }
            })
          }
        }, {
          title: '性别',
          key: 'sex',
          align: 'center',
          render: (h,params)=>{
            return h('span',params.row.sex === 1?'男':'女')
          }
        }, {
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h,params)=>{
            return h('span',params.row.status == 1?'上架中':'已下架')
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
        type: 'primary',
        func: 'EditOpt',
        text: '编辑'
      },{
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
    add_avatar_btn() {
      this.avatar_edit = {
        type: false,
        id: '',
        sex: 1,
        img_path: ''
      };
      this.$refs.add_avatar.show();
    },
    EditOpt(row){
      this.avatar_edit = {
        type: true,
        id: row.id,
        sex: row.sex,
        status: row.status,
        img_path: row.img_path
      };
      //console.log(this.avatar_edit);
      this.$refs.add_avatar.show();
    },

    DelOpt(row){
      this.$Modal.confirm({
        title: '温馨提示',
        content: '<p class="confirm-text">确认删除此项头像吗？</p>',
        onOk: ()=>{
          this.axios.post('avatar-del', {id: row.id}).then(() => {
            this.getData();
            //this.$Message.success(d.message);
            //this.getData();
          })
        }
      })
    },
    edit_edit(data){
      this.axios.post("avatar-edit",data).then(res=>{
        console.log(res);
        this.$refs.add_avatar.close();
        this.getData();
      })
    },
    avatar_over(data){
      this.axios.post("avatar-add",data).then(res=>{
        console.log(res);
        this.$refs.add_avatar.close();
        this.getData();
      })
    },

    refresh() {
      this.getData();
      this.$refs['nick_name'].refresh();
      this.$refs['tag_conf'].refresh();
    },
    getData() {
      this.tableLoading = true;
      this.axios.get(`avatar-list?type=2`).then(res=>{
        this.tableLoading = false;
        console.log(res);
        if(res){
          this.myData = res.data.portrait_list;
        }
      })
    },
  },
  components: {
    Tag,
    addAvatar,
    tagConfig,
    nickName
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

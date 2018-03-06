<template>
  <div id="nick-name">
    <title-bar title="昵称词库配置" @refresh="refresh"></title-bar>
    <table-container title="姓氏列表" @on-change="pageChangeFirst" @on-page-size-change="pageSizeChangeFirst" page :pageprops="pageprops_first">
      <div slot="btn">
        <Button type="primary" @click="add_tag(3)">新增姓氏</Button>
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
    <table-container title="名氏列表" @on-change="pageChangeLast" @on-page-size-change="pageSizeChangeLast" page :pageprops="pageprops_last">
      <div slot="btn">
        <Button type="primary" @click="add_tag(4)">新增名氏</Button>
      </div>
      <Table :columns="columns" :data="myData2" border :loading="tableLoading"></Table>
    </table-container>
    <add-nickname ref="add_nickname"
             :edit_info="tag_edit"
             :task_form="task_form"
             :type="1"
             @editOver="edit_edit"
             @subOver="tag_over"
             @modal-close="modalClose"></add-nickname>
  </div>
</template>
<script>
import addNickname from './components/add-nickname.vue'
export default {
  name: "nick-name",
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
          title: '序号',
          key: 'id',
          align: 'center',
          render: (h, params)=>{
            return h('span',params.index+1);
          }
        }, {
          title: '词名',
          key: 'name',
          align: 'center'
        }, {
          title: '创建时间',
          key: 'created_at',
          align: 'center'
        }, {
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
      myData2: [],
      btnData: [{
        type: 'error',
        func: 'DelOpt',
        text: '删除'
      }],
      tableLoading: false,
      pageprops_first: { //分页配置
        showSizer:true,
        total:0,
      },
      fy_first: { //当前分页属性
        page: 1,
        size: 10
      },
      pageprops_last: { //分页配置
        showSizer:true,
        total:0,
      },
      fy_last: { //当前分页属性
        page: 1,
        size: 10
      },
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
    pageChangeFirst(page){
      this.fy_first.page = page;
      this.getFirst();
    },
    pageSizeChangeFirst(size){
      this.fy_first.size = size;
      this.getFirst();
    },
    pageChangeLast(page){
      this.fy_last.page = page;
      this.getLast();
    },
    pageSizeChangeLast(size){
      this.fy_last.size = size;
      this.getLast();
    },
    modalClose() {

    },
    add_tag(sign) {
      this.tag_edit = {
        type: sign,
        name: '',
        id: ''
      };
      this.$refs.add_nickname.show();
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
      this.$refs.add_nickname.show();
    },

    DelOpt(row){
      this.$Modal.confirm({
        title: '温馨提示',
        content: '<p class="confirm-text">确认删除此项吗？</p>',
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
        this.$refs.add_nickname.close();
        this.getData();
      })
    },

    refresh() {
      this.getData();
    },
    getData() {
      //this.tableLoading = true;
      this.getFirst();
      this.getLast();
    },
    getFirst(){
      this.axios.get(`tag-list`,{
        params: {
          type: 3,
          ...this.fy_first
        }
      }).then(res=>{
        if(res){
          let resList = res.data.tag_list;
          this.pageprops_first.total = res.data.total;
          this.myData = resList;
        }
      })
    },
    getLast(){
      this.axios.get(`tag-list`,{
        params: {
          type: 4,
          ...this.fy_last
        }
      }).then(res=>{
        if(res){
          let resList = res.data.tag_list;
          this.pageprops_last.total = res.data.total;
          this.myData2 = resList;
        }
      })
    }
  },
  components: {
    addNickname
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

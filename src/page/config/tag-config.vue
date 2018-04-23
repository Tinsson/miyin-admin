<template>
  <div id="tag-config">
    <table-container title="用户标签" @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <div slot="btn">
        <Button slot="btn" type="primary" @click="add_tag(1)">新增标签</Button>
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
    <table-container title="系统标签" @on-change="pageChange2" @on-page-size-change="pageSizeChange2" page :pageprops="pageprops2">
      <div slot="btn">
        <Button slot="btn" type="primary" @click="add_tag(2)">新增标签</Button>
      </div>
      <Table :columns="columns" :data="myData2" border :loading="tableLoading2"></Table>
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
          title: '序号',
          key: 'id',
          align: 'center',
          render: (h, params)=>{
            return h('span',params.index+1);
          }
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
      tableLoading2: false,
      pageprops: { //分页配置
        showSizer:true,
        total:0,
      },
      pageprops2: { //分页配置
        showSizer:true,
        total:0,
      },
      fy: { //当前分页属性
        page: 1,
        size: 10
      },
      fy2: { //当前分页属性
        page: 1,
        size: 10
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
    modalClose() {

    },
    add_tag(sign) {
      this.tag_edit = {
        type: sign,
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
    pageChange(page) {
      this.fy.page = page;
      this.getList1();
    },
    pageSizeChange(size) {
      this.fy.size = size;
      this.getList1();
    },
    pageChange2(page) {
      this.fy2.page = page;
      this.getList2();
    },
    pageSizeChange2(size) {
      this.fy2.size = size;
      this.getList2();
    },
    getData() {
      this.getList1();
      this.getList2();
    },
    getList1(){
      this.tableLoading = true;
      this.axios.get(`tag-list?type=1`,{
        params: {
          ...this.fy
        }
      }).then(res=>{
        this.tableLoading = false;
        console.log(res);
        if(res){
          let resList = res.data.tag_list;
          this.myData = resList;
          this.pageprops = res.data.total;
        }
      });
    },
    getList2(){
      this.tableLoading2 = true;
      this.axios.get(`tag-list?type=2`,{
        params: {
          ...this.fy2
        }
      }).then(res=>{
        this.tableLoading2 = false;
        console.log(res);
        if(res){
          let resList = res.data.tag_list;
          this.myData2 = resList;
          this.pageprops2 = res.data.total;
        }
      })
    }
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

<template>
  <div id="articleClass">
    <title-bar title="文章分类管理" @refresh="refresh"></title-bar>
    <table-container>
      <div slot="btn">
        <Button @click="modal_show = true">添加分类</Button>
      </div>
      <Tree :data="myData" :render="renderTree"></Tree>
    </table-container>

    <playground ref="playgroud"></playground>
    <!-- <Carousel v-model="test_index" loop>
      <CarouselItem v-for="item in 3">
        <div class="pic background-contain">123</div>
      </CarouselItem>
    </Carousel> -->

    <!-- 群发站内信模态框 -->
    <Modal v-model="modal_show" title="添加文章分类">
      <div class="">
        <Form ref="my_modal" :model="form" :rules="rules" :label-width="80">
          <FormItem label="分类名称" prop="class_name">
            <Input v-model="form.class_name"></Input>
          </FormItem>
          <FormItem label="父节点">
            <Select v-model="form.pid" clearable>
              <Option v-for="item in pidArr" :value="item.id" :key="item.id">{{item.class_name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="层级">
            <InputNumber :min="1" v-model="form.level"></InputNumber>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button>取消</Button>
        <Button type="primary" @click="addNode">确定</Button>
      </div>
    </Modal>
    <Modal v-model="edit_modal" title="添加文章分类">
      <div class="">
        <Form :model="edit_form" :rules="rules" :label-width="80">
          <FormItem label="分类名称">
            <Input v-model="edit_form.class_name"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="default" @click="edit_modal=false">取消</Button>
        <Button type="primary" @click="editOK">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "articleClass",
  data: () => ({
    test_index:0,
    form: {
      class_name: '',
      pid: '',
      level: 1
    },
    rules: {
      class_name: [
        {
          required: true,
          message: '请填写分类名称',
          trigger: 'blur'
        }
      ]
    },
    edit_modal: false,
    edit_form: {
      id: '',
      class_name: ''
    },
    columns: [
      {
        title: 'ID',
        key: 'id',
        align: 'center'
      },{
        title: '分类名称',
        key: 'class_name',
        align: 'center'
      },{
        title: '父栏目ID',
        key: 'p_id',
        align: 'center'
      },{
        title: '排序',
        key: 'sequence',
        align: 'center'
      }, {
        title: '操作',
        key: 'operation',
        align: 'center',
        render: (h, params) => {
          return h('div', [
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

    myData1: [
      {
        id: '1',
        class_name: '分类1',
        p_id: '1',
        sequence: '1'
      }
    ],
    myData: [
      /*{
        class_name: '分类1',
        id:1,
        children: [
          {
            class_name:'子分类1',
            id:2
          },{
            class_name: '子分类2',
            id:3
          }
        ]
      }*/
    ],

    modal_show: false
  }),
  computed:{
    pidArr(){
      let level = this.form.level,
          list = this.myData;
      if(level === 1){
        this.form.pid = 0;
        return [];
      }else{
        this.form.pid = '';
        return this.getLevelList(list,level-1);
      }
    }
  },
  methods: {
    addNode() {
      this.$refs['my_modal'].validate(valid=>{
        if(valid){
          this.axios.post('article-add',this.form).then(res=>{
            if(res.status === 1){
              this.$Message.success(res.message);
              this.modal_show = false;
              this.getData();
              this.form.class_name = '';
              this.form.pid = '';
              this.form.level = 1;
            }
          })
        }
      })
    },
    getLevelList(list,level, num=1){
      if(list.length === 0){
        return [];
      }else{
        if(list[0].level === level){
          return list;
        }else{
          return this.getLevelList(list.child, level);
        }
      }
    },
    refresh() {
      this.$refs.playgroud.show([123,123,123])
    },
    getData() {
      this.axios.get('article-class').then(res=>{
        if(res.status === 1){
          this.myData = res.data.list;
        }
      })
    },
    editNode(node){
      this.edit_modal = true;
      this.edit_form.id = node.id;
      this.edit_form.class_name = node.class_name;
    },
    editOK(){
      let params = this.edit_form;
      if(params.class_name === ''){
        this.$Message.error('请输入分类名称！');
        return;
      }
      this.axios.post('article-edit',params).then(res=>{
        if(res.status === 1){
          this.$Message.success(res.message);
          this.edit_modal = false;
          this.getData();
        }
      })
    },
    delNode(node){
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定删除此分类吗？</p>',
        onOk: () => {
          this.axios.get('article-del',{
            params: {id: node.id}
          }).then(res=>{
            if(res.status === 1){
              this.$Message.success(res.message);
              this.getData();
            }
          })
        }
      });
    },
    renderTree(h,{root,node,data}) {
      return h('div',{
        style: {
          display:'inline-block',
        }
      },[
          h('span',{
            style:{
              fontSize:'15px',
              marginLeft:'5px'
            }
          },data.class_name),
          h('Button',{
            props: {
              type:'info',
              size:'small'
            },
            style: {
              marginLeft: '30px'
            },
            on:{
              click: ()=>{
                this.editNode(node.node);
              }
            }
          },'编辑'),
          h('Button',{
            props: {
              type:'error',
              size:'small'
            },
            style: {
              marginLeft: '10px'
            },
            on:{
              click: ()=>{
                this.delNode(node.node);
              }
            }
          },'删除')
      ])
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
.pic {
    width: 500px;
    height: 500px;
    background-color: #e8e8e8;
    position: relative;
    background-image: url("http://img1.imgtn.bdimg.com/it/u=2689704752,3058454475&fm=11&gp=0.jpg");
}
// .a{
//   align-items:
// }
</style>

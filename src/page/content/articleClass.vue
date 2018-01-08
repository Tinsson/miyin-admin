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
            <Select v-model="form.p_id">
              <Option value="1">分类1</Option>
              <Option value="2">分类2</Option>
            </Select>
          </FormItem>
          <FormItem label="排序">
            <Input v-model="form.sequence"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button>取消</Button>
        <Button type="primary" @click="add">确定</Button>
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
      sequence: '',
      p_id: ''
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
      {
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
      },{
        class_name: '分类2',
        id:4,
        children: [
          {
            class_name:'子分类1',
            id:5
          },{
            class_name: '子分类2',
            id:6
          }
        ]
      }
    ],

    modal_show: false
  }),
  methods: {
    add() {
      // this.axios.post('/adv-class/add',{
      //   class_name: ''
      // })
    },
    refresh() {
      this.$refs.playgroud.show([123,123,123])
    },
    getData() {
      this.axios.get('/adv-class/all').then(res=>{
        console.log(res)
      })
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

            }
          },'编辑'),
          h('Button',{
            props: {
              type:'error',
              size:'small'
            },
            style: {
              marginLeft: '10px'
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

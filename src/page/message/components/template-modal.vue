<template>
  <div id="tempModal">
    <Modal v-model="if_show" :title="model_title" width="900" @on-cancel="close">
      <div class="ding-area">
        <div class="edit-box">
          <div class="fix-opt">
            <h2 class="title">添加关键字</h2>
            <p class="btn-box">
              <Button v-for="item in FixArr" class="button" :key="item.keyword_name" icon="ios-plus-empty" type="dashed" @click="AddTag(item)">{{item.keyword_zh}}</Button>
            </p>
          </div>
        </div>
        <div class="preview-box">
          <h2 class="title">消息模板</h2>
          <Form ref="temp_form" :model="temp_form" :rules="temp_rules" :label-width="100">
            <FormItem label="状态:">
              <RadioGroup v-model="temp_form.status">
                <Radio :label="0">关闭</Radio>
                <Radio :label="1">开启</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="消息模版类型:">
              <RadioGroup v-model="temp_form.type">
                <Radio :label="0">app推送模板</Radio>
                <Radio :label="1">短信模板</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="预发节点:">
              <Input class="ipt-info" v-model="temp_form.prepare_node" @on-focus="Focus('prepare_node')"/>
            </FormItem>
            <FormItem label="模板标题:" prop="title">
              <Input class="ipt-info" v-model="temp_form.title" @on-focus="Focus('title')"/>
            </FormItem>
            <FormItem label="消息标签:" prop="msg_tag">
              <Input v-model="temp_form.msg_tag" @on-focus="Focus('msg_tag')"/>
            </FormItem>
            <FormItem label="模板内容:" prop="content">
              <Input type="textarea" class="ipt-info" v-model="temp_form.content" @on-focus="Focus('content')"/>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="SubmitData">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "templateModal",
  props: {
    init_data: {
      type: Object
    },
    is_edit: Boolean,
    edit_id: [String,Number]
  },
  data() {
    return {
      if_show: false,
      model_title: '',
      temp_form: {
        status: 1,
        type: 1,
        prepare_node: '',
        msg_tag: '',
        title: '',
        content: ''
      },
      FixArr:[],
      FocusKey: '',
      temp_rules:{
        title: [
          {required: true,message: '模板标题不能为空！'}
        ],
        msg_tag: [
          {required: true,message: '消息标签不能为空！'}
        ],
        content: [
          {required: true,message: '模板内容不能为空！'}
        ]
      }
    }
  },
  mounted(){
    this.initData();
  },
  watch: {
    init_data(val){
      this.temp_form = val;
    },
    is_edit(val){
      this.$refs['temp_form'].resetFields();
      if(val){
        this.model_title = '编辑模板';
      }else{
        this.model_title = '添加模板';
      }
    }
  },
  methods: {
    show() {
      this.if_show = true;
      this.initData();
    },
    close() {
      this.if_show = false;
    },
    initData(){
      this.axios.get('temp-kw-all').then(res=>{
        if(res.status === 1){
          this.FixArr = res.data.keyword_list;
        }
      });
    },
    AlertErr(text = '请选择输入框！'){
      this.$Message.error(text);
    },
    AddTag(tag){
      if(this.FocusKey === 'msg_tag'){
        this.AlertErr('消息标签不能添加关键字！');
      }else if(this.FocusKey === 'prepare_node'){
        this.AlertErr('预发节点不能添加关键字！')
      }else if(this.FocusKey === ''){
        this.AlertErr();
      }else{
        this.temp_form[this.FocusKey] += tag.keyword_name;
      }
    },
    Focus(key){
      this.FocusKey = key;
    },
    SubmitData(){
      let edit_info = {
        status: this.is_edit,
        id: this.edit_id
      };
      this.$emit('sub-data', this.temp_form, edit_info);
    }
  }
}
</script>
<style lang="scss" scoped>
  .ding-area{
    display: flex;
    flex-direction: row;
    .edit-box{
      width: 45%;
      box-sizing: border-box;
      padding-right: 10px;
      border-right: 1px solid #e3e3e3;
      .fix-opt{
        width: 100%;
        .btn-box{
          padding: 5px 0;
          .button{
            margin: 0 5px 5px 0;
          }
        }
      }
    }
    .preview-box{
      width: 55%;
      box-sizing: border-box;
      padding-left: 10px;
      .del-btn{
        margin-top: 10px;
      }
      .tag-box{
        margin-left: 30px;
      }
      .opt-info{
        border-bottom: 1px solid #e3e3e3;
      }
      .title{
        padding: 0 0 10px;
      }
    }
  }
</style>

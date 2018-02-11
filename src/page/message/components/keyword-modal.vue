<template>
  <div id="keywordModal">
    <Modal v-model="if_show" :title="model_title" width="600" @on-cancel="close">
      <div slot="header">设置关键词</div>
      <Form ref="kw_form" :model="kw_form" :rules="temp_rules" :label-width="100">
        <FormItem label="关键字:">
          <Input class="ipt-info" v-model="kw_form.keyword_name" />
        </FormItem>
        <FormItem label="关键字解释:" prop="keyword_zh">
          <Input class="ipt-info" v-model="kw_form.keyword_zh" />
        </FormItem>
      </Form>
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
      kw_form: {
        keyword_name: '',
        keyword_zh: ''
      },
      temp_rules:{
        keyword_name: [
          {required: true,message: '关键字不能为空！'}
        ],
        keyword_zh: [
          {required: true,message: '关键字解释不能为空！'}
        ]
      }
    }
  },
  watch: {
    init_data(val){
      this.kw_form = val;
    },
    is_edit(val){
      this.$refs['kw_form'].resetFields();
      if(val){
        this.model_title = '编辑关键字';
      }else{
        this.model_title = '添加关键字';
      }
    }
  },
  methods: {
    show() {
      this.if_show = true;
    },
    close() {
      this.if_show = false;
    },
    SubmitData(){
      let edit_info = {
        status: this.is_edit,
        id: this.edit_id
      };
      this.$emit('sub-data', this.kw_form, edit_info);
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

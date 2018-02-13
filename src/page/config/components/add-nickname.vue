<template>
  <div id="addTag">
    <Modal v-model="if_show" :title="topTitle" width="600">
      <Form ref="tag_form" :label-width="80">
        <FormItem label="词名:">
          <Input type="text" class="ipt-box" v-model="edit_form.names" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="submit">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: "addTag",
    props: {
      edit_info: {
        type: Object,
        default: function(){
          return {
            status: false,
            id: '',
            names: '',
            type: 1
          }
        }
      }
    },
    data() {

      return {
        title: ['添加姓氏','添加名氏'],
        edit_form:{
          type: 3,
          names: '',
        },
        if_show: false,
        edit_type: false
      }
    },
    watch: {
      edit_info(val){
        this.edit_form.type = val.type;
        this.edit_form.names = val.name;
        this.edit_type = val.status;
      }
    },
    computed: {
      topTitle(){
        if(this.edit_form.type === 3){
          return this.title[0];
        }else if(this.edit_form.type === 4){
          return this.title[1];
        }
      }
    },
    methods: {
      show() {
        this.if_show = true;
      },
      submit() {
        if(this.edit_form.names === ''){
          this.$Message.error('请先填写标签名！');
        }else if(this.edit_form.names.length > 4){
          this.$Message.error('不能超过4个字！');
        }else{
          let params = this.edit_form;
          this.$emit('subOver', params);
        }
      },
      close() {
        this.if_show = false;
      }
    },
    mounted() {

    }
  }
</script>
<style lang="scss" scoped>
  .upload-input{
    display:flex;
    align-items: flex-end;

    .upload-pic{
      margin-right:10px;
      width:100px;
      height:100px;
    }
  }
  .ipt-box{
    width: 300px;
  }
</style>

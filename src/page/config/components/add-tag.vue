<template>
  <div id="addTag">
    <Modal v-model="if_show" title="添加标签" width="600">
      <Form ref="tag_form" :label-width="80">
        <FormItem label="标签名:">
          <Input type="text" class="ipt-box" v-model="name" />
        </FormItem>
        <FormItem label="类型:">
          <RadioGroup v-model="type">
            <Radio :label="1">
              <span>用户标签</span>
            </Radio>
            <Radio :label="2">
              <span>系统标签</span>
            </Radio>
            <Radio :label="3">
              <span>姓氏标签</span>
            </Radio>
            <Radio :label="4">
              <span>名氏标签</span>
            </Radio>
          </RadioGroup>
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
            name: '',
            type: 1
          }
        }
      }
    },
    data() {

      return {
        type: 1,
        name: '',
        if_show: false,
        edit_type: false
      }
    },
    watch: {
      edit_info(val){
        this.type = val.type;
        this.name = val.name;
        this.edit_type = val.status;
      }
    },
    methods: {
      show() {
        this.if_show = true;
      },
      submit() {
        if(this.name === ''){
          this.$Message.error('请先填写标签名！');
        }else{
          let params = {
            names: this.name,
            type: this.type
          };
          if(this.edit_type){
            params.id = this.edit_info.id;
            this.$emit('editOver',params);
          }else{
            this.$emit('subOver', params);
          }
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

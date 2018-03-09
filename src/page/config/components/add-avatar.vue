<template>
  <div id="addAvatar">
    <Modal v-model="if_show" :title="fix_title" width="600">
      <Form ref="avatar_form" :model="avatar_form" :label-width="80">
        <FormItem label="头像图片:">
          <div class="upload-input">
            <div class="upload-pic background-contain" v-if="img_path !== ''" :style="`background-image:url(${img_path})`">
            </div>
            <my-upload :format="['jpg','jpeg','png']" @success="handle_success"></my-upload>
          </div>
        </FormItem>
        <FormItem label="性别:">
          <RadioGroup v-model="sex">
            <Radio :label="1">
              <Icon color="#00BFFF" type="male"></Icon>
              <span>男</span>
            </Radio>
            <Radio :label="2">
              <Icon color="#FF6347" type="female"></Icon>
              <span>女</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="状态:" v-if="edit_type">
          <RadioGroup v-model="status">
            <Radio :label="1">
              <span>上架</span>
            </Radio>
            <Radio :label="2">
              <span>下架</span>
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
    name: "addAvatar",
    props: {
      avatar_form: {
        type: Object,
        default: function() {
          return {
            task_type: [],
            money: null,
            num: null
          }
        }
      },
      edit_info: {
        type: Object,
        default: function(){
          return {
            type: false,
            id: '',
            sex: 1,
            img_path: '',
            img_short_path: '',
            status: 1
          }
        }
      }
    },
    data() {
      return {
        title: ['添加头像','编辑头像'],
        sex: '1',
        status: '1',
        img_path: '',
        if_show: false,
        edit_type: false
      }
    },
    watch: {
      edit_info(val){
        this.status = val.status;
        this.sex = val.sex;
        this.img_path = val.img_path;
        this.edit_type = val.type;
      }
    },
    computed: {
      fix_title(){
        return this.edit_type?this.title[1]:this.title[0];
      }
    },
    methods: {
      show() {
        this.if_show = true;
      },
      submit() {
        if(this.img_path === ''){
          this.$Message.error('请点击先上传图片！');
        }else{
          let params = {
            sex: this.sex,
            img_path: this.img_short_path
          };
          if(this.edit_type){
            params.id = this.edit_info.id;
            params.status = this.status;
            this.$emit('editOver',params);
          }else{
            this.$emit('subOver', params);
          }
        }
      },
      handle_success(data){
        this.img_path = data[0][0];
        this.img_short_path = data[0][1];
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
</style>

<template>
  <div id="addRefig">
    <Modal v-model="if_show" title="添加充值选项" width="600">
      <Form ref="refig_form" :rules="refig_rules" :label-width="80">
        <FormItem label="充值金额:">
          <Input class="ipt-box" v-model="money" />
        </FormItem>
        <FormItem label="对应秘币:">
          <Input class="ipt-box" v-model="value" />
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
    name: "addRefig",
    props: {
      edit_info: {
        type: Object,
        default: function(){
          return {
            status: false,
            id: '',
            money: '',
            value: ''
          }
        }
      }
    },
    data() {
      function check_money(rule,value,callback) {
        if(value<0.01){
          callback(new Error('数值不得小于0.01'))
        }else{
          callback()
        }
      }

      return {
        type: 1,
        money: '',
        value: '',
        if_show: false,
        edit_type: false,
        refig_rules: {
          money: [
            {required: true, message: '请选择充值金额'},
            {validator: check_money}
          ],
          value: [
            {required: true, message: '请填写对应秘币'},
            {validator: check_money}
          ]
        },
      }
    },
    watch: {
      edit_info(val){
        console.log(val)
        this.value = val.value;
        this.money = val.money;
        this.edit_type = val.type;
      }
    },
    methods: {
      show() {
        this.if_show = true;
      },
      submit() {
        let params = {
          money: this.money,
          value: this.value
        };
        if(this.edit_type){
          params.id = this.edit_info.id;
          this.$emit('editOver',params);
        }else{
          this.$emit('subOver', params);
        }

        /*this.$refs.refig_form.validate((valid)=> {
          if(valid){
            let params = {
              money: this.money,
              value: this.value
            };
            if(this.edit_type){
              params.id = this.edit_info.id;
              this.$emit('editOver',params);
            }else{
              this.$emit('subOver', params);
            }
          }
        });*/
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

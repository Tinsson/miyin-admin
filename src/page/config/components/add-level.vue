<template>
  <div id="addLevel">
    <Modal v-model="if_show" :title="titleTxt" width="600">
      <Form ref="level_form" :rules="level_rules" :label-width="120">
        <FormItem label="收费等级:">
          <Input class="ipt-box" v-model="level" />
        </FormItem>
        <FormItem label="接听聊天收费标准:">
          <Row>
            <Col span="4">
              <InputNumber :min="0" v-model="talk_fee_start"></InputNumber>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="4">
              <InputNumber :min="0" v-model="talk_fee_end"></InputNumber>
            </Col>
            <Col span="5" style="text-align: center">秘币/分钟</Col>
          </Row>
        </FormItem>
        <FormItem label="偷听收费:">
          <Row>
            <Col :span="4">
              <InputNumber :min="0" v-model="tap_fee"></InputNumber>
            </Col>
            <Col :span="5" style="text-align: center">秘币/分钟</Col>
          </Row>
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
    name: "addLevel",
    props: {
      edit_info: {
        type: Object,
        default: function(){
          return {
            type: false,
            id: '',
            level: '',
            tap_fee: 0,
            talk_fee_start: 0,
            talk_fee_end: 0
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
        level: '',
        tap_fee: 0,
        talk_fee_start: 0,
        talk_fee_end: 0,
        if_show: false,
        edit_type: false,
        level_rules: {
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
    computed: {
      titleTxt(){
        return this.edit_info.type?'编辑等级标准':'新增等级标准';
      }
    },
    watch: {
      edit_info(val){
        this.level = val.level;
        this.tap_fee = val.tap_fee;
        this.talk_fee_start = val.talk_fee_start;
        this.talk_fee_end = val.talk_fee_end;
        this.edit_type = val.type;
      }
    },
    methods: {
      show() {
        this.if_show = true;
      },
      submit() {
        let params = {
          level: this.level,
          tap_fee: this.tap_fee,
          talk_fee_start: this.talk_fee_start,
          talk_fee_end: this.talk_fee_end
        };
        if(this.talk_fee_start > this.talk_fee_end){
          this.$Message.error('收费标准填写有误');
          return;
        }
        if(this.edit_type){
          params.id = this.edit_info.id;
          this.$emit('editOver',params);
        }else{
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

<template>
  <div id="gifts">
    <title-bar title="礼物管理" @refresh="refresh"></title-bar>
    <table-container>
      <div slot="btn">
        <Button type="primary" @click="operation_type = 'add';gift_show = true">新增礼物</Button>
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>

    <Modal v-model="gift_show" title="新增礼物" width="600" @on-visible-change="modal_change">
      <div class="gift-container">
        <Form ref="gift_form" :model="gift_form" :rules="gift_rules" :label-width="80">
          <FormItem label="礼物图标:" prop="pic">
            <div class="upload-input">
              <div class="upload-pic background-contain" v-for="item in gift_form.pic" :style="'background-image:url('+item[0]+')'">
              </div>
              <my-upload :format="['jpg','jpeg','png']" @success="handle_success"></my-upload>
            </div>
          </FormItem>
          <FormItem label="礼物价格:" prop="price">
            <InputNumber :min="0.00" :step="1" v-model="gift_form.price"></InputNumber>
          </FormItem>
          <FormItem label="礼物名称:" prop="name">
            <Input v-model="gift_form.name"></Input>
          </FormItem>
          <FormItem label="礼物折扣:" prop="discount">
            <InputNumber :max="1" :min="0" :step="0.01" v-model="gift_form.discount"></InputNumber>
          </FormItem>
          <FormItem label="折扣时间:" prop="time" v-if="gift_form.discount!=''&&gift_form.discount!=1">
            <DatePicker type="daterange" placeholder="请选择时间" :editable="false" v-model="gift_form.time" @on-change="changeTime"></DatePicker>
          </FormItem>
        </Form>
      </div>
      <div class="gift-footer" slot="footer">
        <Button type="primary" :loading="form_loading" @click="submit()">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "gifts",
  data() {
    var checkUpload = function (rule,value,callback) {
      if(value.length == 0){
        callback(new Error('请选择上传图片'))
      }else{
        callback()
      }
    }
    var checkDate = function (rule,value,callback) {
      console.log(value)
      if(!value[0]){
        callback(new Error('请选择时间'))
      }else{
        callback();
      }
    }
    var checkPrice = function (rule,value,callback) {
      if(value<0.01){
        callback(new Error('礼物价格不得小于0.01'))
      }else{
        callback()
      }
    }
    return {
      operation_type: '',
      gift_show: false,
      form_loading: false,
      gift_form:{
        id: '',
        pic: [],
        price: 0.01,
        name: '',
        discount: 1,
        time: [],
        start_time: '',
        end_time: ''
      },
      gift_rules:{
        pic: [
          {required: true,message: '请选择上传图片'},
          { validator: checkUpload }
        ],
        price: [
          { required: true, message: '请输入礼物价格' },
          {validator: checkPrice}
        ],
        name: [
          { required: true, message: '请输入礼物名称' }
        ],
        time: [
          { required: true, message: '请选择时间' },
          { validator: checkDate}
        ],
      },
      defaultList: [],
      img:'',

      columns: [
        {
          title: 'id',
          key: 'id',
          align: 'center'
        },{
          title: '礼物名称',
          key: 'title',
          align: 'center'
        }, {
          title: '礼物图标',
          key: 'img',
          align: 'center',
          width:100,
          render: (h, params) => {
            return h('img',{
              attrs: {
                src: params.row.img
              },
              style: {
                width:'50px'
              }
            })
          }
        }, {
          title: '价格（秘币）',
          key: 'price',
          align: 'center'
        }, {
          title: '创建时间',
          key: 'created_at',
          align: 'center'
        }, {
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            return h('div',params.row.status ==1?'销售中':'未上架')
          }
        }, {
          title: '折扣',
          key: 'discount_price',
          align: 'center'
        }, {
          title: '折扣开始时间',
          key: 'start_time',
          align: 'center'
        },{
          title: '折扣结束时间',
          key: 'end_time',
          align: 'center'
        },{
          title: '操作',
          key: 'operation',
          align: 'center',
          width:220,

   //        <Poptip
   //     confirm
   //     title="您确认删除这条内容吗？"
   //     @on-ok="ok"
   //     @on-cancel="cancel">
   //     <Button>删除</Button>
   // </Poptip>

          render: (h, params) => {
            return h('div', [
              h('Poptip', {
                props:{
                  confirm: true,
                  title:params.row.status == 0?'确定要上架吗？':'确定要下架吗？'
                },
                on: {
                  'on-ok': ()=>{
                    this.edit_status(params)
                  }
                }
              },[
                h('Button',{
                  props: {
                    type: 'text'
                  },
                },params.row.status==0?'上架':'下架')
              ]),
              h('Button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: ()=>{
                    this.edit_gift(params)
                  }
                }
              }, '编辑'),
              h('Poptip', {
                props:{
                  confirm: true,
                  title:'确定要删除吗？',
                  placement: 'left'
                },
                on: {
                  'on-ok': ()=>{
                    this.del_gift(params)
                  }
                }
              }, [
                h('Button',{
                  props: {
                    type: 'text'
                  }
                },'删除')
              ])
            ])
          }
        }
      ],
      myData: [],
      tableLoading: false,
      pageprops: { //分页配置
        showSizer:true,
        total:0,
      },
    }
  },
  methods: {
    modal_change(show) {
      if(!show){
        this.gift_form.id = '';
        this.gift_form.pic = [];
        this.gift_form.price = null;
        this.gift_form.name = '';
        this.gift_form.discount = 1;
        this.gift_form.time = [];
        this.gift_form.start_time = '';
        this.gift_form.end_time = '';
      }
    },
    changeTime(time) {
      this.gift_form.start_time = time[0]?time[0] + ' 00:00:00':''
      this.gift_form.end_time = time[1]?time[1] + ' 23:59:59':''
    },
    submit() {
      this.$refs.gift_form.validate((valid) => {
        if (valid) {
          if(this.operation_type == 'add') {
            //添加礼物
            this.form_loading = true;
            this.axios.post('add-gift',{
              img: this.gift_form.pic[0][1].replace(this.$oss_url,''),
              price: this.gift_form.price,
              title: this.gift_form.name,
              discount: this.gift_form.discount,
              start_time: this.gift_form.start_time,
              end_time: this.gift_form.end_time,
            }).then(res=>{
              if(res){
                this.form_loading = false;
                this.gift_show = false;
                this.$Message.success('礼物添加成功');
                this.getData();
              }
            })
          } else {
            //编辑礼物
            this.form_loading = true;
            this.axios.post('edit-gift',{
              id: this.gift_form.id,
              img: this.gift_form.pic[0][0].replace(this.$oss_url,''),
              price: this.gift_form.price,
              title: this.gift_form.name,
              discount: this.gift_form.discount,
              start_time: this.gift_form.start_time,
              end_time: this.gift_form.end_time,
            }).then(res=>{
              if(res){
                this.form_loading = false;
                this.gift_show = false;
                this.$Message.success('礼物修改成功');
                this.getData();
              }
            })
          }

        }
      })
    },
    handle_success(data) {
      this.$set(this.gift_form.pic,0,data[0]);
      // this.gift_form.pic[0]=data[0];
      console.log(this.gift_form.pic);
    },
    edit_status(params) {
      this.tableLoading = true;
      console.log(params)
      this.axios.post('gift-edit-status',{
        id:params.row.id,
        status: params.row.status == 1?0:1
      }).then(res=>{
        this.tableLoading = false;
        if(res) {
          this.getData()
        }
      })
    },
    del_gift(params) {
      this.tableLoading = true;
      this.axios.get(`del-gift?id=${params.row.id}`).then(res=>{
        this.tableLoading = false;
        if(res){
          this.$Message.success('删除成功');
          this.getData();
        }
      })
    },
    edit_gift(params) {
      this.operation_type = 'edit'
      this.gift_form.id = params.row.id;
      this.$set(this.gift_form.pic,0,[params.row.img])
      this.gift_form.price = parseFloat(params.row.price);
      this.gift_form.name = params.row.title;
      this.gift_form.discount = parseFloat(params.row.discount);
      this.$set(this.gift_form,'time',[params.row.start_time?new Date(params.row.start_time):'',params.row.end_time?new Date(params.row.end_time):''])
      this.gift_form.start_time = params.row.start_time;
      this.gift_form.end_time = params.row.end_time;
      this.gift_show = true;
    },
    refresh() {
      this.getData();
    },
    getData() {
      this.tableLoading = true;
      this.axios.get('get-gifts').then(res=>{
        this.tableLoading = false;
        if(res){
          this.myData = res.data.list
        }
      })
    },
  },
  mounted() {
    this.getData();
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

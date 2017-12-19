<template>
<div id="user">
  <title-bar title="用户管理" @refresh="refresh">

  </title-bar>
  <search-group :searchList="searchList" @search="search">
    <Button type="warning" icon="pinpoint" @click="senior_search=true">高级检索</Button>
  </search-group>
  <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page>
    <div slot="btn">
      <Button type="ghost" @click="duanxin_modal=true">群发短信</Button>
      <Button type="success" @click="zn_modal=true">群发站内信</Button>
      <Button type="error" @click="app_modal=true">APP推送</Button>
      <Button type="info">导出数据</Button>
    </div>
    <Table :columns="columns" :data="myData" border :loading="$store.state.common.table_loading"></Table>
  </table-container>

  <!-- 高级检索模态框 -->
  <Modal v-model="senior_search" title="高级检索" ok-text="开始检索" cancel-text="重置">
    <div class="senior-search-container">
      <div>
        <div class="label">
          用户账号:
        </div>
        <Input placeholder="用户ID/账号"></Input>
      </div>
      <div>
        <div class="label">
          用户昵称:
        </div>
        <Input placeholder="用户昵称"></Input>
      </div>
      <div>
        <div class="label">
          用户来源:
        </div>
        <Select>
          <Option value='PC'>PC端</Option>
          <Option value="web">WEB端</Option>
        </Select>
      </div>
      <div>
        <div class="label">
          会员等级:
        </div>
        <Select>
          <Option value="pt">普通会员</Option>
          <Option value="hj">黄金会员</Option>
          <Option value="bj">白金会员</Option>
          <Option value="zs">钻石会员</Option>
        </Select>
      </div>
      <div>
        <div class="label">
          用户标签:
        </div>
        <Select>
        </Select>
      </div>
      <div>
        <div class="label">
          注册时间:
        </div>
        <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width:100%"></DatePicker>
      </div>
    </div>
  </Modal>

  <!-- 群发短信模态框 -->
  <Modal v-model="duanxin_modal" title="群发短信">
    <div class="duanxin-container">
      <Form ref="duanxin_form" :model="duanxin_form" :rules="duanxin_rule" :label-width="80">
        <FormItem label="发送对象:">
          共<span style="color:red">20</span>个用户
        </FormItem>
        <FormItem label="发送类型:">
          <RadioGroup v-model="duanxin_form.send_type">
            <Radio label="勾选的用户"></Radio>
            <Radio label="全部用户"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="短信内容:" prop="content">
          <Input type="textarea" :maxlength="500" v-model="duanxin_form.content"></Input>
        </FormItem>
        <FormItem>
          <div>
            发送时系统会自动在结尾追加【优品汇】，请勿重复添加。
          </div>
          <div>
            内容上线不能超过<span class="red">500</span>字，当前已输入<span class="red">3</span>字，将作为<span class="red">1</span>条发送
          </div>
        </FormItem>
        <FormItem label="发送统计">
          <span style="margin-right:10px;">发送条数：<span class="red">20</span>条</span> <span>可用短信条数：<span class="red">100000</span>条 </span>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button>取消</Button>
      <Button type="primary" @click="duanxin_submit" :loading="duanxin_modal_loading">确定</Button>
    </div>
  </Modal>

  <!-- 群发站内信模态框 -->
  <Modal v-model="zn_modal" title="群发站内信">
    <div class="duanxin-container">
      <Form ref="zn_form" :model="zn_form" :rules="zn_rule" :label-width="80">
        <FormItem label="发送对象:">
          共<span style="color:red">20</span>个用户
        </FormItem>
        <FormItem label="发送类型:">
          <RadioGroup v-model="zn_form.send_type">
            <Radio label="勾选的用户"></Radio>
            <Radio label="全部用户"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="标题:" prop="title">
          <Input v-model="zn_form.title" :maxlength="20"></Input>
        </FormItem>
        <FormItem label="短信内容:" prop="content">
          <Input type="textarea" :maxlength="100" v-model="duanxin_form.content"></Input>
        </FormItem>
        <FormItem>
          <div>
            站内信标题不能超过<span class="red">20</span>个字，内容不能超过<span class="red">100</span>个字
          </div>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button>取消</Button>
      <Button type="primary" @click="zn_submit" :loading="zn_modal_loading">确定</Button>
    </div>
  </Modal>

  <!-- APP推送模态框 -->
  <Modal v-model="app_modal" title="APP推送">
    <div class="app-container">
      <Form ref="app_form" :model="app_form" :rules="app_rule" :label-width="80">
        <FormItem label="发送对象:">
          共<span style="color:red">20</span>个用户
        </FormItem>
        <FormItem label="发送类型:">
          <RadioGroup v-model="app_form.send_type">
            <Radio label="勾选的用户"></Radio>
            <Radio label="全部用户"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="推送类型:">
          <RadioGroup v-model="app_form.push_type">
            <Radio label="链接"></Radio>
            <Radio label="专题"></Radio>
            <Radio label="活动"></Radio>
            <Radio label="商品"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="推送链接:" prop="url" v-if="app_form.push_type == '链接'">
          <Input v-model="app_form.url"></Input>
        </FormItem>
        <FormItem :label="'选择'+app_form.push_type+':'" prop="choose" v-if="app_form.push_type != '链接'">
          <div class="chose-btn">

          </div>
        </FormItem>
        <FormItem label="推送标题:" prop="title">
          <Input v-model="app_form.title" :maxlength="20"></Input>
        </FormItem>
        <FormItem label="推送内容:" prop="content">
          <Input :maxlength="100" v-model="app_form.content"></Input>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button>取消</Button>
      <Button type="primary" @click="zn_submit" :loading="zn_modal_loading">确定</Button>
    </div>
  </Modal>
</div>
</template>
<script>
export default {
  name: "user",
  data: () => ({
    // 高级筛选
    senior_search: false,

    // 短信群发
    duanxin_modal: false,
    duanxin_form: {
      send_type: '勾选的用户',
      content: ''
    },
    duanxin_rule: {
      content: [{
        required: true,
        message: '请填写短信内容',
        trigger: 'blur'
      }],
    },
    duanxin_modal_loading: false,

    // 站内群发
    zn_modal: false,
    zn_form: {
      send_type: '勾选的用户',
      title: '',
      content: '',
    },
    zn_rule: {
      content: [{
        required: true,
        message: '请填写发送内容',
        trigger: 'blur'
      }],
      title: [{
        required: true,
        message: '请填写发送标题',
        trigger: 'blur'
      }],
    },
    zn_modal_loading: false,

    // APP推送
    app_modal: false,
    app_form: {
      send_type: '勾选的用户',
      push_type: '链接',
      url: ''
    },
    app_rule: {
      content: [{
        required: true,
        message: '请填写推送内容',
        trigger: 'blur'
      }],
      title: [{
        required: true,
        message: '请填写推送标题',
        trigger: 'blur'
      }],
      url: [{
        required: true,
        message: '请填写推送链接',
        trigger: 'blur'
      }],
      choose: [{
        required: true,
        message: '请选择',
        trigger: 'blur'
      }]
    },
    app_modal_loading: false,




    columns: [{
      type: 'selection',
      width: 60,
      align: 'center'
    }, {
      title: '用户ID',
      key: 'userID',
      align: 'center',
      sortable: true
    }, {
      title: '用户账号',
      key: 'mobile',
      align: 'center'
    }, {
      title: '用户昵称',
      key: 'user_name',
      align: 'center'
    }, {
      title: '注册时间',
      key: 'register_time',
      align: 'center'
    }, {
      title: '是否绑定手机',
      key: 'apply_num',
      align: 'center'
    }, {
      title: '性别',
      key: 'register_num',
      align: 'center'
    }, {
      title: '迷币余额',
      key: 'love_money',
      align: 'center'
    }, {
      title: '账户启用状态',
      key: 'love_time',
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
          }, '删除'),
          h('Button', {
            props: {
              type: 'text'
            }
          }, '查看')
        ])
      }
    }],

    myData: [],

    searchList: [{
      label: '用户账号',
      type: 'input',
      placeholder: '用户ID/账号',
      model: 'userId'
    }, {
      label: '用户昵称',
      type: 'input',
      placeholder: '用户昵称',
      model: 'userName'
    }, {
      label: '注册时间',
      type: 'daterange',
      placeholder: '请选择注册时间',
      model: 'register_time'
    }],

    // pageprops: {
    //   current: 3,
    //   total: 1000,
    //   showSizer: true
    // }
  }),
  methods: {
    duanxin_submit() {
      this.$refs.duanxin_form.validate((valid) => {
        if (valid) {
          this.duanxin_modal_loading = true
          setTimeout(() => {
            this.duanxin_modal_loading = false
            this.duanxin_modal = false
          }, 2000)
        }
      })
    },
    zn_submit() {

    },
    search(data) {
      this.$store.dispatch('table_axios', {
        path: '/Auth/authList',
        data: data
      }).then(res => {
        console.log(res)
      })
    },
    refresh() {
      console.log('刷新')
    },
    pageChange(page) {
      console.log(page)
    },
    pageSizeChange(size) {
      console.log(size)
    }
  },
  mounted() {
    // console.log(this.axios.defaults.headers);
    this.axios.get('/user/list').then(res => {
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped>
.red {
    color: red;
}
.senior-search-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    > div {
        width: 40%;
        margin-bottom: 10px;
        .label {
            white-space: nowrap;
            margin-bottom: 10px;
            font-size: 14px;
        }
    }
}
.app-container{
  .chose-btn{
    height:33px;
    background:#eee;
    border-radius:5px;
    cursor: pointer;
  }
}


</style>

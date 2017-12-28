<template>
<div id="searchGroup">
  <Card>
    <div class="title" slot="title">
      <div class="label">
        <Icon type="ios-pricetags-outline"></Icon>
        筛选查询
      </div>
      <div class="btn-group">
        <Button type="ghost" icon="reply" @click="reset_search">重置筛选</Button>
        <Button type="success" icon="search" @click="search">查询结果</Button>
        <slot></slot>
      </div>
    </div>
    <div class="content">
      <div class="input-group" v-for="item in searchList">
        <div class="label">
          {{item.label}}
        </div>
        <Input :placeholder="item.placeholder" v-model="form[item.model]" v-if="item.type=='input'"></Input>
        <DatePicker type="date" :placeholder="item.placeholder" v-model="form[item.model]" v-if="item.type=='date'" :editable="false"></DatePicker>
        <DatePicker type="daterange" :placeholder="item.placeholder" v-model="form[item.model]" v-if="item.type=='daterange'" :editable="false"></DatePicker>
        <Select v-model="form[item.model]" :placeholder="item.placeholder" v-if="item.type=='select'" clearable style="width:145px;">
          <Option v-for="option in item.options" :value="option.value" :key="option.value">{{ option.label }}</Option>
        </Select>
      </div>
    </div>
  </Card>
</div>
</template>
<script>
export default {
  name: "searchGroup",
  props: ['searchList'],
  data: () => ({
    form: {}
  }),
  methods: {
    getTime(date,type){
      // type:0 起始时间
      // type:1 终止时间
      if(!date) {
        return '';
      }
      let time = '';
      let Y = date.getFullYear();
      let M = date.getMonth()+1;
      let D = date.getDate();
      time = type == 0 ? time + Y + '-' + M + '-' + D + ' ' + '00:00:00' : time + Y + '-' + M + '-' + D + ' ' + '23:59:59'
      return time;
    },
    search() {
      for(let i=0;i<this.searchList.length;i++){
        if(this.searchList[i].type == 'daterange') {
          this.$set(this.form,this.searchList[i]['start_end'][0],this.getTime(this.form[this.searchList[i].model][0],0))
          this.$set(this.form,this.searchList[i]['start_end'][1],this.getTime(this.form[this.searchList[i].model][1],1))
        }
      }
      this.$emit('search',this.form)
    },
    reset_search() {
      for(let key in this.form) {
        this.form[key] = ''
      }
    },
  },
  mounted() {
    for (let i = 0; i < this.searchList.length; i++) {
      this.$set(this.form, this.searchList[i].model, '')
    }
  },
}
</script>
<style lang="scss" scoped>
#searchGroup {
    margin-bottom: 20px;
    .title {
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .label {
            font-size: 15px;
        }
    }
    .content {
        padding-right: 20px;
        padding-top: 20px;
        display: flex;
        flex-wrap: wrap;
        background: #fff;
        .input-group {
            display: flex;
            align-items: center;
            margin-left: 20px;
            margin-bottom: 20px;
            .label {
                white-space: nowrap;
                margin-right: 10px;
            }
        }
    }
}
</style>

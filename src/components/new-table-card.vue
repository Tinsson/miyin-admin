
<!-- 新tableCard组件 优化了事件触发方式,改变data不改变当前选中状态 -->

<template>
  <div id="tableCard" :style="container_style">
    <div class="card" :style="card_style" v-for="(card,index) in columns" :class="{active:choseIndex==index}" @click="choseCard(index)">
      <div class="card-left">
        <div class="title">
          {{card.title}}
        </div>
        <div class="content">
          <span class="num">{{data[card.key]}}</span>
          {{card.unit?card.unit:''}}
        </div>
      </div>
      <Icon :type="card.icon" color="#fff" :size="iconsize" class="icon"></Icon>
    </div>
  </div>
</template>
<script>
export default {
  name: "tableCard",
  props: {
    container_style: {
      default: ''
    },
    card_style: {
      default: ''
    },
    columns: {
      type: Array
    },
    data: {
      type: Object
    },
    iconsize: {
      type: [String,Number],
      default: '60'
    }
  },
  data: () => ({
    choseIndex: 0,
    choseType: '',
    choseKey: ''
  }),
  methods: {
    choseCard(index) {
      this.choseIndex = index;
      this.choseType = this.columns[this.choseIndex].type;
      this.choseKey = this.columns[this.choseIndex].key
    }
  },
  watch: {
    data(cur) {
      console.log(cur)
      if(JSON.stringify(cur) == '{}'){
        this.choseType = '';
        return;
      }
      this.choseType = this.columns[this.choseIndex].type;
    },
    choseType(cur) {
      this.$emit('change', cur)
    },
    choseKey(cur){
      this.$emit('changeKey', cur)
    }
  },
  mounted() {
    console.log('加载了组件')
  }
}
</script>
<style lang="scss" scoped>
#tableCard{
  display:flex;
  width:100%;
  flex-wrap: wrap;
  .card{
    position:relative;
    min-width:24%;
    padding:10px;
    background:#c3c3c3;
    margin-bottom:10px;
    cursor:pointer;
    color:#fff;
    border-radius:5px;
    margin-left:.8%;
    &.active{
      background:#2db7f5;
    }
    .card-left{
      float:left;
      margin-right:5px;
      .title{
        font-size:16px;
      }
      .content{
        padding:5px 0;
        font-size:18px;
        .num{
          font-size:40px;
        }
      }
    }
    .icon{
      float:right;
      top:15px;
      right:15px;
    }
  }
}
</style>

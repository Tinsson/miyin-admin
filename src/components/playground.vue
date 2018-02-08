<template>
<div id="playground">
  <Modal v-model="if_show" width="600" title="查看" @on-cancel="change">
    <div class="playground-container">
      <video :src="src" controls="controls" width="500" height="500" v-if="type=='video'" ref="myVideo">
      </video>
      <div class="one_pic background-contain" v-if="type=='image'&&src!=''" :style="'background-image:url('+src+')'">
      </div>
      <div class="pics-container" v-if="type=='image'&&src_arr.length!=0">
        <div class="one_pic background-contain" :style="'background-image:url('+src_arr[index]+')'">

        </div>
      </div>
    </div>
    <div slot="footer">
      <div class="foot" v-if="type=='image'&&src_arr.length!=0">
        <Button icon="chevron-left" shape="circle" @click="prev" :disabled="index==0"></Button>
        <span>第{{index+1}}张</span>
        <Button icon="chevron-right" shape="circle" @click="next" :disabled="index==this.src_arr.length-1"></Button>
      </div>
    </div>
  </Modal>

</div>
</template>
<script>
export default {
  name: "playground",
  data: () => ({
    if_show: false,
    type: 'image',
    src: '',
    index: 0,
    src_arr: [],
  }),
  computed: {
    left_disabled() {
      if(this.index == 0) {
        return false
      }
      return true
    },
    right_disabled() {
      // if(typeof this.src == 'string') {
      //   return false
      // }
      // if(this.index == )
    }
  },
  methods: {
    next() {
      this.index++;
    },
    prev(){
      this.index--;
    },
    change(cur) {
      if(!cur) {
        this.type='image';
        this.src='';
        this.index=0;
        this.src_arr=[];
      }
      if (!cur && this.type == 'video') {
        this.$refs.myVideo.pause();
      }
    },
    show(src, type) { //src是数组的话 type为数组下标  没传默认为0  ； src是字符串的话 type 为image 或者video  默认为image
      if (typeof src !== 'string') {
        this.src_arr = src;
        if (type&&typeof type == 'number') {
          this.index = type
        }
      } else {
        if (type) {
          this.type = type
        }
        this.src = src;
      }
      this.if_show = true
    }
  }
}
</script>
<style lang="scss" scoped>
.playground-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.one_pic {
    width: 500px;
    height: 500px;
    background-color: #e8e8e8;
    border: 10px solid #e8e8e8;
}
.pics-container{
  width:500px;
  height:500px;
  >div{
    width:500px;
    height:500px;
  }
}
.pic {
    margin: 0 auto;
    width: 500px;
    height: 500px;
    background-color: #e8e8e8;
    position: relative;
    background-image: url("http://img1.imgtn.bdimg.com/it/u=2689704752,3058454475&fm=11&gp=0.jpg");
}
.foot{
  display:flex;
  justify-content: center;
  align-items: center;
  font-size:20px;
  span{
    margin:0 20px;
  }
}
</style>

<template>
  <div id="userDetail">
    <Modal v-model="show" title="APP推送" width="1000px" class-name="no-auto">
      <div class="user-detail-container">
        <div class="left">
          <div class="tab">

          </div>
          <div class="tab">

          </div>
          <div class="tab">

          </div>
          <div class="tab">

          </div>
          <div class="tab">

          </div>
          <div class="tab">

          </div>
          <div class="tab">

          </div>
        </div>
        <div class="right">

        </div>
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "userDetail",
  data: () => ({
    show: false
  })
}
</script>
<style lang="scss" scoped>
.user-detail-container{
  display:flex;
  justify-content: space-around;
  .left{
    width:650px;
    padding:10px 10px 10px 0;
    border:1px solid #ddd;
    display:flex;
    flex-wrap: wrap;
    .tab{
      min-width:202px;
      height:90px;
      background:#ddd;
      margin-bottom: 10px;
      margin-left:10px;
    }
  }
  .right{
    width:300px;
    height:200px;
    border:1px solid #ddd;
  }
}
</style>

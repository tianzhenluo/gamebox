<template>
  <div>
    <div class="found-wrap">
      {{ msg }}
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        msg: '正在编写....(其实还没做)'
      }
    }
  }  
</script>

<style>
  .found-wrap {
    height: 6rem;
    line-height: 6rem;
    text-align: center;
  }
</style>

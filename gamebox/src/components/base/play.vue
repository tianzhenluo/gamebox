<template>
  <div class="play-wrap" @click="close">
      <div class="video">
          <iframe :src="vurl" frameborder="0"></iframe>
      </div>
  </div>
</template>

<script>
    export default {
        props: {
            pid: {
                type: Number,
                default: 0
            },
            vurl: {
                type: String,
                default: ''
            }
        },
        methods: {
            close(){
                this.$emit('on-close')
            }
        }
    }
</script>

<style>
 .play-wrap {
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, .6);
     z-index: 999;
 }
 .video iframe {
     width: 300px;
     height: 150px;
     display: block;
     margin: 0 auto;
    
 }
</style>


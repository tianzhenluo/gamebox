<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <!-- 底部导航 -->
    <div class="nav">
      <router-link v-for="item in navList" :key="item.name" :to="{path: item.url}" active-class="active" tag="span">
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      navList: [
        {
          name: '精选',
          url: '/index'
        },
        {
          name: '视频',
          url: '/video'
        },
        {
          name: '英雄',
          url: '/hero'
        },
        {
          name: '发现',
          url: '/found'
        }
      ]
    }
  }
}
</script>

<style>
html {
  font-size:100px;
}
#app {
  font-size:0.14rem;
}
#app .nav {
  position: fixed;
  bottom: 0;
  left:0;
  width:100%;
  font-size: 0;
  display: flex;
  height: auto;
  border-top:1px solid #eee;
  background-color: #fff;
}
#app .nav span {
  font-size: 0.12rem;
  flex:1;
  text-align:center;
  height:40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#app .nav span.active {
  color: #d5bb2c;
}
</style>

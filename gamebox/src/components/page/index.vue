<template>
  <div class="index">
    <div class="banner">
      <van-swipe :autoplay="5000">
        <van-swipe-item v-for="item in banner" :key="item.ID">
          <a @click="showArt(item)">
            <img :src="item.pic" alt="">
            <p>{{ item.title }}</p>
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="scroll-list"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0">
      <ul>
        <li v-for="item in scrollList" :key="item.id" :data-art-id="item.ID" @click="showArt(item)">
          <img :src="item.pic" alt="">
          <div class="text-wrap">
            <p class="title">{{item.title}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="loading" v-show="busy">正在加载中...</div>
    <p class="err" v-if="finish">已经没有更多数据了...</p>
    <art-page :article="article" :isShow="isShow" @on-close="close" @on-open="open"></art-page>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'vant'
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'
import artPage from '../base/artPage'

Vue.use(Swipe).use(SwipeItem)

export default {
  name: 'index',
  
  data () {
    return {
      scrollList: [],
      banner: [],
      pageIndex: 1,
      busy: false,
      article: {},
      isShow: false,
      finish: false
    }
  },
  directives: {
    infiniteScroll
  },
  components: {
    artPage
  },
  methods: {
    /* 
      首页上拉加载更多
    */
    loadMore() {
      if(!this.finish){
        this.busy = true
        axios.get('/api/article?page='+ this.pageIndex++)
        .then((res)=>{
          this.scrollList = this.scrollList.concat(res.data)
          this.busy = false
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    },
    /* 
      首页banner图数据
    */
    getBanner(){
      axios.get('/api/article?banner=1')
      .then((res)=>{
        console.log(res.data)
        this.banner = res.data
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    /* 
      点击文章，进入阅览状态（banner图用统一组件）
    */
    showArt(obj) {
      console.log(obj)
      this.article = obj
      this.$router.push({ path: '/index', query: { aid: obj.ID }})
      this.isShow = true
    },
    /* 
      关闭阅览
    */
    close(){
      this.isShow = false
    },
    /* 
      当在子组件，更换文章id时，保持阅览状态打开，并切换到对应ID的文章
    */
    open(aid){
      axios.get('/api/article?aid='+ aid)
      .then((res)=>{
        this.article = res.data[0]
      })
      .catch((err)=>{
        console.log(err)
      })
      this.isShow = true
    }
  },
  created(){
    //组件被创建时载入数据，loadMore 列表数据，getBanner 滚动图数据
    this.loadMore(this.pageIndex) 
    this.getBanner()
  },
  watch: {
    // 用户操作系统本身自带的返回键关闭当前的文章组件时，监听路由的变化，关闭文章组件
    '$route'(to, from){
      if(JSON.stringify(to.query) == '{}'){
        this.isShow = false
      }
    },
    // 无限滚动数据是否已加载完毕（数据库的数据已全部返回），监听scrollList 状态的数组长度是否发生变化，没有的话说明已经没有数据返回了，阻止上垃加载事件
    scrollList(cur, old){
      if(cur.length == old.length){
        this.finish = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .banner {
    margin-bottom: 20px;
  }
  .van-swipe-item {
    height: 1.5rem;
    position: relative;
  }
  .van-swipe-item img {
    display: block;
    width: 100%;
    height: 1.5rem;
  }
  .van-swipe-item p {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    font-size: .12rem;
    color:#fff;
    background-color: rgba(0,0,0,.5);
    line-height: 2;
    padding-bottom: 10px;
  }
  .index {
    -webkit-overflow-scrolling: touch;
    padding-bottom: 60px;
  }
  .scroll-list {
    padding: 0 10px;
  }
  .scroll-list li {
    overflow: hidden;
    padding-bottom: 15px;
  }
  .scroll-list li img {
    display: block;
    float: left;
    width: 1rem;
    height: .6rem;
    margin-right: 10px;
  }
  .scroll-list .text-wrap {
    overflow: hidden;
  }
  .scroll-list .text-wrap .title {
    font-size: .14rem;
    color: #444;
    line-height: 1.6
  }
  .loading, .err {
    text-align: center;
    font-size: .14rem;
    color:#444;
  }
</style>

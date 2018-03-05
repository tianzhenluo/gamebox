<template>
  <div>
    <h2 class="vtit"><van-icon name="wap-nav" /> 王者视频</h2>
    <div class="videos"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0">
      <ul>
        <li v-for="item in videos" :key="item.ID" @click="play(item.url)">
          <div>
            <van-icon name="play" />
            <img :src="item.pic" alt="item.title">
            <p>{{ item.title }}</p>
          </div>
        </li>
      </ul>
    </div>

    <i-play :vurl="vurl" v-if="isPlay" @on-close="close"></i-play>

    <p class="loading" v-if="busy">正在加载数据</p>
    <p class="err" v-if="finish">没有更多数据了...</p>
  </div>
</template>

<script>
    import axios from 'axios'
    import Vue from 'vue'
    import { Icon } from 'vant'
    import infiniteScroll from 'vue-infinite-scroll'
    import iPlay from '../base/play'
    Vue.use(Icon)

    export default {
      data(){
        return {
          videos: [],
          pageIndex: 1,
          busy: false,
          finish: false,
          pid: 0,
          vurl: '',
          isPlay: false
        }
      },
      components: {
        iPlay
      },
      directives: {
        infiniteScroll
      },
      methods: {
        loadMore(){
          if(!this.finish){
            this.busy = true
            axios.get('/api/video?page=' + this.pageIndex++)
            .then((res)=>{
                this.videos = this.videos.concat(res.data)
                this.busy = false
            })
            .catch((err)=>{
              console.log(err)
            })
          }
        },
        play(vurl){
          // this.pid = pid
          this.vurl = vurl
          this.isPlay = true
        },
        close(){
          this.isPlay = false
        }
      },
      //监听videos 的长度，当前的长度跟上一个状态的长度一样，则数据已经请求完毕，停止请求
      watch: {
        videos(cur, old){
          if(cur.length == old.length){
            this.finish = true
          }
        }
      },
      created(){
        this.loadMore(this.pageIndex)
      }
    }
</script>

<style>
  h2.vtit {
    font-size: .16rem;
    font-weight: bold;
    line-height: 1.5;
    padding: .1rem 0;
    width: 90%;
    margin: 0 auto;
  }
  h2.vtit .van-icon {
    position: relative;
    top: 2px;
  }
  .videos {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 50px;
  }
  .videos li {
    margin-bottom: 20px;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
  }
  .videos li img {
    display: block;
    width: 100%;
    height: 1.8rem;
  }
  .videos li p {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    line-height: 3;
    background-color: rgba(0, 0, 0, .7);
    color: #fff;
    font-size: .13rem;
    text-align: center;
  }
  .videos li .van-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -.25rem;
    margin-top: -.25rem;
    color: #fff;
    text-shadow: 0 0 3px #000;
    font-size: .5rem;
  }
  .err, .loading {
    margin-bottom: 60px;
    text-align: center;

  }
</style>

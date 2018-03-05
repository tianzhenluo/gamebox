<template>
    <div class="hwrap" ref="hwrap" v-if="isShow">
        <div class="hheader">
            <div class="hide" @click="hide">
                <van-icon name="arrow-left" />
                <span>返回</span>
            </div>
        </div>
        <div class="hcontent">
            <h3 class="title">{{ article.title }}</h3>
            <div class="art-info">
                <p class="from">来源：网络</p>
                <p class="author">作者：不详</p>
            </div>
            <div class="article">
                {{ article.content }}
            </div>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue'
    import { Icon } from 'vant'
    Vue.use(Icon)

    export default {
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            article: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                
            }
        },
        methods: {
            hide(){
                this.$router.push({ path: '/index' })
                let hwrap = this.$refs.hwrap
                let wrapW = hwrap.clientWidth
                hwrap.style.left = - wrapW + 'px'
                this.$emit('on-close')
            }
        },
        created() {
            if(this.$route.query.aid){
                this.$emit('on-open', this.$route.query.aid)
            }
        }
    }
</script>


<style scoped>
    .art-info {
        overflow: hidden;
        font-size: .12rem;
        color: #444;
        margin-bottom: 10px;
    }
    .art-info .from {
        float: left;
    }
    .art-info .author {
        float: right;
    }
    .mb10 {
        margin-bottom: 10px;
    }
    .hwrap {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color:#fff;
        padding: 10px;
        z-index: 999;
        overflow: auto;
    }
    .hheader {
        overflow: hidden;
        position: fixed;
        width: 100%;
        height: 30px;
        left: 0;
        top: 0;
        background-color: #fff;
        margin-bottom: 10px;
        padding-top: 10px;
    }
    .hwrap .hide {
        display: block;
        width: 70px;
        height: 30px;
        font-size: 0;
        position: absolute;
        top: 10px;
        left: 0;
    }
    .hheader .hname {
        height: 30px;
        text-align: center;
    }
    .hwrap .hide i, .hwrap .hide span {
        font-size: 0.16rem;
    }
    .hwrap .hide i {
        position: relative;
        top: 2px;
    }
    .hcontent {
        padding-top: 50px;
    }
    .hcontent span.tag {
        padding: 0px 6px;
        background-color: #eee;
        font-size: .12rem;
    }
    .hcontent span.tag:nth-child(2){
        background-color: #ff00b1;
        color:#fff;
    }
    .hcontent .story {
        line-height: 1.8;
        text-indent: 2em;
        font-size: .13rem;
    }
    .hcontent h3 {
        font-size: .16rem;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .article {
        font-size: .14rem;
        text-indent: 2em;
        line-height: 2
    }
</style>


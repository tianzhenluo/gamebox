<template>
    <div class="hwrap" ref="hwrap" v-if="isShow">
        <div class="hheader">
            <div class="hide" @click="hide">
                <van-icon name="arrow-left" />
                <span>返回</span>
            </div>
            <div class="hname">{{ art.name }}</div>
        </div>
        <div class="hcontent">
            <p class="mb10">
                <span class="tag">{{ art.category }}</span>
                <span class="tag">{{ art.price }}</span>
            </p>
            <h3 class="mb10">英雄故事</h3>
            <div class="story">
                {{ art.story }}
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { Icon } from 'vant'
    Vue.use(Icon)

    import axios from 'axios'

    export default {
        props: {
            art: {
                type: Object,
                default: 0
            },
            isShow: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                isNone: false
            }
        },
        methods: {
            hide(){
                this.$router.push({ path: '/hero' })
                let hwrap = this.$refs.hwrap
                let wrapW = hwrap.clientWidth
                hwrap.style.left = - wrapW + 'px'
                this.$emit('on-close')
            }
        },
        watch: {
            '$route'(to, from){
                console.log(to.query)
            }
        },
        mounted(){
            console.log('子组件执行')
            if(this.$route.query.hid){
                this.$emit('on-open', this.$route.query.hid)
            }
        }
    }
</script>

<style scoped>
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
        left: 0;
        top: 0;
        height: 30px;
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
    }
</style>


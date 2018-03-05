<template>
  <div class="hero">
        <div class="type">
            <ul>
                <li v-for="(val, key, index) in category" :data-type="key" :key="key" :class="{'active': currentIndex == index}" @click="chooseType(index, key)">{{ val }}</li>
            </ul>
        </div>
        <!-- heros -->
        <div class="heros">
            <ul>
                <li v-for="(val, key) in heros" :data-id="key" :key="key" @click="showHero(key)" v-show="val.isNone">
                    <img v-bind:src="'/static/'+val.url">
                    <span class="name">{{ val.name }}</span>
                    <span class="professional">{{replacePosition(val.category)}}</span>
                </li>
            </ul>
        </div>
        <h-page :art="thisHero" :isShow="isShow" @on-close="close" @on-open="open"></h-page>
</div>
</template>

<script>
    
    import axios from 'axios'
    import HPage from '../base/heroPage'

    export default {
        name: 'hero',
        components: {
            HPage
        },
        data () {
            return {
                heros: '',
                currentIndex: 0,
                isShow: false,
                thisHero: {},
                herosDes: {},
                category: {
                    all: '全部',
                    mage: '法师',
                    support: '辅助',
                    fighter: '战士',
                    marksman: '射手',
                    tank: '坦克',
                    assassin: '刺客'
                }
            }
        },
        methods: {
            //英雄列表
            getHeros (){
                axios.get('../../../static/hero.json').then((res)=>{
                    this.heros = res.data
                    this.setIsNone(true)
                })
            },
            //英雄简介
            getDes(){
                axios.get('../../../static/heroDesJson.json')
                .then((res)=>{
                    this.herosDes = res.data
                })
            },
            //英雄类型
            replacePosition (str){
                var splitS = str.split(',')
                if(splitS.length == 1){
                    //该英雄只有一个分类
                    return this.category[str]
                }else if(str.indexOf('assassin') != -1){
                    return this.category.assassin
                }else{
                    return this.category[splitS[0]]
                }
            },
            //选择类别
            chooseType(index, attr){
                this.currentIndex = index
                if(attr == 'all'){
                    this.setIsNone(true)
                }else{
                    this.setIsNone(false)
                    for(let item in this.heros){
                        if(this.heros[item].category == attr){
                            this.heros[item].isNone = true
                        }
                    }
                }
            },
            //显示英雄详情页
            showHero(id){
                this.$router.push({ path: '/hero', query: { hid: id }})
                this.thisHero = this.herosDes[id]
                this.isShow = true
            },
            //关闭英雄页
            close(){
                this.isShow = false
            },
            open(hid){
                console.log(hid)
                setTimeout(()=>{    //这里子组件调用父组件方法时，父组件的this.herosDes还没有数据...尴尬得一匹
                    this.thisHero = this.herosDes[hid]
                    this.isShow = true
                },500)
            },
            setIsNone(bool){
                for(let item in this.heros){
                    this.$set(this.heros[item], 'isNone', bool)
                }
            }
        },
        created (){
            //该组件创建完毕，渲染列表
            this.getHeros()
            //获取简介列表
            this.getDes()
        },
        watch: {
            // 用户操作系统本身自带的返回键关闭当前的文章组件时，监听路由的变化，关闭文章组件
            '$route'(to, from){
                if(JSON.stringify(to.query) == '{}'){
                    this.isShow = false
                }
            }
        }
    }
</script>

<style>
    .hero {
        padding-top: 50px;
        padding-bottom: 50px;
    }
    .type {
        position: fixed;
        top: 0;
        left: 0;
        width:100%;
    }
    .type ul {
        display:flex;
        background-color: #1f2328;
        color:#55595e;
        font-size:0.12rem;        
    }
    .type ul li {
        flex:1;
        align-items: center;
        justify-content: center;
        text-align:center;
        height: 30px;
        display:flex;
    }
    .type ul li.active {
        color:#fff;
        position:relative;
    }
    .type ul li.active::after {
        content: '';
        display: block;
        width: 40%;
        height: 2px;
        background: #fff;
        position: absolute;
        left: 30%;
        bottom: 3px;
    }
    .heros {
        padding: 0 20px;
    }
    .heros ul {
        overflow: hidden;
    }
    .heros ul li {
        float: left;
        width: 33.333%;
        text-align: center;
        margin-bottom: 20px;
    }
    .heros ul li img {
        width: 80%;
    }
    .heros ul li span {
        background: #eee;
        display: block;
        width: 80%;
        margin: 0 auto;
        font-size: 0.12rem;
        padding: 4px;
    }
</style>

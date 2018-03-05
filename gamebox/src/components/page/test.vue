<template>
  <div class="test" style=" background-color: #ccc; width: 100%"
  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <ul>
        <li v-for="item in content">{{item}}</li>
    </ul>
  </div>
</template>

<script>
    import infiniteScroll from 'vue-infinite-scroll'
    export default {
        data() {
            return {
                busy: false,
                content: []
            }
        },
        directives: {
            infiniteScroll
        },
        methods: {
            loadMore() {
                this.busy = true
                console.log('loading..'+ new Date())
                setTimeout(()=>{
                    // var test = document.querySelector('.test')
                    // var height = test.clientHeight
                    // test.style.height = height + 300 + 'px'
                    let temp = ['内容1','内容2','内容2','内容2','内容2','内容2','内容2','内容2','内容2','内容2','内容2']
                    this.content = temp.concat(this.content)

                    console.log('end..'+new Date())
                    this.busy = false
                }, 1000)
            }
        }
    }
</script>

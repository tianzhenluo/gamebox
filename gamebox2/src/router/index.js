import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/page/index'
import Hero from '@/components/page/hero'
import Video from '@/components/page/video'
import Found from '@/components/page/found'

import test from '@/components/page/test'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/index/:aid',
          component: Index
        }
      ]
    },
    {
      path: '/test',
      component: test
    },
    {
      path: '/hero',
      name: 'hero',
      component: Hero,
      children: [
        {
          path: '/hero/:hid',
          component: Hero
        }
      ]
    },
    {
      path: '/video',
      name: 'video',
      component: Video
    },
    {
      path: '/found',
      name: 'found',
      component: Found
    }
  ]
})

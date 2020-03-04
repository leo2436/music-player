import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import SongListDetail from '../components/SongListDetail'
import SongList from '../components/SongList'
import Singer from '../components/Singer'
import SingerListDetail from '../components/SingerListDetail'
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/songlist'
    },
    {
      path: '/songlist',
      component: SongList,
    },
    {
      component: SongListDetail,
      path: '/:listName/:listId',
      name: 'listdetail'
    },
    {
      path: '/singerlist',
      component: Singer,
      name: 'singer',
    },
    {
      component: SingerListDetail,
      path: '/:listName/:listId',
      name: 'singerdetail'
    },
  ]
})
import Vue from 'vue'
import Router from 'vue-router'
import Places from '../views/Places.vue'
import Routes from '../views/Routes.vue'
import About from '../views/About.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/places/:id?',
      name: 'places',
      component: Places,
      props: true
    },
    {
      path: '/routes',
      name: 'routes',
      component: Routes
    },
    {
      path: '/',
      name: 'about',
      component: About
    }
  ]
})

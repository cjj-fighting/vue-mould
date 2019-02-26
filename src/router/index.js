import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Module',
		component: () => import('@/pages/module')
	}, {
		path: '/href',
		name: 'Href',
		component: () => import('@/pages/href')
	}, {
		path: '/test',
		name: 'Test',
		component: () => import('@/pages/test')
	}]
})

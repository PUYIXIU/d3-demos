import {createRouter, createWebHashHistory} from "vue-router";

export const routes = [
    {
      path:'/',
      redirect: 'examples',
    },
    {
        path:'/examples',
        component: ()=> import('@/views/examples/index')
    },
    {
        path:'/demos',
        redirect: '/demos/demo1',
        children:[
            {
                path:'/demos/demo1',
                component: ()=> import('@/views/demos/demo1/index')
            },
            {
                path:'/demos/demo2',
                component: ()=> import('@/views/demos/d3_demo/index')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

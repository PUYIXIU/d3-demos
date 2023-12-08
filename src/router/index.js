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
        redirect: 'demo1',
        children:[
            {
                path:'/demo1',
                component: ()=> import('@/views/demos/demo1/index')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Document from '../views/Document.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/document',
        name: 'Document',
        component: Document
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

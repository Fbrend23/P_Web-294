import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import UserPage from '@/views/UserPage.vue'
import BookShow from '@/views/BookShow.vue'
import BookCatalog from '@/views/BookCatalog.vue'
import BookCreate from '@/views/BookCreate.vue'
import UserBook from '@/views/UserBook.vue'
import UserLogin from '@/views/UserLogin.vue'
import UserRegister from '@/views/UserRegister.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/books/:id',
      name: 'bookShow',
      component: BookShow,
    },
    {
      path: '/books',
      name: 'bookCatalogue',
      component: BookCatalog,
    },
    {
      path: '/books/create',
      name: 'bookCreate',
      component: BookCreate,
    },
    {
      path: '/users/books',
      name: 'userBook',
      component: UserBook,
    },
    {
      path: '/login',
      name: 'login',
      component: UserLogin,
    },
    {
      path: '/register',
      name: 'register',
      component: UserRegister,
    },
    {
      path: '/userpage',
      name: 'userPage',
      component: UserPage,
    },
  ],
})

export default router

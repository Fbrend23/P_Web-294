import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import UserPage from '@/views/UserPage.vue'
import BookShow from '@/views/BookShow.vue'
import BookCatalog from '@/views/BookCatalog.vue'
import BookCreate from '@/views/BookCreate.vue'
import UserBook from '@/views/MyBooks.vue'
import UserLogin from '@/views/UserLogin.vue'
import UserRegister from '@/views/UserRegister.vue'
import MyBooks from '@/views/MyBooks.vue'
import BookUpdate from '@/views/BookUpdate.vue'

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
      path: '/userpage/:id',
      name: 'userPage',
      component: UserPage,
    },
    {
      path: '/mybooks',
      name: 'myBooks',
      component: MyBooks,
    },
    {
      path: '/books/:id/edit',
      name: 'EditBook',
      component: BookUpdate,
    },
  ],
})

export default router

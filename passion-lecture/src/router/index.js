import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
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
import { apiGetOneBook } from '@/api/books'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/books/:id',
    name: 'bookShow',
    component: BookShow,
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true },
  },
  {
    path: '/users/books',
    name: 'userBook',
    component: UserBook,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin,
    beforeEnter: [checkAuthenticated],
  },
  {
    path: '/register',
    name: 'register',
    component: UserRegister,
    beforeEnter: [checkAuthenticated],
  },
  {
    path: '/userpage/:id',
    name: 'userPage',
    component: UserPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/mybooks',
    name: 'myBooks',
    component: MyBooks,
    meta: { requiresAuth: true },
  },
  {
    path: '/books/:id/edit',
    name: 'EditBook',
    component: BookUpdate,
    meta: { requiresAuth: true },
    beforeEnter: [checkBookOwnership],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth) {
    const isAuthenticated = auth.isAuthenticated
    if (isAuthenticated) {
      next()
    } else {
      next({ name: 'login', query: { redirect: to.fullPath } })
    }
  } else {
    next()
  }
})

async function checkBookOwnership(to, from, next) {
  const auth = useAuthStore()
  const bookId = to.params.id
  const currentUserId = auth.getUser.id
  const isAdmin = auth.getUser.isAdmin

  if (!currentUserId) {
    return next({ name: 'login' })
  }

  try {
    const response = await apiGetOneBook(bookId)

    const book = response.data

    if (!book.userId || !currentUserId) {
      return next({ name: 'login' })
    }
    console.log(book.userId)
    console.log(currentUserId)
    if (book.userId === currentUserId || isAdmin) {
      next()
    } else {
      alert(`${book.userId} et ${currentUserId}`)
      // alert('You do not have permission to edit this publication.')
      next({ name: 'home' })
    }
  } catch (error) {
    console.error('Error fetching publication:', error)
    next({ name: 'home' })
  }
}

function checkAuthenticated(to, from, next) {
  const auth = useAuthStore()
  const isAuthenticated = auth.isAuthenticated

  if (!isAuthenticated) {
    next()
  } else {
    console.log('You are already logged in')
    next({ name: 'home' })
  }
}

export default router

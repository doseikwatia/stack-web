import Login from './Login.vue'
import Register from './Register.vue'
import Forgot from './Forgot.vue'

export default [
    {
        path: 'login',
        component: Login,
        name:'Login'
    },
    {
        path: 'register',
        component: Register,
        name:'RegisterUser'
    },
    {
        path: 'forgot',
        component: Forgot,
        name:'ForgotPassword'
    },
    {
        path: 'logout',
        component: Login,
        name:'Logout'
    },
]


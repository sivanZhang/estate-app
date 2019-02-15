/* 
 *
 *meta.keepAlive {Boolean}  是否缓存页面
 *meta.requireAuth {Boolean}  是否拦截登录
 *
 */

const routes = [{
        path: '/userCenter/property-list',
        name: 'PropertyList',
        component: () =>
            import ('@/views/userCenter/PropertyList'),
        meta: {
            requireAuth: true,
            keepAlive: true
        }
    },
    {
        path: '/userCenter/settings',
        name: 'Settings',
        component: () =>
            import ('@/views/userCenter/Settings'),
        meta: {
            requireAuth: true,
        }
    }, {
        path: '/userCenter/MyAccount',
        name: 'MyAccount',
        component: () =>
            import ('@/views/userCenter/MyAccount'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/Parking/ReserveParkingSpot',
        name: 'ReserveParkingSpot',
        component: () =>
            import ('@/views/Parking/ReserveParkingSpot'),
        meta: {
            requireAuth: true,
        }
    }, {
        path: '/requestDetail/:rid',
        name: 'RequestDetail',
        component: () =>
            import ('@/components/RequestDetail'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/parkingDetail/:rid',
        name: 'ParkingDetail',
        component: () =>
            import ('@/views/Parking/ParkingDetail'),
        meta: {
            requireAuth: true,
        }
    }, {
        path: '/requestList',
        name: 'RequestList',
        component: () =>
            import ('@/components/RequestList'),
        meta: {
            requireAuth: true,
        }
    }, {
        path: '/repair/request-repair',
        name: 'RequestRepair',
        component: () =>
            import ('@/views/repair/RequestRepair'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/notifications',
        name: 'Notifications',
        component: () =>
            import ('@/views/notifications/Notifications'),
        meta: {
            requireAuth: true,
        }
    }, {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('@/views/home/Home'),
        meta: {
            keepAlive: true,
            requireAuth: true,
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/views/login/Login'),
    },
    {
        path: '*',
        redirect: '/home', //匹配不到 默认跳转
    }, //没电 
    {
        path: '/login/forgot',
        name: 'Forgot',
        component: () =>
            import ('@/views/login/Forgot'),
    },
    {
        path: '/bill/bill',
        name: 'BillPay',
        component: () =>
            import ('@/views/bill/BillPay'),
    },
    {
        path: '/bill/payment',
        name: 'ConfirmPayment',
        component: () =>
            import ('@/views/bill/ConfirmPayment'),
    },
];
export {
    routes
}
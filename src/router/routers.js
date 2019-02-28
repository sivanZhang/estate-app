/* 
 *
 *meta.keepAlive {Boolean}  是否缓存页面
 * meta.requireAuth { Boolean } 是否拦截登录
 * meta.isUseCache { Boolean=false } 前进刷新后退不刷新需要在组件钩子里加代码
 */

const routes = [{
        path: '/userCenter/property-list',
        name: 'PropertyList',
        component: () => // 这个 `import` 函数会返回一个 `Promise` 对象  (懒加载组件)。
            import ('@/views/userCenter/PropertyList'),
        meta: {
            requireAuth: true,
            keepAlive: true,
        }
    },
    {
        path: '/userCenter/settings',
        name: 'Settings',
        component: () =>
            import ('@/views/userCenter/Settings'),
        meta: {
            requireAuth: true,
            keepAlive: true,
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
            import ('@/views/repair/RepairDetail'),
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
            import ('@/views/userCenter/RequestList'),
        meta: {
            requireAuth: true,
            keepAlive: true,
            isUseCache: false,
        }
    }, {
        path: '/repair/request-repair',
        name: 'RequestRepair',
        component: () =>
            import ('@/views/repair/RequestRepair'),
        meta: {
            requireAuth: true,
        }
    }, {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('@/views/home/Home'),
        meta: {
            requireAuth: true,
        }
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
    }
];
export default routes
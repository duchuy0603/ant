
export default {
    items: [
        {
            id: 'navigation',
            title: 'System slile tech',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Trang chủ',
                    type: 'item',
                    badge: {
                        title: 'New',
                        type: 'label-danger'
                    },
                    url: '/dashboard',
                    icon: 'feather icon-home',
                }
            ]
        },
        {
            id: 'category',
            title: 'Quản lý danh mục',
            type: 'group',
            icon: 'icon-group',
            children: [
        
                // {
                //     id: 'category-product',
                //     title: 'Quản Lý Loại Sản Phẩm',
                //     type: 'item',
                //     icon: 'feather icon-file-text',
                //     url: '/categories'
                // },
                {
                    id: 'properties-product',
                  
                    title: 'Quản Lý Thuộc Tính Sản Phẩm',
                    type: 'item',
                    icon: 'feather icon-edit',
                    url: '/property'
                },
                {
                    id: 'total-product',
                    title: 'Quản Lý Tính Năng Sản Phẩm',
                    type: 'item',
                    icon: 'feather icon-edit',
                    url: '/feature'
                },
                {
                    id: 'brand-product',
                    title: 'Quản  Lý Thương Hiệu',
                    type: 'item',
                    icon: 'feather icon-edit',
                    url: '/brand'
                },
                {
                    id: 'manage-product',
                    title: 'Quản Lý Sản Phẩm',
                    type: 'item',
                    icon: 'feather icon-edit',
                    url: '/product'
                },
                {
                    id: 'manage-product',
                    title: 'Quản Lý Thông Báo',
                    type: 'item',
                    icon: 'feather icon-edit',
                    url: '/notifications'
                }
            ]
        },
        {
            id: 'competition',
            title: 'Quản Đơn Hàng',
            type: 'group',
            icon: 'icon-group',
            children: [
               
                {
                    id: 'athletes-event',
                    title: 'Quản Lý Đơn Hàng',
                    type: 'item',
                    icon: 'feather icon-user-check',
                    url: ''
                },
                {
                    id: 'competition-program',
                    title: 'Quản Lý Đơn Hoàn',
                    type: 'item',
                    icon: 'feather icon-user-minus',
                    url: '/'
                }
            ]
        },
        {
            id: 'athletes',
            title: 'Quản lý Bán Hàng',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'ecommerce-address',
                    title: 'Quản Lý Địa Chỉ',
                    type: 'item',
                    url: '',
                    icon: 'feather icon-users'
                },
                {
                    id: 'ecommerce-client',
                    title: 'Quản Lý Khách Hàng',
                    type: 'item',
                    url: '',
                    icon: 'feather icon-users'
                },
                {
                    id: 'ecommerce-evaluate',
                    title: 'Quản Lý Đánh Giá',
                    type: 'item',
                    url: '',
                    icon: 'feather icon-users'
                },
                {
                    id: 'ecommerce-Marketing',
                    title: 'Quản Lý Event,Marketing',
                    type: 'item',
                    url: '/event',
                    icon: 'feather icon-users'
                },
                {
                    id: 'ecommerce-Voucher',
                    title: 'Quản Lý Voucher',
                    type: 'item',
                    url: '/voucher',
                    icon: 'feather icon-users'
                },
                {
                    id: 'ecommerce-Banner',
                    title: 'Quản Lý Banner',
                    type: 'item',
                    url: '',
                    icon: 'feather icon-users'
                },

            ]
        },
        {
            id: 'System',
            title: 'Quản lý Hệ Thống',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'accounts-list',
                    title: 'Quản Lý Người Dùng',
                    type: 'item',
                    url: '/user',
                    icon: 'feather icon-user-plus'
                },
                {
                    id: 'accounts-store',
                    title: 'Quản Lý Cửa Hàng',
                    type: 'item',
                    url: '/store',
                    icon: 'feather icon-user-plus'
                },
                {
                    id: 'accounts-group',
                    title: 'Quản Lý Hội Nhóm',
                    type: 'item',
                    url: '/team',
                    icon: 'feather icon-user-plus'
                },
                {
                    id: 'accounts-permission',
                    title: 'Quản Lý Quyền ',
                    type: 'item',
                    url: '/accounts/accounts-list',
                    icon: 'feather icon-user-plus'
                },
                {
                    id: 'accounts-menu',
                    title: 'Quản lý Menu',
                    type: 'item',
                    url: '/accounts/accounts-list',
                    icon: 'feather icon-user-plus'
                },
                {
                    id: 'accounts-page',
                    title: 'Quản Lý Trang',
                    type: 'item',
                    url: '/accounts/accounts-list',
                    icon: 'feather icon-user-plus'
                },
                {
                    id: 'accounts-new',
                    title: 'Quản Lý Tin Tức',
                    type: 'item',
                    url: '/new',
                    icon: 'feather icon-user-plus'
                },
            ]
        },
        // {
        //     id: 'news',
        //     title: 'Quản lý tin tức',
        //     type: 'group',
        //     icon: 'icon-group',
        //     children: [
        //         {
        //             id: 'new-themes',
        //             title: 'Chủ đề',
        //             type: 'item',
        //             url: '/news/new-themes',
        //             icon: 'feather icon-aperture'
        //         },
        //         {
        //             id: 'new-list',
        //             title: 'Danh sách tin',
        //             type: 'item',
        //             url: '/news/new-list',
        //             icon: 'feather icon-layout'
        //         }
        //     ]
        // },
        {
            id: 'setting',
            title: 'Cài đặt',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'introduce',
                    title: 'Giới thiệu',
                    type: 'item',
                    icon: 'feather icon-credit-card',
                    url: '/setting/introduce'
                },
                {
                    id: 'info-contact',
                    title: 'Thông tin liên hệ',
                    type: 'item',
                    icon: 'feather icon-phone-call',
                    url: '/setting/info-contact'
                },
                {
                    id: 'list-contact',
                    title: 'Danh sách liên hệ',
                    type: 'item',
                    icon: 'feather icon-list',
                    url: '/setting/list-contact'
                },
                {
                    id: 'slide',
                    title: 'Slide',
                    type: 'item',
                    icon: 'feather icon-feather',
                    url: '/setting/slide'
                },
            ]
        },
        {
            id: 'chart-maps',
            title: 'Chart & Maps',
            type: 'group',
            icon: 'icon-charts',
            children: [
                {
                    id: 'charts',
                    title: 'Charts',
                    type: 'item',
                    icon: 'feather icon-pie-chart',
                    url: '/charts/nvd3'
                },
            ]
        },
        {
            id: 'pages',
            title: 'Pages',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'auth',
                    title: 'Authentication',
                    type: 'collapse',
                    icon: 'feather icon-lock',
                    children: [
                        {
                            id: 'signup-1',
                            title: 'Đăng ký',
                            type: 'item',
                            url: '/auth/signup',
                            breadcrumbs: false
                        },
                        {
                            id: 'signin-1',
                            title: 'Đăng nhập',
                            type: 'item',
                            url: '/auth/signin',
                            breadcrumbs: false
                        }
                    ]
                },
            ]
        }
    ]
}
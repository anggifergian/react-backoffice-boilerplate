import React from 'react';

import AdminMenu from './pages/Menu';
import AdminRole from './pages/Role';
import AdminUser from './pages/User';

import UserCore from './pages/UserCoreList';
import UserCoreBank from './pages/UserCoreBank';
import UserCoreDetail from './pages/UserCoreDetail';
import UserCoreActivity from './pages/UserCoreActivity';

import VcnList from './pages/VcnList';
import VcnBalanceAdjustment from './pages/VcnBalanceAdjustment';

import Neo from './pages/Neo';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgetPassword from './pages/ForgetPassword';

export const publicRoutes = [
    { key: 'base', path: '/*', element: <Login /> },
    { key: 'login', path: '/login', element: <Login /> },
    { key: 'forget-password', path: '/forget-password', element: <ForgetPassword /> },
]

export const privateRoutes = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        element: <Dashboard />,
        sidebar: true,
    },
    {
        key: 'admin',
        label: 'Admin',
        sidebar: true,
        submenu: [
            {
                key: 'department',
                label: 'Department',
                sidebar: true,
                submenu: [
                    {
                        key: 'neo',
                        label: 'Neo',
                        path: '/admin/department/neo',
                        element: <Neo />,
                        sidebar: true,
                    },
                    {
                        key: 'payment',
                        label: 'Payment',
                        path: '/admin/department/payment',
                        element: <AdminMenu />,
                        sidebar: true,
                    }
                ]
            },
            {
                key: 'adminMenu',
                label: 'Menu',
                path: '/admin/menu',
                element: <AdminMenu />,
                sidebar: true,
            },
            {
                key: 'adminRole',
                label: 'Role',
                path: '/admin/role',
                element: <AdminRole />,
                sidebar: true,
            },
            {
                key: 'adminUser',
                label: 'User',
                path: '/admin/user',
                element: <AdminUser />,
                sidebar: true,
            }
        ]
    },
    {
        key: 'userCoreList',
        label: 'User Core',
        path: '/user-core/',
        element: <UserCore />,
        sidebar: true,
    },
    {
        key: 'userCoreActivity',
        label: 'Activity',
        path: '/user-core/activity/:id',
        element: <UserCoreActivity />,
        sidebar: false,
    },
    {
        key: 'userCoreDetail',
        label: 'Detail',
        path: '/user-core/identity/:id',
        element: <UserCoreDetail />,
        sidebar: false,
    },
    {
        key: 'userCoreBank',
        label: 'Bank',
        path: '/user-core/bank/:id',
        element: <UserCoreBank />,
        sidebar: false,
    },
    {
        key: 'vcn',
        label: 'VCN',
        sidebar: true,
        submenu: [
            {
                key: 'vcnList',
                label: 'VCN List',
                path: '/vcn/vcn-menu',
                element: <VcnList />,
                sidebar: true,
            },
            {
                key: 'vcnBalanceAdjustment',
                label: 'VCN Balance Adjustment',
                path: '/vcn/vcn-balance-adjustment',
                element: <VcnBalanceAdjustment />,
                sidebar: true,
            }
        ]
    }
]
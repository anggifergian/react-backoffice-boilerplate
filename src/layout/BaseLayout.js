import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Layout, Menu, Row } from 'antd';

import { privateRoutes } from '../routes';

const { Header, Content, Sider } = Layout;

const THEME = 'light';

function getSidebarItem(route) {
    const items = { key: route.key, label: route.label };

    if (route.submenu) {
        items['children'] = getSidebarItems(route.submenu);
    }

    return items;
}

function getSidebarItems(routes) {
    return routes.map(route => route.sidebar ? getSidebarItem(route) : null);
}

const BaseLayout = ({ children }) => {
    const navigate = useNavigate();

    console.log('render...')

    const items = [
        {
            type: 'group',
            label: 'Navigation',
            children: getSidebarItems(privateRoutes)
        }
    ];

    const findRoutes = (paths) => {
        let initialRoutes = privateRoutes;

        for (let i = 1; i < paths.length; i++) {
            const subMenuPath = paths[paths.length - i];
            const subMenus = initialRoutes.filter(routes => routes.submenu);
            const subRoutes = subMenus.find(route => route.key === subMenuPath);

            initialRoutes = subRoutes.submenu;
        }

        return initialRoutes;
    }

    const onNavigate = (routes, target) => {
        const route = routes.find(route => route.key === target);
        navigate(route.path);
    }

    const handleNavigate = (e) => {
        const { key, keyPath } = e;

        const selectedRoutes = findRoutes(keyPath);
        onNavigate(selectedRoutes, key);
    }

    return (
        <Layout style={{ height: '100vh' }}>
            <Header>
                <Row justify='space-between'>
                    <Col span={6}>Logo</Col>
                    <Col span={6}>Menu</Col>
                </Row>
            </Header>
            <Layout>
                <Sider
                    width={256}
                    theme={THEME}
                    style={{ paddingTop: 20 }}
                >
                    <Menu
                        className='kwMenuWrapper'
                        mode='inline'
                        theme={THEME}
                        items={items}
                        onClick={handleNavigate}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default BaseLayout
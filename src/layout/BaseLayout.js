import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Col, Layout, Menu, Row } from 'antd';
import { LogoutOutlined} from  '@ant-design/icons';

import { privateRoutes } from '../routes';
import useSelectedPath from '../hooks/useSelectedPath';
import { login } from '../redux/appReducer';

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
    return routes
        .map(route => route.sidebar ? getSidebarItem(route) : null)
        .filter(el => el !== null);
}

const BaseLayout = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const path = useSelectedPath();

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

    const handleLogout = () => {
        dispatch(login({ status: false }));
    }

    return (
        <Layout style={{ height: '100vh' }}>
            <Header style={{ backgroundColor: 'white', borderBottom: '2px solid #ccc', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                <Row justify='space-between'>
                    <Col span={6}>
                        <label style={{ fontWeight: '600', fontSize: 20 }}>KoinWorks</label>
                    </Col>
                    <Col span={6}>
                        <Row justify='end'>
                            <Col>
                                <Button 
                                    type='text'
                                    icon={<LogoutOutlined style={{ fontSize: 16 }} />}
                                    onClick={handleLogout}
                                />
                            </Col>
                        </Row>
                    </Col>
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
                        defaultSelectedKeys={[path.selectedKey]}
                        defaultOpenKeys={path.openedKeys}
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
                        <div style={{ paddingBottom: 10 }}>defaultSelectedKeys: <span style={{ fontStyle: 'italic' }}>{path.selectedKey}</span></div>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default BaseLayout
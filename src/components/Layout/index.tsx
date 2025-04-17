import React, { useState } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import './index.less';

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [current, setCurrent] = useState(location.pathname);

    const menuItems = [
        { key: '/introduction', label: '介绍' },
        { key: '/home', label: '首页' },
        { key: '/game-start', label: '开始游戏' },
        { key: '/data-insight', label: '数据洞察' },
        { key: '/design-show', label: '设计展示' },
        { key: '/code-design', label: '代码设计' },
        { key: '/help', label: '帮助' },
    ];

    const handleMenuClick = (e: { key: string }) => {
        setCurrent(e.key);
        navigate(e.key);
    };

    return (
        <Layout className="layout">
            <Header className="header">
                <div className="logo">
                    <img src="/logo.png" alt="logo" />
                    <span>网站名称</span>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[current]}
                    items={menuItems}
                    onClick={handleMenuClick}
                    className="menu"
                />
                <div className="user-avatar">
                    <Avatar size="large" icon={<UserOutlined />} />
                </div>
            </Header>
            <Content className="content">
                <Outlet />
            </Content>
        </Layout>
    );
};

export default MainLayout; 
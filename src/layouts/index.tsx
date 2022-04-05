import { BackTop, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { CaretUpOutlined } from '@ant-design/icons';
import { FunctionComponent, ReactNode } from 'react';
import FooterComp from './components/footer';
import HeaderComp from './components/header';
import './index.less';

interface LayoutsProps {
  children: ReactNode;
}

const Layouts: FunctionComponent<LayoutsProps> = ({ children }) => {
  return (
    <Layout className="components-layout-index">
      <HeaderComp />
      <Content className="site-layout">{children}</Content>
      <FooterComp />
      <BackTop className="back-top-btn" visibilityHeight={200}>
        <CaretUpOutlined />
      </BackTop>
    </Layout>
  );
};

export default Layouts;

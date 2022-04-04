import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
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
    </Layout>
  );
};

export default Layouts;

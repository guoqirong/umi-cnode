import { BackTop, Layout, message } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { CaretUpOutlined } from '@ant-design/icons';
import { FunctionComponent, ReactNode, useEffect } from 'react';
import FooterComp from './components/footer';
import HeaderComp from './components/header';
import './index.less';
import useHttpRequest from '@/utils/request';
import { connect, Dispatch, globalStateType } from 'umi';

interface LayoutsProps {
  token: string;
  simpleUserData: globalStateType['simpleUserData'];
  children: ReactNode;
  dispatch: Dispatch;
}

const Layouts: FunctionComponent<LayoutsProps> = ({
  token,
  simpleUserData,
  children,
  dispatch,
}) => {
  // 获取用户信息
  const { isLoading, adornUrl, httpRequest } = useHttpRequest();
  const getUserData = (loginname: string) => {
    httpRequest({
      url: adornUrl(`/api/v1/user/${loginname}`),
      method: 'get',
    })
      .then(({ data }) => {
        dispatch({
          type: 'global/updateUserData',
          payload: data.data,
        });
      })
      .catch((e) => {
        message.error('请求失败');
        console.error(e);
      });
  };

  // 加载中状态设置
  useEffect(() => {
    dispatch({
      type: 'global/updateLoading',
      payload: isLoading,
    });
  }, [isLoading]);

  // 根据登录态判断是否需要获取用户信息
  useEffect(() => {
    if (token && simpleUserData.loginname) {
      getUserData(simpleUserData.loginname);
    } else {
      dispatch({
        type: 'global/updateUserData',
        payload: {},
      });
    }
  }, [simpleUserData]);

  return (
    <Layout className="components-layout-index">
      <HeaderComp />
      <Content className="site-layout">{children}</Content>
      <FooterComp />
      <BackTop
        className="back-top-btn"
        visibilityHeight={200}
        target={() => document.getElementById('root') ?? window}
      >
        <CaretUpOutlined />
      </BackTop>
    </Layout>
  );
};

const mapState = (state: { global: globalStateType }) => {
  const { global } = state;
  return global;
};

export default connect(mapState)(Layouts);

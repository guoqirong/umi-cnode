import useEventBus from '@/utils/event-bus';
import useHttpRequest from '@/utils/request';
import { Badge } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { FunctionComponent, useEffect, useState } from 'react';
import { connect, Dispatch, globalStateType, history, Link } from 'umi';
import './index.less';

interface HeaderCompProps {
  token: string;
  dispatch: Dispatch;
}

const HeaderComp: FunctionComponent<HeaderCompProps> = (props) => {
  const { token, dispatch } = props;

  // 前往首页
  const gotIndex = () => {
    history.push('/');
  };

  // 获取未读信息数
  const [count, setCount] = useState(0);
  const { adornUrl, httpRequest } = useHttpRequest();
  const getMassageCount = () => {
    httpRequest({
      url: adornUrl(`/api/v1/message/count`),
      method: 'get',
      params: {
        accesstoken: token,
      },
    })
      .then(({ data }) => {
        setCount(data.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const [event] = useEventBus();
  useEffect(() => {
    if (token) {
      getMassageCount();
      event.on('read-msg', getMassageCount);
    }
    return () => {
      event.off('read-msg', getMassageCount);
    };
  }, [token]);

  // 退出登录
  const goLoginOut = () => {
    localStorage.clear();
    dispatch({
      type: 'global/updateToken',
      payload: '',
    });
    dispatch({
      type: 'global/updateSimpleUserData',
      payload: {},
    });
    history.push('/');
  };

  return (
    <Header className="header-wapper">
      <div className="site-header">
        <img
          className="logo"
          onClick={gotIndex}
          src={require('@/assets/images/logo.svg')}
          alt="logo"
        />
        <span className="navbar-link navbar-noright-link">
          <span>
            <Link to="/">首页</Link>
          </span>
          {token ? (
            <Badge dot={true} count={count}>
              <span>
                <Link to="/message">消息</Link>
              </span>
            </Badge>
          ) : (
            ''
          )}
          {token ? (
            <span>
              <Link to="/collect">收藏</Link>
            </span>
          ) : (
            ''
          )}
          <span>
            <a
              href="https://github.com/guoqirong/umi-cnode"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub仓库
            </a>
          </span>
          {token ? (
            <span>
              <span className="loginout-btn" onClick={goLoginOut}>
                退出
              </span>
            </span>
          ) : (
            <span>
              <Link to="/login">登录</Link>
            </span>
          )}
        </span>
      </div>
    </Header>
  );
};

const mapState = (state: { global: globalStateType }) => {
  const { global } = state;
  return global;
};

export default connect(mapState)(HeaderComp);

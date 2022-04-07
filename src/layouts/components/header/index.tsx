import { Badge } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { FunctionComponent } from 'react';
import { connect, globalStateType, history, Link } from 'umi';
import './index.less';

interface HeaderCompProps {
  token: string;
}

const HeaderComp: FunctionComponent<HeaderCompProps> = (props) => {
  const { token } = props;

  const gotIndex = () => {
    history.push('/');
  };

  const goLoginOut = () => {};

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
            <Badge dot={true} count={0}>
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
              <span onClick={goLoginOut}>退出</span>
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

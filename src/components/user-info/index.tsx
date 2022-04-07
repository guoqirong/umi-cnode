import { Avatar, Card, List } from 'antd';
import { FunctionComponent } from 'react';
import { connect, Link } from 'umi';
import { globalStateType, userDataType } from '@/models';
import './index.less';

interface UserInfoProps {
  token: string;
  isLoading: boolean;
  userInfo: userDataType;
}

const UserInfo: FunctionComponent<UserInfoProps> = ({
  token,
  isLoading,
  userInfo,
}) => {
  return (
    <>
      {token || userInfo ? (
        <Card title="" className="user-info-card" loading={isLoading}>
          <div>
            <Avatar shape="square" size="large" src={userInfo.avatar_url}>
              {userInfo.loginname}
            </Avatar>
            <span className="user-name">{userInfo.loginname}</span>
          </div>
          {userInfo.score && (
            <div className="user-score">积分：{userInfo.score || ''}</div>
          )}
        </Card>
      ) : (
        <Card title="CNode：Node.js专业中文社区" className="user-info-card">
          <span className="not-bottom">当前为游客状态，您可以 </span>
          <Link to="/login">登录</Link>
        </Card>
      )}
      {token ? (
        <Card
          title="我的主题"
          className="user-info-card no-padding-card"
          loading={isLoading}
        >
          <List
            size="small"
            locale={{ emptyText: '暂无数据' }}
            dataSource={userInfo.recent_topics}
            renderItem={(item) => <List.Item>{item.title}</List.Item>}
          />
        </Card>
      ) : (
        ''
      )}
      {token ? (
        <Card
          title="我的回复"
          className="user-info-card no-padding-card"
          loading={isLoading}
        >
          <List
            size="small"
            locale={{ emptyText: '暂无数据' }}
            dataSource={userInfo.recent_replies}
            renderItem={(item) => <List.Item>{item.title}</List.Item>}
          />
        </Card>
      ) : (
        ''
      )}
    </>
  );
};

const mapState = (state: { global: globalStateType }) => {
  const { global } = state;
  return global;
};

export default connect(mapState)(UserInfo);

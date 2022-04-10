import ClientQtCode from '@/components/client-qr-code';
import ListComp from '@/components/list';
import PageWrapper from '@/components/page-wrapper';
import UserInfo from '@/components/user-info';
import useHttpRequest from '@/utils/request';
import { Avatar, Card, message } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import { recentDataItemType, history, userDataType, useRouteMatch } from 'umi';
import './index.less';

interface UserDetailProps {}

const UserDetail: FunctionComponent<UserDetailProps> = () => {
  // 列表数据获取
  const match = useRouteMatch<{ userName: string }>();
  const { isLoading, adornUrl, httpRequest } = useHttpRequest();
  const [userData, setUserData] = useState<userDataType>();
  const getUserData = () => {
    httpRequest({
      url: adornUrl(`/api/v1/user/${match.params.userName}`),
      method: 'get',
    })
      .then(({ data }) => {
        setUserData(data.data);
      })
      .catch((e) => {
        message.error('请求失败');
        console.error(e);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  // 查看详情
  const goDetail = (data: recentDataItemType) => {
    history.push({
      pathname: '/detail',
      query: {
        id: data.id,
        userName: match.params.userName,
      },
    });
  };

  return (
    <PageWrapper
      right={
        <>
          <UserInfo isTopicsRepliesList={false} userInfo={userData} />
          <ClientQtCode />
        </>
      }
    >
      <>
        <Card title="基本信息" className="user-detail-card" loading={isLoading}>
          <div>
            <Avatar shape="square" size="large" src={userData?.avatar_url}>
              {userData?.loginname}
            </Avatar>
            <span className="user-name">{userData?.loginname}</span>
          </div>
          {userData?.score && (
            <div className="user-score">积分：{userData?.score || ''}</div>
          )}
        </Card>
        <Card
          title="我的话题"
          className="user-detail-card no-padding"
          loading={isLoading}
        >
          <ListComp
            dataList={(userData && userData.recent_topics) || []}
            isSimpleItem={true}
            onItemClick={goDetail}
          />
        </Card>
        <Card
          title="我的参与"
          className="user-detail-card no-padding is-last"
          loading={isLoading}
        >
          <ListComp
            dataList={(userData && userData.recent_replies) || []}
            isSimpleItem={true}
            onItemClick={goDetail}
          />
        </Card>
      </>
    </PageWrapper>
  );
};

export default UserDetail;

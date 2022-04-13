import ClientQtCode from '@/components/client-qr-code';
import ListComp from '@/components/list';
import { topicListItemType } from '@/components/list-item';
import PageWrapper from '@/components/page-wrapper';
import UserInfo from '@/components/user-info';
import useHttpRequest from '@/utils/request';
import { Card, message } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import { connect, globalStateType, history } from 'umi';
import './index.less';

interface CollectProps {
  simpleUserData: globalStateType['simpleUserData'];
}

const Collect: FunctionComponent<CollectProps> = ({ simpleUserData }) => {
  // 列表数据获取
  const { isLoading, adornUrl, httpRequest } = useHttpRequest();
  const [collect, setCollect] = useState<topicListItemType[]>([]);
  const getData = () => {
    if (simpleUserData && simpleUserData.loginname) {
      httpRequest({
        url: adornUrl(`/api/v1/topic_collect/${simpleUserData.loginname}`),
        method: 'get',
      })
        .then(({ data }) => {
          setCollect(data.data);
        })
        .catch((e) => {
          message.error('请求失败');
          console.error(e);
        });
    } else {
      history.push('/index');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // 查看详情
  const goDetail = (data: topicListItemType) => {
    history.push({
      pathname: '/detail',
      query: {
        id: data.id,
      },
    });
  };

  return (
    <PageWrapper
      right={
        <>
          <UserInfo />
          <ClientQtCode />
        </>
      }
    >
      <>
        <Card className="collect-card" title="我的收藏">
          <ListComp
            dataList={collect}
            listLoading={isLoading}
            onItemClick={goDetail}
          />
        </Card>
      </>
    </PageWrapper>
  );
};

const mapState = (state: { global: globalStateType }) => {
  const { global } = state;
  return global;
};

export default connect(mapState)(Collect);

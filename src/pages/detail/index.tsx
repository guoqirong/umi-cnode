import ClientQtCode from '@/components/client-qr-code';
import PageWrapper from '@/components/page-wrapper';
import UserInfo from '@/components/user-info';
import { changeLtGt, formatDate, getTopicTab } from '@/utils';
import useHttpRequest from '@/utils/request';
import { Avatar, Button, Card, message, PageHeader, Tag } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import { connect, Dispatch, globalStateType, Location, useHistory } from 'umi';
import { HeartOutlined } from '@ant-design/icons';
import './index.less';

export interface authorType {
  loginname: string;
  avatar_url: string;
}
interface topicRepliesType {
  id: string;
  author: authorType;
  content: string;
  ups: string[];
  create_at: string;
  reply_id: null;
  is_uped: boolean;
  isReplie: boolean;
  replieContent: string;
}
interface topicDetailType {
  id: string;
  author_id: string;
  tab: string;
  content: string;
  title: string;
  last_reply_at: string;
  good: boolean;
  top: boolean;
  reply_count: number;
  visit_count: number;
  create_at: string;
  author: authorType;
  replies: topicRepliesType[];
  is_collect: boolean;
}

interface DetailProps {
  token: string;
  location: Location;
  dispatch: Dispatch;
}

const Detail: FunctionComponent<DetailProps> = ({
  token,
  location,
  dispatch,
}) => {
  // 获取话题数据
  const { isLoading, adornUrl, httpRequest } = useHttpRequest();
  const [topic, setTopic] = useState<topicDetailType>();
  const getData = () => {
    httpRequest({
      url: adornUrl(`/api/v1/topic/${location.query?.id}`),
      method: 'get',
      params: {
        mdrender: true,
        accesstoken: token || undefined,
      },
    })
      .then(({ data }) => {
        data.data.content = changeLtGt(data.data.content);
        data.data.replies.forEach(
          (item: {
            content: string;
            isReplie: boolean;
            replieContent: string;
          }) => {
            item.content = changeLtGt(item.content);
            item.isReplie = false;
            item.replieContent = '';
          },
        );
        setTopic(data.data);
      })
      .catch((e: any) => {
        message.error('请求失败');
        console.error(e);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // 返回
  const history = useHistory();
  const goback = () => {
    if (location.query?.listParm) {
      dispatch({
        type: 'global/updateListParm',
        payload: location.query?.listParm,
      });
      history.push('/');
    } else if (location.query?.userName) {
      history.push(`/user/${location.query?.userName}`);
    } else {
      history.push('/collect');
    }
  };

  // 收藏和取消收藏
  const { httpRequest: collectHttpRequest } = useHttpRequest();
  const collectClick = (id?: string, isCollect?: boolean) => {
    if (isCollect) {
      topicDeCollect(id);
    } else {
      topicCollect(id);
    }
  };
  const topicCollect = (id?: string) => {
    collectHttpRequest({
      url: adornUrl(`/api/v1/topic_collect/collect`),
      method: 'post',
      data: {
        topic_id: id,
        accesstoken: token,
      },
    })
      .then(() => {
        if (topic) {
          const data = { ...topic, is_collect: true };
          setTopic(data);
        }
        message.success('收藏成功');
      })
      .catch((e) => {
        message.error('请求失败');
        console.error(e);
      });
  };
  const topicDeCollect = (id?: string) => {
    collectHttpRequest({
      url: adornUrl(`/api/v1/topic_collect/de_collect`),
      method: 'post',
      data: {
        topic_id: id,
        accesstoken: token,
      },
    })
      .then(() => {
        if (topic) {
          const data = { ...topic, is_collect: false };
          setTopic(data);
        }
        message.success('取消收藏成功');
      })
      .catch((e) => {
        message.error('请求失败');
        console.error(e);
      });
  };

  return (
    <PageWrapper
      right={
        <>
          <UserInfo userInfo={topic?.author} />
          <ClientQtCode />
        </>
      }
    >
      <>
        <Card
          size="small"
          className="detail-card"
          loading={isLoading}
          cover={
            <PageHeader
              className="site-page-header"
              onBack={goback}
              title="话题详情"
            />
          }
        >
          <div className="detail-topic-title">
            <div className="title-left">
              <div
                className="topic-title-tab"
                style={{
                  width: !topic?.top && topic?.tab === 'dev' ? '' : '40px',
                }}
              >
                <Tag color={topic?.top ? 'red' : 'green'}>
                  {getTopicTab(topic?.top, topic?.tab)}
                </Tag>
              </div>
              <div
                className="title-name"
                style={{
                  width:
                    !topic?.top && topic?.tab === 'dev'
                      ? ''
                      : 'calc(100% - 50px)',
                }}
              >
                {topic?.title}
              </div>
              <div className="topic-title-desc">
                {'● ' +
                  formatDate(topic?.create_at || '', 'yyyy-MM-dd') +
                  ' ● ' +
                  (topic?.author && topic?.author.loginname
                    ? topic?.author.loginname
                    : '')}
              </div>
            </div>
            <div className="title-right">
              {token && (
                <Button
                  shape="circle"
                  icon={<HeartOutlined />}
                  type={topic?.is_collect ? 'primary' : undefined}
                  onClick={() => collectClick(topic?.id, topic?.is_collect)}
                />
              )}
            </div>
          </div>
          <div
            className="topic-content"
            dangerouslySetInnerHTML={{ __html: topic?.content ?? '' }}
          ></div>
        </Card>
        {topic?.replies && topic?.replies.length > 0 ? (
          <Card className="replie-card" loading={isLoading} title="回复">
            {topic?.replies.map((item, i) => {
              return (
                <div className="replie-item" key={i}>
                  <div className="replie-user-img">
                    <Avatar src={item.author.avatar_url} shape="square">
                      {item.author.loginname}
                    </Avatar>
                  </div>
                  <div className="replie-title">
                    {item.author.loginname + '回复了您的话题'}
                  </div>
                  <div className="replie-desc">
                    {formatDate(item.create_at, 'yyyy-MM-dd')}
                  </div>
                  <div
                    className="replie-content"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></div>
                </div>
              );
            })}
          </Card>
        ) : (
          ''
        )}
      </>
    </PageWrapper>
  );
};

const mapState = (state: { global: globalStateType }) => {
  const { global } = state;
  return global;
};

export default connect(mapState)(Detail);

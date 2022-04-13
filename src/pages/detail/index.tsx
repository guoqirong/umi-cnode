import ClientQtCode from '@/components/client-qr-code';
import PageWrapper from '@/components/page-wrapper';
import UserInfo from '@/components/user-info';
import { changeLtGt, formatDate, getTopicTab } from '@/utils';
import useHttpRequest from '@/utils/request';
import {
  Avatar,
  Button,
  Card,
  Form,
  FormInstance,
  message,
  PageHeader,
  Tag,
} from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import { connect, Dispatch, globalStateType, Location, history } from 'umi';
import { HeartOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
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
  simpleUserData: globalStateType['simpleUserData'];
  location: Location;
  dispatch: Dispatch;
}

const Detail: FunctionComponent<DetailProps> = ({
  token,
  simpleUserData,
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

  // 修改话题
  const editTopic = () => {
    history.push({
      pathname: `/edit-topic/${location.query?.id}`,
      query: {
        listParm: location.query?.listParm ?? '',
      },
    });
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

  // 为评论点赞和取消点赞
  const { httpRequest: likeHttpRequest } = useHttpRequest();
  const likeAndUnlike = (id: string) => {
    likeHttpRequest({
      url: adornUrl(`/api/v1/reply/${id}/ups`),
      method: 'post',
      data: {
        accesstoken: localStorage.getItem('token') || '',
      },
    })
      .then(({ data }) => {
        if (data.action === 'up') {
          message.success('点赞成功');
        } else {
          message.success('取消点赞成功');
        }
        getData();
      })
      .catch((e) => {
        const { data } = e.response;
        if (data.error_msg) {
          message.error(data.error_msg);
          return;
        }
        message.error('请求失败');
        console.error(e);
      });
  };

  // 富文本初始配置项
  const init = {
    height: 200, //富文本高度
    width: '100%', //富文本宽度
    // language_url: './tinymce-langs/zh_CN.js', //中文包
    language: 'zh_CN', //中文
    browser_spellcheck: true, // 拼写检查
    branding: false, // 去水印
    elementpath: true, //禁用编辑器底部的状态栏
    statusbar: true, // 隐藏编辑器底部的状态栏
    paste_data_images: true, // 是否允许粘贴图像
    menubar: false, // 隐藏最上方menu
    fontsize_formats: '14px 16px 18px 20px 24px 26px 28px 30px 32px 36px', //字体大小
    font_formats:
      '微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times', //字体
    file_picker_types: 'image',
    images_upload_credentials: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount',
    ],
    toolbar:
      'fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen',
  };

  // 回复话题
  const [form] = Form.useForm();
  const replieForms: { [key: string]: FormInstance<any> | null } = {};
  const { httpRequest: replieHttpRequest } = useHttpRequest();
  const replieTopicRequest = (values: {
    content: string;
    reply_id: string;
  }) => {
    replieHttpRequest({
      url: adornUrl(`/api/v1/topic/${topic?.id}/replies`),
      method: 'post',
      data: {
        accesstoken: localStorage.getItem('token') || '',
        content: values.content,
        reply_id: values.reply_id,
      },
    })
      .then(() => {
        form.setFieldsValue({
          content: '',
        });
        getData();
      })
      .catch((e) => {
        message.error('请求失败');
        console.error(e);
      });
  };

  // 展开、关闭回复消息
  const changeRepliceItemState = (i: number) => {
    if (topic) {
      const replies = topic?.replies;
      const userName = replies[i].author.loginname;
      replies[i].isReplie = !replies[i].isReplie;
      replies[i].replieContent = replies[i].isReplie
        ? `<div class="markdown-text"><p><a href="/user/${userName}">@${userName}</a>&nbsp;</p></div>`
        : '';
      setTopic({
        ...topic,
        replies: replies,
      });
    }
  };

  // 回复消息
  const replieData = (i: number, values: any) => {
    replieTopicRequest({
      content: values['replieContent' + i],
      reply_id: topic?.replies[i].id ?? '',
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
            <>
              <PageHeader
                className="site-page-header"
                onBack={goback}
                title="话题详情"
              />
              {simpleUserData.loginname === topic?.author.loginname && (
                <Button
                  className="site-page-header-btn"
                  type="primary"
                  onClick={editTopic}
                >
                  编辑话题
                </Button>
              )}
            </>
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
                  <div
                    className="replie-up"
                    onClick={() => likeAndUnlike(item.id)}
                  >
                    <div className="icon up-icon"></div>
                    {!!item.ups.length && <span>{item.ups.length}</span>}
                  </div>
                  <div
                    className="icon replie-icon"
                    onClick={() => changeRepliceItemState(i)}
                  ></div>
                  <div className="replie-desc">
                    {formatDate(item.create_at, 'yyyy-MM-dd')}
                  </div>
                  <div
                    className="replie-content"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></div>
                  {item.isReplie && (
                    <Form
                      ref={(el) => (replieForms['replieForm' + i] = el)}
                      className="replie-form"
                      layout="vertical"
                      wrapperCol={{ offset: 0, span: 24 }}
                      onFinish={(v) => replieData(i, v)}
                    >
                      <Form.Item
                        name={'replieContent' + i}
                        label=""
                        getValueFromEvent={() => {
                          return replieForms['replieForm' + i]?.getFieldValue(
                            'replieContent' + i,
                          );
                        }}
                        getValueProps={(value) => {
                          return value;
                        }}
                        rules={[
                          {
                            required: true,
                            message: '请输入内容',
                          },
                        ]}
                      >
                        <Editor
                          api-key="mh2f2ffdlr2zzaky3yk52tx8rtxrxnbt1a6p7p7jx96hy70r"
                          id={'replie' + i}
                          init={init}
                          initialValue={item.replieContent}
                          value={replieForms['replieForm' + i]?.getFieldValue(
                            'replieContent' + i,
                          )}
                          onEditorChange={(v) => {
                            replieForms['replieForm' + i]?.setFieldsValue({
                              ['replieContent' + i]: v,
                            });
                          }}
                        ></Editor>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          // loading={IsSubmitLoading}
                          className="is-submit-btn"
                          type="primary"
                          htmlType="submit"
                        >
                          回复
                        </Button>
                        <Button
                          // loading={IsSubmitLoading}
                          onClick={() => changeRepliceItemState(i)}
                        >
                          取消
                        </Button>
                      </Form.Item>
                    </Form>
                  )}
                </div>
              );
            })}
          </Card>
        ) : (
          ''
        )}
        <Card className="add-replie-card" loading={isLoading} title="添加回复">
          <Form
            className="replie-form"
            layout="vertical"
            wrapperCol={{ offset: 0, span: 24 }}
            form={form}
            onFinish={replieTopicRequest}
          >
            <Form.Item
              name="content"
              label=""
              getValueFromEvent={() => {
                return form.getFieldValue('content') ?? '';
              }}
              getValueProps={(value) => {
                return value ?? '';
              }}
              rules={[
                {
                  required: true,
                  message: '请输入内容',
                },
              ]}
            >
              {topic && (
                <Editor
                  api-key="mh2f2ffdlr2zzaky3yk52tx8rtxrxnbt1a6p7p7jx96hy70r"
                  init={init}
                  value={form.getFieldValue('content')}
                  onEditorChange={(v) => {
                    form.setFieldsValue({
                      content: v,
                    });
                  }}
                ></Editor>
              )}
            </Form.Item>
            <Form.Item className="is-last-item">
              <Button
                // loading={IsSubmitLoading}
                type="primary"
                htmlType="submit"
              >
                回复
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </>
    </PageWrapper>
  );
};

const mapState = (state: { global: globalStateType }) => {
  const { global } = state;
  return global;
};

export default connect(mapState)(Detail);

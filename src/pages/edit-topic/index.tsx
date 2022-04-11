import ClientQtCode from '@/components/client-qr-code';
import PageWrapper from '@/components/page-wrapper';
import UserInfo from '@/components/user-info';
import { topicTypeList } from '@/constant';
import { Button, Card, Form, Input, PageHeader, Select } from 'antd';
import { FunctionComponent, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './index.less';

interface EditTopicProps {}

const EditTopic: FunctionComponent<EditTopicProps> = () => {
  // 富文本初始配置项
  const init = {
    height: 500, //富文本高度
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

  const goback = () => {};

  const [content, setContent] = useState('');
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <PageWrapper
      right={
        <>
          <UserInfo isTopicsRepliesList={false} />
          <ClientQtCode />
        </>
      }
    >
      <Card
        size="small"
        className="edit-card"
        // loading={isLoading}
        cover={
          <PageHeader
            className="site-page-header"
            onBack={goback}
            title="发布话题"
          />
        }
      >
        <Form
          className="edit-topic-form"
          layout="vertical"
          wrapperCol={{ offset: 0, span: 24 }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="tab"
            label="版块"
            rules={[
              {
                required: true,
                message: '请选择版块',
                type: 'string',
              },
            ]}
          >
            <Select style={{ width: 214 }}>
              {topicTypeList
                .filter((item) => !['all', 'good'].includes(item.key))
                .map((opt) => {
                  return (
                    <Select.Option value={opt.key} key={opt.key}>
                      {opt.name}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item
            name="title"
            label="标题"
            rules={[
              {
                required: true,
                message: '请输入标题',
                type: 'string',
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="content"
            label="内容"
            getValueFromEvent={(args) => {
              console.log(args, form);
              return;
              // setContent(args.lastLevel?.content ?? args.level?.content);
              // form.setFieldsValue({
              //   content: args.lastLevel?.content ?? args.level?.content,
              // });
            }}
            // validateStatus={!content ? "error" : undefined}
            // help="请输入内容"
            rules={[
              {
                required: true,
                message: '请输入内容',
              },
            ]}
          >
            <Editor
              api-key="mh2f2ffdlr2zzaky3yk52tx8rtxrxnbt1a6p7p7jx96hy70r"
              init={init}
              value={content}
              onEditorChange={(v) => {
                setContent(v);
                form.setFieldsValue({
                  content: v,
                });
                return false;
              }}
            ></Editor>
          </Form.Item>
          <Form.Item className="is-last-item">
            <Button
              // loading={isLoading}
              type="primary"
              htmlType="submit"
            >
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageWrapper>
  );
};

export default EditTopic;

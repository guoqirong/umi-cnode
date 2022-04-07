import useHttpRequest from '@/utils/request';
import { Button, Card, Form, Input } from 'antd';
import { FunctionComponent } from 'react';
import { useHistory } from 'umi';

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const { isLoading, adornUrl, httpRequest } = useHttpRequest();
  const history = useHistory();

  // 表单提交
  const onFinish = (values: any) => {
    console.log(values);
  };

  // 取消离开登录页面
  const onCancel = () => {
    history.go(-1);
  };

  return (
    <Card title="token 登录" style={{ height: 'calc(100vh - 50px - 120px)' }}>
      <Form
        wrapperCol={{ offset: 0, span: 24 }}
        onFinish={onFinish}
        style={{ width: '50%', margin: '0 auto' }}
      >
        <Form.Item
          name="token"
          label=""
          rules={[
            {
              required: true,
              message: '请输入token校验',
              type: 'string',
            },
          ]}
        >
          <Input placeholder="accesstoken 登录校验" />
        </Form.Item>
        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
          >
            登录
          </Button>
          <Button
            loading={isLoading}
            style={{ width: '100%' }}
            onClick={onCancel}
          >
            取消
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;

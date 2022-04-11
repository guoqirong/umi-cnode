import { ConfigProvider } from 'antd';
import { FunctionComponent } from 'react';
import zhCN from 'antd/lib/locale/zh_CN';

const ConfigProviderWrapper: FunctionComponent = ({ children }) => {
  return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;
};

export default ConfigProviderWrapper;

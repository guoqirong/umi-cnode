import ClientQtCode from '@/components/client-qr-code';
import PageWrapper from '@/components/page-wrapper';
import UserInfo from '@/components/user-info';
import { Card, PageHeader } from 'antd';
import { FunctionComponent } from 'react';

interface DetailProps {}

const Detail: FunctionComponent<DetailProps> = () => {
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
        <Card
          size="small"
          className="detail-card"
          cover={
            <PageHeader
              className="site-page-header"
              onBack={() => {}}
              title="话题详情"
            />
          }
        ></Card>
      </>
    </PageWrapper>
  );
};

export default Detail;

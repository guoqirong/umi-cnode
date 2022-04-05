import { FunctionComponent, ReactNode } from 'react';
import ListItem, { topicListItemType } from '@/components/list-item';
import { List } from 'antd';

interface ListCompProps {
  dataList: topicListItemType[];
  listLoading: boolean;
  onItemClick: Function;
  footer?: ReactNode;
}

const ListComp: FunctionComponent<ListCompProps> = ({
  dataList,
  listLoading,
  footer,
  onItemClick,
}) => {
  return (
    <List
      size="small"
      style={{ width: '100%' }}
      locale={{ emptyText: '暂无数据' }}
      dataSource={dataList}
      loading={listLoading}
      footer={footer}
      renderItem={(item) => (
        <ListItem topicItem={item} onItemClick={onItemClick}></ListItem>
      )}
    ></List>
  );
};

export default ListComp;

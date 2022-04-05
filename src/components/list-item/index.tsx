import { formatDate, getTopicTab } from '@/utils';
import { Avatar, List, Tag } from 'antd';
import { FunctionComponent } from 'react';
import './index.less';

export interface topicListItemType {
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
  author: {
    loginname: string;
    avatar_url: string;
  };
}

interface ListItemProps {
  topicItem: topicListItemType;
  onItemClick: Function;
}

const ListItem: FunctionComponent<ListItemProps> = ({
  topicItem,
  onItemClick,
}) => {
  return (
    <List.Item
      key={topicItem.title}
      className="item-body"
      style={{ width: '100%' }}
      onClick={() => onItemClick(topicItem)}
    >
      <List.Item.Meta
        avatar={
          <Avatar src={topicItem.author.avatar_url} shape="square">
            {topicItem.author.loginname}
          </Avatar>
        }
        title={
          <div>
            <div className="reply-count">
              <span className="count-of-replies" title="回复数">
                {topicItem.reply_count}
              </span>
              <span>/</span>
              <span className="count-of-visits" title="点击数">
                {topicItem.visit_count}
              </span>
            </div>
            <div
              className="topic-tab"
              style={{
                width: !topicItem.top && topicItem.tab === 'dev' ? '' : '50px',
              }}
            >
              <Tag color={topicItem.top ? 'red' : 'green'}>
                {getTopicTab(topicItem.top, topicItem.tab)}
              </Tag>
            </div>
            <div
              className="topic-title"
              title="item.title"
              style={{
                width:
                  !topicItem.top && topicItem.tab === 'dev'
                    ? ''
                    : 'calc(100% - 60px - 50px - 90px)',
              }}
            >
              {topicItem.title}
            </div>
            <div className="created-time">
              {formatDate(topicItem.create_at, 'yyyy-MM-dd')}
            </div>
          </div>
        }
      ></List.Item.Meta>
    </List.Item>
  );
};

export default ListItem;

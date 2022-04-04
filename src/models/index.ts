import { getLocalStorage } from '@/utils';

export interface userStateType {
  token: string;
  simpleUserData: simpleUserDataType;
  userData: userDataType;
  isLoading: boolean;
}

interface simpleUserDataType {
  id: string;
  loginname: string;
  avatar_url: string;
}

export interface userDataType {
  avatar_url: string;
  create_at: string;
  githubUsername: string;
  loginname: string;
  recent_replies: recentDataItemType[];
  recent_topics: recentDataItemType[];
  score: number;
}

interface recentDataItemType {
  author: {
    avatar_url: string;
    loginname: string;
  };
  id: string;
  last_reply_at: string;
  title: string;
}

export default {
  namespace: 'global',
  state: {
    token: getLocalStorage('token'),
    simpleUserData: {},
    userData: {},
    isLoading: false,
  },
  reducers: {
    updateToken(state: userStateType, { payload }: { payload: string }) {
      return {
        ...state,
        token: payload,
      };
    },
    updateSimpleUserData(
      state: userStateType,
      { payload }: { payload: simpleUserDataType },
    ) {
      return {
        ...state,
        simpleUserData: payload,
      };
    },
    updateUserData(
      state: userStateType,
      { payload }: { payload: userDataType },
    ) {
      return {
        ...state,
        userData: payload,
      };
    },
    updateLoading(state: userStateType, { payload }: { payload: boolean }) {
      return {
        ...state,
        isLoading: payload,
      };
    },
  },
};

import { getLocalStorage } from '@/utils';

export interface globalStateType {
  token: string;
  simpleUserData: simpleUserDataType;
  userData: userDataType;
  isLoading: boolean;
  listParm: string;
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
    simpleUserData: {
      loginname: getLocalStorage('loginname'),
    },
    userData: {},
    isLoading: false,
    listParm: '',
  },
  reducers: {
    updateToken(state: globalStateType, { payload }: { payload: string }) {
      return {
        ...state,
        token: payload,
      };
    },
    updateSimpleUserData(
      state: globalStateType,
      { payload }: { payload: simpleUserDataType },
    ) {
      return {
        ...state,
        simpleUserData: payload,
      };
    },
    updateUserData(
      state: globalStateType,
      { payload }: { payload: userDataType },
    ) {
      return {
        ...state,
        userData: payload,
      };
    },
    updateLoading(state: globalStateType, { payload }: { payload: boolean }) {
      return {
        ...state,
        isLoading: payload,
      };
    },
    updateListParm(state: globalStateType, { payload }: { payload: string }) {
      return {
        ...state,
        listParm: payload,
      };
    },
  },
};

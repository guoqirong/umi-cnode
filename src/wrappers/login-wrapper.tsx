import { Fragment, FunctionComponent } from 'react';
import { connect, Redirect } from 'umi';
import { userStateType } from '@/models';

interface LoginWrapperProps {
  isLogin: boolean;
}

const LoginWrapper: FunctionComponent<LoginWrapperProps> = (props) => {
  const { isLogin, children } = props;
  if (isLogin) {
    return <Fragment>{children}</Fragment>;
  }
  return <Redirect to="/login" />;
};

const mapStateToProps = (state: { global: userStateType }) => {
  const { global } = state;
  return {
    isLogin: !!global.token,
  };
};

export default connect(mapStateToProps)(LoginWrapper);

import { FunctionComponent } from 'react';
import { useHistory, useRouteMatch } from 'umi';

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = (prop) => {
  const history = useHistory();
  const match = useRouteMatch();
  console.log(history, prop, match);

  return <div>userdetail</div>;
};

export default Login;

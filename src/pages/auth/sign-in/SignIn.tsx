import { Navigate, useSearchParams } from 'react-router-dom';

function SignIn(): JSX.Element {
  const [params] = useSearchParams();
  let to = params.get('to');
  return <Navigate to={to ? to : '/'} />;
}

export default SignIn;

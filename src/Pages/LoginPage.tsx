import { useAppDispatch } from "../app/hooks";
import { kakaoLoginAsync } from "../features/counter/loginSlice";

function LoginPage() {
  const dispatch = useAppDispatch();

  return (
    <button onClick={() => dispatch(kakaoLoginAsync())}>kakao Login</button>
  );
}

export default LoginPage;

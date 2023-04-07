import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FeedPage() {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    if (code && code.length > 1) navigate("/login/oauth");
  });

  return (
    <button
      onClick={() => {
        navigate("/login");
      }}
    >
      login
    </button>
  );
}

export default FeedPage;

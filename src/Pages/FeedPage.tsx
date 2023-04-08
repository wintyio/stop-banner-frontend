import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../Components/TopBar";
import { theme } from "../style/theme";

function FeedPage() {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    if (code && code.length > 1) navigate("/login/oauth");
  });

  return (
    <theme.style.page>
      <TopBar selectedPageName="피드" />
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        login
      </button>
    </theme.style.page>
  );
}

export default FeedPage;

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../style/theme";
import { useAppSelector } from "../app/hooks";
import { selectLoginStatus } from "../features/counter/loginSlice";
import logo from "../img/logo192.png";

const ContentDiv = styled.div`
  margin-top: 17px;
  margin-bottom: 32px;
`;

interface ButtonProps {
  selected?: boolean;
}

const Button = styled.span`
  margin-right: 24px;
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 4px;
  border-bottom: ${(props: ButtonProps) =>
    props.selected ? "2px solid #1e1e20" : ""};
  color: ${(props: ButtonProps) =>
    props.selected ? theme.color.black : theme.color.gray2};
  cursor: pointer;
`;

interface TopMenuBarProps {
  selectedPageName: string;
}

export default function TopMenuBar(props: TopMenuBarProps) {
  const navigate = useNavigate();

  const loginStatus = useAppSelector(selectLoginStatus);

  const checkLogin = function () {
    console.log(loginStatus);

    let check = loginStatus === "logged in";
    console.log(check);

    return check;
  };

  return (
    <ContentDiv>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <img src={logo} width={20} style={{ marginLeft: 0, marginBottom: 5 }} />
        <div
          id="logo-text"
          style={{
            display: "inline",
            marginBottom: 1,
            marginLeft: 5,
            fontWeight: "bold",
          }}
        >
          현수막 헌터
        </div>
      </div>

      <div>
        <Button
          onClick={() => navigate("/")}
          selected={props.selectedPageName === "피드"}
        >
          피드
        </Button>

        <Button
          onClick={() => navigate("/statistic")}
          selected={props.selectedPageName === "통계"}
        >
          통계
        </Button>

        <Button
          onClick={() => navigate("/rank")}
          selected={props.selectedPageName === "랭킹"}
        >
          랭킹
        </Button>

        <Button
          onClick={() => {
            if (checkLogin()) navigate("/report/banner");
            else {
              window.localStorage.setItem("targetPath", "/report/banner");
              navigate("/login");
            }
          }}
          selected={props.selectedPageName === "제보하기"}
        >
          제보하기
        </Button>

        <Button
          onClick={() => {
            if (checkLogin()) navigate("/my");
            else {
              window.localStorage.setItem("targetPath", "/my");
              navigate("/login");
            }
          }}
          selected={props.selectedPageName === "MY"}
        >
          MY
        </Button>
      </div>
    </ContentDiv>
  );
}

import styled from "styled-components";
import { theme } from "../style/theme";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import TopMenuBar from "../Components/TopMenuBar";
import { logout } from "../features/counter/loginSlice";

const MenuDiv = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 10px;
  border-bottom: 1px solid ${theme.color.gray2};
  cursor: pointer;
`;

const MenuGap = styled(MenuDiv)`
  padding: 1px;
`;

const Footer = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin-top: 200px;
  font-size: 12px;
  line-height: 20px;
  color: ${theme.color.gray1};
`;

export default function MyPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <theme.style.page>
      <TopMenuBar selectedPageName="MY" />

      <theme.style.subTitle>마이 페이지</theme.style.subTitle>

      {/* 닉네임 설정 */}
      <MenuDiv
        style={{ borderTop: `1px solid ${theme.color.gray2}` }}
        onClick={() => navigate("/edit/nickname")}
      >
        닉네임 설정
      </MenuDiv>

      <MenuGap />

      {/* 서비스 소개 */}
      <MenuDiv onClick={() => navigate("/intro")}>
        서비스 소개{" "}
        <span style={{ fontSize: 12, color: theme.color.gray1 }}>
          (우리가 현수막 헌터를 시작한 이유)
        </span>
      </MenuDiv>

      {/* 서비스 이용약관 */}
      <MenuDiv
        onClick={() => {
          window.location.href =
            "https://pickple.notion.site/pickple/81e6dadc82514735a8b64309229e39bd";
        }}
      >
        서비스 이용약관
      </MenuDiv>

      {/* 문의 */}
      <a
        href="mailto:admin@winty.io?
      &amp;subject=현수막 헌터 문의
      &amp;body=문의 내용:"
      >
        <MenuDiv>문의</MenuDiv>
      </a>

      <MenuGap />

      {/* 로그아웃 */}
      <MenuDiv
        onClick={() => {
          dispatch(logout());
          navigate("/");
        }}
      >
        로그아웃
      </MenuDiv>

      <Footer>
        © 2023 현수막 헌터, winty
        <br />
        e-mail. admin@winty.io
      </Footer>
    </theme.style.page>
  );
}

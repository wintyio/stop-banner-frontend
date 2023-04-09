import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../style/theme";
import { useAppSelector } from "../app/hooks";
import { selectLoginStatus } from "../features/counter/loginSlice";
import { BsChevronLeft } from "react-icons/bs";

const ContentDiv = styled.div`
  position: relative;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 40px;
  padding: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;

const backButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: 0,
  transform: "translate(0, -50%)",
};

interface TopTitleBarProps {
  titleName: string;
}

export default function TopTitleBar(props: TopTitleBarProps) {
  const navigate = useNavigate();

  return (
    <ContentDiv>
      <BsChevronLeft
        onClick={() => navigate(-1)}
        style={{ ...backButtonStyle }}
      />
      <span>{props.titleName}</span>
    </ContentDiv>
  );
}

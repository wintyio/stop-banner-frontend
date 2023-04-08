import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../style/theme";

const ContentDiv = styled.div`
  margin-top: 44px;
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

interface TopBarProps {
  selectedPageName: string;
}

export default function TopBar(props: TopBarProps) {
  const navigate = useNavigate();

  return (
    <ContentDiv>
      <Button
        onClick={() => navigate("/")}
        selected={props.selectedPageName == "피드"}
      >
        피드
      </Button>
      <Button
        onClick={() => navigate("/")}
        selected={props.selectedPageName == "통계"}
      >
        통계
      </Button>
      <Button
        onClick={() => navigate("/report")}
        selected={props.selectedPageName == "제보하기"}
      >
        제보하기
      </Button>
      <Button
        onClick={() => navigate("/edit/nickname")}
        selected={props.selectedPageName == "MY"}
      >
        MY
      </Button>
    </ContentDiv>
  );
}

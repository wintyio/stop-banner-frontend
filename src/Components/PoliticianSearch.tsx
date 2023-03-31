import { text } from "stream/consumers";
import styled from "styled-components";
import { theme } from "../style/theme";

const Input = styled(theme.style.input)`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 4px;
  border-bottom: 1px solid #787878;
`;

export function PoliticianSearch() {
  return <Input placeholder="인물의 이름을 입력하세요" />;
}

import styled from "styled-components";
import { theme } from "../style/theme";

const Button = styled(theme.style.button)`
  flex: 1;
  padding: 13px;
  border-radius: 4px;

  font-size: 16px;
  text-align: center;
  color: ${theme.color.white};

  background-color: ${theme.color.black};
`;

export function ConfirmButton() {
  return <Button>올리기</Button>;
}

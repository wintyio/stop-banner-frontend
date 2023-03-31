import styled from "styled-components";
import { theme } from "../style/theme";

interface PartyInfo {
  name: string;
  img_uri: string;
}

const Button = styled(theme.style.button)`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 100px;
  padding: 12px;

  font-size: 18px;

  border: 1px solid #818181;
  border-radius: 8px;
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

export function PartyButton(props: PartyInfo) {
  return (
    <Button>
      <Img src={props.img_uri} alt="" />
      <span>{props.name}</span>
    </Button>
  );
}

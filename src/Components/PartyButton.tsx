import styled from "styled-components";

interface PartyInfo {
  name: string;
  img_uri: string;
}

const Button = styled.button``;
const Img = styled.img`
  width: 30px;
`;

export function PartyButton(props: PartyInfo) {
  return (
    <Button>
      <Img src={props.img_uri} alt="" /> {props.name}
    </Button>
  );
}

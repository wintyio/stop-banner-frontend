import styled from "styled-components";
import { theme } from "../style/theme";
import Party from "../classes/Party";
import { useAppDispatch } from "../app/hooks";
import { setPartyIndex } from "../features/counter/reportBannerSlice";

interface PartyInfo {
  party: Party;
  // imgUri: string;
  selected: boolean;
}

const Button = styled(theme.style.button)`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 100px;
  padding: 12px;

  font-size: 18px;

  ${theme.style.defaultBorder}
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

export function PartyButton(props: PartyInfo) {
  const dispatch = useAppDispatch();

  return (
    <Button
      style={
        props.selected
          ? {
              borderColor: props.party.firstColor,
              borderWidth: 2,
              color: props.party.firstColor,
              fontWeight: 600,
              backgroundColor: props.party.secondColor,
            }
          : {}
      }
      onClick={() => dispatch(setPartyIndex(props.party.index))}
    >
      {props.party.imgUri && <Img src={props.party.imgUri} alt="" />}
      <span>{props.party.name}</span>
    </Button>
  );
}

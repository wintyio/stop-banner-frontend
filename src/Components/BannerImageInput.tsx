import styled from "styled-components";

const Button = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  justify-content: center;
  align-items: center;

  /* height: 160px; */
  aspect-ratio: 320/160;

  font-size: 14px;

  border: 1px solid #bcbcbc;
  border-radius: 8px;
`;

const Input = styled.input`
  display: none;
`;

export function BannerImageInput() {
  return (
    <label htmlFor="banner_image_input">
      <Button>
        <div style={{ fontSize: 40 }}>+</div>
        <div>사진 추가하기</div>
      </Button>
      <Input
        id="banner_image_input"
        type="file"
        accept="image/png, image/gif, image/jpeg"
      />
    </label>
  );
}

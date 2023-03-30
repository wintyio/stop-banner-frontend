import styled from "styled-components";

const Input = styled.input``;

export function BannerImageInput() {
  return (
    <Input
      id="banner_image_input"
      type="file"
      accept="image/png, image/gif, image/jpeg"
    />
  );
}

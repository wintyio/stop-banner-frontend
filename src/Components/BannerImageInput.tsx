import { useState } from "react";
import styled from "styled-components";
import { isString } from "util";

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

const ImageViewer = styled.img`
  width: 100%;
  box-sizing: border-box;

  border: 1px solid #bcbcbc;
  border-radius: 8px;
`;

const Input = styled.input`
  display: none;
`;

export function BannerImageInput() {
  const [img, setImg] = useState("");

  return (
    <div>
      {!img && (
        <label htmlFor="banner_image_input">
          <Button>
            <div style={{ fontSize: 40 }}>+</div>
            <div>사진 추가하기</div>
          </Button>
        </label>
      )}

      {img && (
        <label
          htmlFor="banner_image_input"
          onClick={(event) => {
            if (!window.confirm("사진을 변경하시겠습니까?"))
              event.preventDefault();
          }}
        >
          <ImageViewer src={img} />
        </label>
      )}

      <Input
        id="banner_image_input"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        onChange={(event) => {
          let file = event.target.files;
          if (!file || file.length == 0) return;

          let reader = new FileReader();
          reader.readAsDataURL(file[0]);
          reader.onload = () => {
            if (isString(reader.result)) setImg(reader.result);
          };
        }}
      />
    </div>
  );
}

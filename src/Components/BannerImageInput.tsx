import styled from "styled-components";
import { isString } from "util";
import { theme } from "../style/theme";
import exifr from "exifr";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectImage,
  setImage,
  setImageSrc,
  setLocation,
} from "../features/counter/reportBannerSlice";

const Button = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  justify-content: center;
  align-items: center;

  /* height: 160px; */
  aspect-ratio: 320/160;

  font-size: 14px;

  ${theme.style.defaultBorder}
`;

const ImageViewer = styled.img`
  width: 100%;
  box-sizing: border-box;

  ${theme.style.defaultBorder}
`;

const Input = styled.input`
  display: none;
`;

export function BannerImageInput() {
  const dispatch = useAppDispatch();
  const image = useAppSelector(selectImage);

  return (
    <div>
      {!image && (
        <label htmlFor="banner_image_input">
          <Button>
            <div style={{ fontSize: 40 }}>+</div>
            <div>사진 추가하기</div>
          </Button>
        </label>
      )}

      {image && (
        <label
          htmlFor="banner_image_input"
          onClick={(event) => {
            if (!window.confirm("사진을 변경하시겠습니까?"))
              event.preventDefault();
          }}
          onDoubleClick={(event) => {
            if (!window.confirm("사진을 변경하시겠습니까?"))
              event.preventDefault();
          }}
        >
          <ImageViewer src={image} />
        </label>
      )}

      <Input
        id="banner_image_input"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        onChange={async (event) => {
          let file = event.target.files;
          if (!file || file.length === 0) return;

          let url = URL.createObjectURL(file[0]).toString();
          dispatch(setImageSrc(url));

          let reader = new FileReader();
          reader.readAsDataURL(file[0]);
          reader.onload = async () => {
            window.Kakao = reader.result;
            if (isString(reader.result)) dispatch(setImage(reader.result));

            try {
              let result = reader.result as ArrayBuffer;
              let { latitude, longitude } = await exifr.gps(result);
              dispatch(setLocation([latitude, longitude]));
            } catch {}
          };
        }}
      />
    </div>
  );
}

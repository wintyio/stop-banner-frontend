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

// 허용 이미지 확장자
const acceptedImageTypes = [
  "image/gif",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

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
          let files = event.target.files;

          // 파일 개수 검사
          if (!files || files.length === 0) return;

          let file = files[0];

          // 확장자 검사
          if (!acceptedImageTypes.includes(file.type)) {
            window.confirm("지원하는 이미지 형식이 아닙니다!");
            return;
          }

          let url = URL.createObjectURL(file).toString();
          dispatch(setImageSrc(url));

          let reader = new FileReader();
          reader.readAsDataURL(file);
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

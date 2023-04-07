import styled from "styled-components";

export const theme = {
    color: {
        white: "#FFFFFF",
        black: "#1E1E20",
        gray1: "#8E8E95",
        gray2: "#C3C3C7",
    },
    style: {
        button: styled.div`
            cursor: pointer;
        `,
        input: styled.input`
            border: 0;
            &:focus {
                outline: none;
            }
        `,
    },
};
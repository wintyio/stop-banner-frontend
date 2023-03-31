import styled from "styled-components";

export const theme = {
    color: {
        white: "#FFFFFF",
        black: "#000000",
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
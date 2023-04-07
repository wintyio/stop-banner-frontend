import styled from "styled-components";

export const theme = {
    color: {
        white: "#FFFFFF",
        black: "#1E1E20",
        gray1: "#8E8E95",
        gray2: "#C3C3C7",
    },
    style: {
        contentDiv: styled.div`
            min-height: inherit;
            padding: 0 20px;
        `,
        button: styled.div`
            border-radius: 4px;
            cursor: pointer;
            `,
        defaultButton: styled.div`
            border-radius: 4px;
            cursor: pointer;
        `,
        input: styled.input`
            border: 0;
            &:focus {
                outline: none;
            }
        `,
        flexOne: styled.div`
            flex: 1;
        `,
    },
};
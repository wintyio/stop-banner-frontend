import styled from "styled-components";

let color = {
    white: "#FFFFFF",
    black: "#1E1E20",
    gray1: "#8E8E95",
    gray2: "#C3C3C7",
};

let style = {
    contentDiv: styled.div`
        min-height: inherit;
        padding: 0 20px;
    `,
    button: styled.div`
        border-radius: 4px;
        cursor: pointer;
    `,
    defaultButton: styled.div`
        display: flex;
        padding: 13px 0;
        border-radius: 4px;
        justify-content: center;
        font-size: 16px;
        color: white;
        background-color: ${color.black};
        cursor: pointer;
    `,
    input: styled.input`
        border: 0;
        &:focus {
            outline: none;
        }
    `,
    searchInput: styled.input``,
    flexOne: styled.div`
        flex: 1;
    `,
};

style.searchInput = styled(style.input)`
    width: 100%;
    box-sizing: border-box;
    padding: 8px 4px;
    font-size: 20px;
    border-bottom: 1px solid #787878;
`;

export const theme = { color, style };
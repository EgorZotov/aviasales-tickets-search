import styled from 'styled-components';

export const ListWrap = styled.div`
    padding: 20px 0;
    background-color: ${({ theme }) => theme.colors.ContentBackground};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
`;

export const ListTitle = styled.div`
    padding: 0px 20px 10px 20px;
    font-size: 12px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.Text};
`;

export const ListLabel = styled.label`
    display: block;
    padding: 8px 20px;
    cursor: pointer;
    white-space: nowrap;
    width: 100%;
    transition: all 0.1 ease-in-out;
    background-color: ${({ theme }) => theme.colors.ContentBackground};
    &:hover {
        background-color: #f1fcff;
    }
`;

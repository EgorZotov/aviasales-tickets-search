import styled from 'styled-components';
import CheckMarkSvg from 'images/CheckMark.svg';

export const Label = styled.label`
    display: flex;
    cursor: pointer;
`;

export const Box = styled.span`
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.BorderColor};
    border-radius: 5px;
    color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s;
`;

export const CheckMark = styled(CheckMarkSvg)``;

export const Input = styled.input`
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    &:checked ~ ${Box} {
        color: ${({ theme }) => theme.colors.Accent};
        border: 1px solid ${({ theme }) => theme.colors.Accent};
    }
`;

export const LabelText = styled.span`
    font-size: 13px;
    color: ${({ theme }) => theme.colors.Text};
    line-height: 20px;
    margin-left: 10px;
`;

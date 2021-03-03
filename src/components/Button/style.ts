import styled from 'styled-components';

export const Button = styled.button`
    font-size: 12px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.Accent};
    padding: 15px 20px;
    border: none;
    color: ${({ theme }) => theme.colors.AccentText};
    text-transform: uppercase;
    cursor: pointer;
`;

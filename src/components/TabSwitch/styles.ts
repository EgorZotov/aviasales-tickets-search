import styled, { css } from 'styled-components';

export const Switch = styled.ul`
    list-style-type: none;
    display: flex;
    height: 50px;
    padding: 0;
    overflow: hidden;
    margin: 0;
`;

export const SwitchItem = styled.li<{ active?: boolean }>`
    display: flex;
    font-size: 12px;
    font-weight: 600;
    flex: 1;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.BorderColor};
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    text-transform: uppercase;
    &:first-child {
        border-radius: 5px 0 0 5px;
    }
    &:last-child {
        border-radius: 0 5px 5px 0;
    }
    &:not(:first-child) {
        margin-left: -1px;
    }
    color: ${({ theme, active }) => (active ? theme.colors.AccentText : theme.colors.Text)};
    background-color: ${({ theme, active }) =>
        active ? theme.colors.Accent : theme.colors.ContentBackground};
`;

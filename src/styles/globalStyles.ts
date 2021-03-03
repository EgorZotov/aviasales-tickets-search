import { createGlobalStyle } from 'styled-components';
import OpenSansRegular from 'styles/fonts/OpenSans-Regular.ttf';
import OpenSansSemiBold from 'styles/fonts/OpenSans-SemiBold.ttf';
import OpenSansBold from 'styles/fonts/OpenSans-Bold.ttf';
import 'normalize.css';

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: "Open Sans";
        src: url(${OpenSansRegular});
        font-style: normal;
        font-weight: 400;
    }
    @font-face {
        font-family: "Open Sans";
        src: url(${OpenSansSemiBold});
        font-weight: 600;
        font-style: normal;
    }
    @font-face {
        font-family: "Open Sans";
        src: url(${OpenSansBold});
        font-weight: 700;
        font-style: normal;
    }
    body {
        font-family: 'Open Sans';
        font-style: normal;
        background-color: ${({ theme }) => theme.colors.BodyBackground};
    }
    * {
        box-sizing: border-box;
    }
`;

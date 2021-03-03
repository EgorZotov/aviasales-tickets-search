import React from 'react';
import Search from 'pages/Search';

import { ThemeProvider } from 'styled-components';
import Themes from 'styles/themes';
import { GlobalStyles } from 'styles/globalStyles';

const App = () => {
    return (
        <ThemeProvider theme={Themes['aviasales']}>
            <GlobalStyles />
            <Search />
        </ThemeProvider>
    );
};

export default App;

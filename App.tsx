import React from 'react';

import RootNavigationContainer from './src/navigations';
import {GlobalContextProvider} from './src/context';

function App(): JSX.Element {
  return (
    <GlobalContextProvider>
      <RootNavigationContainer />
    </GlobalContextProvider>
  );
}

export default App;

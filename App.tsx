import React from 'react';
import StackNavigator from './src/routes/StackNavigator';
import tw from './src/utils/tailwind';
import { useDeviceContext } from 'twrnc';

const App = () => {
  useDeviceContext(tw);

  return (
    <StackNavigator />
  )
};

export default App;
import React from 'react';
import StackNavigator from './src/routes/StackNavigator';
import tw from './src/utils/tailwind';
import { useDeviceContext } from 'twrnc';
import { LoadingIndicator } from './src/components';
import { RootState } from './src/redux/types';
import { useSelector } from 'react-redux';

const App = () => {
  useDeviceContext(tw);
  const Loading = useSelector((state: RootState) => state.Loading);

  return (
    <>
      <StackNavigator />
      <LoadingIndicator
        loading={Loading.loading}
      />
    </>
  );
}

export default App;
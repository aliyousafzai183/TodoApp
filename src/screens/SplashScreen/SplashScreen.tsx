// import Statements
import React, { useEffect } from 'react';
import {
  View,
  StatusBar,
  Image,
  useColorScheme
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/types';
import { showToast } from '../../components/Toast/Toast';
import { useAppColorScheme } from 'twrnc';
import tw from '../../utils/tailwind';
import { RouteName } from '../../routes/RouteName';
import { changeDarkMode } from '../../redux/reducers/DarkModeSlice';

// type definition
type props = {
  navigation: any;
};

// Splash Screen
const Splash = ({ navigation }: props) => {

  // redux
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.DarkMode?.darkMode);

  // color scheme
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  const appColorScheme = useColorScheme();

  // useffect to load color scheme and wait for 2 seconds
  useEffect(() => {
    const interval = setTimeout(() => {
      try {
        if (appColorScheme === 'dark') {
          setColorScheme('dark');
          dispatch(changeDarkMode({ darkMode: true }));
        } else {
          setColorScheme('light');
          dispatch(changeDarkMode({ darkMode: false }));
        }
        navigation.replace(RouteName?.HOME_SCREEN); // Navigate after 2 seconds
      } catch (error) {
        console.log(error);
        showToast({
          type: 'alert',
          description: `Failed to switch to ${colorScheme} mode!`,
        });
      }
    }, 2000); // Delay navigation for 2 seconds

    return () => clearTimeout(interval); // Clear timer on component unmount
  }, []);

  return (
    <View
      style={tw`h-full w-full items-center justify-center bg-hblue-900`}
    >

      {/* hiding the status bar on splash screen*/}
      <StatusBar hidden={true} />

      {/* showing image for splash */}
      <Image
        style={[
          tw`h-full w-full`,
          {
            resizeMode: 'cover'
          }
        ]}
        source={require('../../constants/Splash.jpg')}
      />
    </View>
  );
};

export default Splash;
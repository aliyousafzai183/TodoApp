import React, {
    useEffect
} from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
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

type props = {
    navigation: any;
}

const Splash = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state: RootState) => state.DarkMode?.darkMode);
    const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
    const appColorScheme = useColorScheme();

    const loadTheme = async () => {
        try {
            if (appColorScheme === 'dark') {
                setColorScheme('dark');
                dispatch(changeDarkMode({ darkMode: true }));
            } else {
                setColorScheme('light');
                dispatch(changeDarkMode({ darkMode: false }));
            }

        } catch (error) {
            console.log(error);

            showToast({
                type: 'alert',
                description: 'THEME-SWITCH-ERROR',
            });
        } finally {
            navigation.replace(RouteName?.HOME_SCREEN);
        }
    }

    useEffect(() => {
        loadTheme();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <Image
                style={styles.image}
                source={require('../../constants/Splash.jpg')}
            />
        </View>
    )
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'trasparent'
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
});
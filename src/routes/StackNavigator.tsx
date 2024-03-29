import { createStackNavigator } from '@react-navigation/stack';
import { RouteName } from './RouteName';
import { HomeScreen, SplashScreen } from '../screens';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={RouteName?.SPLASH_SCREEN}
            >

                <Stack.Screen
                    name={RouteName?.SPLASH_SCREEN}
                    component={SplashScreen}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name={RouteName?.HOME_SCREEN}
                    component={HomeScreen}
                    options={{
                        headerShown: false
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;
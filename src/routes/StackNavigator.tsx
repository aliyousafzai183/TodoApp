import { createStackNavigator } from '@react-navigation/stack';
import { RouteNames } from './RouteNames';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName={RouteNames?.SPLASH_SCREEN}
        >
            {/* <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
        </Stack.Navigator>
    );
};

export default StackNavigator;
/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { toastConfig } from './src/utils/toastConfig';
import Toast from 'react-native-toast-message';

const Main = () => {
    return (
        <Provider store={store}>
            <App />
            <Toast config={toastConfig} />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Main);

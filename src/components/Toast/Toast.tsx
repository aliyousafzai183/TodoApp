import Toast from 'react-native-toast-message';

type showToast = {
    type: 'error' | 'info' | 'success' | 'warning' | 'alert',
    description: string,
}

export const showToast = ({ type, description }: showToast) => {
    Toast.show({
        type: type,
        text2: description
    });
}
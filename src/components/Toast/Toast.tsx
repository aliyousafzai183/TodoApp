import Toast from 'react-native-toast-message';

type showToast = {
    type: 'error' | 'info' | 'success' | 'warning' | 'alert',
    description: string,
    t: any
}

export const showToast = ({ type, description, t }: showToast) => {
    Toast.show({
        type: t(type),
        text2: t(description)
    });
}
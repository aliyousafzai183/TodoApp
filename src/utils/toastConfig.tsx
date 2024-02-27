import { Text, View } from 'react-native';
import tw from '../utils/tailwind';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ToastConfigParams } from 'react-native-toast-message';
const isArabic = false;

type ToastConfig = {
    success: (params: ToastConfigParams<{ text2: string }>) => React.ReactNode;
    error: (params: ToastConfigParams<{ text2: string }>) => React.ReactNode;
    alert: (params: ToastConfigParams<{ text2: string }>) => React.ReactNode;
    warning: (params: ToastConfigParams<{ text2: string }>) => React.ReactNode;
    info: (params: ToastConfigParams<{ text2: string }>) => React.ReactNode;
};

export const toastConfig: ToastConfig = {
    success: ({ text2 }) => (
        <View style={tw`bg-green-100 w-9/10 justify-start items-center px-3 rounded-lg py-4 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
            <AntDesign
                name='checkcircle'
                style={tw`text-2xl text-green-900`}
            />
            <Text style={tw`text-black-700 font-medium mx-3 text-sm`}>{text2}</Text>
        </View>
    ),
    error: ({ text2 }) => (
        <View style={tw`bg-red-100 w-9/10 justify-start items-center px-3 rounded-lg py-4 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
            <AntDesign
                name='closecircle'
                style={tw`text-2xl text-red-900`}
            />
            <Text style={tw`text-black-700 font-medium mx-3 text-sm`}>{text2}</Text>
        </View>
    ),
    alert: ({ text2 }) => (
        <View style={tw`bg-orange-100 w-9/10 justify-start items-center px-3 rounded-lg py-4 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
            <AntDesign
                name='exclamationcircle'
                style={tw`text-2xl text-orange-900`}
            />
            <Text style={tw`text-black-700 font-medium mx-3 text-sm`}>{text2}</Text>
        </View>
    ),
    warning: ({ text2 }) => (
        <View style={tw`bg-yellow-100 w-9/10 justify-start items-center px-3 rounded-lg py-4 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
            <AntDesign
                name='exclamationcircle'
                style={tw`text-2xl text-yellow-900`}
            />
            <Text style={tw`text-black-700 font-medium mx-3 text-sm`}>{text2}</Text>
        </View>
    ),
    info: ({ text2 }) => (
        <View style={tw`bg-hblue-100 w-9/10 justify-start items-center px-3 rounded-lg py-4 ${isArabic ? 'flex-row-reverse' : 'flex-row'}`}>
            <AntDesign
                name='infocirlce'
                style={tw`text-2xl text-hblue-900`}
            />
            <Text style={tw`text-black-700 font-medium mx-3 text-sm`}>{text2}</Text>
        </View>
    ),
    // Define custom styles for other toast types as needed
};
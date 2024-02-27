import React, { useRef, useEffect } from 'react';
import { View, Image, Animated, Easing } from 'react-native';
import tw from '../../utils/tailwind';

type Props = {
    loading: boolean;
};

const LoadingIndicator = ({ loading }: Props) => {
    const rotation = useRef(new Animated.Value(0)).current;

    const startRotation = () => {
        rotation.setValue(0);
        Animated.timing(rotation, {
            toValue: 1,
            duration: 2000, // Adjust the duration as needed
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => startRotation());
    };

    const stopRotation = () => {
        rotation.stopAnimation();
    };

    useEffect(() => {
        if (loading) {
            startRotation();
        } else {
            stopRotation();
        }
    }, [loading]);

    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-360deg'],
    });

    if (!loading) {
        return <></>;
    }

    return (
        <View style={tw`absolute w-full h-full bg-transparent justify-center items-center`}>
            <View style={tw`justify-center items-center p-1 dark:bg-dblack-500 bg-fullbg rounded-2xl`}>
                {/* <Animated.Image
                    source={require('../../constants/images/logo/loadingIcon.png')}
                    style={[tw`h-15 w-15`, { transform: [{ rotate }] }]}
                /> */}
            </View>
        </View>
    );
};

export default LoadingIndicator;
import {
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');

const Colors = {
    hblue: {
        100: '#CCE2ED',
        200: '#B5D5E7',
        300: '#9EC8E0',
        400: '#87BBD9',
        500: '#6FAFD2',
        600: '#58A2CB',
        700: '#4195C5',
        800: '#2989BE',
        900: '#127CB7',
    },
    purple: {
        100: '#E5DCED',
        200: '#DBCDE6',
        300: '#D0BEDF',
        400: '#BA9FD1',
        500: '#BA9FD1',
        600: '#AF90CA',
        700: '#A480C3',
        800: '#8F62B5',
        900: '#8F62B5',
    },
    orange: {
        100: '#FBE4D5',
        200: '#FBD8C2',
        300: '#FBCDAF',
        400: '#FAC19C',
        500: '#FAB689',
        600: '#FAAA76',
        700: '#FA9F63',
        800: '#FA934F',
        900: '#FA883C',
    },
    black: {
        100: '#CAC9CC',
        200: '#B2B0B4',
        300: '#9A979D',
        400: '#827E85',
        500: '#69646D',
        600: '#514B56',
        700: '#39323E',
        800: '#201926',
        900: '#08000F',
    },
    pblue: {
        100: '#CBD3D9',
        200: '#B3BFC8',
        300: '#9BABB7',
        400: '#8397A6',
        500: '#6B8495',
        600: '#537084',
        700: '#3B5C73',
        800: '#234862',
        900: '#0B3451',
    },
    red: {
        100: '#F9D9D7',
        200: '#F9C7C5',
        300: '#F8B6B3',
        400: '#F7A5A1',
        500: '#F69490',
        600: '#F5837E',
        700: '#F5716C',
        800: '#F4605A',
        900: '#F34F48',
    },
    white: {
        100: '#F9F9FA',
        200: '#F8F9F9',
        300: '#F7F8F9',
        400: '#F6F7F8',
        500: '#F5F6F7',
        600: '#F4F5F7',
        700: '#F3F5F6',
        800: '#F2F4F6',
        900: '#F1F3F5',
    },
    green: {
        100: '#F9F6F0',
        200: "#E6F6EC",
        800: '#008000',
        900: "#00A345",
    },
    dimbg: '#FCFCFC',
    fullbg: '#FFFFFF',
    label: '#999999',
    height,
    width,

    dblack: {
        100: '#123447',
        500: '#0A2636',
        900: '#011621'
    },

    blackTransparent: 'rgba(0,0,0,0.5)',
    whiteTransparent: 'rgba(255,255,255,0.5)'

};

export default Colors;
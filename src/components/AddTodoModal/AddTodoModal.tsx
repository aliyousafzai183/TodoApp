// AddTodoModal
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/types';
import { updateToggleModal } from '../../redux/reducers/ToggleModalSlice';
import tw from '../../utils/tailwind';
import { addTodo, updateTodo } from '../../redux/reducers/Todos';
import { showToast } from '../Toast/Toast';
import { updateLoading } from '../../redux/reducers/LoadingSlice';
import { updateSelectedTodo } from '../../redux/reducers/selectedTodoSlice';

const ModalComponent = () => {
    const dispatch = useDispatch();
    const showModalBool = useSelector((state: RootState) => state?.ToggleModal?.showModal);
    const SelectedTodo = useSelector((state: RootState) => state?.SelectedTodo);

    const [value, setValue] = useState<string>('');

    useEffect(() => {
        setValue(SelectedTodo?.description ? SelectedTodo?.description : '');
    }, [SelectedTodo])

    console.log(SelectedTodo);


    const handleSave = () => {
        try {
            const isUpdating = SelectedTodo?.index !== null ? true : false;
            if (isUpdating) {
                dispatch(updateTodo({
                    index: SelectedTodo?.index,
                    todo: {
                        description: value,
                        isCompleted: false
                    }
                }));
                if (SelectedTodo) {
                    dispatch(updateSelectedTodo({
                        description: null,
                        index: null
                    }))
                }
            } else {
                dispatch(addTodo({
                    description: value,
                    isCompleted: false
                }));
            }
        } catch (error) {
            console.log(error);
            showToast({
                type: 'error',
                description: 'Error saving todo!'
            });
        } finally {
            setValue('');
            dispatch(updateToggleModal({ showModal: false }));
        }
    };

    const handleRequestClose = () => {
        try {
            dispatch(updateToggleModal({ showModal: !showModalBool }));
            if (SelectedTodo) {
                dispatch(updateSelectedTodo({
                    description: null,
                    index: null
                }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
            visible={showModalBool}
            animationType='fade'
            onRequestClose={handleRequestClose}
            statusBarTranslucent={true}
            transparent={true}
        >
            {/* Modal container */}
            <View style={tw`flex-1 justify-center items-center bg-blackTransparent`}>

                {/* Modal content */}
                <View style={tw`bg-fullbg rounded-t-lg p-5 w-full`}>

                    <TextInput
                        placeholder='Your todo here'
                        style={tw`w-full`}
                        value={value}
                        onChangeText={(text: string) => {
                            setValue(text);
                        }}
                    />

                    <TouchableOpacity
                        style={tw`self-end border border-hblue-900 px-5 py-1 rounded-full`}
                        onPress={handleSave}
                    >
                        <Text style={tw`text-hblue-900 font-semibold text-sm`}>{SelectedTodo?.description ? 'Save' : 'Add'}</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
};


export default ModalComponent;
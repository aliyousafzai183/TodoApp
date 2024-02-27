// AddTodoModal
import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    Pressable,
    Keyboard,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/types';
import { updateToggleModal } from '../../redux/reducers/ToggleModalSlice';
import tw from '../../utils/tailwind';
import { addTodo, updateTodo } from '../../redux/reducers/Todos';
import { showToast } from '../Toast/Toast';
import { updateSelectedTodo } from '../../redux/reducers/selectedTodoSlice';

const ModalComponent = () => {

    const dispatch = useDispatch();
    const showModalBool = useSelector((state: RootState) => state?.ToggleModal?.showModal);
    const selectedTodo = useSelector((state: RootState) => state?.SelectedTodo);
    const todos = useSelector((state: RootState) => state?.Todos?.todos);

    // to take ref of textinput and focus on visibilty
    const inputRef = useRef<TextInput>(null);

    // use state to temporarily hold value until save or add is pressed
    const [value, setValue] = useState<string>('');

    // useeffect to assign value to temporary use state
    useEffect(() => {
        setValue(selectedTodo?.description || '');
        if (showModalBool) {
            Keyboard.dismiss();
            setTimeout(() => {
                inputRef.current?.focus();
            }, 300);
        }
    }, [showModalBool, selectedTodo]);

    // function to reset the selected todo for future use.
    const resetSelectedTodo = () => {
        dispatch(updateSelectedTodo({ description: null, index: null }));
    };

    const getMaxNumberFromTodosIndexes = async () => {
        try {
            let max = 0;
            await todos?.forEach((item) => {
                if (item?.index > max) {
                    max = item?.index;
                }
            });
    
            return max + 1; // Increment by 1 to get the next available index
        } catch (error) {
            console.log(error);
            return 0;
        }
    }
    

    // function to save or edit todo
    const handleSave = async () => {
        try {
            const isUpdating = selectedTodo?.index !== null;
            let maxNumber = await getMaxNumberFromTodosIndexes();
            const newTodo: any = { description: value, isCompleted: false, index: isUpdating ? selectedTodo?.index : maxNumber };
            isUpdating ? dispatch(updateTodo({ index: selectedTodo?.index, todo: newTodo })) : dispatch(addTodo(newTodo));
        } catch (error) {
            console.log(error);
            showToast({ type: 'error', description: 'Error saving todo!' });
        } finally {
            setValue('');
            dispatch(updateToggleModal({ showModal: false }));
            resetSelectedTodo();
        }
    };

    // function for modal close request
    const handleRequestClose = () => {
        dispatch(updateToggleModal({ showModal: !showModalBool }));
        setValue('');
        resetSelectedTodo();
    };

    // function to mark a todo as done
    const handleCompleteTodo = () => {
        dispatch(updateTodo({ index: selectedTodo?.index, todo: { isCompleted: true } }));
        handleRequestClose();
    };

    return (
        <Modal
            visible={showModalBool}
            animationType='fade'
            onRequestClose={handleRequestClose}
            statusBarTranslucent={true}
            transparent={true}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                {/* Modal container */}
                <Pressable
                    style={tw`flex-1 justify-end items-center bg-blackTransparent`}
                    onPress={handleRequestClose}
                >

                    {/* Modal content */}
                    <Pressable
                        style={tw`bg-fullbg dark:bg-dblack-500 rounded-t-3xl p-5 w-full`}
                        onPress={() => { }}
                    >

                        <TextInput
                            ref={inputRef}
                            placeholder='Your todo here'
                            style={tw`w-full`}
                            value={value}
                            onChangeText={(text: string) => {
                                setValue(text);
                            }}
                        />

                        <View
                            style={tw`flex-row flex-row-reverse justify-between items-center mt-8 mb-2`}
                        >

                            <TouchableOpacity
                                style={tw`self-end border border-hblue-900 px-5 py-1 rounded-full`}
                                onPress={handleSave}
                                disabled={value?.length === 0}
                            >
                                <Text style={tw`text-hblue-900 font-semibold text-sm`}>{selectedTodo?.description ? 'Save' : 'Add'}</Text>
                            </TouchableOpacity>

                            {
                                selectedTodo?.description && (
                                    <TouchableOpacity
                                        style={tw`self-end border border-purple-900 px-5 py-1 rounded-lg`}
                                        onPress={handleCompleteTodo}
                                    >
                                        <Text style={tw`text-purple-900 font-semibold text-sm`}>Mark as Done?</Text>
                                    </TouchableOpacity>
                                )
                            }

                        </View>

                    </Pressable>
                </Pressable>
            </KeyboardAvoidingView>
        </Modal>
    )
};


export default ModalComponent;
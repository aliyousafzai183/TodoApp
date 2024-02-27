// AddTodoModal
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    Pressable
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
    const SelectedTodo = useSelector((state: RootState) => state?.SelectedTodo);
    const TodosLength = useSelector((state: RootState) => state?.Todos?.todos?.length);

    // use state to temporarily hold value until save or add is pressed
    const [value, setValue] = useState<string>('');

    // useeffect to assign value to temporary use state
    useEffect(() => {
        setValue(SelectedTodo?.description ? SelectedTodo?.description : '');
    }, [SelectedTodo]);

    // function to reset the selected todo for future use.
    const resetSelectedTodo = () => {
        try {
            dispatch(updateSelectedTodo({
                description: null,
                index: null
            }))
        } catch (error) {
            console.log(error);
            showToast({
                type: 'error',
                description: 'Error! Try again later.'
            });
        }
    };

    // function to save or edit todo
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
                resetSelectedTodo();
            } else {
                dispatch(addTodo({
                    description: value,
                    isCompleted: false,
                    index: TodosLength
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

    // function for modal close request
    const handleRequestClose = () => {
        try {
            dispatch(updateToggleModal({ showModal: !showModalBool }));
            if (SelectedTodo) {
                resetSelectedTodo();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setValue('');
        }
    };

    // function to mark a todo as done
    const handleCompleteTodo = () => {
        try {
            dispatch(updateTodo({
                index: SelectedTodo?.index,
                todo: {
                    isCompleted: true
                }
            }));

            handleRequestClose();
        } catch (error) {
            console.log(error);
            showToast({
                type: 'error',
                description: `Failed to mark this todo as Done`
            });

        }
    };

    return (
        <Modal
            visible={showModalBool}
            animationType='fade'
            onRequestClose={handleRequestClose}
            statusBarTranslucent={true}
            transparent={true}
        >
            {/* Modal container */}
            <Pressable
                style={tw`flex-1 justify-center items-center bg-blackTransparent`}
                onPress={handleRequestClose}
            >

                {/* Modal content */}
                <Pressable
                    style={tw`bg-fullbg dark:bg-dblack-500 rounded-t-3xl p-5 w-full`}
                    onPress={() => { }}
                >

                    <TextInput
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
                        >
                            <Text style={tw`text-hblue-900 font-semibold text-sm`}>{SelectedTodo?.description ? 'Save' : 'Add'}</Text>
                        </TouchableOpacity>

                        {
                            SelectedTodo?.description && (
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
        </Modal>
    )
};


export default ModalComponent;
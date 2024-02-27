// TodoComponent
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Pressable
} from 'react-native';
import tw from '../../utils/tailwind';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { updateTodo } from '../../redux/reducers/Todos';
import { useDispatch } from 'react-redux';
import { showToast } from '../Toast/Toast';
import { updateToggleModal } from '../../redux/reducers/ToggleModalSlice';
import { AddTodoModal } from '../AddTodoModal';
import { updateSelectedTodo } from '../../redux/reducers/selectedTodoSlice';

type TodoType = {
    description: string | null;
    isCompleted: boolean | null;
    index: number
};

const TodoComponent = ({
    description,
    isCompleted,
    index
}: TodoType) => {

    const dispatch = useDispatch();

    const handleCompleteTodo = () => {
        try {
            dispatch(updateTodo({
                index: index,
                todo: {
                    isCompleted: !isCompleted
                }
            }))
        } catch (error) {
            console.log(error);
            showToast({
                type: 'error',
                description: `Failed to mark this todo as ${!isCompleted ? "Incomplete" : "Done"}`
            });

        }
    }

    const handleTodoPress = async () => {
        try {
            if (!isCompleted) {
                await dispatch(updateSelectedTodo({
                    description: description,
                    index: index
                }));
                await dispatch(updateToggleModal({ showModal: true }));
            }
        } catch (error) {
            console.log(error);
            showToast({
                type: 'error',
                description: 'Error Loading Modal!'
            });
        }
    }

    return (
        <TouchableOpacity
            style={tw`w-full flex-row items-center justify-between my-2 py-4 rounded-lg px-5
            ${isCompleted ? 'bg-gray-300 dark:bg-dblack-100' : 'bg-gray-200 dark:bg-dblack-100'}
            `}
            onPress={handleTodoPress}
        >

            <View
                style={tw`flex-row items-center justify-start`}
            >
                <Pressable
                    style={tw`w-5 h-5 items-center justify-center border-black-500 border dark:border-black-100 rounded-full mr-3 `}
                    onPress={handleCompleteTodo}
                >
                    {
                        isCompleted && (
                            <MaterialIcons
                                name="check"
                                style={tw`text-xs `}
                            />
                        )
                    }
                </Pressable>

                <Text
                    style={tw`text-sm ${isCompleted ? 'line-through text-black-500 dark:text-white-500' : 'text-black-800 dark:text-white-800'}`}
                >{description}</Text>

            </View>

        </TouchableOpacity>
    );
};

export default TodoComponent;
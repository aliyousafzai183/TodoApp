// import statements
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Pressable
} from 'react-native';
import tw from '../../utils/tailwind';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { updateTodo } from '../../redux/reducers/Todos';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../Toast/Toast';
import { updateToggleModal } from '../../redux/reducers/ToggleModalSlice';
import { updateSelectedTodo } from '../../redux/reducers/selectedTodoSlice';
import { addCheckedTodo, updateDelete } from '../../redux/reducers/DeleteSlice';
import { RootState } from '../../redux/types';

// type defined of todo
type TodoType = {
    description: string | null;
    isCompleted: boolean | null;
    index: number;
    showDelete: boolean;
};

const TodoComponent = ({
    description,
    isCompleted,
    index,
    showDelete
}: TodoType) => {

    const dispatch = useDispatch();

    const checkedTodos = useSelector((state: RootState) => state?.Delete?.checkedTodos);

    // to show selected button or not
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        const result = checkedTodos?.includes(index);
        if (result) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [checkedTodos])

    // function to complete the incompleted selected todo
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
    };

    // function to handle todo press to show modal
    const handleTodoPress = async () => {
        try {
            if (!isCompleted && !showDelete) {
                await dispatch(updateSelectedTodo({
                    description: description,
                    index: index
                }));
                await dispatch(updateToggleModal({ showModal: true }));
            } else if (showDelete) {
                setIsChecked(!isChecked);
            }
        } catch (error) {
            console.log(error);
            showToast({
                type: 'error',
                description: 'Error Loading Modal!'
            });
        }
    };

    // function to handle todo long press
    const handleTodoLongPress = () => {
        dispatch(updateDelete({ showDelete: true }));
        dispatch(addCheckedTodo(index));
    }

    return (
        <TouchableOpacity
            style={tw`w-full flex-row items-center justify-between my-2 py-4 rounded-lg px-5
            ${isCompleted ? 'bg-gray-300 dark:bg-dblack-100' : 'bg-gray-200 dark:bg-dblack-100'}
            ${isChecked ? 'bg-red-600 dark:bg-black-700' : ''}
            `}
            onPress={handleTodoPress}
            onLongPress={handleTodoLongPress}
        >

            <View
                style={tw`flex-row items-center justify-start`}
            >
                {
                    !showDelete && (
                        <Pressable
                            onPress={handleCompleteTodo}
                        >
                            <View
                                style={tw`w-5 h-5 items-center justify-center border-black-500 border dark:border-black-100 rounded-full mr-3 `}
                            >
                                {
                                    isCompleted && (
                                        <MaterialIcons
                                            name="check"
                                            style={tw`text-xs `}
                                        />
                                    )
                                }
                            </View>
                        </Pressable>
                    )
                }

                <Text
                    style={tw`text-sm ${isCompleted ? 'line-through text-black-500 dark:text-white-500' : 'text-black-800 dark:text-white-800'}`}
                >{description}</Text>

            </View>

            {
                showDelete && (
                    <View>
                        <View
                            style={tw`w-5 h-5 items-center justify-center border-black-500 border dark:border-black-100 ${isChecked ? 'bg-hblue-900' : 'bg-transparent'} rounded-sm mr-3 `}
                        >
                            {
                                isChecked && (
                                    <MaterialIcons
                                        name="check"
                                        style={tw`text-xs text-fullbg`}
                                    />
                                )
                            }
                        </View>
                    </View>
                )
            }

        </TouchableOpacity>
    );
};

export default TodoComponent;
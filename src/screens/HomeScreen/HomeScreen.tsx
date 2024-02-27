// import Statements
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/types';
import tw from '../../utils/tailwind';
import { AddTodoModal, TodoComponent } from '../../components';
import { TodoType, deleteTodo } from '../../redux/reducers/Todos';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { updateToggleModal } from '../../redux/reducers/ToggleModalSlice';
import { showToast } from '../../components/Toast/Toast';
import { addCheckedTodo, removeAllCheckedTodos, removeCheckedTodo, updateDelete } from '../../redux/reducers/DeleteSlice';

// Home Screen
const HomeScreen = () => {
    const dispatch = useDispatch();

    // reading data from redux
    const darkMode = useSelector((state: RootState) => state?.DarkMode?.darkMode);
    const todos = useSelector((state: RootState) => state?.Todos?.todos);
    const modalValue = useSelector((state: RootState) => state?.ToggleModal?.showModal);
    const showDelete = useSelector((state: RootState) => state?.Delete?.showDelete);
    const checkedTodos = useSelector((state: RootState) => state?.Delete?.checkedTodos);

    // State to hold incomplete and completed todos
    const [incompleteTodos, setIncompleteTodos] = useState<TodoType[] | null>(null);
    const [completedTodos, setCompletedTodos] = useState<TodoType[] | null>(null);

    const [selectedAll, setSelectAll] = useState<boolean>(false);

    console.log(todos);


    useEffect(() => {
        // Filter todos into incomplete and completed arrays when todos change
        const incomplete = todos.filter(todo => !todo.isCompleted);
        const completed = todos.filter(todo => todo.isCompleted);
        setIncompleteTodos(incomplete);
        setCompletedTodos(completed);
    }, [todos]); // Re-run effect when todos change

    // function to toggle modal value
    const updateModalValue = () => {
        try {
            dispatch(updateToggleModal({ showModal: !modalValue }));
        } catch (error) {
            console.log(error);
            showToast({
                type: 'error',
                description: "Error! Please try again later."
            });
        }
    };

    const handleSelectAll = () => {
        try {
            if (selectedAll) {
                setSelectAll(false);
                dispatch(removeAllCheckedTodos());
            } else {
                setSelectAll(true);
                todos?.map((item) => (
                    dispatch(addCheckedTodo(item?.index))
                ));
            }
        } catch (error) {
            console.log(error);
            showToast({
                type: 'error',
                description: "Error selecting all todos!"
            });

        }
    };

    const handleClearSelected = () => {
        dispatch(updateDelete({ showDelete: false }));
        dispatch(removeAllCheckedTodos());
        setSelectAll(false);
    };

    const handleDeleteTodos = async () => {
        try {
            console.log(checkedTodos);
            
            await checkedTodos?.map((item) => (
                dispatch(deleteTodo(item))
            ));
            handleClearSelected();
        } catch (error) {
            console.log(error);
            showToast({
                type: 'error',
                description: "Error deleting todos!"
            });
        }
    };

    return (
        <View
            style={tw`bg-white-500 dark:bg-dblack-900 w-full h-full pt-20 ios:pt-25`}
        >

            {/* styling status bar to be transluent and changing its color according to color mode */}
            <StatusBar
                translucent={true}
                backgroundColor={'transparent'}
                barStyle={darkMode ? 'light-content' : 'dark-content'}
            />

            {
                showDelete && (
                    <View
                        style={tw`flex-row justify-between items-center mb-5 px-5`}
                    >
                        <MaterialIcons
                            name="clear"
                            style={tw`text-3xl text-fullbg`}
                            onPress={handleClearSelected}
                        />

                        <TouchableOpacity
                            onPress={handleSelectAll}
                        >
                            <View
                                style={tw`w-5 h-5 items-center justify-center border-black-500 border dark:border-black-100 ${selectedAll ? 'bg-hblue-900' : 'bg-transparent'} rounded-sm mr-8 `}
                            >
                                {
                                    selectedAll && (
                                        <MaterialIcons
                                            name="check"
                                            style={tw`text-xs text-fullbg`}
                                        />
                                    )
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }

            {/* header view which contains main title and todos count */}
            <View
                style={tw`${showDelete ? 'flex-row justify-between items-center' : 'flex-col justify-start items-start'} w-full px-5`}
            >

                {/* title */}
                <Text
                    style={tw`text-4xl text-black-800 dark:text-white-800`}
                >
                    {showDelete ? (0 + ' Selected') : 'To-dos'}
                </Text>

                {/* todos count */}
                {
                    incompleteTodos && incompleteTodos?.length > 0 && !showDelete && (
                        <Text
                            style={tw`text-sm text-black-500 dark:text-black-100`}
                        >
                            {todos?.length ?? 0} to-dos
                        </Text>
                    )
                }

            </View>

            {/* scrollview to be able to scroll over both incomplete and completed todos */}
            {
                todos && todos?.length > 0 ?
                    (
                        <ScrollView
                            contentContainerStyle={tw`pb-20 px-5`}
                        >
                            {
                                incompleteTodos?.map((item, index) =>
                                    <TodoComponent
                                        key={index}
                                        index={item?.index}
                                        description={item?.description}
                                        isCompleted={item?.isCompleted}
                                        showDelete={showDelete}
                                    />
                                )
                            }

                            {/* Text "Done" to separate incomplete and completed todos */}
                            {completedTodos && completedTodos?.length > 0 &&
                                <Text
                                    style={tw`text-sm text-black-500 dark:text-black-100 px-1 ${incompleteTodos ? 'mt-2' : 'mt-0'}`}
                                >
                                    Done ({completedTodos?.length})
                                </Text>
                            }

                            {
                                completedTodos?.map((item, index) =>
                                    <TodoComponent
                                        key={index}
                                        index={item?.index}
                                        description={item?.description}
                                        isCompleted={item?.isCompleted}
                                        showDelete={showDelete}
                                    />
                                )
                            }
                        </ScrollView>
                    )
                    :
                    (
                        // empty todos view
                        <View
                            style={tw`absolute w-full h-full items-center justify-center`}
                        >
                            <Image
                                source={require('../../constants/emptyList.png')}
                                style={tw`w-50 h-50`}
                                resizeMode='contain'
                            />
                            <Text style={tw`text-sm text-black-200 dark:text-black-200`}>Nothing to Show!</Text>
                        </View>
                    )
            }

            {/* Add Todo Button */}
            {
                !showDelete ? (
                    <TouchableOpacity
                        style={tw`w-13 h-13 rounded-full bg-hblue-900 absolute bottom-8 right-8 ios:bottom-10 ios:right-10 items-center justify-center shadow shadow-hblue-900`}
                        onPress={updateModalValue}
                    >
                        <MaterialIcons
                            name='add'
                            style={tw`text-white-900 text-2xl`}
                        />
                    </TouchableOpacity>
                )
                    :
                    (
                        <View
                            style={tw`absolute z-10 bottom-0 self-center w-full py-6 bg-fullbg dark:bg-dblack-500 flex-row items-center justify-center`}
                        >
                            <TouchableOpacity
                                style={tw`flex-row items-center justify-center`}
                                onPress={handleDeleteTodos}
                            >
                                <MaterialIcons
                                    name='delete'
                                    style={tw`text-white-900 text-2xl mr-2`}
                                />
                                <Text
                                    style={tw`text-base text-black-500 dark:text-black-100 px-1`}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )
            }

            {/* Modal to add todos */}
            <AddTodoModal />

        </View>
    );
};

export default HomeScreen;
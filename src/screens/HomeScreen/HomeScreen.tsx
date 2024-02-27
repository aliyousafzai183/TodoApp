// import Statements
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/types';
import tw from '../../utils/tailwind';
import { AddTodoModal, TodoComponent } from '../../components';
import { TodoType } from '../../redux/reducers/Todos';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { updateToggleModal } from '../../redux/reducers/ToggleModalSlice';
import { showToast } from '../../components/Toast/Toast';

// Home Screen
const HomeScreen = () => {
    const dispatch = useDispatch();

    // reading data from redux
    const darkMode = useSelector((state: RootState) => state?.DarkMode?.darkMode);
    const todos = useSelector((state: RootState) => state?.Todos?.todos);
    const modalValue = useSelector((state: RootState) => state?.ToggleModal?.showModal);

    // State to hold incomplete and completed todos
    const [incompleteTodos, setIncompleteTodos] = useState<TodoType[] | null>(null);
    const [completedTodos, setCompletedTodos] = useState<TodoType[] | null>(null);

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

    return (
        <View
            style={tw`bg-white-500 dark:bg-dblack-900 w-full h-full pt-20 ios:pt-25 px-5`}
        >

            {/* styling status bar to be transluent and changing its color according to color mode */}
            <StatusBar
                translucent={true}
                backgroundColor={'transparent'}
                barStyle={darkMode ? 'light-content' : 'dark-content'}
            />

            {/* header view which contains main title and todos count */}
            <View
                style={tw`flex-col items-start justify-start`}
            >

                {/* title */}
                <Text
                    style={tw`text-4xl text-black-800 dark:text-white-800`}
                >
                    To-dos
                </Text>

                {/* todos count */}
                {
                    incompleteTodos && (
                        <Text
                            style={tw`text-sm text-black-500 dark:text-black-100`}
                        >
                            {todos?.length ?? 0} to-dos
                        </Text>
                    )
                }

            </View>

            {/* scrollview to be able to scroll over both incomplete and completed todos */}
            <ScrollView
                contentContainerStyle={tw`pb-20`}
            >
                {
                    incompleteTodos?.map((item, index) =>
                        <TodoComponent
                            key={index}
                            index={item?.index}
                            description={item?.description}
                            isCompleted={item?.isCompleted}
                        />
                    )
                }

                {/* Text "Done" to separate incomplete and completed todos */}
                {incompleteTodos && incompleteTodos?.length > 0 &&
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
                        />
                    )
                }
            </ScrollView>


            {/* Add Todo Button */}
            <TouchableOpacity
                style={tw`w-13 h-13 rounded-full bg-hblue-900 absolute bottom-8 right-8 ios:bottom-10 ios:right-10 items-center justify-center shadow shadow-hblue-900`}
                onPress={updateModalValue}
            >
                <MaterialIcons
                    name='add'
                    style={tw`text-white-900 text-2xl`}
                />
            </TouchableOpacity>

            {/* Modal to add todos */}
            <AddTodoModal />

        </View>
    );
};

export default HomeScreen;
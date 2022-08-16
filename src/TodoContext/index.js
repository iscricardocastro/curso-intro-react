import React, {createContext, useState} from "react";
import { useLocalStorage } from "./useLocalStorage";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const TodoContext = createContext();

function TodoProvider(props){

  const {item: todos, saveItem : saveTodos, loading, error} = useLocalStorage('TODOS_V1', []);
  const [openModal, setOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];
  if(!searchValue.length >= 1){
    searchedTodos = todos;
  }else{
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();

      return todoText.includes(searchText);
    });

  }

  

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);

    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const addTodo = (text) => {
    console.log(text);
    const newTodos = [...todos];
    newTodos.push({
      completed:false,
      text
    });
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {

    confirmAlert({
      title: '¿Seguro quieres eliminar?',
      message: `TODO: ${text}.`,
      buttons:[
        {
          label: 'Sí',
          onClick: () => {
            const todoIndex = todos.findIndex(todo => todo.text === text);
            const newTodos = [...todos];
            newTodos.splice(todoIndex, 1);
            saveTodos(newTodos)
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    })
  }

    return (
        
        <TodoContext.Provider value={{ 
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,
            addTodo
         }}>
            {props.children}
        </TodoContext.Provider>

    );

}

export {TodoContext, TodoProvider};


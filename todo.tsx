import React, {useState} from 'react';
import {View, Text, TextInput, Button, ScrollView} from 'react-native';
import { TestDataButton } from './components/TestDataButton';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todoText, setTodoText]: string = useState('');
  const [todos, setTodos]: Todo[] = useState([]);

  const addTodo = (): void => {
    if (todoText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: todoText,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setTodoText('');
    }
  };

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  };

  return (
    <View>
    <Text>My To-do List</Text>
    <TextInput
      value={todoText}
      onChangeText={setTodoText}
      placeholder="Enter a new to-do"
     />
     <Button 
      title="Add To-do"
      onPress={addTodo}
     />
     <TestDataButton onAddTestData={setTodos} />
     <Text>Tasks:</Text>
     <ScrollView style={{maxHeight: 400}}>
      { (todos.length == 0) ? (<Text>No to-dos yet.  Add one above!</Text>) : (todos.map((todo: Todo) => (
        <View key={todo.id}><Text onPress={() => toggleTodo(todo.id)}>{todo.completed === true ? 'x' : 'o'} {todo.text}</Text></View>
      )
      )
      )}
     </ScrollView>
     <View><Text>Total: {todos.length}</Text>
     <Text>Completed: {todos.filter((todo: Todo) => todo.completed === true).length
}</Text></View>
    </View>
  );
}
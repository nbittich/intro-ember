const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuid } = require('uuid');
const app = express();
app.use(bodyParser.json({
  type: function (req) {
    return req.get("content-type") === 'application/vnd.api+json';
  },
}));
app.use(bodyParser.urlencoded({ extended: true }));
let newTodos = [];
let todoLists = [];

function serializeTodo(todo) {
  return {
    type: "todos",
    id: todo.id,
    attributes: {
      title: todo.title,
      checked: todo.checked
    }
  }
}
function serializeTodoList(todoList) {
  let response = {
    type: "todo-lists",
    id: todoList.id,
    attributes: {
      title: todoList.title
    },
    relationships: {
      todos: {
        links: { related: `/todo-lists/${todoList.id}/todos` },
      }
    },
  };

  return response;

}
function serializeTodoLists(todoLists) {
  let response = {
    data: todoLists.map(todoList => serializeTodoList(todoList))
  };

  return response;

}


app.get('/todo-lists', (req, res) => {
  const { filter } = req.query;

  let serializedData;
  if (filter && filter.title) {
    const filteredTodolists = todoLists.filter(todolist =>
      todolist.title.toLowerCase().includes(filter.title.toLowerCase())
    );

    serializedData = serializeTodoLists(filteredTodolists);
  } else {
    serializedData = serializeTodoLists(todoLists);
  }

  res.status(200).json(serializedData);
});

app.get('/todo-lists/:todolistId/todos', (req, res) => {
  const { todolistId } = req.params;

  const todolist = todoLists.find(t => t.id === todolistId);
  if (!todolist) {
    return res.status(404).json({ errors: [{ title: 'Todolist not found' }] });
  }

  const serializedTodos = { data: todolist.todos.map(todo => serializeTodo(todo)) };
  res.status(200).json(serializedTodos);
});

app.post('/todo-lists', (req, res) => {
  const { title } = req.body.data.attributes;
  if (!title) {
    return res.status(400).json({ errors: [{ title: 'Title is required' }] });
  }

  const todolist = { id: uuid(), title, todos: [] };
  todoLists.push(todolist);

  res.status(201).json({ data: serializeTodoList(todolist) });
});

app.post('/todos', (req, res) => {
  const { title } = req.body.data.attributes;
  if (!title) {
    return res.status(400).json({ errors: [{ title: 'Title is required' }] });
  }

  const todo = { id: uuid(), title, checked: false };
  newTodos.push(todo);

  res.status(201).json({ data: serializeTodo(todo) });
});
app.patch('/todo-lists/:todoListId', (req, res) => {
  const { todoListId } = req.params;
  const { title, } = req.body.data.attributes;
  let todos = req.body.data.relationships.todos.data;

  const todolist = todoLists.find(t => t.id == todoListId);
  if (!todolist) {
    return res.status(404).json({ errors: [{ title: 'Todolist not found' }] });
  }

  todolist.title = title;
  const newTodoLinks = newTodos.filter(nt => todos.some(t => t.id === nt.id));
  newTodos = newTodos.filter(nt => !todos.some(t => t.id === nt.id));
  todolist.todos = [...new Set([...newTodoLinks, ...todolist.todos])];
  const serializedTodoList = { data: serializeTodoList(todolist) };
  res.status(200).json(serializedTodoList);
});
app.patch('/todos/:todoId', (req, res) => {
  const { todoId } = req.params;
  const { checked, title } = req.body.data.attributes;

  const todolist = todoLists.find(t => t.todos.some(todo => todo.id === todoId));
  if (!todolist) {
    return res.status(404).json({ errors: [{ title: 'Todolist not found' }] });
  }

  const todo = todolist.todos.find(t => t.id === todoId);
  if (!todo) {
    return res.status(404).json({ errors: [{ title: 'Todo not found' }] });
  }

  todo.checked = checked;
  todo.title = title;
  const serializedTodo = { data: serializeTodo(todo) };
  res.status(200).json(serializedTodo);
});

app.delete('/todo-lists/:todolistId', (req, res) => {
  const { todolistId } = req.params;

  todoLists = todoLists.filter(tl => tl.id !== todolistId)
  res.status(204).send();
});
app.delete('/todos/:todoId', (req, res) => {
  const { todoId } = req.params;

  const todolist = todoLists.find(t => t.todos.some(todo => todo.id === todoId));

  if (!todolist) {
    return res.status(404).json({ errors: [{ title: 'Todolist not found' }] });
  }
  todolist.todos = todolist.todos.filter(t => t.id !== todoId);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

const express = require('express');
const bodyParser = require('body-parser');
const { Serializer } = require('jsonapi-serializer');

const app = express();
app.use(bodyParser.json());

const todoLists = [];

const todoListSerializer = new Serializer('todo-lists', {
  attributes: ['title', 'todos'],
  todos: {
    ref: 'id',
    attributes: ['title', 'checked']
  }
});

const todoSerializer = new Serializer('todos', {
  attributes: ['title', 'checked']
});

app.get('/todo-lists', (req, res) => {
  const { filter } = req.query;
  if (filter && filter.title) {
    const filteredTodolists = todoLists.filter(todolist =>
      todolist.title.toLowerCase().includes(filter.title.toLowerCase())
    );

    const serializedTodolists = todoListSerializer.serialize(filteredTodolists);
    return res.status(200).json(serializedTodolists);
  }

  const serializedTodolists = todoListSerializer.serialize(todoLists);
  res.status(200).json(serializedTodolists);
});


app.post('/todo-lists', (req, res) => {
  const { title } = req.body.data.attributes;
  if (!title) {
    return res.status(400).json({ errors: [{ title: 'Title is required' }] });
  }

  const todolist = { id: String(todoLists.length + 1), title, todos: [] };
  todoLists.push(todolist);
  const serializedTodolist = todoListSerializer.serialize(todolist);
  res.status(201).json(serializedTodolist);
});

app.post('/todo-lists/:todolistId/todos', (req, res) => {
  const { todolistId } = req.params;
  const { title } = req.body.data.attributes;

  const todolist = todoLists.find(t => t.id === todolistId);
  if (!todolist) {
    return res.status(404).json({ errors: [{ title: 'Todolist not found' }] });
  }

  if (!title) {
    return res.status(400).json({ errors: [{ title: 'Todo title is required' }] });
  }

  const todo = { id: String(todolist.todos.length + 1), title, checked: false };
  todolist.todos.push(todo);

  const serializedTodo = todoSerializer.serialize(todo);
  res.status(201).json(serializedTodo);
});


app.patch('/todo-lists/:todolistId/todos/:todoId/checked', (req, res) => {
  const { todolistId, todoId } = req.params;

  const todolist = todoLists.find(t => t.id === todolistId);
  if (!todolist) {
    return res.status(404).json({ errors: [{ title: 'Todolist not found' }] });
  }

  const todo = todolist.todos.find(t => t.id === todoId);
  if (!todo) {
    return res.status(404).json({ errors: [{ title: 'Todo not found' }] });
  }

  todo.checked = !todo.checked;
  const serializedTodo = todoSerializer.serialize(todo);
  res.status(200).json(serializedTodo);
});


app.patch('/todo-lists/:todolistId/checked', (req, res) => {
  const { todolistId } = req.params;

  const todolist = todoLists.find(t => t.id === todolistId);
  if (!todolist) {
    return res.status(404).json({ errors: [{ title: 'Todolist not found' }] });
  }

  todolist.todos.forEach(todo => (todo.checked = true));
  const serializedTodolist = todoListSerializer.serialize(todolist);
  res.status(200).json(serializedTodolist);
});


app.delete('/todo-lists/:todolistId/todos/:todoId', (req, res) => {
  const { todolistId, todoId } = req.params;

  const todolist = todoLists.find(t => t.id === todolistId);
  if (!todolist) {
    return res.status(404).json({ errors: [{ title: 'Todolist not found' }] });
  }

  const todoIndex = todolist.todos.findIndex(t => t.id === todoId);
  if (todoIndex === -1) {
    return res.status(404).json({ errors: [{ title: 'Todo not found' }] });
  }

  todolist.todos.splice(todoIndex, 1);
  res.status(204).send();
});


app.delete('/todo-lists/:todolistId', (req, res) => {
  const { todolistId } = req.params;

  const todolistIndex = todoLists.findIndex(t => t.id === todolistId);
  if (todolistIndex === -1) {
    return res.status(404).json({ errors: [{ title: 'Todolist not found' }] });
  }

  todoLists.splice(todolistIndex, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

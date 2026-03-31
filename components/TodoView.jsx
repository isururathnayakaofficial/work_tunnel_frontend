import React, { useCallback, useEffect, useState } from 'react';
import './css/TodoView.css';

const API_BASE_URL = 'http://localhost:8081';

const toSqlTime = (timeValue) => {
  if (!timeValue) return null;
  return /^\d{2}:\d{2}:\d{2}$/.test(timeValue) ? timeValue : `${timeValue}:00`;
};

const toTodoDto = ({ title, priority, date, startTime, endTime, status }) => ({
  title, priority, date, startTime, endTime, status
});

const TodoView = ({ currentUser, onTodosChange }) => {
  const [todos, setTodos] = useState([]);
  const [registerId, setRegisterId] = useState(null);

  const [editingTodoId, setEditingTodoId] = useState(null);

  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState('medium');
  const [newTodoDate, setNewTodoDate] = useState('');
  const [newTodoTime, setNewTodoTime] = useState('');
  const [newTodoEndTime, setNewTodoEndTime] = useState('');

  const parseApiResponse = async (response) => {
    const text = await response.text();
    if (!text) return {};
    try { return JSON.parse(text); } catch { return { message: text }; }
  };

  const normalizeTodo = (todo) => {
    const id = todo.todoID || todo.todoId || todo.id;
    return {
      id,
      todoID: id,
      title: todo.title || '',
      priority: String(todo.priority || 'medium').toLowerCase(),
      date: todo.date || '',
      time: todo.startTime || '',
      endTime: todo.endTime || '',
      status: String(todo.status || 'pending').toLowerCase(),
      completed: String(todo.status || 'pending').toLowerCase() === 'done'
    };
  };

  // fetch registerId from backend by email
  const fetchRegisterId = useCallback(async () => {
    if (!currentUser?.email) return null;
    try {
      const res = await fetch(`${API_BASE_URL}/auth/getAll`);
      const data = await parseApiResponse(res);
      if (!res.ok) throw new Error("Failed to fetch users");

      const users = Array.isArray(data) ? data : data.users || [];
      const user = users.find(u =>
        String(u.email).trim().toLowerCase() === String(currentUser.email).trim().toLowerCase()
      );
      if (!user) return null;

      const id = user.registerId || user.registerID || user.id || user.userId;
      setRegisterId(id);

      if (typeof window !== 'undefined' && window.chrome?.storage?.local) {
        window.chrome.storage.local.set({ registerId: id }, () => {
          console.log('Saved registerId to chrome.storage.local:', id);
        });
      }

      return id;
    } catch (err) {
      console.error(err);
      return null;
    }
  }, [currentUser]);

  const fetchTodos = useCallback(async (id) => {
    if (!id) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/todo/get/${id}`);
      const data = await parseApiResponse(res);
      if (!res.ok) throw new Error("Failed to fetch todos");
      const list = Array.isArray(data) ? data : data.todos || [];
      setTodos(list.map(normalizeTodo));
    } catch (err) {
      alert(err.message);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      let id = currentUser?.registerId;
      if (!id) id = await fetchRegisterId();
      else setRegisterId(id);

      if (id) fetchTodos(id);
    };
    load();
  }, [currentUser, fetchRegisterId, fetchTodos]);

  useEffect(() => {
    if (onTodosChange) onTodosChange(todos);
  }, [todos, onTodosChange]);

  // fill inputs when task clicked
  const editTodo = (todo) => {
    setEditingTodoId(todo.id);
    setNewTodoTitle(todo.title);
    setNewTodoPriority(todo.priority);
    setNewTodoDate(todo.date);
    setNewTodoTime(todo.time);
    setNewTodoEndTime(todo.endTime);
  };

  const clearForm = () => {
    setEditingTodoId(null);
    setNewTodoTitle('');
    setNewTodoPriority('medium');
    setNewTodoDate('');
    setNewTodoTime('');
    setNewTodoEndTime('');
  };

  // ADD / UPDATE
  const saveTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return alert('Please enter a task title');
    if (!newTodoDate) return alert('Select date');
    if (!newTodoTime) return alert('Select start time');
    if (!registerId) return alert('Login again');

    const payload = toTodoDto({
      title: newTodoTitle,
      priority: newTodoPriority,
      date: newTodoDate,
      startTime: toSqlTime(newTodoTime),
      endTime: toSqlTime(newTodoEndTime),
      status: 'pending'
    });

    try {
      if (editingTodoId) {
        // Update
        const res = await fetch(`${API_BASE_URL}/api/todo/update/${editingTodoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Update failed");
      } else {
        // Add
        const res = await fetch(`${API_BASE_URL}/api/todo/save/${registerId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Add failed");
      }

      fetchTodos(registerId);
      clearForm();
    } catch (err) {
      alert(err.message);
    }
  };

  // toggle checkbox per task
  const toggleTodoStatus = async (todo) => {
    if (!registerId) return;

    const updatedStatus = todo.completed ? 'pending' : 'done';
    const payload = toTodoDto({
      title: todo.title,
      priority: todo.priority,
      date: todo.date,
      startTime: toSqlTime(todo.time),
      endTime: toSqlTime(todo.endTime),
      status: updatedStatus
    });

    try {
      const res = await fetch(`${API_BASE_URL}/api/todo/update/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Update failed");

      setTodos(prev => prev.map(t =>
        t.id === todo.id ? { ...t, completed: !t.completed, status: updatedStatus } : t
      ));
    } catch (err) {
      alert(err.message);
    }
  };

  // DELETE
  const deleteTodo = async (todoId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/todo/delete/${todoId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Delete failed");
      setTodos(prev => prev.filter(t => t.id !== todoId));
      if (editingTodoId === todoId) clearForm();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="todo-view">
      <h2>My Todo List</h2>

      <form className="todo-form" onSubmit={saveTodo}>
        <input type="text" placeholder="Task title" value={newTodoTitle} onChange={(e) => setNewTodoTitle(e.target.value)} />

        <select value={newTodoPriority} onChange={(e) => setNewTodoPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input type="date" value={newTodoDate} onChange={(e) => setNewTodoDate(e.target.value)} />
        <input type="time" value={newTodoTime} onChange={(e) => setNewTodoTime(e.target.value)} />
        <input type="time" value={newTodoEndTime} onChange={(e) => setNewTodoEndTime(e.target.value)} />

        <button type="submit" className="btn-primary">{editingTodoId ? 'Update Task' : 'Add Task'}</button>
        {editingTodoId && <button type="button" className="btn-secondary" onClick={clearForm}>Cancel</button>}
      </form>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-state">No tasks yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className={`todo-item priority-${todo.priority} ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoStatus(todo)}
              />
              <div className="todo-content" onClick={() => editTodo(todo)}>
                <h4>{todo.title}</h4>
                <div className="todo-meta">
                  <span>📅 {todo.date}</span>
                  <span>⏰ {todo.time} - {todo.endTime || '...'}</span>
                  <span className={`priority-badge ${todo.priority}`}>{todo.priority}</span>
                </div>
              </div>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>🗑️</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoView;
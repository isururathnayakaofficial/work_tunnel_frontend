import React, { useCallback, useEffect, useState } from 'react';
import './css/TodoView.css';

const API_BASE_URL = 'http://localhost:8081';

// Helper to format time for backend
const toSqlTime = (timeValue) => {
  if (!timeValue) return null;
  return /^\d{2}:\d{2}:\d{2}$/.test(timeValue) ? timeValue : `${timeValue}:00`;
};

// Convert form data to payload
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
    if (!currentUser?.email) {
      console.log('❌ fetchRegisterId: No email in currentUser');
      return null;
    }
    try {
      console.log(`🔍 Fetching registerId for email: ${currentUser.email}`);
      const res = await fetch(`${API_BASE_URL}/auth/getAll`);
      const data = await parseApiResponse(res);
      if (!res.ok) throw new Error("Failed to fetch users");

      const users = Array.isArray(data) ? data : data.users || [];
      console.log('👥 Total users found:', users.length);
      const user = users.find(u =>
        String(u.email).trim().toLowerCase() === String(currentUser.email).trim().toLowerCase()
      );
      if (!user) {
        console.log('❌ User not found with email:', currentUser.email);
        return null;
      }

      const id = user.registerId || user.registerID || user.id || user.userId;
      console.log('✅ Found registerId:', id);
      setRegisterId(id);
      return id;
    } catch (err) {
      console.error('❌ fetchRegisterId Error:', err);
      return null;
    }
  }, [currentUser]);

  // fetch todos from backend
  const fetchTodos = useCallback(async (id) => {
    if (!id) {
      console.log('❌ fetchTodos: No ID provided');
      return;
    }
    try {
      console.log(`📥 Fetching todos for registerId: ${id}`);
      const url = `${API_BASE_URL}/api/todo/get/${id}`;
      console.log(`📍 Request URL: ${url}`);
      
      const res = await fetch(url);
      const data = await parseApiResponse(res);
      
      console.log('📊 API Response Status:', res.status, res.ok);
      console.log('📊 API Response Data:', data);
      
      if (!res.ok) throw new Error(`Failed to fetch todos (Status: ${res.status})`);

      // Handle different response structures
      let list = [];
      if (Array.isArray(data)) {
        list = data;
      } else if (data.todos && Array.isArray(data.todos)) {
        list = data.todos;
      } else if (data.data && Array.isArray(data.data)) {
        list = data.data;
      } else if (data.list && Array.isArray(data.list)) {
        list = data.list;
      }
      
      console.log('📋 Raw todos list from API:', list);
      const normalizedTodos = list.map(normalizeTodo);
      console.log('📋 Normalized todos list:', normalizedTodos);
      setTodos(normalizedTodos);
    } catch (err) {
      console.error('❌ fetchTodos Error:', err);
      alert(`Error fetching todos: ${err.message}`);
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

    console.log('📝 Saving todo with payload:', payload);
    console.log('👤 Using registerId:', registerId);

    try {
      if (editingTodoId) {
        // Update
        const url = `${API_BASE_URL}/api/todo/update/${editingTodoId}`;
        console.log(`🔄 Updating todo at: ${url}`);
        const res = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        console.log('🔄 Update Status:', res.status, res.ok);
        if (!res.ok) throw new Error(`Update failed (Status: ${res.status})`);
      } else {
        // Add
        const url = `${API_BASE_URL}/api/todo/save/${registerId}`;
        console.log(`➕ Adding todo at: ${url}`);
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        console.log('➕ Add Status:', res.status, res.ok);
        const responseData = await parseApiResponse(res);
        console.log('➕ Add Response:', responseData);
        if (!res.ok) throw new Error(`Add failed (Status: ${res.status})`);
      }

      console.log('✅ Save successful. Refreshing todos...');
      fetchTodos(registerId);
      clearForm();
    } catch (err) {
      console.error('❌ saveTodo Error:', err);
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
    console.log(`🗑️ Deleting todo: ${todoId}`);
    try {
      const url = `${API_BASE_URL}/api/todo/delete/${todoId}`;
      console.log(`📍 Delete URL: ${url}`);
      const res = await fetch(url, { method: 'DELETE' });
      console.log('🗑️ Delete Status:', res.status, res.ok);
      if (!res.ok) throw new Error(`Delete failed (Status: ${res.status})`);
      setTodos(prev => prev.filter(t => t.id !== todoId));
      if (editingTodoId === todoId) clearForm();
      console.log('✅ Todo deleted successfully');
    } catch (err) {
      console.error('❌ deleteTodo Error:', err);
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
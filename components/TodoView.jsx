import React from 'react';
import './css/TodoView.css';

const TodoView = ({
  todos,
  newTodoTitle,
  setNewTodoTitle,
  newTodoPriority,
  setNewTodoPriority,
  newTodoDate,
  setNewTodoDate,
  newTodoTime,
  setNewTodoTime,
  newTodoEndTime,
  setNewTodoEndTime,
  addTodo,
  toggleTodo,
  deleteTodo,
}) => {
  const completedCount = todos.filter((t) => t.completed).length;
  const completionRate = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div className="todo-section">
      <div className="todo-header">
        <h2>📝 My Tasks</h2>
        <p>Keep track of everything you need to do</p>

        <div className="add-todo-form">
          <form onSubmit={addTodo}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                className="todo-input"
                required
              />
              <button type="submit" className="add-todo-btn">+ Add Task</button>
            </div>
            <div className="form-row">
              <select
                value={newTodoPriority}
                onChange={(e) => setNewTodoPriority(e.target.value)}
                className="priority-select"
                required
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input
                type="date"
                value={newTodoDate}
                onChange={(e) => setNewTodoDate(e.target.value)}
                className="schedule-input"
                required
              />
              <div className="time-range-group">
                <input
                  type="time"
                  value={newTodoTime}
                  onChange={(e) => setNewTodoTime(e.target.value)}
                  className="schedule-input"
                  placeholder="Start"
                  title="Start time (required)"
                  required
                />
                <span className="time-range-dash">→</span>
                <input
                  type="time"
                  value={newTodoEndTime}
                  onChange={(e) => setNewTodoEndTime(e.target.value)}
                  className="schedule-input"
                  placeholder="End"
                  title="End time (optional)"
                />
              </div>
            </div>
            <div className="form-helper">
              <small>* All fields required except end time</small>
            </div>
          </form>
        </div>
      </div>

      <div className="todo-container">
        <div className="todo-list">
          {todos.length === 0 && (
            <div className="todo-empty">
              <p>No tasks yet. Add one above to get started! 🚀</p>
            </div>
          )}
          {todos.length > 0 &&
            todos.map((todo) => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <div className="todo-content">
                  <span className="todo-title">{todo.title}</span>
                  {(todo.date || todo.time || todo.endTime) && (
                    <span className="todo-schedule">
                      📅 {todo.date} {todo.time && `⏰ ${todo.time}`}{todo.time && todo.endTime && ' → '}{todo.endTime && `${todo.endTime}`}
                    </span>
                  )}
                  <span className={`priority-badge priority-${todo.priority}`}>{todo.priority}</span>
                </div>
                <button
                  type="button"
                  className="todo-delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                  title="Delete task"
                >
                  ×
                </button>
              </div>
            ))}
        </div>

        <div className="todo-stats">
          <h3>Statistics</h3>
          <div className="stat">
            <span>Total Tasks:</span>
            <strong>{todos.length}</strong>
          </div>
          <div className="stat">
            <span>Completed:</span>
            <strong>{completedCount}</strong>
          </div>
          <div className="stat">
            <span>Completion Rate:</span>
            <strong>{completionRate}%</strong>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completionRate}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoView;

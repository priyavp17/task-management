import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTasks, getTaskStats, createTask, updateTask, deleteTask, reset } from '../redux/slices/taskSlice';
import { logout } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import '../styles/Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { tasks, stats, isLoading, isError, message } = useSelector((state) => state.tasks);

  const [formData, setFormData] = useState({
    title: '',
    status: 'Todo'
  });

  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getTasks({ status: filterStatus, search: searchQuery }));
      dispatch(getTaskStats());
    }
  }, [user, navigate, dispatch, filterStatus, searchQuery]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isError, message, dispatch]);

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    if (editingTask) {
      dispatch(updateTask({ id: editingTask.id, data: formData }))
        .unwrap()
        .then(() => {
          toast.success('Task updated successfully');
          setFormData({ title: '', status: 'Todo' });
          setEditingTask(null);
          dispatch(getTaskStats());
        })
        .catch(() => {
          toast.error('Failed to update task');
        });
    } else {
      dispatch(createTask(formData))
        .unwrap()
        .then(() => {
          toast.success('Task created successfully');
          setFormData({ title: '', status: 'Todo' });
          dispatch(getTaskStats());
        })
        .catch(() => {
          toast.error('Failed to create task');
        });
    }
  };

  const onEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      status: task.status
    });
  };

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id))
        .unwrap()
        .then(() => {
          toast.success('Task deleted successfully');
          dispatch(getTaskStats());
        })
        .catch(() => {
          toast.error('Failed to delete task');
        });
    }
  };

  const onCancelEdit = () => {
    setEditingTask(null);
    setFormData({ title: '', status: 'Todo' });
  };

  const pieData = {
    labels: ['Todo', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Tasks',
        data: [stats?.todo || 0, stats?.inProgress || 0, stats?.completed || 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const barData = {
    labels: ['Todo', 'In Progress', 'Completed', 'Total'],
    datasets: [
      {
        label: 'Number of Tasks',
        data: [stats?.todo || 0, stats?.inProgress || 0, stats?.completed || 0, stats?.total || 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Task Management Dashboard</h1>
          <p>Welcome, {user?.username}!</p>
        </div>
        <button onClick={onLogout} className="btn-logout">
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        <div className="stats-section">
          <h2>Task Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{stats?.total || 0}</h3>
              <p>Total Tasks</p>
            </div>
            <div className="stat-card todo">
              <h3>{stats?.todo || 0}</h3>
              <p>Todo</p>
            </div>
            <div className="stat-card progress">
              <h3>{stats?.inProgress || 0}</h3>
              <p>In Progress</p>
            </div>
            <div className="stat-card completed">
              <h3>{stats?.completed || 0}</h3>
              <p>Completed</p>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-container">
              <h3>Task Distribution (Pie Chart)</h3>
              <div className="chart">
                <Pie data={pieData} options={chartOptions} />
              </div>
            </div>
            <div className="chart-container">
              <h3>Task Overview (Bar Chart)</h3>
              <div className="chart">
                <Bar data={barData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="tasks-section">
          <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
          <form onSubmit={onSubmit} className="task-form">
            <div className="form-row">
              <input
                type="text"
                placeholder="Task title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {editingTask ? 'Update' : 'Add'} Task
              </button>
              {editingTask && (
                <button type="button" onClick={onCancelEdit} className="btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="filter-section">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="">All Status</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="tasks-list">
            {isLoading && <p>Loading tasks...</p>}
            {!isLoading && tasks.length === 0 && (
              <p className="no-tasks">No tasks found. Create your first task!</p>
            )}
            {!isLoading && tasks.map((task) => (
              <div key={task.id} className={`task-item ${task.status.toLowerCase().replace(' ', '-')}`}>
                <div className="task-info">
                  <h4>{task.title}</h4>
                  <span className="task-status">{task.status}</span>
                </div>
                <div className="task-actions">
                  <button onClick={() => onEdit(task)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => onDelete(task.id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

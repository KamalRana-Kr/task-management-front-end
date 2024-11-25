import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, createTask, updateTask, deleteTask, loginUser } from '../../services/api';

export const loadTasks = createAsyncThunk('tasks/loadTasks', async ({ sortField, sortOrder, search }) => {  
  return await fetchTasks({ sortField, sortOrder, search });
});

export const addTaskAsync = createAsyncThunk('tasks/addTask', async (task) => {
  return await createTask(task);
});

export const updateTaskAsync = createAsyncThunk('tasks/updateTask', async ({ id, updatedTask }) => {
  return await updateTask(id, updatedTask);
});

export const deleteTaskAsync = createAsyncThunk('tasks/deleteTask', async (id) => {
  await deleteTask(id);
  return id;
});

export const loginAsync = createAsyncThunk('user/login', async ({ username, password }) => {
  console.log("ajkodakldm");
  
  const response = await loginUser(username, password);
  console.log("response::::::::::",response);
  
  return response;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    filter: 'All',
    status: 'idle',
    error: null,
    user: null,        
    token: null,       
    authStatus: 'idle', 
    authError: null,   
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.authStatus = 'idle';
      state.authError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Task load cases
      .addCase(loadTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        console.log("state",state);
        
        state.tasks.taskList.push(action.payload);
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.taskList.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
          state.tasks.taskList[index] = updatedTask;
        }
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        const taskId = action.payload;
        state.tasks.taskList = state.tasks.taskList.filter(task => task.id !== taskId);
      })

      .addCase(loginAsync.pending, (state) => {
        state.authStatus = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.authStatus = 'succeeded';
        state.user = action.payload.user;  
        state.token = action.payload.token;  
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.authStatus = 'failed';
        state.authError = action.error.message;
      });
  },
});

export const { setFilter, logout } = taskSlice.actions;
export default taskSlice.reducer;

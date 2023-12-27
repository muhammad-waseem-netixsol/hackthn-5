import {create} from 'zustand';

const useTaskStore = create((set) => ({
  tasks: [],
  fetchTasks: async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/tasks`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const fetchedTasks = await response.json();
      set({tasks: fetchedTasks.data, filteredTasks: fetchedTasks.data});
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
     
    }
  },
  isLoading: false,
  error: null,
  added: false,
  addTodo: async (newTodo, token) => {
    console.log(token)
    try {
      set({ isLoading: true, error: null }); 

      const response = await fetch('http://localhost:8000/create-todo', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      if(response.status === 201){
        const addedTodo = await response.json();
        set({
          todos: [addedTodo],
          isLoading: false,
          error: null,
          added: true
        });
      }else{
        set({error: "Failed to add, Please try again!", isLoading:false});
      }
    } catch (error) {
      console.error('Error adding todo:', error);
      set({ isLoading: false, error: 'Failed to add todo' }); // Set error state
    }
  },
  filteredTasks: [], 

  filterTasksByStatus: (status) => {
    console.log(status)
    if(status === "0"){
      set((state) => ({
        filteredTasks: state.tasks,
      }))
    }else{
      set((state) => ({
        filteredTasks: state.tasks.filter((task) => task.status === status),
      }))
    }
  },
    
  signupLoading: false,
  signupError: null,
  signupSuccess: false,
  alreadyUser: false,
  signup: async (userData) => {
    console.log(userData)
    set({ signupLoading: true, signupError: null });
    try {
      const response = await fetch('http://localhost:8000/sign-up',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(userData)
      });
      console.log(response.status)
      if(response.status === 201){
        set({ signupLoading: false, signupSuccess: true, alreadyUser: false  });
      }else if(response.status === 409){
        set({ signupLoading: false, signupSuccess: false, alreadyUser: true  });
      }
    } catch (error) {
      set({ signupLoading: false, signupSuccess: false, signupError: 'Error signing up' });
    }
  },
  loginLoading: false,
  loginError: null,
  loggedIn: false,
  invalid:false,
  server:false,
  login: async (email, password) => {
    console.log("logging in => ", email, password)
    set({ loginLoading: true, loginError: null,loggedIn: false, invalid: false });

    try {
      const userData = { email, password };

      const response = await fetch('http://localhost:8000/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error logging in');
      }
      if(response.status === 401){
        set({ loginLoading: false, loginError: true, loggedIn: false, invalid: true,  });
      }else if(response === 500){
        set({ loginLoading: false, loginError: true, loggedIn: false, server: true, invalid:false  });
      }else{
        set({ loginLoading: false, loginError: false, loggedIn: true, server: false, invalid:false  });
      }
      const { token } = await response.json();
      console.log("token => ", token)
      localStorage.setItem('token', token);
      set({ loginLoading: false, loggedIn: true });
    } catch (error) {
      set({ loginLoading: false, loginError: 'Invalid credentials', invalid:false });
    }
  },
  logout: () => {
    set({ loggedIn: false, });
    localStorage.removeItem('token');
  },
}));


export default useTaskStore;

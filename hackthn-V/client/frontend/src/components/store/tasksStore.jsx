import {create} from 'zustand';

const useTaskStore = create((set) => ({
  tasks: [],
  fetchTasks: async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      const response = await fetch(`https://backend-advance-todo.vercel.app/tasks`, {
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
    const authtoken = localStorage.getItem("token");
    try {
      set({ isLoading: true, error: null, added:false }); 
      const response = await fetch('https://backend-advance-todo.vercel.app/create-todo', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authtoken}`,
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
        set({error: "Failed to add, Please try again!", isLoading:false, added: false});
      }
    } catch (error) {
      console.error('Error adding todo:', error);
      set({ isLoading: false, error: 'Failed to add todo', added: false }); // Set error state
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
    set({ signupLoading: true, });
    try {
      const response = await fetch('https://backend-advance-todo.vercel.app/sign-up',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(userData)
      });
      console.log(response.status)
      if(response.status === 201){
        set({ signupLoading: false, signupSuccess: true,  });
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
    set({ loginLoading: true, invalid: false });

    try {
      const userData = { email, password };

      const response = await fetch('https://backend-advance-todo.vercel.app/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error logging in');
      }
      const { token } = await response.json();
      console.log("token => ", token)
      localStorage.setItem('token', token);
      set({ loginLoading: false, loggedIn: true, invalid:false });
    } catch (error) {
      set({ loginLoading: false, loginError: 'Invalid credentials', invalid:true });
    }
  },
  logout: () => {
    set({ loggedIn: false, });
    localStorage.removeItem('token');
  },
  orderItemsByPriority: (priority) => {
    if(priority === "ALL"){
      set((state) => ({
        filteredTasks: state.tasks,
      }))
    }else{
      set((state) => ({
        filteredTasks: state.tasks.filter((task) => task.priority === priority),
      }))
    }
  
  },
  statusChanged: false,
  errorChanged: false,
  statusLoading: false,
  changeStatus: async (id, status) => {
    set({errorChanged:false,statusChanged:false,statusLoading: true})
    try{
      const token = localStorage.getItem("token");
      const response = await fetch('https://backend-advance-todo.vercel.app/change-status', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });
      if (!response.ok) {
        set({errorChanged:true,statusChanged:false,statusLoading: false})
        throw new Error('Failed to update task status');
      }
      const data = await response.json();
      set({errorChanged:false,statusChanged:true,statusLoading: false})
    }catch (error){
      set({errorChanged:false,statusChanged:false,statusLoading: false})
    }
  },
  
}));

export default useTaskStore;

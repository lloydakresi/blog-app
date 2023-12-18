import './App.css';
import { useEffect} from 'react';
import { restoreUser } from './features/session/sessionSlice';
import { store } from './store/store';
import { Outlet } from 'react-router-dom';

function App() {


  useEffect(() => {
      store.dispatch(restoreUser());
  }, []);

  return (
    <div className="App">
      <h1>App</h1>
      <Outlet />
    </div>

  );
}

export default App;

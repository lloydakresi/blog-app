import { Outlet } from 'react-router-dom';
import './App.css';

//import LoginForm from './components/sessionComponents/login';

function App() {
  return (
    <div id='login'>
      <Outlet />
    </div>

  );
}

export default App;

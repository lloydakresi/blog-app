import './App.css';
import { useEffect} from 'react';
import { restoreUser } from './features/session/sessionSlice';
import { store } from './store/store';
import { Outlet } from 'react-router-dom';
import NavBar from './components/globalComponents/NavBar/NavBar';
import Footer from './components/globalComponents/Footer/Footer';


function OutletWrapper({ children }){
  return(
    <div className='outlet_wrapper'>
      {children}
    </div>
  )

}


function App() {

  useEffect(() => {
      store.dispatch(restoreUser());
  }, []);

  return (
    <div className="App">
      <NavBar />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
      <Footer />
    </div>

  );
}

export default App;

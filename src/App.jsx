import './App.css';
import { lazy, Suspense } from 'react';
import pokeLoading from './assets/poke_loading.png';


const Navbar = lazy(() => import('./components/Navbar'));

function App() {
  return (
    <>
      <Suspense fallback={ <div className="w-screen min-h-screen flex justify-center items-center">
              <div className="w-52 h-52 absolute animate-progress-bar duration-1000 bg-[#eeeeee]"></div>
              <img className="w-52 h-52" src={pokeLoading} alt="Loading" />
            </div>}>
        <Navbar />
      </Suspense>
    </>
  );
}

export default App;

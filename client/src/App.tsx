import {Outlet} from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footbar from './components/Footer';

import './App.css'

function App() {

  return (
  <div>
    {/* <Navbar/> */}
    <main>
      <Outlet />
    </main>
  </div>
  )
}

export default App

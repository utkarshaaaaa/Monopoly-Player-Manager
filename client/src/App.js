import './App.css';
import Join_Game from './pages/Join_Game';
import Create_Game from './pages/Create_Game';
import Enter_joined_Game from './pages/Enter_joined_Game';
import PlayerInfo from './pages/PlayerInfo';
import { BrowserRouter , Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
   
    
   <Routes>
     
     
     
     <Route path='/' element={<Join_Game/>}/>
     <Route path='/create' element={<Create_Game/>}/>
     <Route path='/enter_Join_Game' element={<Enter_joined_Game/>}/>
     <Route path='/player_info' element={<PlayerInfo/>}/>


   </Routes>
 </BrowserRouter>
    </div>
  );
}

export default App;

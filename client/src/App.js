import "./App.css";
import Join_Game from "./pages/Join_Game";
import Create_Game from "./pages/Create_Game";
import Enter_joined_Game from "./pages/Enter_joined_Game";
import PlayerInfo from "./pages/PlayerInfo";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import AddProperty from "./pages/AddProperty";
import ViewProperty from "./pages/ViewProperty";
import ThemeChanger from "./pages/ThemeChanger";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Join_Game />} />
          <Route path="/create" element={<Create_Game />} />
          <Route path="/enter_Join_Game" element={<Enter_joined_Game />} />
          <Route path="/player_info" element={<PlayerInfo />} />
          <Route path="/property_add" element={<AddProperty />} /> 
           <Route path="/view_property" element={<ViewProperty />} />
           <Route path="/theme_changer" element={<ThemeChanger/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

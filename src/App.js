import {Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";
import StudioPage from "./pages/StudioPage";
import LoginPage from "./pages/LoginPage";
import StudiosPage from "./pages/StudiosPage";
import ContactPage from "./pages/ContactPage";
import CreateStudioPage from "./pages/CreateStudioPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/studios" exact element={<StudiosPage/>}/>
            <Route path="/contact" exact element={<ContactPage/>}/>
            <Route path="/admin" exact element={<LoginPage/>}/>
            <Route path="/newStudio" exact element={<CreateStudioPage/>}/>
            <Route path="/:id" element={<StudioPage/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
}

export default App;

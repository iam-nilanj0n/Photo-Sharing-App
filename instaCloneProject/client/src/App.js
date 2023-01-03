import LandingPage from './components/LandingPage';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import PostView from './components/PostView.jsx';
import Form from "./components/Form.jsx";


function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/PostView' element={<PostView/>}/>
      <Route path='/upload' element={<Form/>}/>
    </Routes>

  );
}

export default App;

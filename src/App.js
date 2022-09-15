import { Routes, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm'

import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;

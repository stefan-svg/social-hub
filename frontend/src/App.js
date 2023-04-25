import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Route, Routes } from 'react-router-dom';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import { userReducer } from './reducers/UserReducer';
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(userReducer,composeWithDevTools());
function App() {
  return (
    <Provider store={store}>
    <Routes>
      <Route path="/" element={<Home />}  />
      <Route path="/login" element={<Login />}  />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Provider>
  );
}

export default App;

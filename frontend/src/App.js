import "./App.css";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { userReducer } from "./reducers/UserReducer";
import { configureStore } from "@reduxjs/toolkit";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;

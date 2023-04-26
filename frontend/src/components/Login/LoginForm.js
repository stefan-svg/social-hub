import Cookies from "js-cookie";
import "./LoginForm.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { LoginInput } from "./LoginInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const cssOverride = {
  marginTop: "1rem",
};

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    const email = data.email;
    const password = data.password;
    await axios
      .post(`http://localhost:8080/login`, {
        email,
        password,
      })
      .then((resp) => {
        dispatch({ type: "LOGIN", payload: resp.data });
        Cookies.set("user", JSON.stringify(resp.data));
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LoginInput
        name={"email"}
        type={"email"}
        placeholder={"Email"}
        register={register}
        errors={errors}
        validationSchema={{
          required: "Email is required!",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format.",
          },
        }}
      />
      <LoginInput
        name={"password"}
        type={"password"}
        placeholder={"Password"}
        register={register}
        errors={errors}
        validationSchema={{
          required: "Password is required!",
        }}
      />
      <button>Login</button>
      {loading && (
        <ClipLoader
          color="var(--primary-color)"
          cssOverride={cssOverride}
          loading={loading}
          size={50}
        />
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
};
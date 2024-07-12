import { ToastContainer } from "react-toastify";
import "../authen/login.scss";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "@/api";
import { Modal } from "antd";
import { ErrorObject } from "./Register";
import { User } from "@/api/module/user.api";
import { userActions } from "@/store/slices/user.slice";
import { useDispatch } from "react-redux";


const Login = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<ErrorObject | null>(null);
  const [validationErrors, setValidationErrors] = useState<ErrorObject>({
    message: {},
  });
  const dispatch = useDispatch();
  const validateForm = (data: User) => {
    const errors: ErrorObject = { message: {} };

    if (!data.username.trim()) {
      errors.message.username = t("username không được để trống");
    } else if (data.username.length < 6) {
      errors.message.username = t("username phải có ít nhất 6 ký tự");
    }

    if (!data.password.trim()) {
      errors.message.password = t("password không được để trống");
    } else if (data.password.length < 6) {
      errors.message.password = t("password phải có ít nhất 6 ký tự");
    }

    return errors;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: any = {
      username: (e.target as any).username.value,
      password: (e.target as any).password.value,
    };

    const errors = validateForm(data);

    if (Object.keys(errors.message).length > 0) {
      setValidationErrors(errors);
      return;
    }
    await api.user
      .userLogin(data)
      .then((res) => {
        if (res.status === 200) {
          Modal.success({
            title: "Login Success",
            content: "Login Success",
            onOk: () => {
              const token = res.data.accessToken;
              localStorage.setItem("token", token);
            dispatch(userActions.fetchUsers() as any);
              // window.location.href = "/";
            },
          });
        }
      })
      .catch((err) => {
        if (err.response.data.message.username || err.response.data.message.password) {
          setError(err.response.data);
        }
        Modal.error({
          title: "Error",
          content: err.response.data.message,
        });
      });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError({
        ...error,
        message: {
          ...error.message,
          [e.target.name]: undefined,
        },
      });
    }
    if (validationErrors.message) {
      setValidationErrors({
        ...validationErrors,
        message: {
          ...validationErrors.message,
          [e.target.name]: undefined,
        },
      });
    }
  };
  return (
    <div className="formLogIn">
      <ToastContainer />
      <h1 className="titleLogIn">{t("login1")}</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <TextField
            autoFocus
            id="username"
            label={t("login2")}
            variant="outlined"
            name="username"
            onChange={handleChange}
            placeholder={t("login2")}
            type="text"
            InputLabelProps={{
              style: { color: "black" },
            }}
          />
          {(validationErrors.message.username || error?.message?.username) && (
            <p className="error-message">
              {validationErrors.message.username || error?.message?.username}
            </p>
          )}
        </div>
        <div className="input-container">
          <TextField
            id="password"
            label={t("password")}
            variant="outlined"
            name="password"
            placeholder={t("password")}
            type="password"
            onChange={handleChange}
            InputLabelProps={{
              style: { color: "black" },
            }}
          />
          {(validationErrors.message.password || error?.message?.password) && (
            <p className="error-message">
              {validationErrors.message.password || error?.message?.password}
            </p>
          )}
        </div>
        <button className="btnLogIn" type="submit">
          {t("login1")}
        </button>
        <div className="login-LinkForgot">
          <Link to="/" className="login-forgotPassword">
            {t("forgotPassword")}
          </Link>
        </div>
        <div className="login-textOrHr">
          <span className="login-textor">{t("or")}</span>
          <hr />
        </div>
      </form>
      <Link to="/register">
        <button className="login-btnRegister">{t("register1")}</button>
      </Link>
    </div>
  );
};

export default Login;

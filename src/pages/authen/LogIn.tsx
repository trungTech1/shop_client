import { ToastContainer } from "react-toastify";
import "../authen/login.scss";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "@/api";
import { Modal } from "antd";
// import { authenActions } from "../../store/slices/authen.slice";

interface error {
  message: {
    username: string;
    password: string;
  };
}
const Login = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<error | null>(null);

  const validate = (data: any) => {
    const errors: any = {
      message: {
        username: "",
        password: "",
      },
    };
    if (!data.username) {
      errors.message.username = "Login Id Không được để trống";
    } else if (data.username.length < 6) {
      errors.message.username = "Login Id phải lớn hơn 6 ký tự";
    }
    if (!data.password) {
      errors.message.password = "Password Không được để trống";
    } else if (data.password.length < 6) {
      errors.message.password = "Password phải lớn hơn 6 ký tự";
    }
    return errors;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: any = {
      username: (e.target as any).username.value,
      password: (e.target as any).password.value,
    };

    const errors = validate(data);
    if (errors.message.loginId || errors.message.password) {
      setError(errors);
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
              window.location.href = "/";
            },
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Login Fail",
          content: "Login Fail",
        });
        console.log(err);
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
          {error?.message.username && (
            <p className="error-message">{error?.message?.username}</p>
          )}
        </div>
        <div className="input-container">
          <TextField
            inputProps={{ minLength: 6 }}
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
          {error?.message.password && (
            <p className="error-message">{error?.message?.password}</p>
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

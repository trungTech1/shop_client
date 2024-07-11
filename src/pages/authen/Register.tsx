import "../authen/register.scss";
import { Link,  } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import { useTranslation } from "react-i18next";
import api from "@/api";

const Register = () => {
  const { t } = useTranslation();
  
  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const data ={
          fullname : ( e.target as any).fullname.value,
          username : ( e.target as any).username.value,
          email : ( e.target as any).email.value,
          password : ( e.target as any).password.value,
          phone : ( e.target as any).phone.value,
        }
        await api.user.create(data)
  }

  return (
    <div className="formRegister">
      <ToastContainer />
      <div className="headerRegister">
        <Link to="/">
          <ArrowBackIcon />
        </Link>
        <img
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI4LjMuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA3OTIgMjE5LjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDc5MiAyMTkuNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03MzEuNywxNTQuMWMwLTIuMi0wLjctNC4xLTIuMi01LjZjLTEuNS0xLjUtMy4yLTIuMy01LjMtMi4zYy0xLjIsMC0yLjMsMC4yLTMuMywwLjgKCQljLTEuMiwwLjYtMi40LDEuNC0zLjcsMi40YzAsMC0xLjcsMS41LTMuMSwxLjVjLTMuMywwLTMuOS01LjMtMy45LTEwLjRWOTVoOS42YzIuNCwwLDQuMy0wLjMsNS42LTAuOWMwLjMtMC4yLDEuNC0wLjgsMS40LTMuNQoJCWMwLTMuMi0xLjItMy44LTEuNy00Yy0xLTAuNS0zLjMtMS4xLTguMy0xLjFoLTYuNVY2NS42YzAtOC0zLjgtMTEuOC0xMS45LTExLjhjLTguMSwwLTExLjksMy44LTExLjksMTEuOHYxOS45aC0zLjgKCQljLTMuOCwwLTUuNiwwLjUtNi40LDFjLTEuMSwwLjUtMS4zLDIuNC0xLjMsMy45YzAsMS4zLDAuNCwyLjMsMS4yLDMuMmMwLjQsMC41LDEuNywxLjQsNS44LDEuNGg0LjZ2NDAuNmMwLDEyLjYsOS42LDIxLjcsMTQsMjQuMQoJCWM0LjUsMi41LDkuNywzLjgsMTUuNSwzLjhjMy45LDAsNy43LTAuOSwxMS4xLTIuNkM3MzAuMiwxNTkuNCw3MzEuNywxNTcuMSw3MzEuNywxNTQuMSIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI2NC45LDMzLjdjLTQuOC0xLjQtOS45LDAuOC0xMiw1LjZjLTE3LjksNDIuMS00My40LDEwNy00My40LDEwN3MtMTAtMjEuNS0yMC43LTQ0LjkKCQljMTEuNy0yOS45LDIyLjEtNTcsMjIuMS01N2MwLjYtMS40LDEuOS04LjMtNi45LTEwLjhjLTQuOC0xLjQtOS45LDAuOC0xMiw1LjZjLTQuNywxMS05LjksMjMuNS0xNSwzNi4xYy01LjItMTEuOC05LjctMjItMTItMjcuOQoJCWMtMy45LTEwLTEyLjgtMTUuOC0yNC4yLTE0LjRjLTEzLjMsMS43LTE4LjEsMTItMTUuOCwyMC4yYzIuMyw3LjksMTcuMSw0Mi40LDMxLjIsNzMuNmMtNC43LDExLjctNy43LDE5LjQtNy43LDE5LjQKCQlTMTEyLjIsNjguNiwxMDQsNDcuNWMtMy45LTEwLTEyLjgtMTUuOC0yNC4yLTE0LjRjLTEzLjMsMS43LTE4LjIsMTItMTUuOCwyMC4yYzQuMiwxNC40LDUwLjUsMTE4LjEsNTcuMiwxMjcuNAoJCWMzLjcsNS4yLDguOSw4LjksMTcuNCw4LjljOS4yLDAsMTUuMy0zLjEsMTkuMS0xMC42YzEuMi0yLjQsNS4zLTEyLjMsMTAuNi0yNS43YzYuNiwxNC4xLDExLjksMjQuNywxMy44LDI3LjQKCQljMy43LDUuMiw4LjksOC45LDE3LjQsOC45YzkuMiwwLDE1LjMtMy4xLDE5LjEtMTAuNmM0LjgtOS40LDUzLjItMTM0LjUsNTMuMi0xMzQuNUMyNzIuNCw0My4xLDI3My43LDM2LjIsMjY0LjksMzMuNyIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTM2MS4yLDE1MS45YzAsNy45LDMuOCwxMS42LDExLjksMTEuNmM4LjEsMCwxMS45LTMuNywxMS45LTExLjZsLTAuMi0zNS43YzAtMTAuNC0yLjItMTcuOS02LjUtMjIuMQoJCWMtNS41LTUuMy0xMi45LTguMS0yMi4yLTguMWMtOS4zLDAtMTcsMy0yMi45LDlsLTEuNywxLjhsLTAuNy0yLjRjLTEuNy01LjYtNS40LTguNC0xMS40LTguNGMtOC4xLDAtMTEuOSwzLjctMTEuOSwxMS43djU0LjIKCQljMCw3LjksMy44LDExLjYsMTEuOSwxMS42YzguMSwwLDExLjktMy43LDExLjktMTEuNnYtMzdjMC4yLTUuMiwxLjEtOC45LDIuNi0xMS4yYzMtNC44LDcuNi03LjIsMTMuOC03LjJjNS45LDAsOS43LDEuOSwxMS4zLDUuOAoJCWMxLjUsMy41LDIuMiw4LjMsMi4yLDE0LjRMMzYxLjIsMTUxLjl6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDYzLjYsMTQ0LjlsMjMuNi01Mi4xdjU3LjljMCwzLjYsMS4zLDYuNiwzLjksOS4xYzIuNiwyLjUsNS42LDMuNyw5LjMsMy43YzMuNywwLDYuOC0xLjIsOS4zLTMuNwoJCWMyLjYtMi41LDMuOC01LjUsMy44LTkuMVY2Ni43YzAtMy41LTEuMi02LjUtMy44LTljLTIuNi0yLjUtNS42LTMuNy05LjMtMy43Yy01LDAtOC42LDItMTEuMSw1LjlsLTMwLjEsNzAuOQoJCWMwLDAtMzQuMS02OS4zLTM0LjItNjkuNWMtMS42LTMuMi00LTUuNC03LjUtNi41Yy0xLjUtMC41LTMtMC44LTQuNS0wLjhjLTEuOSwwLTMuOCwwLjQtNS42LDEuM2MtNSwyLjMtNy41LDUuOS03LjUsMTEuMQoJCWMwLDAuNCwwLDAuOCwwLjEsMS40bC0wLjEsOTAuOGMwLDMuNiwxLjYsNS4xLDUuMyw1LjFjMy44LDAsNS40LTEuNSw1LjQtNS4xVjkyLjZsMjguNSw1NC4zYzEuNiwzLjIsNCw1LjQsNy41LDYuNgoJCWMxLjUsMC41LDMsMC44LDQuNSwwLjhjMS45LDAsMy44LTAuNCw1LjYtMS4zQzQ2MC4yLDE1MS4zLDQ2My42LDE0NC45LDQ2My42LDE0NC45Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTQwLDE2MC45YzQuMiwxLjgsOC44LDIuNywxMy44LDIuN2MxMC43LDAsMTguMi0zLjYsMjMtMTEuMWwxLjUtMi40bDEuNyw0LjJjMiw0LjcsNS41LDcsMTAuNiw3CgkJYzMuMiwwLDUuOS0xLjEsOC4xLTMuNGMyLjMtMi4zLDMuNC01LDMuNC04LjNsLTAuMi0zMy45YzAtNS43LTAuOS0xMC41LTIuOC0xNC4zYy0xLjgtMy43LTUtNi45LTkuNS05LjVjLTAuOS0wLjUtMi0xLjEtMy4zLTEuNwoJCWwtMC41LTAuMmMtNi4xLTIuNi0xMy41LTMuOS0yMi4xLTMuOWMtMy41LDAtNy45LDAuNC0xMywxLjJjLTQuOSwwLjctOS40LDItMTMuMyw0Yy0zLjUsMS43LTUuMiwzLjktNS4yLDYuNwoJCWMwLDIuMSwwLjcsMy41LDIuMyw0LjZjMS43LDEuMSwzLjgsMS43LDYuMSwxLjdjMS45LDAsMy41LTAuNCw0LjgtMS4xYzEuNC0wLjgsMy4xLTIsNC45LTMuN2MyLTEuOCwzLjgtMy4yLDUuMy00LjEKCQljMS43LTEsMy44LTEuNSw2LjItMS41YzUuMywwLDkuNCwxLjcsMTIuMiw1LjJjMi43LDMuMyw0LjEsNy44LDQuMSwxMy4xdjEuNWgtNi45Yy00LjgsMC05LjksMC40LTE1LDEuM2MtNS4xLDAuOS0xMCwyLjQtMTQuNiw0LjQKCQljLTQuNSwyLTguMiw0LjgtMTEsOC4zYy0yLjgsMy41LTQuMiw3LjgtNC4yLDEyLjdjMCw0LjksMS4yLDkuMiwzLjcsMTIuNkM1MzIuNiwxNTYuNCw1MzUuOSwxNTkuMSw1NDAsMTYwLjkgTTU1Ny42LDEyNS42CgkJYzQuNy0zLjMsMTAuNC01LDE2LjktNWg0LjR2Ni42YzAsNC4xLTAuMiw3LjUtMC42LDkuOGMtMC4zLDIuNS0xLjQsNS4yLTMuMSw4Yy0zLjcsNS41LTguMiw4LjQtMTMuNSw4LjRjLTMuNSwwLTYuNC0xLjMtOC41LTMuOQoJCWMtMi0yLjUtMy01LjUtMy05QzU1MC4zLDEzNCw1NTIuOCwxMjksNTU3LjYsMTI1LjYiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02MjkuMSwxNjMuNmMzLjIsMCw1LjktMS4xLDguMS0zLjRjMi4yLTIuMywzLjMtNSwzLjMtOC4zbDAtMjcuOWMwLjMtNS45LDEuMy0xMC4zLDMuMS0xMy41CgkJYzIuMi00LjQsNS4yLTYuNyw4LjYtNi43YzEuMywwLDMuMSwwLjQsNS41LDEuMWMyLjEsMC42LDMuOCwwLjksNS4yLDAuOWMyLjEsMCwzLjctMC45LDQuOS0yLjdjMS40LTIuMSwyLTQuMywyLTYuOAoJCWMwLTMuMS0xLTUuNS0yLjktNy40Yy0yLTEuOS00LjQtMi45LTcuNS0yLjljLTMuOCwwLTcuNSwxLjUtMTAuOSw0LjVjLTEuOSwxLjgtMy43LDMuOC01LjQsNi4xbC0yLjEsMi45bC0wLjUtMy41CgkJYy0xLTYuOC00LjYtOS45LTExLjMtOS45Yy0zLjIsMC01LjksMS4xLTguMiwzLjRjLTIuMiwyLjItMy4zLDQuOS0zLjMsOC4ydjU0LjJjMCwzLjMsMS4xLDYsMy4zLDguMwoJCUM2MjMuMiwxNjIuNSw2MjUuOCwxNjMuNiw2MjkuMSwxNjMuNiIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI4MS43LDg1LjdjLTguMiwwLTEyLDMuOC0xMiwxMS44djU0LjNjMCw4LjEsMy44LDExLjgsMTIsMTEuOGM4LjEsMCwxMS45LTMuOCwxMS45LTExLjhWOTcuNAoJCUMyOTMuNSw4OS40LDI4OS44LDg1LjcsMjgxLjcsODUuNyIvPgoJPGc+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI4MS4xLDc3LjhjMTAuNiwwLDExLjktNS4zLDExLjktOS4ycy0xLjItOS4zLTExLjktOS4zYy0xMC43LDAtMTIsNS4zLTEyLDkuMwoJCQlDMjY5LjEsNzIuNiwyNzAuNCw3Ny44LDI4MS4xLDc3Ljh6Ii8+Cgk8L2c+CjwvZz4KPC9zdmc+Cg=="
          alt=""
        />
        <Link to="/">
          <HomeIcon />
        </Link>
      </div>
      <h1 className="titleRegister">{t("registerAccount")}</h1>
      <form onSubmit={(e)=> {
        handleSubmit(e)
      }}>
        <TextField
          autoFocus
          id="fullname"
          label={t("firstandlastname")}
          variant="outlined"
          name="fullname"
          type="text"
          placeholder={t("firstandlastname")}
          InputLabelProps={{
            style: { color: "black" },
          }}
          style={{ marginBottom: "20px" }}
        />

        <TextField
          id="username"
          label={t("userName")}
          variant="outlined"
          name="username"
          type="text"
          placeholder={t("userName")}
          InputLabelProps={{
            style: { color: "black" },
          }}
          style={{ marginBottom: "20px" }}
        />

        <TextField
          id="email"
          label="Email"
          variant="outlined"
          placeholder="Email"
          type="email"
          InputLabelProps={{
            style: { color: "black" },
          }}
        />
        <p className="error">
          {/* lỗi */}
        </p>
        <TextField
          inputProps={{ minLength: 6 }}
          id="password"
          name="password"
          label={t("password")}
          variant="outlined"
          placeholder={t("password")}
          type="password"
          InputLabelProps={{
            style: { color: "black" },
          }}
        />
        <p className="error"></p>
        <TextField
          id="phone"
          label={t("phone")}
          variant="outlined"
          name="phone"
          placeholder={t("phone")}
          type="text"
          InputLabelProps={{
            style: { color: "black" },
          }}
        />

        <div className="register-tc">
          <span>{t("registerContent1")}</span>
          <Link to="/" className="register-linkTc">
            {t("registerContent2")}
          </Link>
          <span>{t("registerContent3")}</span>
        </div>
        <button className="btnRegister" type="submit">
          {t("continue")}
        </button>
        <div className="register-textOrHr">
          <p className="register-textor">{t("or")}</p>
          <hr />
        </div>
        <Link to="/login">
          <button className="register-btnLogin">{t("login1")}</button>
        </Link>
      </form>
    </div>
  );
};

export default Register;

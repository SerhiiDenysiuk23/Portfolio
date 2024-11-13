import React, {useState} from 'react';
import {modifyRequest, setCookie, TOKEN_NAME} from "@/common/api/core";
import {useRouter} from "next/router";
import {LOGIN} from "@/common/api/apiRoutes";

interface ICredentials{
  username: string
  password: string
}

const Login = () => {

  const [credentials, setCredentials] = useState<ICredentials>({username: "", password: ""})
  const router = useRouter();

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prevState => ({...prevState, username: e.target.value}))
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prevState => ({...prevState, password: e.target.value}))
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    modifyRequest(LOGIN, credentials)
      .then(res => {
        setCookie(TOKEN_NAME, res.token, 1/24)
        router.push("/admin/panel")
      })
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input placeholder={"username"} type="text" onChange={handleChangeUsername}/>
        <input placeholder={"password"} type="password" onChange={handleChangePassword}/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
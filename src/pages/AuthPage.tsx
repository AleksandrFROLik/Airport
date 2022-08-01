import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { fetchLogin } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import { IAuth } from '../models/models';

export const AuthPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState<IAuth>({
    password: '',
    username: ''
  })


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault()
  const isFormValid = () => {
    return form.password.trim().length && form.username.trim().length
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  const handleLogin = async(event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (isFormValid()) {
      await dispatch(fetchLogin(form))
      navigate('/')
    } else {
      alert('Form is invalid!')
    }
  };

  return (
    <form
      className="container mx-auto mt-8 p-4 flex justify-center"
      onSubmit={handleSubmit}
    >
      <div>
        <div>
          <label htmlFor="username" className="mr-2">Username</label>
          <input type="text" id="username" className="border" name="username" onChange={handleChange}/>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="mr-2">Password</label>
          <input
            type="password"
            id="password"
            className="border"
            name="password" onChange={handleChange}/>
        </div>

        <button
          type="submit"
          className="border py-2 px-4 mr-4"
        >
          Register
        </button>

        <button
          type="button"
          className="border py-2 px-4"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </form>
  );
};
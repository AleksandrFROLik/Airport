import { FormEvent } from "react";
import { useInput } from "../hooks/inputHooks";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchAuth } from "../store/actions/authActions";
import { useDebounce } from "../hooks/debounceHook";
import { useNavigate } from "react-router-dom";

const DELAY = 100

export const AuthPage = () => {
  const username = useInput('')
  const password = useInput('')
  const debounceUsername = useDebounce(username.value, DELAY)
  const debouncePassword = useDebounce(password.value, DELAY)
  const navigate = useNavigate()


  const dispatch = useAppDispatch()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault()
  const isFormValue = () => username.value && password.value

  const handleRegister = () => {
    if (isFormValue()) dispatch(fetchAuth({username: debounceUsername, password: debouncePassword}))
    navigate('/')
  };

  return (
    <form className='container mx-auto max-w-[500px] pt-8 border py-1 px-2'
          onSubmit={handleSubmit}>
      <div className=' mb-2'>
        <label htmlFor="username" className='block'>Username</label>
        <input type="text"
               id='username'
               className='border py-1 px-2 w-full'
               {...username}
        />
      </div>
      <div className=''>
        <label htmlFor="password" className='block'>Password</label>
        <input type="password"
               id='password'
               className='border py-1 px-2 w-full mb-2'
               {...password}
        />
      </div>
      <button className='py-2 px-4 bg-blue-700 text-white-500' onClick={handleRegister}>Register</button>
    </form>
  );
};
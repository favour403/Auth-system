import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link,useNavigate} from 'react-router-dom';

function Login() {
   
    //  AM JUST ADDING THIS COMMENT HERE TO PRACTICE SWITCHING BRANCH
      // HANDLING UI STATE
     const [loading,setLoading] = useState (false);
     const [error,setError] = useState ('');
     const [message,setMessage] = useState ('');

  // POST FUNCTION
   const navigate = useNavigate ();
  async function onSubmit(data) {
    setLoading (true);
    setError ('');
    setMessage ('');
    try {
      const responseData = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      // CONVERT RESPONSE TO JSON
      const result = await responseData.json();
      if (!responseData.ok) {
        setError (result.message || 'Login failed: Try again later')
      } else {
         setMessage ('Login successful')
         localStorage.setItem('token', result.token);
        reset ();
         setTimeout (() => {
          navigate ('/dashboard')
        },2000);
      }
       
      
      //  REDIRECT USER
      
    } catch (error) {
      setError ('An error occured')
    } finally {
      setLoading (false)
    }
   
  };

  //  DECLARING STATE
  const [toggle, setToggle] = useState(false)
  // DECALRING SCHEMA
  const schema = z.object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password should be atleast 6 letters')
  });
  // DECLARING USEFORM
  const { register, handleSubmit, formState: { errors },reset } = useForm({
    resolver: zodResolver(schema)
  });
    

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
       
      <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-6 rounded shadow-md w-80'>
        {message && <p className='text-green-600 mb-2'>{message} </p>}
        {error && <p className='text-red-600 mb-2'>{error} </p>}
         <h1 className='font-bold text-center text-2xl mb-2'>Login</h1>
        {/* EMAIL INPUT */}
        <label className='font-bold'>Email:</label>
        <input className='w-full rounded border-2 border-green-300 p-2' type="email" {...register('email')} placeholder='Enter email' />
        {errors.email && <p className='text-red-600 text-sm'>{errors.email.message} </p>}

        {/* PASSWORD INPUT */}
        <label className='font-bold'>Password:</label>
        <div className='flex gap-2'>
        <input className='w-full rounded p-2 mb-2 border-2 border-green-300' type={toggle ? 'text' : 'password'} {...register('password')} placeholder='Enter password' />
        <button className='text-blue-400 text-lg' type='button' onClick={() => setToggle(!toggle)}>{toggle ? 'Hide' : 'Show'} </button>
        </div>
        {errors.password && <p className='text-red-600 text-sm'>{errors.password.message} </p>}

        <button className='bg-green-600 rounded text-white w-full p-2 mt-2' type='submit' disabled = {loading}>{loading ? 'Logging in..': 'Login'} </button>
        <div className='mt-3 text-sm text-center'>Don't have an account? <Link className='text-blue-300 ' to={'/register'}>Register</Link> </div>
      </form>
      
  
    </div>
  )
}
export default Login
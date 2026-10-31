 import {z} from 'zod';
 import { Link,useNavigate } from 'react-router-dom';
 import { useForm } from 'react-hook-form';
 import { zodResolver } from '@hookform/resolvers/zod';
 import { useState } from 'react';
function Register () {
          //  HANDLING UI
          const [loading,setLoading] = useState (false);
          const [message,setMessage] = useState ('');
          const [error,setError] = useState ('');
          //  DECLARING SUBMIT FUNCTION
           const navigate = useNavigate ();
          async function onSubmit (data) {
            setLoading (true);
            setError ('');
            setMessage ('');
           try {
             const response = await fetch ('http://localhost:5000/auth/register',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
               body: JSON.stringify (data)
            })
             const postData = await response.json () ;
              if (!response.ok) {
                  setError (postData.message || 'Registration failed');
              }else{
               setMessage ('Registration successful');
               reset ();

                  setTimeout (() => {
                    navigate ('/login')
                  },1500);
              }
           }catch (error) {
            setError ('Something went wrong')
           }finally {
            setLoading (false);
           }
            
          }
      // DECLARING STATE TO HANDLE PASSWORD
      const [showPassword,setShowPassword] = useState (false);
      //  DECLARING SCHEMA 
    const schema = z.object ({
      name: z.string ().min (3,'Name must be atleast 3 characteres'),
      email: z.string ().email ('Email is required'),
      password: z.string ().min (6,'Password must be atleast 6 letters')
    });
      //  DECLARING USEFORM
      const {register,handleSubmit,formState:{errors},reset} = useForm ({
        resolver:zodResolver (schema)
      });
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
          <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-6 rounded-lg shadow-md w-80'>
             <h1 className='text-2xl font-bold mb-4 text-center'>Register</h1>
              {/* UI MESSAGE */}
              {message && <p className='text-green-600 mb-2'>{message} </p>}
              {error && <p className='text-red-600 mb-2'>{error} </p>}
                 {/* NAME INPUT */}
             <label className='font-bold'>Name:</label>
             <input className='w-full p-2 border-2 border-green-300 mb-3 rounded' type="text" {...register('name')} placeholder='Enter fullname' />
             {errors.name && <p className='text-red-600 text-sm'>{errors.name.message} </p>}

                  {/* EMAIL INPUT */}
             <label className='font-bold'>Email:</label>
             <input className='w-full border-2 border-green-300 p-2 rounded mb-3' type="email" {...register('email')} placeholder='Enter valid email' />
             {errors.email && <p className='text-red-600 text-sm'>{errors.email.message} </p>}

                {/* PASSWORD INPUT */}
             <label className='font-bold'>Password:</label>
              <div className='flex gap-2 mb-2'>
             <input className='w-full rounded border-green-300 border-2 mb-2 p-2' type={showPassword ? 'text' : 'password'} {...register('password')} placeholder='Enter password' />
              <button type='button' className='text-sm text-blue-500' onClick={() => setShowPassword (!showPassword)}>{showPassword ? 'Hide': 'Show'} </button>
                </div>
             {errors.password && <p className='text-red-600 text-sm'>{errors.password.message} </p>}
                <button type='submit' disabled ={loading} className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'  >{loading ? 'Registring...': 'Register'} </button>
                 <p className='mt-3 text-sm text-center'>Already have an account: <Link to={'/login'} className='text-blue-500'>Login</Link> </p>

          </form>
         
        </div>
    )



}
export default Register
 
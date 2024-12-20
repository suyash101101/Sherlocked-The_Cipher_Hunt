import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {supabase} from '../client';

const login = ({setToken}) => {

   let navigate = useNavigate()

  const [formData,setFormData] = useState({
    email:'',password:''
  })

  console.log(formData)

  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }

    })
  }

  async function handleSubmit(e){
    e.preventDefault()

    try {
      const { data,error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error
      console.log(data)
      setToken(data)
      navigate('/homepage')

    } catch (error) {
      console.error('Error signing up:', error.message);
      alert(error.message || 'An unknown error occured');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        

        <input 
          placeholder='Email'
          name='email'
          onChange={handleChange}
        />

        <input
          placeholder='Password'
          name='password'
          type="password"
          onChange={handleChange}
        />

        <button type='submit'>
          Submit
        </button>

      </form>
      Dont have an account ? <Link to= '/signup'>login</Link>
    </div>
  )
}

export default login

import { useState } from 'react';
import { signUp, signIn, signOut } from '../auth';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      setMessage("SignUp successful! Check your email to confirm")
    } catch (error) {
      setMessage(error.message)
    }
  };

  const handleLogin = async () => {
    try {
      await signIn(email, password)
      setMessage("Login successful")    
    } catch (error) {
      setMessage(error.message)
    }  
  };
  

  return (
    <>
      <h1>Authentication</h1>
      <input type="text" 
        placeholder='Email' 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input type="password" 
        placeholder='password' 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignUp}>Signup</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={signOut}>Signout</button>

      <p>{message}</p>
    </>
  )
};


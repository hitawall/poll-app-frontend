// SignUp.tsx

import React, { useState } from 'react';
import axios from 'axios';

interface SignUpForm {
  username: string;
  email: string;
  password: string;
}

function SignUp() {
  const [formData, setFormData] = useState<SignUpForm>({
    username: '',
    email: '',
    password: ''
  });

  const { username, email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
//       const res = await axios.post('/api/signup', formData);
      console.log(res.data); // handle success
    } catch (err) {
      console.error(err.response.data); // handle error
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={e => onSubmit(e)}>
        <input type="text" placeholder="Username" name="username" value={username} onChange={e => onChange(e)} />
        <input type="email" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} />
        <input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;

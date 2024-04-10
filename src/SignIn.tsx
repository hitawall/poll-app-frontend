// SignIn.tsx

import React, { useState } from 'react';
import axios from 'axios';

interface SignInForm {
  email: string;
  password: string;
}

function SignIn() {
  const [formData, setFormData] = useState<SignInForm>({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
//       const res = await axios.post('/api/signin', formData);
      console.log(res.data); // handle success
    } catch (err) {
      console.error(err.response.data); // handle error
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={e => onSubmit(e)}>
        <input type="email" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} />
        <input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;

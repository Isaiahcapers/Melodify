//changed from Login.tsx
//import React from 'react'; //Not necessary

const LoginForm = () => {
  return (
    <form>
      <h4>Hello World</h4>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

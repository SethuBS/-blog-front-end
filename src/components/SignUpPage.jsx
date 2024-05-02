import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('ROLE_CUSTOMER');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSignup = async () => {
    try {
      if (!username || !email || !password || !confirmPassword || !mobileNumber) {
        setError('Please fill in all fields.');
        return;
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await axios.post('http://localhost:8080/auth/signup', {
        username,
        email,
        password,
        mobileNumber,
        role
      });

      console.log(response.data);
      history('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border rounded-lg p-4" style={{ width: '600px', height: 'auto' }}>
        <MDBContainer className="p-3">
          <h2 className="mb-4 text-center">Sign Up Page</h2>
          {error && <p className="text-danger">{error}</p>}
          <MDBInput wrapperClass='mb-3' id='username' placeholder={"User Name"} value={username} type='text' onChange={(e) => setUsername(e.target.value)} />
          <MDBInput wrapperClass='mb-3' placeholder='Email Address' id='email' value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
          <MDBInput wrapperClass='mb-3' placeholder='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <MDBInput wrapperClass='mb-3' placeholder='Confirm Password' id='confirmPassword' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <MDBInput wrapperClass='mb-2' placeholder='Mobile Number' id='mobileNumber' value={mobileNumber} type='text' onChange={(e) => setMobileNumber(e.target.value)} />
          <label className="form-label mb-1">Role:</label>
          <select className="form-select mb-4" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="ROLE_CUSTOMER">User</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
          <MDBBtn className="mb-4 d-block mx-auto" color='primary' style={{ width: '100%' }} onClick={handleSignup}>Sign Up</MDBBtn>
          <div className="text-center">
            <p>Already Register? <a href="/">Login</a></p>
          </div>
        </MDBContainer>
      </div>
    </div>
  );
}

export default SignupPage;

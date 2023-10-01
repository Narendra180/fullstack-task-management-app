
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/CardContainer';
import { toast } from 'react-toastify';
import { setCredentials } from '../redux/slices/authSlice';
import { disconnect } from 'mongoose';
import { useUpdateUserMutation } from '../redux/slices/usersApiSlice';
import Loading from '../components/Loading';

const RegisterPage = () => {

  const [formState,setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const { name, email, password, confirmPassword } = formState;

  const handleFormInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    setFormState({
      ...formState,
      name: userInfo.name,
      email: userInfo.email
    })
  }, [userInfo.name, userInfo.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) toast.error("Passwords does not match");
    else {
      try {
        const res = await updateProfile({
          name,
          email,
          password
        }).unwrap();
        dispatch(setCredentials({...res}));
        toast.success("Profile Updated Successfully");
      } catch(err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }

  return (
    <FormContainer>
      <h1>
        Update Profile
      </h1>
      <Form onSubmit={handleSubmit}>

        <Form.Group className='my-2' controlId='name'>
          <Form.Label>
            Name
          </Form.Label>
          <Form.Control
            name='name'
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={handleFormInputChange}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>
            Email Address
          </Form.Label>
          <Form.Control
            name='email'
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={handleFormInputChange}
          >
          </Form.Control>
        </Form.Group>
        
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control
            name='password'
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={handleFormInputChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirm-password'>
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control
            name='confirmPassword'
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={handleFormInputChange}
          ></Form.Control>
        </Form.Group>

        { isLoading && <Loading />}

        <Button type='submit' variant='primary' className='mt-3'> 
          Update
        </Button>       
      </Form>
    </FormContainer>
  )
}

export default RegisterPage;
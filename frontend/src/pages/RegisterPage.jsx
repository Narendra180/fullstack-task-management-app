import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { useRegisterMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { disconnect } from 'mongoose';

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

  const [register, { isLoading }] = useRegisterMutation();

  const { name, email, password, confirmPassword } = formState;

  const handleFormInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if(userInfo) {
      navigate('/');
    }
  }, [navigate,userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) toast.error("Passwords does not match");
    else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({...res}));
        navigate('/');
      } catch(err) {
        toast.error(err?.data?.message || err.error);
      }

    }
  }

  return (
    <FormContainer>
      <h1>
        Sign Up
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

        {isLoading && <Loading />}

        <Button type='submit' variant='primary' className='mt-3'> 
          Sign Up
        </Button>

        <Row className='py-3'>
          <Col>
            Already Have an Account? <Link to="/login">Login</Link>
          </Col>
        </Row>          
      </Form>
    </FormContainer>
  )
}

export default RegisterPage;
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const LoginPage = () => {

  const [formState,setFormState] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, {isLoading}] = useLoginMutation();
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if(userInfo) {
      navigate('/');
    }
  }, [navigate,userInfo]);
  

  const {email, password} = formState;

  const handleFormInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formState).unwrap();
      dispatch(setCredentials({...res}));
      navigate('/');
    } catch(err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <FormContainer>
      <h1>
        Sign In
      </h1>
      <Form onSubmit={handleSubmit}>
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

        {isLoading && <Loading />}

        <Button type='submit' variant='primary' className='mt-3'> 
          Sign In
        </Button>

        <Row className='py-3'>
          <Col>
            New User? <Link to="/register">Register</Link>
          </Col>
        </Row>          
      </Form>
    </FormContainer>
  )
}

export default LoginPage;
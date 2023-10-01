import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loading from '../components/Loading';
import { useCreateTaskMutation } from '../redux/slices/tasksApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const NewTask = () => {
  const [formState,setFormState] = useState({
    name: "",
    description: "",
  });

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const navigate = useNavigate();

  const { name, description } = formState;

  const handleFormInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(formState).unwrap();
      toast.success("Task Created Successfully.");
      navigate("/tasks");
    } catch(err) {
      toast.error(toast.error(err?.data?.message || err.error));
    }
  }

  return (
    <FormContainer>
      <h1>
        Create Task
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
            required={true}
            onChange={handleFormInputChange}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='description'>
          <Form.Label>
            Description
          </Form.Label>
          <Form.Control
            name='description'
            type='text'
            required={true}
            as="textarea"
            placeholder='Enter Task Description'
            value={description}
            onChange={handleFormInputChange}
          >
          </Form.Control>
        </Form.Group>

        {isLoading && <Loading />}

        <Button type='submit' variant='primary' className='mt-3'> 
          Create
        </Button>      
      </Form>
    </FormContainer>
  )
}

export default NewTask;
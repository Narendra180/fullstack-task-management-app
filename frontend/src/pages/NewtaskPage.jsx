import { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/CardContainer';
import Loading from '../components/Loading';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../redux/slices/tasksApiSlice';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

const NewTask = ({ isEditComp }) => {
  const [formState,setFormState] = useState({
    name: "",
    description: "",
    completed: false
  });

  const [createTask, { isLoading: isLoadingCreateTask }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isLoadingUpdateTask }] = useUpdateTaskMutation();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(isEditComp) {
      setFormState({...location.state.task});
    }
  }, []);

  const { name, description, completed } = formState;

  const handleFormInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.type === "checkbox"?e.target.checked: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isEditComp) {
      try {
        await createTask(formState).unwrap();
        toast.success("Task Created Successfully.");
        navigate("/tasks");
      } catch(err) {
        toast.error(toast.error(err?.data?.message || err.error));
      }
    } else {
      try {
        await updateTask({...formState, _id: location.state.task._id}).unwrap();
        toast.success("Task Updated Successfully.");
        navigate("/tasks");
      } catch(err) {
        toast.error(toast.error(err?.data?.message || err.error));
      }
    }
  }

  return (
    <FormContainer>
      <h1>
        {!isEditComp?"Create Task":"Edit Task"}
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

          {
            isEditComp
            &&
            (
              <Form.Group className='my-2' controlId='completed'>
                <Form.Check 
                  name="completed"
                  checked={completed}
                  type="checkbox"
                  label="Completed"
                  onChange={handleFormInputChange}
                />
              </Form.Group>
            )
          }
        </Form.Group>

        {isLoadingCreateTask && <Loading />}
        {isLoadingUpdateTask && <Loading />}
        <Button type='submit' variant='primary' className='mt-3'> 
          {isEditComp?"Update":"Create"}
        </Button>      
        
      </Form>
    </FormContainer>
  )
}

export default NewTask;
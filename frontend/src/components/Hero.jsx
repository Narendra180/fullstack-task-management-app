import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Hero = () => {

  const { userInfo } = useSelector(state => state.auth);

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>TASK MANAGER</h1>
          {
            !userInfo
            ?(
              <>
                <p className='text-center mb-4'>
                  Please login to create and manage your tasks.
                </p>
                <div className='d-flex'>
                  <LinkContainer to="/login">
                    <Button variant='primary' className='me-3'>
                      Sign In
                    </Button>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Button variant='secondary'>
                      Register
                    </Button>
                  </LinkContainer>
                </div>              
              </>
            ):(
              <>
                <div className='d-flex'>
                  <LinkContainer to="/tasks">
                    <Button variant='primary' className='me-3'>
                      View Tasks
                    </Button>
                  </LinkContainer>
                  <LinkContainer to="/tasks/new">
                    <Button variant='secondary'>
                      Create Task
                    </Button>
                  </LinkContainer>
                </div>
              </>
            )
          }
          
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
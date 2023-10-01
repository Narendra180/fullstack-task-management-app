import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { useGetAllTasksQuery } from '../redux/slices/tasksApiSlice';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import TaskListItem from '../components/TaskListItem';

const TasksListPage = () => {

  const { data: tasks, isLoading, isFetching, refetch } = useGetAllTasksQuery({refetchOnMountOrArgChange: true});
  
  useEffect(() => {
    if(!isFetching) {
      refetch();
    }
  },[]);

  return (
    <Container className='mt-5'>
      <Row className="justify-content-md-center">
        <Col lg="6">
          
          <h1>Tasks</h1>

          <Link to={"/tasks/new"}>Create Task</Link>
          
          {isLoading && <Loading />}

          {
            !tasks?.length && !isLoading
            ?
            <p>
              Tasks are not yet Created.
            </p>
            :
            (
              <>
              <ListGroup className='mt-3'>
                {
                  tasks?.map(task => {
                    return (
                      <TaskListItem 
                        key={task["_id"]}
                        task={task}
                        refetch={refetch}
                      />
                    )
                  })
                }
              </ListGroup>
            </>
            )
          }                        
        </Col>
      </Row>
    </Container>
  )
}

export default TasksListPage;
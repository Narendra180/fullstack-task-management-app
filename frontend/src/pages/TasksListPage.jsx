import { useEffect, useState } from 'react';
import  { ListGroup, Container, Row, Col }from 'react-bootstrap';
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
    <Container className='mt-5 tasklist-page'>
      <Row className="justify-content-md-center">
        <Col>
          
          <div className="tasklist-page-header">
            <h1 className='page-heading'>Tasks</h1>

            <Link className='tasklist-page-create-task-link' to={"/tasks/new"}>
              Create Task
            </Link>
          </div>
          
          {isLoading && <Loading />}

          {
            !tasks?.length && !isLoading
            ?
            <p style={{fontSize: "1.25rem"}}>
              Tasks are not yet Created.
            </p>
            :
            (
              <>
                <ListGroup className="list-group-items-container">
                  {
                    tasks?.map((task,i) => {
                      return (
                        <TaskListItem 
                          key={task["_id"]}
                          task={task}
                          refetch={refetch}
                          index={i}
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
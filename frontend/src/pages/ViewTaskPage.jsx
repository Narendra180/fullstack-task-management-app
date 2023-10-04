import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

const ViewPageTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { task: { _id, name, description, completed }, task } = location.state;
  return (
    <Container className="view-page-task-container">
      <Row className="justify-content-md-center mt-5">
        <Col xs="12" md="8">
          <h1 className="page-heading">View Task</h1>
          <div className="name-edit-btn-container">
            <div className="btn-container">
              <Button
                variant="warning"
                onClick={() => navigate(`/tasks/${_id}/edit`, { state: { task } })}>
                <span className="desc-text">Edit</span> <AiFillEdit />
              </Button>
            </div>
            <h2>
              <span className="icon-span icon-container">
                {completed ? <BsFillCheckCircleFill className="check-icon" /> : <BsFillXCircleFill className="cross-icon" />}
              </span> <span>{name}</span>
            </h2>
          </div>

          <p className="description-p">
            {description}
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default ViewPageTask;
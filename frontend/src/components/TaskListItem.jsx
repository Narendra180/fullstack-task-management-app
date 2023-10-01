import { ListGroup, Row, Col, Button, Spinner } from "react-bootstrap";
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDeleteTaskMutation } from "../redux/slices/tasksApiSlice";
import { toast } from "react-toastify";

const TaskListItem = ({ task, refetch }) => {
  const { completed, name, _id } = task;
  const navigate = useNavigate();

  const [deleteTask,{isLoading: isDeleting}] = useDeleteTaskMutation();

  const handleDelete = async () => {
    try {
      await deleteTask({_id}).unwrap();
      toast.success("Task Delete Successfully.");
      refetch();
    } catch(err) {
      toast.error("Unable to Delete");
    }
  }

  return (
    <ListGroup>
      <Row>
        <Col lg={"auto"}>
          <div>
            {completed? <BsFillCheckCircleFill />: <BsFillXCircleFill />}
          </div>
        </Col>
        <Col>
          <p style={{ textDecoration: completed?"line-through":"none" }}>
            {name}
          </p>
        </Col>
        <Col lg={"auto"}>
          <Button onClick={() => navigate(`/tasks/${_id}`,{state: {task}})}>
            <AiFillEdit />
          </Button>
        </Col>
        <Col lg={"auto"}>
          <Button onClick={handleDelete}>
            {
              isDeleting?<Spinner />: <AiFillDelete />
            }
          </Button>
        </Col>
      </Row>
    </ListGroup>
  )
}

export default TaskListItem;
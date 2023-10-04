import { ListGroup, Row, Col, Button, Spinner } from "react-bootstrap";
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { TfiMoreAlt } from "react-icons/tfi";
import AccordionToggleButton from "./AccordionToggleButton";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDeleteTaskMutation } from "../redux/slices/tasksApiSlice";
import { toast } from "react-toastify";

const TaskListItem = ({ task, refetch, index }) => {
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

  const handleMoreIconButtonClick = () => {
    const hiddenIconsRow = document.querySelector(`.hidden-icons-container-${index} .hidden-icons-row`);
    const prevToggledHiddenIconsRow = document.querySelectorAll(".hidden-icons-row.visible");
    prevToggledHiddenIconsRow.forEach((ele) => {if(ele && ele !==hiddenIconsRow) ele.classList.remove("visible")});
    hiddenIconsRow.classList.toggle("visible");
  }

  return (
    <ListGroup.Item className="tasklist-page-group-item">
      <Row className="list-item">
        <Col className="column" xs="auto">
          <div className="icon-container">
            {completed? <BsFillCheckCircleFill className="check-icon" />: <BsFillXCircleFill className="cross-icon" />}
          </div>
        </Col>
        <Col className="column">
          <p className="task-name-p" style={{ textDecoration: completed?"line-through":"none" }}>
            {name}
          </p>
        </Col>

        <Col xs="auto" className={`hidden-icons-container-${index} hidden-icons-column`}>
          <Row className="hidden-icons-row">
            <Col className="column" xs="auto">
              <Button 
                className="task-list-item-btn view-btn"
                onClick={() => navigate(`/tasks/${_id}/`,{state: {task}})}
              >
                view
              </Button>
            </Col>
            <Col className="column" xs="auto">
              <Button
                variant="warning" 
                className="task-list-item-btn edit-btn"
                onClick={() => navigate(`/tasks/${_id}/edit`,{state: {task}})}
              >
                <AiFillEdit />
              </Button>
            </Col>
            <Col className="column" xs="auto">
              <Button 
                variant="danger"
                className="task-list-item-btn delete-btn"
                onClick={handleDelete}
              >
                <AiFillDelete />
                {
                  isDeleting && <Spinner className="task-list-item-delete-spinner" />
                }
              </Button>
            </Col>
          </Row>
          <Row className="more-icon-container">
            <Button onClick={handleMoreIconButtonClick}>
              <TfiMoreAlt />
            </Button>
          </Row>
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

export default TaskListItem;
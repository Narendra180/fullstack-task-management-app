import { useAccordionButton, Button } from "react-bootstrap";

const AccordionToggleButton = ({ children, eventKey}) => {
  const decoratedOnclick = useAccordionButton(eventKey);
  return (
    <>
      <Button
        onClick={decoratedOnclick}
      >
        {children}
      </Button>
    </>
  )
}

export default AccordionToggleButton;
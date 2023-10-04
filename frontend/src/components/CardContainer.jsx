import { Container,Row,Col } from 'react-bootstrap';

const CardContainer = ({children, className}) => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6} className={`card p-5 ${className}`}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default CardContainer;
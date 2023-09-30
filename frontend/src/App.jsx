import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <Container className="my-2">
        <Outlet />
      </Container>
    </div>
  )
}

export default App;
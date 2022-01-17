import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <Navbar sticky="top" className="flex-column Sidebar">
      <Nav.Item>
        {/*<NavLink to="/" className={({isActive}) => isActive ? 'nav-link active-link' : 'nav-link'}>Feed</NavLink>*/}
        <Nav.Link href="/">Feed</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        {/*<NavLink to="/explore" className={({isActive}) => isActive ? 'nav-link active-link' : 'nav-link'}>Explore</NavLink>*/}
        <Nav.Link href="/explore">Explore</Nav.Link>
      </Nav.Item>
    </Navbar>
  );
}

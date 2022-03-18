import React, {useContext} from 'react';
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Nav, Navbar, Container, Button} from "react-bootstrap";
import {observer} from "mobx-react-lite"; // Listening of events, rerender in realtime
import {useHistory} from 'react-router-dom';

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const history = useHistory();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        // localStorage.removeItem('token');
        history.push(LOGIN_ROUTE);
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Ubi Store</NavLink>
                {user.isAuth ?
                    <Nav className='me-auto' style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(ADMIN_ROUTE)}>Admin Panel</Button>
                        <Button variant={"outline-light"} onClick={() => logOut()} className="ml-4">Exit</Button>
                    </Nav>
                    :
                    <Nav className='me-auto' style={{color: 'white'}}>
                        <Nav.Link variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Login In</Nav.Link>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {registration, login} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();  // hook for getting pathname from url
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user);
            user.setIsAuth(true);
            history.push(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'Login' : 'Sign up'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder='enter your email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    <Form.Control
                        className='mt-3'
                        placeholder='enter your password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'/>
                    <Row className='d-flex justify-content-end mt-3 pl-3 pr-3'>
                        {isLogin ?
                            <div>
                                Don't have an account ? <NavLink to={REGISTRATION_ROUTE}>Sign up</NavLink>
                            </div>
                            :
                            <div>
                                Have an account ? <NavLink to={LOGIN_ROUTE}>Login</NavLink>
                            </div>
                        }
                        <Button variant={"outline-success"} style={{width: 100}} onClick={click}>
                            {isLogin ? 'Login' : 'Sign up'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
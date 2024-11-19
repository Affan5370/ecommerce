import {useNavigate} from 'react-router-dom';
import {Badge,Navbar,Nav,Container, NavDropdown} from 'react-bootstrap';
import { FaShoppingCart,FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import DUMBshop3 from '../assets/DUMBshop3.png'
import {LinkContainer} from 'react-router-bootstrap';
import SearchBox from './SearchBox';
import styled from 'styled-components';


const Section = styled.section`
    nav .brand-name{
    width: 20%;
    display: block;
    margin-right: 0;
}
@media screen and (max-width: 769px) {
    .header-img{
        display: none;
    }
    .navbar > .container > form{
        width: 80%;
    }

    .navbar-collapse > .brand-name{
        display: none;
    }
}


.navbar-expand-md .navbar-nav{
    
}

.navbar-expand-md .navbar-collapse{
 
}

.navbar > .container > form{
  min-width: 50%;
}
.navbar-expand-md .navbar-collapse > form{
  
}
.brand-name{
    position: relative;
}

`



const Header = () => {

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler =async ()=>{
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }
    
  return (
    <Section>
    <header style={{ position: 'fixed', width: '100%', zIndex: 100,top:'0'}}>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect >
            <Container>
                <img src={DUMBshop3} alt='DUMBstore' style={{width:'4%'}} className='header-img' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <LinkContainer to='/'>    
                        <Navbar.Brand className='brand-name'>    
                            DUMBstore
                        </Navbar.Brand>
                    </LinkContainer>
                </Navbar.Collapse>

                <Navbar.Toggle aria-controls='basic-navbar-nav' />

                <SearchBox className="searchbox" />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>    
                    <LinkContainer to='/cart'><Nav.Link><FaShoppingCart />
                    Cart
                    {cartItems.length > 0 && (
                        <Badge pill bg='success' style={{marginLeft:'5px'}}>
                            {cartItems.reduce((a,c)=>a+c.qty,0)}
                        </Badge>
                    )}
                    </Nav.Link></LinkContainer>
                    {userInfo? (
                        <NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <LinkContainer to='/login'><Nav.Link><FaUser />Sign In</Nav.Link></LinkContainer>
                    ) }
                    {userInfo && userInfo.isAdmin && (
                        <NavDropdown title='Admin' id='adminmenu'>
                            <LinkContainer to='/admin/productlist'>
                                <NavDropdown.Item>Products</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/userlist'>
                                <NavDropdown.Item>Users</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/orderlist'>
                                <NavDropdown.Item>Orders</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    </Section>
  )
}

export default Header
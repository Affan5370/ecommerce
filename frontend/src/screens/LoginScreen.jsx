import {useState,useEffect} from 'react';
import {Link,useLocation,useNavigate} from 'react-router-dom';
import {Form,Button,Row,Col,Image} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import {setCredentials} from '../slices/authSlice';
import {toast} from 'react-toastify';
import styled from 'styled-components';

const Section = styled.section`
    .col-md-6{
        width: 500px;
        display: flex;
        flex-direction: column;
        padding: 3rem;
        gap: 2rem;
        border: 1px solid black;
    }
    .col-md-6 > h1{
        width:fit-content;
        padding-bottom: 1rem;
        border-bottom:1px solid black ;
        margin-inline: auto;
    }
    .col-md-6 > form{
        
    }
    .col-md-6 > form > label{
        font-weight: bold;
    }

    .col-md-6 .form-control{
        border: none;
        outline: none;
        border-bottom: 1px solid black;
        border-radius: 0;
        
    }
`







const LoginScreen = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}]= useLoginMutation();

    const {userInfo} = useSelector((state)=>state.auth)

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    },[userInfo,redirect,navigate])

    const submitHandler = async (e)=>{
        e.preventDefault()
        try {
            const res = await login({email,password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

  return (
        <Section>
        <FormContainer className='form-container'>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        className='input'
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className='input'
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>            
                <Button type='submit' variant='primary' className='mt-2' disabled={isLoading} >
                    Sign In
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer ? <Link to={redirect?`/register?redirect=${redirect}`: '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
        </Section>
  )
}

export default LoginScreen
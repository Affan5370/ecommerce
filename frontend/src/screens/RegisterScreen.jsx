import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
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
    .goback-btn{
        background: transparent;
        color: black;
        margin-inline: 1rem;
    }
`

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [register, { isLoading }] = useRegisterMutation();
  
    const { userInfo } = useSelector((state) => state.auth);
  
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';
  
    useEffect(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [userInfo, redirect, navigate]);
  
    const handleSubmitStep1 = (e) => {
      e.preventDefault();
      setStep(2);
    };
  
    const handleSubmitStep2 = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else {
        try {
          const res = await register({ name, email, password }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate(redirect);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };

    const handleBackToStep1 = () => {
        setStep(1);
      };
  
    return (
      <Section>
        <FormContainer>
            <h1>Sign Up</h1>
          {step === 1 ? (
            <>
              
              <Form onSubmit={handleSubmitStep1}>
                <Form.Group controlId='name' className='my-3'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
  
                <Form.Group controlId='email' className='my-3'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
  
                <Button type='submit' variant='primary' className='mt-2'>
                  Next
                </Button>
              </Form>
            </>
          ) : (
            <>
              
              <Form onSubmit={handleSubmitStep2}>
                <Form.Group controlId='password' className='my-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
  
                <Form.Group controlId='confirmPassword' className='my-3'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
  
                <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
                  Register
                </Button>
                {isLoading && <Loader />}
                <Button
                className='mt-2 goback-btn'
                onClick={handleBackToStep1}
                >
                Go Back
              </Button>
              </Form>
            </>
          )}
        
            <Row className='py-3'>
              <Col>
                Already have an account ?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
              </Col>
            </Row>
        
        </FormContainer>
      </Section>
    );
  };
  
  export default RegisterScreen;
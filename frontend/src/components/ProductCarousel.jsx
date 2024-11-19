import { Link } from "react-router-dom";
import { Carousel,Image } from "react-bootstrap";
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductQuery } from "../slices/productsApiSlice";
import styled from "styled-components";

const Section = styled.section`
    .carousel-indicators  {
        margin-bottom:0 ;
    }
    .carousel-control-next-icon,.carousel-control-prev-icon{    
        display: none;
    }
`


const ProductCarousel = () => {

    const {data:products,isLoading,error} = useGetTopProductQuery();

    
    return (
        <>
            {isLoading ?<div></div>: error?<Message variant='danger'>{error}</Message>:(
                <Section>
                <Carousel pause='hover' className="bg-dark mb-4" style={{width:'100%',margin:'0',}} >
                
                    <Carousel.Item key={1}>
                        <Link to={`/product/653a20ddd78085818f46adc8`}>
                        <Image src='iphone.jpg'  alt="sale" fluid style={{display:'block',margin:'auto',border:'1px solid black',}} />
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item key={2}>
                        <Image src='sale1.png'  alt="sale" fluid style={{display:'block',margin:'auto',border:'1px solid black',}} />
                    </Carousel.Item>
                    <Carousel.Item key={3}>
                        <Link to={`/product/653a20ddd78085818f46adca`}>
                        <Image src='ps5-banner1.jpg'  alt="sale" fluid style={{display:'block',margin:'auto',border:'1px solid black',}} />
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item key={4}>
                        <Link to={`https://meetjoshi1703.github.io/Portfolio/`} target="_blank">
                        <Image src='portfolio1.png'  alt="sale" fluid style={{display:'block',margin:'auto',border:'1px solid black',}} />
                        </Link>
                    </Carousel.Item>


                    {/* {products.map(product=>(
                        <Carousel.Item key={product._id} >            
                            <Link to={`/product/${product._id}`}>
                            <div style={{display:'flex',margin:'0'}}>
                                <Image src={product.image} alt={product.name} fluid style={{display:'block',margin:'auto',border:'1px solid black',width:'40%'}}/>
                                <Image src={product.image} alt={product.name} fluid style={{display:'block',margin:'auto',border:'1px solid black',width:'40%'}}/>
                            </div>
                                <Carousel.Caption className="carousel-caption">
                                    <h4>   
                                        {product.name} (${product.price})
                                    </h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))} */}

                </Carousel> 
                </Section>
            )}
        </>
    )
}

export default ProductCarousel
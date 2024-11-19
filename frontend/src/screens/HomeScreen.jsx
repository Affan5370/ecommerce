import {Row,Col} from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
import FeaturedProducts from '../components/FeaturedProducts';
import styled from 'styled-components';


const Section = styled.section`
@media screen and (max-width: 550px) {
  p.card-text{
    display: none;
  }
  .product-title{
    white-space: wrap;
    height: 3em;
  }
}

`

const HomeScreen = () => {
  const { keyword } = useParams(); // Fetches the keyword from the URL

  const { data: products, isLoading, error } = useGetProductsQuery({ keyword : keyword || "" });
  
  let limitedProducts = [];
  if (products) {
    limitedProducts = products.slice(0, 8); // Limiting to 8 products
  }
  else{
    console.log("Error Fetching Products:", error);
  }

  return (
    <>
    
      {!keyword ? <ProductCarousel />:(
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )

      }

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
        <Section>
        <div>
          <FeaturedProducts />
        </div>
        <div>
          
          <h1>Latest Products</h1>          
          <Row>
            {limitedProducts.map((product)=>(
              <Col key={product._id} sm={6} md={6} lg={4} xl={3} xs={6}>
                  <Product product={product} />
              </Col>
            ))}
          </Row>

        </div>
        </Section>
        </>
      ) }

          
    </>
  )
}

export default HomeScreen;
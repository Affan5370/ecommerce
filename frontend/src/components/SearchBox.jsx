import { useState } from "react";
import {Form,Button} from 'react-bootstrap';    
import { useParams,useNavigate } from "react-router-dom";


const SearchBox = () => {

    const navigate = useNavigate();

    const {keyword:urlKeyword}= useParams;

    const [keyword,setKeyword] = useState(urlKeyword || '');

    const submitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/search/${keyword}`);
        }else{
            navigate('/');
        }
    }

  return (
    <Form onSubmit={submitHandler } classname='d-flex' style={{display:'flex'}}>
        <Form.Control
            type="text"
            name='q'
            onChange={(e)=>setKeyword(e.target.value)}
            value={keyword}
            placeholder="Search Products..."
            style={{width:'100%'}}
            className="mr-sm-2 ml-sm-5">
        </Form.Control>
        <Button type="submit" variant="outline-info" size="md" className="p-2 mx-2 search-button"  style={{ width: '100px', padding: '10px' }}>
            Search
        </Button>
    </Form>
  )
}

export default SearchBox
import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET/api/products
// @access Public
const getProducts = asyncHandler( async (req,res)=>{

    const keyword = req.query.keyword ? {name : {$regex:req.query.keyword,$options:'i'}}:{};    
    
    const products = await Product.find({...keyword});

    res.json(products);
});

// @desc Fetch a product
// @route GET/api/products/:id
// @access Public
const getProductById = asyncHandler( async (req,res)=>{
    const productId = req.params.id;
    console.log('Fetching product with ID:', productId);

    const product = await Product.findById({_id: productId});
    console.log('Fetched product:', product);

    if(product){
        return res.json(product);
    }else{
        res.status(404);
        throw new Error('Resource Not Found');
    }
});

// @desc Create a products
// @route POST/api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        image,
        brand,
        category,
        countInStock,
        price,
        description,
    } = req.body;

    // Validate required fields
    if (!name || !brand || !category || countInStock === undefined || !price || !description) {
        res.status(400);
        throw new Error("All required fields must be provided.");
    }

    const product = new Product({
        name,
        user: req.user._id, // Assuming user ID comes from the authenticated user
        image: image || 'images/sample.jpg', // Default image if not provided
        brand,
        category,
        countInStock,
        numReviews: 0,
        rating: 0,
        price,
        description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc Update a Product
// @route PUT/api/products/:id
// @access Private/Admin
const updateProduct =asyncHandler( async (req,res)=>{
    
    const {name,price,description,image,brand,category,countInStock}=req.body

    const product = await Product.findById(req.params.id);

    if(product){
        product.name=name;
        product.price=price;
        product.description=description;
        product.image=image;
        product.brand=brand;
        product.category=category;
        product.countInStock=countInStock;

        const updatedProduct = await product.save();

        res.json(updatedProduct)
    }else{
        res.status(404);
        throw new Error("Resource not found");
    }

});


// @desc Delete a Product
// @route DELETE/api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req,res)=>{
    const product =await Product.findById(req.params.id);

    if(product){
        await Product.deleteOne({_id:product._id})
        res.status(200).json({message:'Product Delted'});
    }else{
        res.status(404);
        throw new Error('Resource not found');
    }
})

// @desc Create a new review
// @route POST/api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req,res)=>{

    const {rating,comment}=req.body;

    const product =await Product.findById(req.params.id);

    if(product){
        const alreadyReviewed =product.reviews.find(
            (review)=>review.user.toString() === req.user._id.toString()
        );

        if(alreadyReviewed){
            res.status(400);
            throw new Error('Product Already Reviewed')
        }

        const review = {
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;

        product.rating=product.reviews.reduce((acc,review)=>acc+review.rating,0)/product.reviews.length;

        await product.save()

        res.status(201).json({message:'Review added'});
    }else{
        res.status(404); 
        throw new Error('Resource not found');
    }
})

//@desc Get top rated products
//@route GET/api/products/top
//@access Public

const getTopProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({}).sort({rating:-1}).limit(3);
    res.status(200).json(products)
})

// @desc Fetch products by category
// @route GET /api/products/category/:category
// @access Public
const getProductsByCategory = asyncHandler(async (req, res) => {
    const category = req.params.category;
    const products = await Product.find({ category: category });

    res.status(200).json(products);
});


export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
    getProductsByCategory,
};

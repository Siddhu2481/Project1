import Product from '../models/productModel.js';

// Fetch all products 
const getProducts = async(req, res) => {
    const products = await Product.find({});
    res.json(products);
}

// Fetch Single Product
const getProductById = async(req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
}

// Delete a Product
const deleteProduct = async(req, res) => {
    const product = await Product.findById(req.params.id);
    
    if(product) {
        await product.remove();
        res.json({ message: 'Product Removed' })
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
}

// Create a Product
const createProduct = async(req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        stock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
}

// Update a Product
const updateProduct = async(req, res) => {
    const {name, price, description, image, brand, category, stock} = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name;
        product.price = price;
        product.image = image;
        product.description = description;
        product.stock = stock;
        product.brand = brand;
        product.category = category;

        const updatedProduct = await product.save();
        res.json(updatedProduct);

    } else {
        res.status(404);
        alert('Product not found');
    }
}

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
}
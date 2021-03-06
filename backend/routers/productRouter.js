import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { isAuth, isAdmin, isSeller } from '../utils.js';

const productRouter = express.Router();

productRouter.post(
  '/',
  isAuth,
  isSeller,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'Sample Name',
      price: 0,
      seller: req.user._id,
      image: '/images/p1.jpg',
      brand: 'Sample Brand',
      category: 'Sample Category',
      coutInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'Sample Description',
    });
    const createdProduct = await product.save();
    res
      .status(201)
      .send({ message: 'Product Created', product: createdProduct });
  })
);

productRouter.put(
  '/:id',
  isAuth,
  isSeller,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    }
  })
);

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    const seller = req.query.seller ? { seller: req.query.seller } : {};
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    const count = await Product.count({ ...seller, ...keyword });
    const products = await Product.find({ ...seller, ...keyword })
      .populate(
        'seller',
        '_id seller.name seller.logo seller.rating seller.numReviews'
      )
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.send({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      'seller',
      '_id seller.name seller.logo seller.rating seller.numReviews'
    );
    res.send(product);
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deletedProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deletedProduct });
    } else {
      res.status(404).send('Product Not Found');
    }
  })
);

productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const review = {
        name: req.body.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      await product.save();
      res.status(201).send({ message: 'Review saved successfully' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default productRouter;

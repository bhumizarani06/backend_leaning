import express from "express";
import { GetProducts } from "./product.js";

const app = express();

app.use(express.json());

app.get("/products",(req,res) =>{
 res.status(200).json({
  success:true,
  data:GetProducts()
});
});

app.post("/products",(req,res) =>{
    const {name,price} = req.body;


if(typeof name !== "string" ||
    name.trim() === ""
    || typeof price !== "number" ||
    !Number.isFinite(price) ||
    price <=0
){
    return res.status(400).json({
        success : false,
        message:"valid name and positive price are  required"

    });


}

const products = GetProducts();
const newProduct = {
   id:Math.max(0,...products.map(p => p.id)) +1,
   name:name.trim(),
   price

};
products.push(newProduct);
 

    return res.status(201).json({
        success: true,
        data: newProduct
    });
});

app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID"
        });
    }

    const product = GetProducts().find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    return res.status(200).json({
        success: true,
        data: product
    });
});

export default app;
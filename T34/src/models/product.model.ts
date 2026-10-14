import mongoose, { Schema } from "mongoose";

export interface ProductRecord{
    name:string;
    sku:string;
    price:number;
    stock:number;
}

const productSchema = new Schema<ProductRecord>({
name:{
    type:String,
    required:true,
    trim:true},
    sku:{
           type:String,
           required:true,
           trim:true,
            unique: true

},
  price:{
     type:Number,
     required:true,
     min :0,
     validate:{
        validator:Number.isInteger,
        message:"stock always integer"
     }
  }
  ,
  stock: {
  type: Number,
  required: true,
  min: 0,
  validate: {
    validator: Number.isInteger,
    message: "Stock must be an integer"
  }
}
},
{
    timestamps:true
} );

productSchema.pre("save", function () {
  console.log("About to save a product:", this.name);
});

export const Product = mongoose.model<ProductRecord>(
    "product",
    productSchema
);
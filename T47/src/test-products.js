/*
const { getALLProducts } = require("./products");

   async function main()
   {
    try{
   const products = await getALLProducts();
    console.log("Products:", products);
    }
    catch(error)
    {
      console.error("Error::", error);
    }
    Error 
   }
   main();

   */
  //for the create product function
  /*
 const { createProduct } = require("./products");

 async function main()
 {
     try{
        const product = await createProduct("headphones","H123","electronics",15000);
        console.log("Product created:", product);
     } 
    catch(error)
    {
      console.error("Error::", error);
    }
    finally{
        process.exit();
    }
 }
 main();
 */
//for the get product by id function
/*
const { getProductById } = require("./products");

async function main()
{
    try{
        const product = await getProductById(1);
        console.log("Product found:", product);
    }
    catch(error)
    {
        console.error("Error::", error);
    }
    finally{
        process.exit();
    }
}
main();
*/
//for the update product function
/*
const { updateProduct } = require("./products");
    async function main()
    {
        try{
            const product = await updateProduct(1,"laptop",52000);
            console.log("Product updated:", product);
        }   

        catch(error)
        {
            console.error("Error::", error);
        }                                   
        finally{
            process.exit();
        }

    }
    main();
    */
   //for the delete product function
   /*
   const { deleteProduct } = require("./products");
   async function main()
   {
         try{

            const product = await deleteProduct(1);
            console.log("Product deleted:", product);
            }

        catch(error)
        {
            console.error("Error::", error);
        }

        finally{
            process.exit();
        }
    }
    main();

*/

const { upsertProduct } = require("./products");
const pool = require("./db");

async function testUpsert() {
  try {
    const product = await upsertProduct(
      " updated Test Headphones",
      "UPSERT_TEST_01",
      "Electronics",
      18000
    );

    console.log("Upsert result:", product);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await pool.end();
  }
}

testUpsert();



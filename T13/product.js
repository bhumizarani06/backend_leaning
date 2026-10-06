/*
const products = [
    {
        id:1,
        name:"laptop",
        price:25000

    },
    {
        id:2,
        name:"phone",
        price:50000

    },
    {
       id:3,
        name:"keyboard",
        price:2000
    }
];

function findProduct(id){
    return new Promise((resolve,reject) =>
    {
        setTimeout(() => {
            const product = products.find((item) => item.id === id);
        
            if(product)
            {
                resolve(product);

            }
            else{
                reject(new Error("product new found"));
            }
        },1000);
    });
}

findProduct(99).then((product)=>
{
  console.log("product:",product);
})
.catch((error) =>
{
    console.log("ERROR:",error.message);
})
.finally(() =>
{
console.log("lookup finished");
});
*/
const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Phone", price: 25000 },
    { id: 3, name: "Keyboard", price: 2000 }
];

function findProduct(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = products.find((item) => item.id === id);

            if (product) {
                resolve(product);
            } else {
                reject(new Error("Product not found"));
            }
        }, 1000);
    });
}

async function loadProduct() {
    console.log("Looking for product...");

    try {
        const product = await findProduct(99);

        console.log("Product:", product);
    } catch (error) {
        console.log("Error:", error.message);
    } finally {
        console.log("Lookup finished");
    }
}

loadProduct();
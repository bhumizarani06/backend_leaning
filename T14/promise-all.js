function loadCustomers(){
    return new Promise((resolve) =>{
setTimeout(() =>{
     console.log("customer loaded");
     resolve(["bhumi","prerna"])
},2000);
    });
}

function loadProducts()
{
    return new Promise((resolve,reject) =>{
       setTimeout(() =>
    {
        console.log("products failed");
        reject(new Error("product service failed"));
    },1000);
    });
}

function loadOrders(){
    return new Promise((resolve) =>{
             setTimeout(() =>{
                   console.log("orders loaded");
                   resolve(["order-101","order-102"]);
             },3000);
    });
}

async function main(){
    try{
        const[customers,products,orders] = await Promise.all([
               loadCustomers(),
               loadProducts(),
               loadOrders()
      
        ]);
        console.log("Customers:", customers);
        console.log("Products:", products);
        console.log("Orders:", orders);
    }
    catch(error)
    {
console.log("Promise.all failed:", error.message);
    }
     console.log("Main function finished");
}
main();
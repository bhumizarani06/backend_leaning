function findProduct(id) {
    const products = [
        { id: 1, name: "Laptop", price: 50000 },
        { id: 2, name: "Phone", price: 25000 },
        { id: 3, name: "Keyboard", price: 2000 }
    ];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = products.find((item) => item.id === id);

            if (product) {
                resolve(product);
            } else {
                reject(new Error("Product not found"));
            }
        }, 500);
    });
}

async function testResolvedProduct() {
    try {
        const product = await findProduct(1);

        console.log("Resolved test: PASS");
        console.log(product);
    } catch (error) {
        console.log("Resolved test: FAIL");
        console.log(error.message);
    }
}

async function testRejectedProduct() {
    try {
        await findProduct(99);

        console.log("Rejected test: FAIL");
    } catch (error) {
        console.log("Rejected test: PASS");
        console.log(error.message);
    }
}

async function runTests() {
    await testResolvedProduct();
    await testRejectedProduct();

    console.log("All tests completed");
}

runTests();

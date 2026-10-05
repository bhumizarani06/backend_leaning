


const jsonData = '{"name":"Pizza","price":200}';

try {
    const product = JSON.parse(jsonData);

    console.log("Name:", product.name);
    console.log("Price:", product.price);
} catch (error) {
    console.log("Invalid JSON:", error.message);
}
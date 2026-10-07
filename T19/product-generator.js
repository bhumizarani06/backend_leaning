function* generateProducts(count) {
    for (let i = 1; i <= count; i++) {
        yield {
            id: i,
            name: `Product ${i}`,
            category: i % 2 === 0 ? "Electronics" : "Home",
            price: i * 10,
            quantity: i + 5
        };
    }
}

const products = generateProducts(5);

for (const product of products) {
    console.log(product);
}
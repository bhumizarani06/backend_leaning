
let products = [
    {
        id: 1,
        name: "laptop",
        price: 56990
    },
    {
        id: 2,
        name: "mobile",
        price: 25000
    }
];

export function GetProducts() {
    return products;
}

export function resetProducts() {
    products = [
        {
            id: 1,
            name: "laptop",
            price: 56990
        },
        {
            id: 2,
            name: "mobile",
            price: 25000
        }
    ];
}

export default GetProducts;


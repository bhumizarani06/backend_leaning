/*
class InventoryService {
    constructor(products) {
        this.products = products;
    }

    getStock(productId) {
        const product = this.products.find(
            (product) => product.id === productId
        );

        if (!product) {
            throw new Error("Product not found");
        }

        return product.stock;
    }

    reserve(productId, quantity) {
        const product = this.products.find(
            (product) => product.id === productId
        );

        if (!product) {
            throw new Error("Product not found");
        }

        if (quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }

        if (product.stock < quantity) {
            throw new Error("Insufficient stock");
        }

        product.stock -= quantity;

        return product.stock;
    }

    release(productId, quantity) {
        const product = this.products.find(
            (product) => product.id === productId
        );

        if (!product) {
            throw new Error("Product not found");
        }

        if (quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }

        product.stock += quantity;

        return product.stock;
    }
}


const inventory = new InventoryService([
    { id: "P001", name: "Laptop", stock: 5 },
    { id: "P002", name: "Mouse", stock: 10 },
    { id: "P003", name: "Keyboard", stock: 3 }
]);

console.log("Laptop stock:", inventory.getStock("P001"));

console.log("Reserve 2 laptops:", inventory.reserve("P001", 2));

console.log("Laptop stock:", inventory.getStock("P001"));

console.log("Release 1 laptop:", inventory.release("P001", 1));

console.log("Laptop stock:", inventory.getStock("P001"));

try {
    inventory.reserve("P003", 10);
} catch (error) {
    console.log("Error:", error.message);
}

console.log("Mouse stock:", inventory.getStock("P002"));

console.log("Reserve 2 mice:", inventory.reserve("P002", 2));

console.log("Reserve 3 mice:", inventory.reserve("P002", 3));

console.log("Mouse stock:", inventory.getStock("P002"));
try {
    inventory.reserve("P002", 10);
} catch (error) {
    console.log("Error:", error.message);
}

const user = {
    name: "Bhumi",

    regular: function () {
        console.log("Regular:", this.name);
    },

    arrow: () => {
        console.log("Arrow:", this.name);
    }
};

user.regular();
user.arrow();

//inheritance and composition

class User {
    constructor(name) {
        this.name = name;
    }

    login() {
        console.log(this.name + " logged in");
    }
}

class Admin extends User {
    deleteUser() {
        console.log(this.name + " deleted a user");
    }
}

const admin = new Admin("Bhumi");

admin.login();
admin.deleteUser();

//composition
class Engine {
    start() {
        console.log("Engine started");
    }
}

class Car {
    constructor(engine) {
        this.engine = engine;
    }

    drive() {
        this.engine.start();
        console.log("Car is driving");
    }
}

const engine = new Engine();

const car = new Car(engine);

car.drive();

//function 
class Calculator {
    calculateTotal(price, quantity) {
        return price * quantity;
    }
}

const calculator = new Calculator();

console.log(calculator.calculateTotal(100, 3));
console.log(calculator.calculateTotal(250, 2));

//example2
class Inventory {
    constructor(stock) {
        this.stock = stock;
    }

    getStock() {
        return this.stock;
    }

    reserve(quantity) {
        this.stock -= quantity;
    }

    release(quantity) {
        this.stock += quantity;
    }
}

const simpleInventory = new Inventory(5);

console.log(simpleInventory.getStock());

simpleInventory.reserve(2);

console.log(simpleInventory.getStock());

simpleInventory.release(1);

console.log(simpleInventory.getStock());
*/

function createUser(name)
{
    return{
        sayHello(){
            console.log("hello" +name);
        }
    };
}
const  user1 = createUser("bhumi");
user1.sayHello();

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}


export interface CartItem {
    product: Product;
    quantity: number;
}


export type OrderStatus =
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled";


export interface Order {
    id: number;
    items: CartItem[];
    totalAmount: number;
    status: OrderStatus;
}


export interface Customer {
    name: string;
    phoneNumber?: string;
}

export interface Delivery {
    deliveryDate: string | null;
}

const apple: Product = {
    id: 1,
    name: "Apple",
    price: 50,
    stock: 100
};

const milk: Product = {
    id: 2,
    name: "Milk",
    price: 60,
    stock: 20
};


const order: Order = {
    id: 101,
    items: [
        {
            product: apple,
            quantity: 3
        },
        {
            product: milk,
            quantity: 2
        }
    ],
    totalAmount: 270,
    status: "pending"
};


console.log("Order ID:", order.id);
console.log("Order items:", order.items.length);
console.log("Total amount:", order.totalAmount);
console.log("Order status:", order.status);




const customer: Customer = {
    name: "Bhumi"
};

const delivery: Delivery = {
    deliveryDate: null
};

console.log("Customer:", customer.name);
console.log("Phone:", customer.phoneNumber);
console.log("Delivery date:", delivery.deliveryDate);


function describeStatus(status: OrderStatus): string {
    if (status === "pending") {
        return "Order is waiting for confirmation";
    }

    if (status === "confirmed") {
        return "Order has been confirmed";
    }

    if (status === "shipped") {
        return "Order is on the way";
    }

    if (status === "delivered") {
        return "Order has been delivered";
    }

    return "Order has been cancelled";
}

console.log(describeStatus("pending"));
console.log(describeStatus("shipped"));


export type ValidationResult =
    | { success: true; value: number }
    | { success: false; error: string };

function validateQuantity(quantity: number): ValidationResult {
    if (!Number.isInteger(quantity) || quantity <= 0) {
        return {
            success: false,
            error: "Quantity must be a positive integer"
        };
    }

    return {
        success: true,
        value: quantity
    };
}

function printValidationResult(result: ValidationResult): void {
    if (result.success) {
        console.log("Valid quantity:", result.value);
    } else {
        console.log("Validation error:", result.error);
    }
}

printValidationResult(validateQuantity(3));
printValidationResult(validateQuantity(0));
printValidationResult(validateQuantity(-2));

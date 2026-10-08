class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  getProducts() {
    return this.productRepository.getAll();
  }

  getProduct(id) {
    return this.productRepository.getById(id);
  }

  createProduct(item) {
    if (!item.name) {
      throw new Error("Product name is required");
    }

    if (
      typeof item.price !== "number" ||
      item.price <= 0
    ) {
      throw new Error("Product price must be greater than 0");
    }

    if (
      !Number.isInteger(item.stock) ||
      item.stock < 0
    ) {
      throw new Error("Product stock cannot be negative");
    }

    return this.productRepository.create(item);
  }

  updateProduct(id, updates) {
    const item = this.productRepository.getById(id);

    if (!item) {
      throw new Error("Product not found");
    }

    if (
      updates.price !== undefined &&
      (
        typeof updates.price !== "number" ||
        updates.price <= 0
      )
    ) {
      throw new Error("Product price must be greater than 0");
    }

    if (
      updates.stock !== undefined &&
      (
        !Number.isInteger(updates.stock) ||
        updates.stock < 0
      )
    ) {
      throw new Error("Product stock cannot be negative");
    }

    return this.productRepository.update(id, updates);
  }

  deleteProduct(id) {
    const item = this.productRepository.getById(id);

    if (!item) {
      throw new Error("Product not found");
    }

    return this.productRepository.delete(id);
  }

  purchaseProduct(id, quantity) {
    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      throw new Error("Quantity must be a positive integer");
    }

    const item = this.productRepository.getById(id);

    if (!item) {
      throw new Error("Product not found");
    }

    if (item.stock < quantity) {
      throw new Error("Insufficient stock");
    }

    const newStock = item.stock - quantity;

    this.productRepository.update(id, {
      stock: newStock
    });

    return {
      productId: item.id,
      productName: item.name,
      quantity,
      total: item.price * quantity,
      remainingStock: newStock
    };
  }

  calculateReward(amount) {
    if (amount >= 500) {
      return 3500;
    }

    if (amount >= 250) {
      return 2500;
    }

    if (amount >= 100) {
      return 1000;
    }

    return 0;
  }
}

export default ProductService;
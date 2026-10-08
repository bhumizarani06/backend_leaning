class FakeProductRepository {
  constructor() {
    this.products = [
      {
        id: 1,
        name: "Pen",
        price: 50,
        stock: 5
      }
    ];
  }

  getAll() {
    return this.products;
  }

  getById(id) {
    return this.products.find(
      product => product.id === id
    );
  }

  create(product) {
    this.products.push(product);
    return product;
  }

  update(id, updates) {
    const index = this.products.findIndex(
      product => product.id === id
    );

    if (index === -1) {
      return null;
    }

    this.products[index] = {
      ...this.products[index],
      ...updates
    };

    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex(
      product => product.id === id
    );

    if (index === -1) {
      return false;
    }

    this.products.splice(index, 1);

    return true;
  }
}

export default FakeProductRepository;
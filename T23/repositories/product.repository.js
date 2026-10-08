class ProductRepository {
  constructor() {
    this.products = [
      {
        id: 1,
        name: "Pen",
        price: 50,
        stock: 5
      },
      {
        id: 2,
        name: "Pencil",
        price: 10,
        stock: 10
      },
      {
        id: 3,
        name: "Rubber",
        price: 5,
        stock: 12
      }
    ];
  }

  getAll() {
    return this.products;
  }

  getById(id) {
    return this.products.find(
      item => item.id === id
    );
  }

  create(item) {
    this.products.push(item);
    return item;
  }

  update(id, updates) {
    const index = this.products.findIndex(
      item => item.id === id
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
      item => item.id === id
    );

    if (index === -1) {
      return false;
    }

    this.products.splice(index, 1);

    return true;
  }
}

export default ProductRepository;
class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getProducts = (req, res) => {
    const products = this.productService.getProducts();

    res.status(200).json(products);
  };

  getProduct = (req, res) => {
    const id = Number(req.params.id);

    const product = this.productService.getProduct(id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.status(200).json(product);
  };

  createProduct = (req, res) => {
    try {
      const product = this.productService.createProduct(req.body);

      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({
        error: error.message
      });
    }
  };

  updateProduct = (req, res) => {
    try {
      const id = Number(req.params.id);

      const product = this.productService.updateProduct(
        id,
        req.body
      );

      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({
        error: error.message
      });
    }
  };

  deleteProduct = (req, res) => {
    try {
      const id = Number(req.params.id);

      this.productService.deleteProduct(id);

      res.status(204).send();
    } catch (error) {
      res.status(404).json({
        error: error.message
      });
    }
  };

  purchaseProduct = (req, res) => {
    try {
      const id = Number(req.params.id);
      const quantity = Number(req.body.quantity);

      const result = this.productService.purchaseProduct(
        id,
        quantity
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        error: error.message
      });
    }
  };
}

export default ProductController;
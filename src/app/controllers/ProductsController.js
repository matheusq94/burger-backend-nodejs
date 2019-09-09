import Product from '../models/Product';
import Category from '../models/Category';

class ProductsController {
  async index(req, res) {
    const response = await Category.findAll({
      include: {
        model: Product,
      },
    });

    return res.status(200).json(response);
  }

  async store(req, res) {
    const { name, price, image_url, description, category_id } = req.body;

    const response = await Product.create({
      name,
      price,
      image_url,
      description,
      category_id,
    });

    return res.status(200).json(response);
  }
}

export default new ProductsController();

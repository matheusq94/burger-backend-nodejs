import Category from '../models/Category';

class CategoriesController {
  async index(req, res) {
    const response = await Category.findAll();

    return res.status(200).json(response);
  }

  async store(req, res) {
    const response = await Category.create(req.body);

    return res.status(200).json({
      sucess: true,
      message: 'Category sucessfully created.',
      payload: response,
    });
  }
}

export default new CategoriesController();

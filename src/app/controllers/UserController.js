class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    return res.status(200).json({
      name,
      email,
      password,
    });
  }
}

export default new UserController();

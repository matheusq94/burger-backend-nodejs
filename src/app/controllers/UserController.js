import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    // Validação com Yup
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.number()
        .min(8)
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Verifica se o e-mail ja foi registrado no banco de dados.
    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(401).json({ error: 'E-mail ja registrado.' });
    }

    // Verifica se o telefone ja foi registrado no banco de dados.
    const phoneExists = await User.findOne({
      where: { phone: req.body.phone },
    });

    if (phoneExists) {
      return res.status(401).json({ error: 'Telefone ja registrado.' });
    }

    // Insere o novo usuário no banco
    const { id, name, email, phone } = await User.create(req.body);

    return res.status(200).json({
      id,
      name,
      email,
      phone,
    });
  }

  async update(req, res) {
    // Validação com Yup
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      phone: Yup.number().min(8),
      oldPassword: Yup.string().min(6),
      pasword: Yup.string()
        .min(6)
        /*
        Validação condicional: Caso oldPassword esteja preenchido,
        o campo password será obrigatório
        */
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, phone, oldPassword, userId } = req.body;

    const user = await User.findByPk(userId);

    if (email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });

      if (emailExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }
    if (phone) {
      if (phone !== user.phone) {
        const phoneExists = await User.findOne({ where: { phone } });

        if (phoneExists) {
          return res.status(400).json({ error: 'Phone number already exists' });
        }
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.status(200).json({
      id,
      name,
      email,
      phone,
    });
  }
}

export default new UserController();

import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.INTEGER,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    // Os hooks do Sequelize são executados antes dos dados serem salvos no banco.
    this.addHook('beforeSave', async user => {
      // Verificação para gerar um novo hash sempre que o usuário cadastrar uma nova senha.
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    // Compara a senha informada pelo usuário no login com a senha salva no banco.
    // Retorna true or false.
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;

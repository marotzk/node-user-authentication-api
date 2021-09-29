import db from '../db';
import DatabaseError from '../models/errors/database.error.model';
import User from '../models/user.model';
require('dotenv/config');

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    try {
      const query = `
        SELECT uuid, email
        FROM application_user
      `;

      const { rows } = await db.query(query);
      return rows || [];
    } catch (err) {
      throw new DatabaseError('Erro na consulta', err);
    }

  }

  async findById(uuid: string): Promise<User> {
    try {
      const query = `
      SELECT uuid, email 
      FROM application_user 
      WHERE uuid = $1
    `;

      const values = [uuid];
      const { rows } = await db.query(query, values);
      const [user] = rows;
      return user || {};
    } catch (err) {
      throw new DatabaseError('Erro na consulta por ID', err);
    }

  }

  async create(email: string, password: string): Promise<string> {
    try {
      const script = `
      INSERT INTO application_user (email, password)
      VALUES ($1, crypt( $2, $3))
    `;
      const values = [email, password, process.env.CRYPT];
      await db.query(script, values);
      return 'User Created!';
    } catch (err) {
      throw new DatabaseError('Erro na inserção do usuário', err);
    }
  }

  async update(user: User): Promise<void> {
    try {
      const script = `
      UPDATE application_user 
      SET 
        email = $1,
        password = crypt($2, $3)
      WHERE uuid = $4
    `;

      const values = [user.email, user.password, process.env.CRYPT, user.uuid];
      await db.query(script, values);
    } catch (err) {
      throw new DatabaseError('Erro na atualização do usuário', err);
    }
  }

  async destroy(uuid: string): Promise<void> {
    try {
      const script = `
      DELETE FROM application_user 
      WHERE uuid = $1
    `;

      const values = [uuid];
      await db.query(script, values);
    } catch (err) {
      throw new DatabaseError('Erro ao deletar usuário', err);
    }
  }
}

export default new UserRepository();
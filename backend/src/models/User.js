class User {
  constructor(userData) {
    this.id = userData.id;
    this.email = userData.email;
    this.password = userData.password; // Em produção, usar hash
    this.role = userData.role;
    this.name = userData.name;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Seed data - usuários iniciais do sistema
   * @returns {Array} Lista de usuários padrão
   */
  static getSeedUsers() {
    return [
      {
        id: 1,
        email: "prof@educatrix.dev",
        password: "123456", // Em produção: bcrypt.hashSync("123456", 10)
        role: "professor",
        name: "Professor Educatrix",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        email: "aluno@educatrix.dev",
        password: "123456",
        role: "aluno",
        name: "Aluno Educatrix",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 3,
        email: "admin@educatrix.dev",
        password: "123456",
        role: "admin",
        name: "Admin Educatrix",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  /**
   * Encontra usuário por email
   * @param {string} email - Email do usuário
   * @returns {Object|null} Usuário encontrado ou null
   */
  static findByEmail(email) {
    const users = User.getSeedUsers();
    return users.find((user) => user.email === email) || null;
  }
}

export default User;

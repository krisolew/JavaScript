class TeachersRepository {  
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS teachers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
        )`
      return this.dao.run(sql)
    }

    create(name) {
        return this.dao.run(
          `INSERT INTO teachers (name)
            VALUES (?)`,
            [name])
    }

    getById(id) {
        return this.dao.get(
          `SELECT * FROM teachers WHERE id = ?`,
          [id]
        )
    }

    getAll() {
        return this.dao.all(`SELECT * FROM teachers`)
    }

    delete(id) {
        return this.dao.run(
          `DELETE FROM teachers WHERE id = ?`,
          [id]
        )
      }
  }
  
  module.exports = TeachersRepository; 
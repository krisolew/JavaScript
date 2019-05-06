class StudentsRepository {  
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
        )`
      return this.dao.run(sql)
    }

    create(name) {
        return this.dao.run(
          `INSERT INTO students (name)
            VALUES (?)`,
            [name])
    }

    getById(id) {
        return this.dao.get(
          `SELECT * FROM students WHERE id = ?`,
          [id]
        )
    }

    getAll() {
        return this.dao.all(`SELECT * FROM students`)
    }

    delete(id) {
        return this.dao.run(
          `DELETE FROM students WHERE id = ?`,
          [id]
        )
      }
  }
  
  module.exports = StudentsRepository;
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
          `INSERT INTO tasks (name)
            VALUES (?, ?, ?, ?)`,
            [name])
    }

    getById(id) {
        return this.dao.get(
          `SELECT * FROM projects WHERE id = ?`,
          [id]
        )
    }

    getAll() {
        return this.dao.all(`SELECT * FROM projects`)
    }
  }
  
  module.exports = StudentsRepository;
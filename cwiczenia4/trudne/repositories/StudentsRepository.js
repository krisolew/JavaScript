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
  }
  
  module.exports = StudentsRepository;
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
  }
  
  module.exports = TeachersRepository; 
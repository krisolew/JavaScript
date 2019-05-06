class SubjectsRepository {  
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        teacherId INTEGER,
        CONSTRAINT teacher_fk FOREIGN KEY (teacherId)
          REFERENCES teachers(id) ON UPDATE CASCADE ON DELETE CASCADE
        )`
      return this.dao.run(sql)
    }
  }
  
  module.exports = SubjectsRepository;
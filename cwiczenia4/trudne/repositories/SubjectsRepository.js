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

    create(name, teacherId) {
        return this.dao.run(
          `INSERT INTO tasks (name, teacherId)
            VALUES (?, ?, ?, ?)`,
            [name, teacherId])
    }

    getById(id) {
        return this.dao.get(
          `SELECT * FROM projects WHERE id = ?`,
          [id]
        )
    }
  }
  
  module.exports = SubjectsRepository;
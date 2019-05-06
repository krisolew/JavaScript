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
          `INSERT INTO subjects (name, teacherId)
            VALUES (?, ?)`,
            [name, teacherId])
    }

    getById(id) {
        return this.dao.get(
          `SELECT * FROM subjects WHERE id = ?`,
          [id]
        )
    }

    getAll() {
      return this.dao.all(`SELECT * FROM subjects`)
    }

    delete(id) {
        return this.dao.run(
          `DELETE FROM subjects WHERE id = ?`,
          [id]
        )
      }
  }
  
  module.exports = SubjectsRepository;
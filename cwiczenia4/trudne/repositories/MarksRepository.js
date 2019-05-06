class MarksRepository {  
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS marks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value INTEGER,
        studentId INTEGER,
        subjectId INTEGER,
        CONSTRAINT subject_fk FOREIGN KEY (subjectId)
          REFERENCES subjects(id) ON UPDATE CASCADE ON DELETE CASCADE
        CONSTRAINT student_fk FOREIGN KEY (studentId)
          REFERENCES students(id) ON UPDATE CASCADE ON DELETE CASCADE
        )`
      return this.dao.run(sql)
    }

    create(value, studentId, subjectId) {
        return this.dao.run(
          `INSERT INTO marks (value, studentId, subjectId)
            VALUES (?, ?, ?)`,
            [value, studentId, subjectId])
    }

    getById(id) {
        return this.dao.get(
          `SELECT * FROM marks WHERE id = ?`,
          [id]
        )
    }

    getAll() {
      return this.dao.all(`SELECT * FROM marks`)
    }

    delete(id) {
      return this.dao.run(
        `DELETE FROM marks WHERE id = ?`,
        [id]
      )
    }
  }
  
  module.exports = MarksRepository;
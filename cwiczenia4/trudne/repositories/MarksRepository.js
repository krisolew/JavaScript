class MarksRepository {  
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS marks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value INTEGER,
        teacherId INTEGER,
        studentId INTEGER,
        subjectId INTEGER,
        CONSTRAINT teacher_fk FOREIGN KEY (teacherId)
          REFERENCES teachers(id) ON UPDATE CASCADE ON DELETE CASCADE
        CONSTRAINT subject_fk FOREIGN KEY (subjectId)
          REFERENCES subjects(id) ON UPDATE CASCADE ON DELETE CASCADE
        CONSTRAINT student_fk FOREIGN KEY (studentId)
          REFERENCES students(id) ON UPDATE CASCADE ON DELETE CASCADE
        )`
      return this.dao.run(sql)
    }

    create(value, teacherId, studentId, subjectId) {
        return this.dao.run(
          `INSERT INTO marks (value, teacherId, studentId, subjectId)
            VALUES (?, ?, ?, ?)`,
            [value, teacherId, studentId, subjectId])
    }

    getById(id) {
        return this.dao.get(
          `SELECT * FROM marks WHERE id = ?`,
          [id]
        )
    }

    delete(id) {
      return this.dao.run(
        `DELETE FROM marks WHERE id = ?`,
        [id]
      )
    }
  }
  
  module.exports = MarksRepository;
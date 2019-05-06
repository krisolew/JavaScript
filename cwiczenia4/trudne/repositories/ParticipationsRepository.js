class ParticipationsRepository {  
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS Participations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        studentId INTEGER,
        subjectId INTEGER,
        CONSTRAINT subject_fk FOREIGN KEY (subjectId)
          REFERENCES subjects(id) ON UPDATE CASCADE ON DELETE CASCADE
        CONSTRAINT student_fk FOREIGN KEY (studentId)
          REFERENCES students(id) ON UPDATE CASCADE ON DELETE CASCADE
        )`
      return this.dao.run(sql)
    }

    create(studentId, subjectId) {
        return this.dao.run(
          `INSERT INTO participations (studentId, subjectId)
            VALUES (?, ?)`,
            [studentId, subjectId])
    }

    getById(id) {
        return this.dao.get(
          `SELECT * FROM participations WHERE id = ?`,
          [id]
        )
    }

    getAll() {
      return this.dao.all(`SELECT * FROM participations`)
    }

    delete(id) {
        return this.dao.run(
          `DELETE FROM participations WHERE id = ?`,
          [id]
        )
      }
  }
  
  module.exports = ParticipationsRepository;
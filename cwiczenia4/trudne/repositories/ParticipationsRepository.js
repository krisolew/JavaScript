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
  }
  
  module.exports = ParticipationsRepository;
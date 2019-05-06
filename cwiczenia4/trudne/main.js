const Promise = require('bluebird');
const AppDAO = require('./dao');
const SubjectsRepository = require('./repositories/SubjectsRepository');  
const StudentsRepository = require('./repositories/StudentsRepository');
const TeachersRepository = require('./repositories/TeachersRepository');
const MarksRepository = require('./repositories/MarksRepository');
const ParticipationsRepository = require('./repositories/ParticipationsRepository');

function main() {  
    const dao = new AppDAO('./database.sqlite3');
    //const blogProjectData = { name: 'Write Node.js - SQLite Tutorial' };
    const SubjectRepo = new SubjectsRepository(dao);
    const StudentsRepo = new StudentsRepository(dao);
    const TeachersRepo = new TeachersRepository(dao);
    const MarksRepo = new MarksRepository(dao);
    const ParticipationsRepo = new ParticipationsRepository(dao);
    var teacherId;

    const teacherData = { name: "Some teacher" };

    TeachersRepo.createTable()
        .then(() => TeachersRepo.create(teacherData.name))
        .then((data) => console.log(data.id)
        //teacherId = data.Id
        //TeachersRepo.getById(data.Id)
        )
        //.then((data) => console.log(data.name))
        //.then(() => console.log(`teacher id = ${teacherId}`))
        .then(() => TeachersRepo.getAll() )
        .then((data) => 
            console.log(data[0])
            
        )
}

main();

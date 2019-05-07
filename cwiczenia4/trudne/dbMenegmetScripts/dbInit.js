const Promise = require('bluebird');
const AppDAO = require('../dao');
const SubjectsRepository = require('../repositories/SubjectsRepository');  
const StudentsRepository = require('../repositories/StudentsRepository');
const TeachersRepository = require('../repositories/TeachersRepository');
const MarksRepository = require('../repositories/MarksRepository');
const ParticipationsRepository = require('../repositories/ParticipationsRepository');

function main() {  
    const dao = new AppDAO('../database.sqlite3');
    const SubjectRepo = new SubjectsRepository(dao);
    const StudentsRepo = new StudentsRepository(dao);
    const TeachersRepo = new TeachersRepository(dao);
    const MarksRepo = new MarksRepository(dao);
    const ParticipationsRepo = new ParticipationsRepository(dao);
    var teacherId;

    const teacherData1 = { name: "Kamil Bak" };
    const teacherData2 = { name: "Michal Nowak" };
    const teacherData3 = { name: "Krzysztof Stary" };

    const studentData1 = { name: "Jakub Bukaj" }
    const studentData2 = { name: "Agata Kulig" };
    const studentData3 = { name: "Przemyslaw Worek" };

    const subjectData1 = { name: "Matematyka" };
    const subjectData2 = { name: "Informatyka" };
    const subjectData3 = { name: "Fizyka" };

    TeachersRepo.createTable()
    StudentsRepo.createTable()
    SubjectRepo.createTable()
    MarksRepo.createTable()
    ParticipationsRepo.createTable()
    .then(() => TeachersRepo.create(teacherData1.name))
    .then((data) => {
        SubjectRepo.create(subjectData1.name, data.id)
    })
    .then(() => TeachersRepo.create(teacherData2.name))
    .then((data) => {
        SubjectRepo.create(subjectData2.name, data.id)
    })
    .then(() => TeachersRepo.create(teacherData3.name))
    .then((data) => {
        SubjectRepo.create(subjectData3.name, data.id)
    })

    .then(() => StudentsRepo.create(studentData1.name))
    .then(() => StudentsRepo.create(studentData2.name))
    .then(() => StudentsRepo.create(studentData3.name))
    

}

main();

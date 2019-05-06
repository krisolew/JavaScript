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
    

    
    TeachersRepo.getAll()
    .then((data) => console.log(data))

    StudentsRepo.getAll()
    .then((data) => console.log(data))

    SubjectRepo.getAll()
    .then((data) => console.log(data))

    MarksRepo.getAll()
    .then((data) => console.log(data))

    ParticipationsRepo.getAll()
    .then((data) => console.log(data))
}

main();

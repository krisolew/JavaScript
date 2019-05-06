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
    .then((data) => { 
        for(var i=0; i<data.length; i++)
        {
            TeachersRepo.delete(data[i].id)
        }
    })

    StudentsRepo.getAll()
    .then((data) => { 
        for(var i=0; i<data.length; i++)
        {
            StudentsRepo.delete(data[i].id)
        }
    })

    SubjectRepo.getAll()
    .then((data) => { 
        for(var i=0; i<data.length; i++)
        {
            StudentsRepo.delete(data[i].id)
        }
    })

    MarksRepo.getAll()
    .then((data) => { 
        for(var i=0; i<data.length; i++)
        {
            StudentsRepo.delete(data[i].id)
        }
    })

    ParticipationsRepo.getAll()
    .then((data) => { 
        for(var i=0; i<data.length; i++)
        {
            StudentsRepo.delete(data[i].id)
        }
    })
}

main();

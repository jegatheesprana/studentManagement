const Exam = require('../models/Exam');
const Class = require('../models/Class')
const User = require('../models/User')
const moment = require('moment')

const listAll = (req, res) => {
    Exam.listAll()
        .then(result => {
            const events = result.map(resu => ({ title: resu.subject, start: resu.date, allday: false, backgroundColor: '#0073b7', borderColor: '#0073b7' }))
            res.render('exams', { data: result, moment, events });
        })
        .catch(console.log)
}

const manage = (req, res) => {
    Exam.listAll()
        .then(result => {
            res.render('exams/manage', { data: result, moment });
        })
        .catch(console.log)
}

const initiate = async (req, res) => {
    const { _id: lastClass } = await Class.findLast()
    //const lastClass = false
    if (lastClass) {
        Exam.initiate(lastClass)
            .then(result => {
                res.redirect('/exams/edit/' + result._id);
            })
            .catch(console.log)
    } else {
        res.render('error', { message: 'Please add any class', parent: 'Exams', child: 'Add Exam' })
    }
}

const viewEidtPage = async (req, res) => {
    const { id } = req.params;
    const classes = await Class.listAll();
    Exam.findOne(id)
        .then(result => {
            res.render('exams/edit', { data: result, classes, moment })
        })
        .catch(console.log)
}

const update = (req, res) => {
    const { id } = req.params;
    const { date, subject, classId, isFinished } = req.body;
    Exam.update(id, date, subject, classId, isFinished)
        .then(result => {
            res.redirect('/exams')
        })
        .catch(console.log);
}

const deleteOne = (req, res) => {
    const { id } = req.params;
    Exam.deleteOne(id)
        .then(result => {
            res.redirect('/exams')
        })
        .catch(console.log);
}

const resultSelectExam = (req, res) => {
    Exam.listAll()
        .then(data => {
            res.render('exams/selectExam', { data, moment, parent: 'Exams', child: 'Results', link: '/exams/results/' });
        })
        .catch(console.log)
}

const findWithResult = (req, res) => {
    const { examId } = req.params;
    Exam.findWithResult(examId)
        .then(([data]) => {
            res.render('exams/results', { data, moment, parent: 'Exams', child: 'Results' })
        })
        .catch(console.log)
}

const addResultSelectExam = (req, res) => {
    Exam.listAll()
        .then(data => {
            res.render('exams/selectExam', { data, moment, child: 'Add Result', parent: 'Exams', link: '/exams/addResult/' });
        })
        .catch(console.log)
}

const viewAddResultsPage = (req, res) => {
    const { examId } = req.params;
    Exam.findWithResult(examId)
        .then(async ([data]) => {
            const students = await Class.getClassStudents(data.classId).then(allStudents => allStudents[0].students)
            // students.filter(student => !data.results.find(res => res.studentId.toString() === student._id.toString()))
            res.render('exams/editResult', { data, moment, students });
        })
        .catch(console.log)
}

const addResultItem = (req, res) => {
    const { examId } = req.params;
    const { studentId, result } = req.body;
    Exam.addResultItem(examId, studentId, result)
        .then(({ _id }) => {
            res.redirect('/exams/addResult/' + examId);
        })
        .catch(console.log)
}

const initiateResult = async (req, res) => {
    const { examId } = req.params;
    const [student] = await User.getStudents();
    Exam.initiateResult(examId, student._id)
        .then(({ _id }) => {
            res.redirect('/exams/resultItem/' + _id);
        })
        .catch(console.log)
}

const viewResultItem = (req, res) => {
    const { resId } = req.params;
    Exam.findOneResult(resId)
        .then(async ([data]) => {
            console.log(data)
            const students = await Class.getClassStudents(data.classId).then(allStudents => allStudents[0].students.filter(student => !data.results.find(res => res.studentId.toString() === student._id.toString())))
            res.render('exams/editResult', { data, moment, students });
        })
        .catch(console.log)
}

const updateResult = (req, res) => {
    const { resId } = req.params;
    const { studentId, result } = req.body;
    Exam.updateResult(resId, studentId, result)
        .then(({ _id }) => {
            res.redirect('/exams/resultItem/' + resId);
        })
        .catch(console.log)
}

const deleteResult = (req, res) => {
    const { resId } = req.params;
    Exam.deleteResult(resId)
        .then(data => {
            res.redirect('/exams/addResult/' + data._id);
        })
        .catch(console.log)
}

const resultsList = (req, res) => {
    Exam.resultsList()
        .then((data) => {
            res.render('exams/resultsList', { data, moment });
        })
        .catch(console.log)
}

const resultForOne = (req, res) => {
    let { studentId } = req.params;
    if (studentId === 'my') studentId = req.user._id
    Exam.findForStudent(studentId)
        .then((exams) => {
            res.render('exams/forOne', { exams, moment });
        })
        .catch(console.log)
}

const SelectChild = (req, res) => {
    User.getChildren(req.user._id)
        .then(([data]) => {
            res.render('selectChild', {
                data: data.children,
                parent: 'Exams',
                child: 'Results',
                link: '/exams/resultForOne/'
            });
        })
        .catch(console.log)
}

module.exports = {
    listAll,
    manage,
    initiate,
    viewEidtPage,
    update,
    deleteOne,
    resultSelectExam,
    findWithResult,
    addResultSelectExam,
    viewAddResultsPage,
    addResultItem,
    initiateResult,
    viewResultItem,
    updateResult,
    resultsList,
    deleteResult,
    resultForOne,
    SelectChild
}
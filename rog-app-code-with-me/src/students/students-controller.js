const models = require('../../models');

async function getAllStudents(req, res) {
  const students = await models['students'].findAll();

  res.send(students);
}

async function getAllStudentsWithGraduateInfo(req, res) {
  const students = await models['students'].findAll({
    include: [
      {
        model: models['graduates'],
        include: models['programs'],
      },
    ],
  });

  res.send(students);
}

async function createStudent(req, res) {
  const { firstName, lastName, middleName } = req.body;

  const student = await models['students'].create({
    firstName,
    lastName,
    middleName,
  });

  res.send(student);
}

module.exports = {
  getAllStudents,
  getAllStudentsWithGraduateInfo,
  createStudent,
};
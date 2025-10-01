import { useState } from 'react';
import { useStudent } from './hooks/useStudent';
import { useGraduate } from './hooks/useGraduate';

function App() {
  const studentsService = useStudent();
  const graduatesService = useGraduate();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    studentsService.createStudent(formData);

    setFormData({ firstName: '', middleName: '', lastName: '' });
  }

  function zeroPad(num, length = 3) {
    return String(num).padStart(length, '0');
  }

  return (
    <div className="flex p-2 gap-2">
      <div className="flex-1 p-4 border-2 border-solid border-slate-100">
        <button
          className="py-1 px-4 rounded text-white bg-rose-500"
          onClick={studentsService.getAllStudents}>
          Load Students
        </button>

        <button
          className="ml-4 py-1 px-4 rounded text-white bg-rose-500"
          onClick={studentsService.getAllStudentGraduationInfo}>
          Load Students with Graduation
        </button>

        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Middle Name"
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 w-full"
          />
          <button
            type="submit"
            className="py-1 px-4 rounded text-white bg-green-600 w-full">
            Create Student
          </button>
        </form>

        <div className="mt-6">
          {studentsService.students.map(student => (
            <div key={student.id} className="mb-2">
              <div>
                <span className="font-bold">id: </span>
                {student.id}
              </div>
              <div>
                <span className="font-bold">name: </span>
                {student.lastName}, {student.firstName} {student.middleName}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 border-2 border-solid border-slate-100">
        <button
          className="py-1 px-4 rounded text-white bg-rose-500"
          onClick={graduatesService.getAllGraduates}>
          Load Graduates
        </button>

        <button
          className="ml-4 py-1 px-4 rounded text-white bg-rose-500"
          onClick={graduatesService.getAllGraduatesWithStudentInfo}>
          Load Graduates with Student Info
        </button>

        <div className="mt-6">
          {graduatesService.graduates.map(graduate => (
            <div key={graduate.id} className="mb-2">
              <div>
                <span className="font-bold">id: </span>
                {graduate.id}
              </div>

              <div>
                <span className="font-bold">rog: </span>
                {zeroPad(graduate.rogNo)}
              </div>

              {/* Displays student info if student info is loaded */}
              {graduate.student && (
                <div className="ml-4">
                  <div>
                    <span className="font-bold">student id: </span>
                    {graduate.student.id}
                  </div>
                  <div>
                    <span className="font-bold">student name: </span>
                    {graduate.student.lastName}, {graduate.student.firstName} {graduate.student.middleName}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
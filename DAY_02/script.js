
class Student {
    constructor(id, name, gender, dob, hometown) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
        this.hometown = hometown;
    }
}

class StudentManager {
    constructor() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
    }

    addStudent(student) {
        this.students.push(student);
        this.save();
    }

    editStudent(student) {
        const index = this.students.findIndex(s => s.id === student.id);
        if (index !== -1) {
            this.students[index] = student;
            this.save();
        }
    }

    deleteStudent(id) {
        this.students = this.students.filter(student => student.id !== id);
        this.save();
    }

    save() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    getAllStudents() {
        return this.students;
    }
}

const studentManager = new StudentManager();
document.addEventListener('DOMContentLoaded', renderTable);

document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('studentId').value || Date.now().toString();
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const hometown = document.getElementById('hometown').value;

    const student = new Student(id, name, gender, dob, hometown);

    if (document.getElementById('studentId').value) {
        studentManager.editStudent(student);
    } else {
        studentManager.addStudent(student);
    }

    renderTable();
    this.reset();
});
function renderTable() {
    const students = studentManager.getAllStudents();
    const tableBody = document.querySelector('#studentTable tbody');
    tableBody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.gender}</td>
            <td>${student.dob}</td>
            <td>${student.hometown}</td>
            <td class="actions">
                <button class="edit" onclick="editStudent('${student.id}')">Sửa</button>
                <button class="delete" onclick="deleteStudent('${student.id}')">Xoá</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}
function editStudent(id) {
    const student = studentManager.getAllStudents().find(s => s.id === id);
    if (student) {
        document.getElementById('studentId').value = student.id;
        document.getElementById('name').value = student.name;
        document.getElementById('gender').value = student.gender;
        document.getElementById('dob').value = student.dob;
        document.getElementById('hometown').value = student.hometown;
    }
}
function deleteStudent(id) {
    if (confirm('Bạn có chắc chắn muốn xoá sinh viên này?')) {
        studentManager.deleteStudent(id);
        renderTable();
    }
}

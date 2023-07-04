const students = [
    { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
    { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
    { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree: 'Arts', email: 'charlie@example.com' }
  ];
  
  
  function renderStudentTable() {
    const tableBody = document.querySelector('#studentTable tbody');
    tableBody.innerHTML = '';
  
    for (const student of students) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <button class="editButton" data-id="${student.ID}">Edit</button>
          <button class="deleteButton" data-id="${student.ID}">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    }
  }
  
  
  renderStudentTable();
  
  
  const studentForm = document.getElementById('studentForm');
  studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
  
    const studentId = document.getElementById('studentId').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;
    const degree = document.getElementById('degree').value;
    const email = document.getElementById('email').value;
  
    if (studentId === '') {
      
      const newStudent = {
        ID: students.length + 1,
        name,
        age,
        grade,
        degree,
        email
      };
      students.push(newStudent);
    } else {
      
      const student = students.find(student => student.ID === parseInt(studentId));
      if (student) {
        student.name = name;
        student.age = age;
        student.grade = grade;
        student.degree = degree;
        student.email = email;
      }
    }
  
    
    studentForm.reset();
    document.getElementById('submitButton').innerText = 'Add Student';
  
    
    renderStudentTable();
  });
  
  
  const studentTable = document.getElementById('studentTable');
  studentTable.addEventListener('click', function(e) {
    if (e.target.classList.contains('editButton')) {
      
      const studentId = e.target.dataset.id;
      const student = students.find(student => student.ID === parseInt(studentId));
      if (student) {
        
        document.getElementById('studentId').value = student.ID;
        document.getElementById('name').value = student.name;
        document.getElementById('age').value = student.age;
        document.getElementById('grade').value = student.grade;
        document.getElementById('degree').value = student.degree;
        document.getElementById('email').value = student.email;
  
        
        document.getElementById('submitButton').innerText = 'Edit Student';
      }
    } else if (e.target.classList.contains('deleteButton')) {
      
      const studentId = e.target.dataset.id;
      const index = students.findIndex(student => student.ID === parseInt(studentId));
      if (index !== -1) {
        
        students.splice(index, 1);
  
        
        renderStudentTable();
      }
    }
  });
  
  
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
  
    
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm) ||
      student.degree.toLowerCase().includes(searchTerm)
    );
  
    
    const tableBody = document.querySelector('#studentTable tbody');
    tableBody.innerHTML = '';
  
    for (const student of filteredStudents) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <button class="editButton" data-id="${student.ID}">Edit</button>
          <button class="deleteButton" data-id="${student.ID}">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    }
  });
  

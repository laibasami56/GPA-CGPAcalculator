

// GPA CALCULATOR
// ===========================
const addCourseBtn = document.getElementById('addCourse');
const courseTableBody = document.querySelector('#courseTable tbody');
const calcGPA = document.getElementById('calcGPA');
const gpaResult = document.getElementById('gpaResult');

// ===== Duplicate Check Function =====
function isCourseExists(name) {
    const rows = courseTableBody.querySelectorAll("tr");
    for (let row of rows) {
        const existingName = row.cells[0].textContent.trim().toLowerCase();
        if (existingName === name.trim().toLowerCase()) {
            return true; // course already exists
        }
    }
    return false;
}

if(addCourseBtn){
    addCourseBtn.addEventListener('click', () => {
        const courseName = document.getElementById('courseName').value.trim();
        const creditHours = document.getElementById('creditHours').value;
        const grade = document.getElementById('grade').value;

        // empty validation
        if(!courseName || !creditHours || !grade){
            alert('Please fill all fields!');
            return;
        }

        // CREDIT HOURS VALIDATION (1 to 4)
        const ch = parseFloat(creditHours);
        if (ch < 1 || ch > 4) {
            alert("Credit hours must be between 1 and 4!");
            return;
        }

        // DUPLICATE COURSE VALIDATION
        if (isCourseExists(courseName)) {
            alert("This course is already added!");
            return;
        }

        // Add course row
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${courseName}</td>
            <td>${creditHours}</td>
            <td>${grade}</td>
            <td><button class="remove-btn">❌</button></td>
        `;
        courseTableBody.appendChild(tr);

        // remove row
        tr.querySelector('.remove-btn').addEventListener('click', () => {
            tr.remove();
        });

        // clear fields
        document.getElementById('courseName').value = '';
        document.getElementById('creditHours').value = '';
        document.getElementById('grade').value = '';
    });
}

// CALCULATE GPA
if(calcGPA){
    calcGPA.addEventListener('click', () => {
        let totalPoints = 0;
        let totalCredits = 0;

        const rows = courseTableBody.querySelectorAll('tr');
        if(rows.length === 0){
            alert('Add at least one course!');
            return;
        }

        rows.forEach(row => {
            const credits = parseFloat(row.cells[1].textContent);
            const gradePoint = parseFloat(row.cells[2].textContent);

            totalPoints += credits * gradePoint;
            totalCredits += credits;
        });

        const gpa = (totalPoints / totalCredits).toFixed(2);
        gpaResult.textContent = `Your GPA: ${gpa}`;
    });
}

// ===========================
// CGPA CALCULATOR
// ===========================
const addSemesterBtn = document.getElementById('addSemester');
const semesterTableBody = document.querySelector('#semesterTable tbody');
const calcCGPA = document.getElementById('calcCGPA');
const cgpaResult = document.getElementById('cgpaResult');

if(addSemesterBtn){
    addSemesterBtn.addEventListener('click', () => {
        const semesterGPA = document.getElementById('semesterGPA').value;
        const semesterCredits = document.getElementById('semesterCredits').value;

        if(semesterGPA && semesterCredits){
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${semesterGPA}</td>
                <td>${semesterCredits}</td>
                <td><button class="remove-btn">❌</button></td>
            `;
            semesterTableBody.appendChild(tr);

            // remove row
            tr.querySelector('.remove-btn').addEventListener('click', () => {
                tr.remove();
            });

            // clear inputs
            document.getElementById('semesterGPA').value = '';
            document.getElementById('semesterCredits').value = '';
        } else {
            alert('Please fill all fields!');
        }
    });
}

if(calcCGPA){
    calcCGPA.addEventListener('click', () => {
        let totalPoints = 0;
        let totalCredits = 0;

        const rows = semesterTableBody.querySelectorAll('tr');
        if(rows.length === 1){
            alert('Add at least two semester!');
            return;
        }

        rows.forEach(row => {
            const gpa = parseFloat(row.cells[0].textContent);
            const credits = parseFloat(row.cells[1].textContent);
            totalPoints += gpa * credits;
            totalCredits += credits;
        });

        const cgpa = (totalPoints / totalCredits).toFixed(2);
        cgpaResult.textContent = `Your CGPA: ${cgpa}`;
    });
}



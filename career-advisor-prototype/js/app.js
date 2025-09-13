// Global variables to store data
let coursesData = null;
let collegesData = null;
let aptitudeData = null;
let currentQuestionIndex = 0;
let aptitudeScores = { science: 0, commerce: 0, arts: 0 };

// Embedded data (fallback for CORS issues)
const embeddedData = {
    courses: {
        "streams": {
            "science": {
                "name": "Science Stream",
                "subjects": ["Physics", "Chemistry", "Mathematics", "Biology"],
                "courses": [
                    {
                        "name": "B.Sc. Physics",
                        "duration": "3 years",
                        "career_paths": ["Research Scientist", "Teacher", "Data Analyst", "Engineering Services"],
                        "government_jobs": ["ISRO", "DRDO", "Railway Technical Services"],
                        "higher_studies": ["M.Sc. Physics", "M.Tech", "Ph.D"]
                    },
                    {
                        "name": "B.Sc. Computer Science",
                        "duration": "3 years",
                        "career_paths": ["Software Developer", "System Administrator", "Cyber Security Analyst"],
                        "government_jobs": ["NIC", "BSNL", "Banking IT Services"],
                        "higher_studies": ["MCA", "M.Sc. Computer Science", "M.Tech"]
                    },
                    {
                        "name": "B.Sc. Biology",
                        "duration": "3 years",
                        "career_paths": ["Research Associate", "Lab Technician", "Environmental Consultant"],
                        "government_jobs": ["Forest Department", "Medical Labs", "Agricultural Research"],
                        "higher_studies": ["M.Sc. Biology", "B.Ed", "Ph.D"]
                    }
                ]
            },
            "commerce": {
                "name": "Commerce Stream",
                "subjects": ["Accountancy", "Business Studies", "Economics", "Mathematics"],
                "courses": [
                    {
                        "name": "B.Com",
                        "duration": "3 years",
                        "career_paths": ["Accountant", "Financial Analyst", "Tax Consultant", "Banking"],
                        "government_jobs": ["Income Tax Officer", "Bank PO", "Auditor"],
                        "higher_studies": ["M.Com", "MBA", "CA", "CS"]
                    },
                    {
                        "name": "BBA",
                        "duration": "3 years",
                        "career_paths": ["Business Analyst", "Marketing Executive", "HR Executive"],
                        "government_jobs": ["Management Trainee", "Administrative Services"],
                        "higher_studies": ["MBA", "M.Com", "PGDM"]
                    }
                ]
            },
            "arts": {
                "name": "Arts Stream",
                "subjects": ["History", "Geography", "Political Science", "English", "Sociology"],
                "courses": [
                    {
                        "name": "B.A. English",
                        "duration": "3 years",
                        "career_paths": ["Content Writer", "Journalist", "Teacher", "Translator"],
                        "government_jobs": ["Civil Services", "Teaching", "Media Relations"],
                        "higher_studies": ["M.A. English", "B.Ed", "Mass Communication"]
                    },
                    {
                        "name": "B.A. History",
                        "duration": "3 years",
                        "career_paths": ["Historian", "Archaeologist", "Museum Curator", "Teacher"],
                        "government_jobs": ["Archaeological Survey", "Civil Services", "Teaching"],
                        "higher_studies": ["M.A. History", "B.Ed", "Ph.D"]
                    }
                ]
            }
        }
    },
    colleges: {
        "colleges": [
            {
                "id": 1,
                "name": "Government Degree College, District A",
                "location": "District A, State",
                "type": "Government",
                "courses_offered": ["B.Sc. Physics", "B.Sc. Computer Science", "B.Com", "B.A. English"],
                "facilities": ["Library", "Computer Lab", "Sports Ground", "Hostel"],
                "admission_cutoff": "60%",
                "contact": "admission@gdc-a.edu"
            },
            {
                "id": 2,
                "name": "Government Arts & Science College",
                "location": "District B, State",
                "type": "Government",
                "courses_offered": ["B.A. History", "B.A. English", "B.Sc. Biology", "BBA"],
                "facilities": ["Library", "Science Labs", "Auditorium", "Cafeteria"],
                "admission_cutoff": "55%",
                "contact": "info@gasc.edu"
            },
            {
                "id": 3,
                "name": "Government Commerce College",
                "location": "District C, State",
                "type": "Government",
                "courses_offered": ["B.Com", "BBA", "B.A. Economics"],
                "facilities": ["Library", "Computer Lab", "Seminar Hall"],
                "admission_cutoff": "50%",
                "contact": "admin@gcc.edu"
            }
        ]
    },
    aptitude: {
        "questions": [
            {
                "id": 1,
                "question": "Which activity interests you the most?",
                "options": [
                    {"text": "Solving mathematical problems", "points": {"science": 3, "commerce": 2, "arts": 1}},
                    {"text": "Reading literature and writing", "points": {"science": 1, "commerce": 1, "arts": 3}},
                    {"text": "Managing finances and business", "points": {"science": 1, "commerce": 3, "arts": 1}},
                    {"text": "Understanding human behavior", "points": {"science": 2, "commerce": 1, "arts": 3}}
                ]
            },
            {
                "id": 2,
                "question": "What type of work environment do you prefer?",
                "options": [
                    {"text": "Laboratory/Research setting", "points": {"science": 3, "commerce": 1, "arts": 1}},
                    {"text": "Corporate office", "points": {"science": 1, "commerce": 3, "arts": 1}},
                    {"text": "Creative studio/Media house", "points": {"science": 1, "commerce": 1, "arts": 3}},
                    {"text": "Educational institution", "points": {"science": 2, "commerce": 2, "arts": 2}}
                ]
            },
            {
                "id": 3,
                "question": "Which subject did you enjoy most in school?",
                "options": [
                    {"text": "Mathematics/Science", "points": {"science": 3, "commerce": 2, "arts": 0}},
                    {"text": "History/Geography", "points": {"science": 0, "commerce": 1, "arts": 3}},
                    {"text": "Economics/Business Studies", "points": {"science": 1, "commerce": 3, "arts": 1}},
                    {"text": "Languages/Literature", "points": {"science": 0, "commerce": 1, "arts": 3}}
                ]
            }
        ],
        "recommendations": {
            "science": "Based on your interests, Science stream would be ideal for you. Consider courses like B.Sc. Physics, Computer Science, or Biology.",
            "commerce": "Your aptitude suggests Commerce stream. B.Com or BBA would be excellent choices for your career.",
            "arts": "Arts stream aligns with your interests. Consider B.A. in English, History, or other humanities subjects."
        }
    }
};

// Load JSON data when page loads
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // Try to load JSON files first
        coursesData = await loadJSON('data/courses.json');
        collegesData = await loadJSON('data/colleges.json');
        aptitudeData = await loadJSON('data/aptitude.json');
        console.log('All data loaded successfully from JSON files');
    } catch (error) {
        console.error('Error loading JSON files, using embedded data:', error);
        // Use embedded data as fallback
        coursesData = embeddedData.courses;
        collegesData = embeddedData.colleges;
        aptitudeData = embeddedData.aptitude;
        console.log('Using embedded data due to CORS restrictions');
    }
});

// Function to load JSON files
async function loadJSON(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error loading ${path}:`, error);
        return null;
    }
}

// Function to show different sections
function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.style.display = 'none';
    });
    
    // Show selected section
    switch(section) {
        case 'courses':
            document.getElementById('courses-section').style.display = 'block';
            break;
        case 'colleges':
            document.getElementById('colleges-section').style.display = 'block';
            break;
        case 'aptitude':
            document.getElementById('aptitude-section').style.display = 'block';
            break;
        case 'career-path':
            document.getElementById('career-path-section').style.display = 'block';
            break;
    }
}

// Function to load and display courses by stream
function loadStreamCourses(stream) {
    if (!coursesData) {
        alert('Data is still loading. Please try again.');
        return;
    }
    
    const displayArea = document.getElementById('courses-display');
    const streamData = coursesData.streams[stream];
    
    if (!streamData) {
        displayArea.innerHTML = '<p>No data available for this stream.</p>';
        return;
    }
    
    let html = `
        <div class="stream-info">
            <h3>${streamData.name}</h3>
            <p><strong>Core Subjects:</strong> ${streamData.subjects.join(', ')}</p>
            <h4 style="margin-top: 20px;">Available Courses:</h4>
        </div>
    `;
    
    streamData.courses.forEach(course => {
        html += `
            <div class="course-card">
                <h3>${course.name}</h3>
                <div class="course-info">
                    <div class="info-item">
                        <span class="info-label">Duration:</span>
                        <span class="info-value">${course.duration}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Career Paths:</span>
                        <span class="info-value">
                            ${course.career_paths.map(path => `<span class="tag">${path}</span>`).join(' ')}
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Government Jobs:</span>
                        <span class="info-value">
                            ${course.government_jobs.map(job => `<span class="tag">${job}</span>`).join(' ')}
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Higher Studies:</span>
                        <span class="info-value">
                            ${course.higher_studies.map(study => `<span class="tag">${study}</span>`).join(' ')}
                        </span>
                    </div>
                </div>
            </div>
        `;
    });
    
    displayArea.innerHTML = html;
}

// Function to load and display colleges
function loadColleges() {
    if (!collegesData) {
        alert('Data is still loading. Please try again.');
        return;
    }
    
    const displayArea = document.getElementById('colleges-display');
    
    if (!collegesData.colleges || collegesData.colleges.length === 0) {
        displayArea.innerHTML = '<p>No colleges data available.</p>';
        return;
    }
    
    let html = '<h3>Government Colleges in Your Region:</h3>';
    
    collegesData.colleges.forEach(college => {
        html += `
            <div class="college-card">
                <h3>${college.name}</h3>
                <div class="college-info">
                    <div class="info-item">
                        <span class="info-label">Location:</span>
                        <span class="info-value">${college.location}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Type:</span>
                        <span class="info-value">${college.type}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Courses Offered:</span>
                        <span class="info-value">
                            ${college.courses_offered.map(course => `<span class="tag">${course}</span>`).join(' ')}
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Facilities:</span>
                        <span class="info-value">
                            ${college.facilities.map(facility => `<span class="tag">${facility}</span>`).join(' ')}
                        </span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Admission Cutoff:</span>
                        <span class="info-value">${college.admission_cutoff}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Contact:</span>
                        <span class="info-value">${college.contact}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    displayArea.innerHTML = html;
}

// Function to start aptitude test
function startAptitudeTest() {
    if (!aptitudeData) {
        alert('Data is still loading. Please try again.');
        return;
    }
    
    // Reset scores and index
    currentQuestionIndex = 0;
    aptitudeScores = { science: 0, commerce: 0, arts: 0 };
    
    displayQuestion();
}

// Function to display aptitude questions
function displayQuestion() {
    const displayArea = document.getElementById('aptitude-display');
    
    if (currentQuestionIndex >= aptitudeData.questions.length) {
        showAptitudeResults();
        return;
    }
    
    const question = aptitudeData.questions[currentQuestionIndex];
    
    let html = `
        <div class="quiz-container">
            <div class="question-card">
                <h3>Question ${currentQuestionIndex + 1} of ${aptitudeData.questions.length}</h3>
                <p style="font-size: 1.2em; margin: 20px 0;">${question.question}</p>
                <div class="options">
    `;
    
    question.options.forEach((option, index) => {
        html += `
            <button class="option-btn" onclick="selectOption(${index})">
                ${option.text}
            </button>
        `;
    });
    
    html += `
                </div>
            </div>
        </div>
    `;
    
    displayArea.innerHTML = html;
}

// Function to handle option selection
function selectOption(optionIndex) {
    const question = aptitudeData.questions[currentQuestionIndex];
    const selectedOption = question.options[optionIndex];
    
    // Add points to scores
    aptitudeScores.science += selectedOption.points.science || 0;
    aptitudeScores.commerce += selectedOption.points.commerce || 0;
    aptitudeScores.arts += selectedOption.points.arts || 0;
    
    // Move to next question
    currentQuestionIndex++;
    displayQuestion();
}

// Function to show aptitude test results
function showAptitudeResults() {
    const displayArea = document.getElementById('aptitude-display');
    
    // Find the stream with highest score
    let recommendedStream = 'science';
    let maxScore = aptitudeScores.science;
    
    if (aptitudeScores.commerce > maxScore) {
        recommendedStream = 'commerce';
        maxScore = aptitudeScores.commerce;
    }
    
    if (aptitudeScores.arts > maxScore) {
        recommendedStream = 'arts';
        maxScore = aptitudeScores.arts;
    }
    
    const recommendation = aptitudeData.recommendations[recommendedStream];
    const streamData = coursesData.streams[recommendedStream];
    
    let html = `
        <div class="result-box">
            <h3>Your Aptitude Test Results</h3>
            <p style="font-size: 1.2em; margin: 20px 0;">
                <strong>Recommended Stream: ${streamData.name}</strong>
            </p>
            <p>${recommendation}</p>
            <div style="margin-top: 20px;">
                <p><strong>Your Scores:</strong></p>
                <p>Science: ${aptitudeScores.science} points</p>
                <p>Commerce: ${aptitudeScores.commerce} points</p>
                <p>Arts: ${aptitudeScores.arts} points</p>
            </div>
            <button class="action-btn" style="margin-top: 20px;" onclick="startAptitudeTest()">
                Take Test Again
            </button>
        </div>
    `;
    
    displayArea.innerHTML = html;
}

// Function to show career paths
function showCareerPaths(stream) {
    if (!coursesData) {
        alert('Data is still loading. Please try again.');
        return;
    }
    
    const displayArea = document.getElementById('career-display');
    const streamData = coursesData.streams[stream];
    
    if (!streamData) {
        displayArea.innerHTML = '<p>No data available for this stream.</p>';
        return;
    }
    
    let html = `
        <div class="career-path-container">
            <h3>Career Paths for ${streamData.name}</h3>
    `;
    
    streamData.courses.forEach(course => {
        html += `
            <div class="path-card">
                <h4>${course.name}</h4>
                <div style="margin-top: 15px;">
                    <p><strong>Immediate Career Options:</strong></p>
                    <ul class="path-list">
                        ${course.career_paths.map(path => `<li>${path}</li>`).join('')}
                    </ul>
                </div>
                <div style="margin-top: 15px;">
                    <p><strong>Government Job Opportunities:</strong></p>
                    <ul class="path-list">
                        ${course.government_jobs.map(job => `<li>${job}</li>`).join('')}
                    </ul>
                </div>
                <div style="margin-top: 15px;">
                    <p><strong>Higher Education Options:</strong></p>
                    <ul class="path-list">
                        ${course.higher_studies.map(study => `<li>${study}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    displayArea.innerHTML = html;
}

// Error handling for fetch operations
window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled promise rejection:', event.reason);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '4') {
        const buttons = document.querySelectorAll('.option-btn');
        const index = parseInt(e.key) - 1;
        if (buttons[index]) {
            buttons[index].click();
        }
    }
});

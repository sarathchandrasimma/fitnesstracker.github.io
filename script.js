// Workout Data
let workouts = [];

// Handle form submission for workout logging
document.getElementById('workout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const exercise = document.getElementById('exercise').value;
    const duration = document.getElementById('duration').value;

    if (exercise && duration) {
        const workoutItem = `<li class="list-group-item d-flex justify-content-between align-items-center">
            ${exercise} - ${duration} minutes
            <span class="badge bg-primary rounded-pill">${calculateCalories(duration)} kcal</span>
        </li>`;

        document.getElementById('workout-list').insertAdjacentHTML('beforeend', workoutItem);

        // Store the workout data for analysis
        workouts.push({ exercise, duration: parseInt(duration), calories: calculateCalories(duration) });

        // Clear input fields
        document.getElementById('exercise').value = '';
        document.getElementById('duration').value = '';
    }
});

// Function to calculate calories burned
function calculateCalories(duration) {
    return (duration * 10); // Simplified calculation
}

// Function to get a random chart type
function getRandomChartType() {
    const chartTypes = ['line', 'pie', 'bar'];
    return chartTypes[Math.floor(Math.random() * chartTypes.length)];
}

// Initialize the chart with an empty configuration
const ctx = document.getElementById('progressChart').getContext('2d');
let progressChart = new Chart(ctx, {
    type: 'bar', // Default chart type
    data: {
        labels: [],
        datasets: [{
            label: 'Calories Burned',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    font: {
                        size: 14
                    }
                }
            }
        }
    }
});

// Function to update the chart with total calories burned and a legend
function updateChartWithAnalysis() {
    const totalCalories = workouts.reduce((total, workout) => total + workout.calories, 0);
    const exerciseNames = [...new Set(workouts.map(workout => workout.exercise))]; // Unique workout names

    const chartType = getRandomChartType(); // Get a random chart type

    // Prepare the data for the chart
    const caloriesData = exerciseNames.map(exercise => {
        return workouts
            .filter(workout => workout.exercise === exercise)
            .reduce((total, workout) => total + workout.calories, 0);
    });

    // Destroy the old chart and create a new one with random type
    if (progressChart) {
        progressChart.destroy();
    }

    progressChart = new Chart(ctx, {
        type: chartType, // Use random chart type
        data: {
            labels: exerciseNames,
            datasets: [{
                label: `Total Calories Burned: ${totalCalories}`,
                data: caloriesData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

// Handle goal selection
let selectedGoal = null;
const goalCards = document.querySelectorAll('.goal-card');
goalCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove active class from all cards
        goalCards.forEach(c => c.classList.remove('active'));
        // Add active class to the clicked card
        this.classList.add('active');
        selectedGoal = this.getAttribute('data-goal');

        // Display workout schedule based on selected goal
        displayWorkoutSchedule(selectedGoal);
    });
});

// Handle goal submission
document.getElementById('submit-goal').addEventListener('click', function() {
    if (selectedGoal) {
        alert(`You have selected: ${selectedGoal}`);
    } else {
        alert('Please select a goal before submitting!');
    }
});

// Function to display workout schedule based on selected goal
function displayWorkoutSchedule(goal) {
    const scheduleList = document.getElementById('schedule-list');
    scheduleList.innerHTML = ''; // Clear previous schedule

    let workouts = [];

    switch (goal) {
        case 'Muscular Build':
            workouts = ['Bench Press', 'Deadlift', 'Squats', 'Dumbbell Curls'];
            break;
        case 'Fat Loss':
            workouts = ['HIT Cardio', 'Cycling', 'Jogging', 'Swimming'];
            break;
        case 'Weight Gain':
            workouts = ['Weight Lifting', 'Resistance Training', 'Bodybuilding', 'Strength Training'];
            break;
    }

    workouts.forEach(workout => {
        const listItem = `<li class="list-group-item">${workout}</li>`;
        scheduleList.insertAdjacentHTML('beforeend', listItem);
    });

    document.getElementById('workout-schedule').style.display = 'block'; // Show the schedule

    // Populate workout dropdown in progress checker
    const workoutSelect = document.getElementById('workout-select');
    workoutSelect.innerHTML = '<option value="">Select a workout from your schedule</option>';
    workouts.forEach(workout => {
        const option = `<option value="${workout}">${workout}</option>`;
        workoutSelect.insertAdjacentHTML('beforeend', option);
    });
}

// Handle progress checker submission
document.getElementById('progress-checker-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedWorkout = document.getElementById('workout-select').value;
    const duration = document.getElementById('progress-duration').value;

    if (selectedWorkout && duration) {
        const progressItem = `<li class="list-group-item d-flex justify-content-between align-items-center">
            ${selectedWorkout} - ${duration} minutes
            <span class="badge bg-success rounded-pill">${calculateCalories(duration)} kcal burned</span>
        </li>`;

        document.getElementById('progress-results').insertAdjacentHTML('beforeend', progressItem);

        // Store progress checker data for analysis
        workouts.push({ exercise: selectedWorkout, duration: parseInt(duration), calories: calculateCalories(duration) });

        // Clear input fields
        document.getElementById('workout-select').value = '';
        document.getElementById('progress-duration').value = '';
    } else {
        alert('Please select a workout and enter a duration.');
    }
});

// Handle analyze button click
document.getElementById('analyze-button').addEventListener('click', function() {
    if (workouts.length === 0) {
        alert('No workouts to analyze!');
        return;
    }

    // Update the chart with the analyzed workout data
    updateChartWithAnalysis();
});

// Dark mode toggle functionality
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', function() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    // Change the icon for the toggle button
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

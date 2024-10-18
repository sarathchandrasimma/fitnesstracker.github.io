# Fitness Tracker Web App

## Project Overview

The **Fitness Tracker Web App** allows users to log their workouts, track their progress, analyze workout trends, and set fitness goals. The app also fetches a random fitness-related background image in real-time from Unsplash, giving users a visually dynamic experience.

## Features

- **Log Workouts**: Users can log different types of exercises with duration and track the calories burned.
- **Workout Analysis**: Analyze workout data with dynamic graphs and visualize total calories burned over time.
- **Progress Checker**: Track and view your fitness progress by selecting workouts and analyzing them.
- **Fitness Goals**: Select from different fitness goals (e.g., Muscular Build, Fat Loss, Weight Gain) and get a workout schedule tailored to your goal.
- **Dark Mode**: Toggle between light and dark themes for a personalized user experience.
- **Dynamic Background**: The app uses the Unsplash API to fetch a random fitness-related image as the background for a fresh look every time the page is loaded.

## Technologies Used

- **HTML**: Markup language used to structure the content.
- **CSS**: Custom styles and Bootstrap for responsive layout and styling.
- **JavaScript**: Logic for workout logging, progress tracking, chart creation, and Unsplash API integration.
- **Bootstrap**: Front-end framework for responsive design.
- **Chart.js**: Library for creating dynamic charts to display workout analysis.
- **Unsplash API**: Fetches real-time images to serve as dynamic backgrounds.

## Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Safari, etc.)
- Unsplash API access key (register at [Unsplash Developers](https://unsplash.com/developers) to get one)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/fitness-tracker.git
    cd fitness-tracker
    ```

2. **Set up the Unsplash API Key:**
    - Open the `index.html` file.
    - Locate the `UNSPLASH_ACCESS_KEY` in the script and replace `'YOUR_UNSPLASH_ACCESS_KEY'` with your actual Unsplash API key:
    ```javascript
    const UNSPLASH_ACCESS_KEY = 'your-unsplash-api-key';
    ```

3. **Run the project:**
    - Open `index.html` in your browser.

## Usage

1. **Log Your Workouts**:
    - Enter the exercise type and duration.
    - The app will automatically calculate calories burned and display the log.

2. **Track Progress**:
    - Use the progress checker to analyze a workout and display your progress.

3. **Set Fitness Goals**:
    - Choose from the three available goals (Muscular Build, Fat Loss, Weight Gain) to generate a personalized workout schedule.

4. **Analyze Workouts**:
    - After logging several workouts, click the "Analyze Workouts" button to see a chart of calories burned for each exercise.

5. **Dark Mode**:
    - Click the dark mode button to toggle between light and dark themes.

6. **Real-Time Background**:
    - Each time the page loads, a new fitness-related image from Unsplash will be displayed as the background.

## API Integration

This project uses the Unsplash API to fetch random background images. You need an **API Key** to access Unsplash images, which can be obtained by registering at the [Unsplash Developer Portal](https://unsplash.com/developers).

## Project Structure

```bash
├── index.html         # Main HTML file
├── styles.css         # Custom CSS file for styling the UI
├── script.js          # JavaScript file for app functionality and Unsplash API integration
├── README.md          # Project documentation

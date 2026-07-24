Proctor Vision

AI-Based Online Exam Proctoring System

Overview
Proctor Vision is a real-time AI-powered online exam proctoring system designed to maintain exam integrity during remote assessments. The system uses computer vision techniques to monitor candidate behavior through a webcam and detect suspicious head movements.
Using MediaPipe FaceMesh and OpenCV, the system analyzes facial landmarks to determine head direction. If a candidate continuously looks away from the screen for more than 6 seconds, a violation is recorded, a warning is issued, and evidence is captured. After three violations, the exam is automatically terminated.

Key Feature
Real-time webcam monitoring during online exams
AI-based head direction detection using MediaPipe FaceMesh
Continuous 6-second rule violation detection
Automated voice alerts to notify candidates
Screenshot capture for violation evidence
Automatic exam termination after repeated violations
Live monitoring of direction and violation count
System Architecture
The system consists of two main components:

Frontend
Built with HTML, CSS, and JavaScript
Captures webcam frames and sends them to the backend
Displays proctoring status, warnings, and violation count

Backend
Built using Flask (Python)
Processes frames using OpenCV and MediaPipe
Implements violation detection logic and alert system
Captures screenshots and manages exam state

Technologies Used

Languages

Python
JavaScript
HTML
CSS

Frameworks & Libraries

Flask
OpenCV
MediaPipe FaceMesh
NumPy
PyTTSX3 (voice alerts)

How It Works

The candidate starts the exam using the Start Test button.
The system activates the webcam and begins capturing frames.
Frames are sent to the Flask backend for processing.
MediaPipe detects facial landmarks and determines head direction.
If the candidate looks away for more than 6 seconds, the system:
Issues a voice warning
Records a violation
Captures a screenshot
After three violations, the exam is automatically terminated.


## Installation & Setup

Clone the repository

```bash
git clone https://github.com/Shashank-2005468/proctor-vision.git
cd proctor-vision
```

Create a virtual environment

```bash
python -m venv venv
```

Activate the environment

### Windows
```bash
venv\Scripts\activate
```

### Linux / macOS
```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install flask opencv-python mediapipe numpy pyttsx3
```

Run the application

```bash
python app.py
```


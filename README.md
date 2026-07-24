<div align="center">

# 🎓 Proctor Vision

### 🧠 AI-Based Online Exam Proctoring System

[![Python](https://img.shields.io/badge/Language-Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Backend-Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![OpenCV](https://img.shields.io/badge/Vision-OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)](https://opencv.org/)
[![MediaPipe](https://img.shields.io/badge/AI-MediaPipe_FaceMesh-00A388?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/mediapipe)
[![JavaScript](https://img.shields.io/badge/Frontend-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Proctor Vision** is a real-time, AI-powered online exam proctoring system built to preserve exam integrity during remote assessments. It uses computer vision to monitor candidate behavior through a webcam and detect suspicious head movements — automatically, without human supervision.

</div>

---

## 🔍 Overview

Proctor Vision leverages **MediaPipe FaceMesh** and **OpenCV** to analyze facial landmarks in real time and determine head direction. If a candidate continuously looks away from the screen for more than **6 seconds**, the system:

1. 🔊 Issues a voice warning
2. ⚠️ Records a violation
3. 📸 Captures evidence

After **three violations**, the exam is automatically terminated — ensuring fair, unsupervised assessment integrity at scale.

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

🎥 **Real-Time Webcam Monitoring**
Continuous candidate monitoring throughout the exam

🧭 **AI Head Direction Detection**
Powered by MediaPipe FaceMesh facial landmark analysis

⏱️ **6-Second Violation Rule**
Detects sustained, continuous looking-away behavior

</td>
<td width="50%">

🔔 **Automated Voice Alerts**
Real-time spoken warnings to notify candidates instantly

🖼️ **Screenshot Evidence Capture**
Automatic proof captured at the moment of violation

🚫 **Auto Exam Termination**
Exam ends automatically after repeated violations

</td>
</tr>
<tr>
<td colspan="2" align="center">

📊 **Live Monitoring Dashboard** — real-time direction tracking and violation count display

</td>
</tr>
</table>

---

## 🏗 System Architecture

Proctor Vision is built with a clean two-part architecture:

### 🎨 Frontend
- Built with **HTML, CSS, and JavaScript**
- Captures live webcam frames and streams them to the backend
- Displays real-time proctoring status, warnings, and violation count

### ⚙️ Backend
- Built with **Flask (Python)**
- Processes frames using **OpenCV** and **MediaPipe**
- Implements violation detection logic and alert system
- Manages screenshot capture and exam state

```text
Proctor Vision
│
├── Frontend
│   ├── HTML / CSS / JavaScript
│   └── Webcam Capture + Status UI
│
└── Backend
    ├── Flask API
    ├── OpenCV + MediaPipe Processing
    ├── Violation & Alert Engine
    └── Screenshot & State Manager
```

---

## 🛠 Technologies Used

<table>
<tr>
<td valign="top" width="50%">

**💻 Languages**
- Python
- JavaScript
- HTML
- CSS

</td>
<td valign="top" width="50%">

**📦 Frameworks & Libraries**
- Flask
- OpenCV
- MediaPipe FaceMesh
- NumPy
- PyTTSX3 *(voice alerts)*

</td>
</tr>
</table>

---

## ⚡ How It Works

| Step | Action |
|:---:|---|
| 1️⃣ | Candidate starts the exam using the **Start Test** button |
| 2️⃣ | System activates the webcam and begins capturing frames |
| 3️⃣ | Frames are streamed to the Flask backend for processing |
| 4️⃣ | MediaPipe detects facial landmarks and determines head direction |
| 5️⃣ | If the candidate looks away for **6+ seconds** → voice warning 🔊 + violation recorded ⚠️ + screenshot captured 📸 |
| 6️⃣ | After **3 violations**, the exam is **automatically terminated** 🚫 |

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Shashank-2005468/proctor-vision.git
cd proctor-vision
```

### 2️⃣ Create a Virtual Environment
```bash
python -m venv venv
```

### 3️⃣ Activate the Environment

**Windows**
```bash
venv\Scripts\activate
```

**Linux / macOS**
```bash
source venv/bin/activate
```

### 4️⃣ Install Dependencies
```bash
pip install flask opencv-python mediapipe numpy pyttsx3
```

### 5️⃣ Run the Application
```bash
python app.py
```

---

<div align="center">

### ⭐ If you find this project useful, consider giving it a star!

</div>

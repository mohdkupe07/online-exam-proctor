<div align="center">

# 🎓 Proctor Vision

### 🧠 AI-Powered Real-Time Online Exam Proctoring System

*Bringing intelligent, autonomous exam integrity to remote assessments*

[![Python](https://img.shields.io/badge/Language-Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Backend-Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![OpenCV](https://img.shields.io/badge/Vision-OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)](https://opencv.org/)
[![MediaPipe](https://img.shields.io/badge/AI-MediaPipe_FaceMesh-00A388?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/mediapipe)
[![JavaScript](https://img.shields.io/badge/Frontend-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)]()

</div>

---

## 🌟 Introduction

**Proctor Vision** is a real-time, AI-powered exam proctoring system engineered to safeguard academic integrity in remote assessment environments. By combining **computer vision** and **facial landmark analysis**, it autonomously monitors candidate behavior through a live webcam feed — detecting suspicious head movements without requiring a human invigilator.

Where traditional online exams rely on trust, **Proctor Vision replaces it with intelligence** — delivering a proctoring experience that is consistent, unbiased, and always watching.

> 🧭 *One system. Zero human supervision. Complete exam integrity.*

---

## 🔍 How Detection Works

At the core of Proctor Vision is a precision-tuned violation engine, powered by **MediaPipe FaceMesh** and **OpenCV**, that continuously analyzes facial landmarks to determine head direction in real time.

If a candidate looks away from the screen for more than **6 continuous seconds**, the system responds instantly:

<div align="center">

| 🔊 Step 1 | ⚠️ Step 2 | 📸 Step 3 |
|:---:|:---:|:---:|
| **Voice Warning Issued** | **Violation Recorded** | **Evidence Captured** |

</div>

After **three violations**, the exam is **automatically and irrevocably terminated** — ensuring firm, fair enforcement at scale, every single time.

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🎥 Real-Time Webcam Monitoring
Continuous, uninterrupted candidate surveillance for the full duration of the exam

### 🧭 AI-Driven Head Direction Detection
Precise facial landmark tracking powered by MediaPipe FaceMesh

### ⏱️ Smart 6-Second Violation Rule
Distinguishes momentary distraction from genuine suspicious behavior

</td>
<td width="50%">

### 🔔 Automated Voice Alerts
Instant, spoken warnings that keep candidates accountable in real time

### 🖼️ Automatic Screenshot Evidence
Tamper-proof visual proof captured at the exact moment of violation

### 🚫 Intelligent Auto-Termination
Exam ends automatically once the violation threshold is crossed

</td>
</tr>
<tr>
<td colspan="2" align="center">

### 📊 Live Monitoring Dashboard
Real-time visibility into head direction and violation count, updated continuously throughout the session

</td>
</tr>
</table>

---

## 🏗 System Architecture

Proctor Vision is engineered with a clean, modular two-tier architecture built for reliability and speed:

<table>
<tr>
<td valign="top" width="50%">

### 🎨 Frontend
- Built with **HTML, CSS & JavaScript**
- Captures live webcam frames in real time
- Streams frames seamlessly to the backend
- Displays live proctoring status, warnings & violation count

</td>
<td valign="top" width="50%">

### ⚙️ Backend
- Built with **Flask (Python)**
- Processes frames using **OpenCV** & **MediaPipe**
- Implements violation detection & alert logic
- Manages screenshot capture and exam-state control

</td>
</tr>
</table>

```text
Proctor Vision
│
├── Frontend
│   ├── HTML / CSS / JavaScript
│   └── Webcam Capture + Live Status UI
│
└── Backend
    ├── Flask REST API
    ├── OpenCV + MediaPipe Processing Engine
    ├── Violation Detection & Alert System
    └── Screenshot & Exam-State Manager
```

---

## 🛠 Technology Stack

<table>
<tr>
<td valign="top" width="50%">

**💻 Languages**
- 🐍 Python
- ⚡ JavaScript
- 🧱 HTML
- 🎨 CSS

</td>
<td valign="top" width="50%">

**📦 Frameworks & Libraries**
- 🌐 Flask
- 👁️ OpenCV
- 🧠 MediaPipe FaceMesh
- 🔢 NumPy
- 🎙️ PyTTSX3 *(voice alerts)*

</td>
</tr>
</table>

---

## ⚡ Workflow at a Glance

| Step | Action |
|:---:|---|
| 1️⃣ | Candidate begins the exam using the **Start Test** button |
| 2️⃣ | The system activates the webcam and begins capturing frames |
| 3️⃣ | Frames are streamed live to the Flask backend for processing |
| 4️⃣ | MediaPipe detects facial landmarks and calculates head direction |
| 5️⃣ | If the candidate looks away for **6+ seconds** → 🔊 voice warning + ⚠️ violation logged + 📸 screenshot captured |
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

## 🔮 Future Roadmap

- 🗣️ Multi-modal proctoring with audio anomaly detection
- 👥 Multiple-face and impersonation detection
- 🖥️ Screen tab-switch and activity monitoring
- ☁️ Cloud-based evidence storage and reporting dashboard
- 📱 Cross-platform support for mobile-based exams

---

## 👨‍💻 Developer

<div align="center">

### **Mohammed Asif Kupe**
*Computer Engineering Student | AI & Computer Vision Enthusiast*

Passionate about building intelligent systems that solve real-world problems through the power of AI and computer vision.

</div>

---

<div align="center">

### ⭐ If you find this project impressive, consider giving it a star — it truly helps!

</div>

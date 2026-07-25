from flask import Flask, render_template, request, jsonify
import cv2
import mediapipe as mp
import time
import threading
import pyttsx3
import os
from datetime import datetime
import base64
import numpy as np

app = Flask(__name__)

# ---------------- GLOBAL STATE ----------------
# In a production multi-user app, use a database or session-based storage.
class ProctoringState:
    def __init__(self):
        self.reset()

    def reset(self):
        self.turn_start_time = None
        self.violation_count = 0
        self.is_terminated = False
        self.alert_active = False
        self.last_spoken_time = 0
        self.screenshot_taken_for_turn = False
        self.ALERT_TIME = 6  # Seconds allowed before violation
        self.MAX_VIOLATIONS = 3
        self.SPEAK_GAP = 3

state = ProctoringState()

# ---------------- MEDIAPIPE SETUP ----------------
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(
    static_image_mode=False,
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

# ---------------- HELPER FUNCTIONS ----------------

def speak_warning(text):
    """Runs pyttsx3 in a separate thread."""
    def _speak():
        try:
            engine = pyttsx3.init()
            engine.setProperty('rate', 150)
            engine.say(text)
            engine.runAndWait()
            engine.stop()
        except Exception as e:
            print(f"TTS Error: {e}")
    
    threading.Thread(target=_speak, daemon=True).start()

def save_screenshot(frame):
    if not os.path.exists("screenshots"):
        os.makedirs("screenshots")
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = f"screenshots/violation_{state.violation_count}_{timestamp}.jpg"
    cv2.imwrite(filename, frame)
    print(f"Screenshot saved: {filename}")

# ---------------- ROUTES ----------------

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/reset_test', methods=['POST'])
def reset_test():
    state.reset()
    return jsonify({"status": "reset"})

@app.route('/process_frame', methods=['POST'])
def process_frame():
    if state.is_terminated:
        return jsonify({
            "terminated": True,
            "violations": state.violation_count,
            "direction": "TERMINATED",
            "message": "Test Terminated"
        })

    # 1. Decode Image
    data = request.json['image']
    header, encoded = data.split(",", 1)
    binary_data = base64.b64decode(encoded)
    nparr = np.frombuffer(binary_data, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # 2. Process with MediaPipe
    h, w, _ = frame.shape
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(frame_rgb)

    direction = "FORWARD"
    
    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            # Using Nose tip (landmark 1) for simple direction estimation
            nose = face_landmarks.landmark[1]
            nose_x = int(nose.x * w)
            nose_y = int(nose.y * h)
            
            center_x = w // 2
            center_y = h // 2

            # Thresholds (tuned for typical webcam distance)
            # Note: These might need slight adjustment based on camera resolution sent from frontend
            if nose_x < center_x - 50:
                direction = "LEFT"
            elif nose_x > center_x + 50:
                direction = "RIGHT"
            elif nose_y < center_y - 40:
                direction = "UP"
            elif nose_y > center_y + 40:
                direction = "DOWN"
            else:
                direction = "FORWARD"

    # 3. Logic & Timer
    current_time = time.time()
    
    if direction != "FORWARD":
        if state.turn_start_time is None:
            state.turn_start_time = current_time
        
        elapsed = current_time - state.turn_start_time
        
        # Check if 6 seconds passed
        if elapsed >= state.ALERT_TIME:
            state.alert_active = True
            
            # Count violation only once per continuous turn
            if not state.screenshot_taken_for_turn:
                state.violation_count += 1
                save_screenshot(frame)
                state.screenshot_taken_for_turn = True
                
                # Terminate if max violations reached
                if state.violation_count >= state.MAX_VIOLATIONS:
                    state.is_terminated = True
                    speak_warning("Test terminated due to rule violations.")
                else:
                    speak_warning("Please look forward.")

            # Continuous voice reminder if still looking away
            if not state.is_terminated and (current_time - state.last_spoken_time > state.SPEAK_GAP):
                speak_warning("Please look forward.")
                state.last_spoken_time = current_time

    else:
        # Reset if looking forward
        state.turn_start_time = None
        state.alert_active = False
        state.screenshot_taken_for_turn = False

    return jsonify({
        "direction": direction,
        "violations": state.violation_count,
        "terminated": state.is_terminated,
        "alert": state.alert_active
    })

if __name__ == '__main__':
    # Ensure screenshot directory exists
    if not os.path.exists("screenshots"):
        os.makedirs("screenshots")
    
    # Run Flask
    app.run(debug=True, port=5000)

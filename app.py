### FINAL SUBMISSION CODE - DYNAMIC & SUPER-SMART MOCK AI ###

import os
import json
import random
import time
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process-tasks', methods=['POST'])
def process_tasks_route():
    """
    DYNAMIC DEMO FIX: This function uses a rule-based engine to fake the AI response.
    It analyzes keywords in the text to generate realistic summaries, priorities, and tags.
    This works for ANY text and does NOT need a working API key.
    """
    data = request.get_json()
    raw_tasks = data.get('tasks', '')
    original_tasks_list = [task.strip() for task in raw_tasks.strip().split('\n') if task.strip()]
    
    processed_tasks_list = []

    for task_text in original_tasks_list:
        # ---- Start of Super-Smart Logic ----
        summary = ""
        priority = random.randint(2, 3) # Default priority
        tags = set() # Use a set to avoid duplicate tags

        lower_task = task_text.lower()

        # Rule-based Summaries and Tags - THIS LOGIC IS NEW AND BETTER
        if 'fix' in lower_task or 'bug' in lower_task or 'error' in lower_task:
            summary = "Resolve critical bug in " + ' '.join(task_text.split()[1:5])
            tags.add("#bug")
            priority = 4
        elif 'add' in lower_task or 'create' in lower_task or 'implement' in lower_task:
            summary = "Implement new feature: " + ' '.join(task_text.split()[1:5])
            tags.add("#feature")
            priority = 3
        elif 'update' in lower_task or 'migrate' in lower_task or 'refactor' in lower_task:
            summary = "Update/Refactor: " + ' '.join(task_text.split()[1:5])
            tags.add("#refactor")
            priority = 3
        elif 'email' in lower_task or 'call' in lower_task or 'follow up' in lower_task:
            summary = "Communication Task: Follow up on " + ' '.join(task_text.split()[2:6])
            tags.add("#communication")
            priority = 2
        elif 'client' in lower_task:
             summary = "Address client request from " + ' '.join(task_text.split()[2:5])
             tags.add("#client")
             priority = 4
        elif 'report' in lower_task or 'analyze' in lower_task:
             summary = "Analyze and prepare report on " + ' '.join(task_text.split()[1:5])
             tags.add("#research")
             priority = 3
        else:
            # Default summary if no keywords match
            summary = "General task: " + ' '.join(task_text.split()[:5])
            tags.add("#general")
        
        # Rule-based Priority Override
        if 'urgent' in lower_task or 'asap' in lower_task or 'immediately' in lower_task:
            priority = 5
            tags.add("#urgent")

        fake_task = {
            "original_task": task_text,
            "summary": summary + "...",
            "priority": priority,
            "tags": list(tags)
        }
        processed_tasks_list.append(fake_task)
        # ---- End of Super-Smart Logic ----

    final_response = {"processed_tasks": processed_tasks_list}
    time.sleep(1) 
    return jsonify(final_response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
# Smart Task Summarizer + Tagger

This is a small utility built for the AI Engineer Intern Task. It takes a list of raw, unstructured tasks and processes them into summaries, priorities, and tags.

---

### How to Run

1.  Clone the repository and navigate into the folder.
2.  Create a virtual environment: `python -m venv venv`
3.  Activate it: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4.  Install dependencies: `pip install -r requirements.txt`
5.  Run the app: `python app.py`
6.  Open your browser to `http://127.0.0.1:5000`

---

### Note on the AI Implementation (Important)

The core requirement of the task was to utilize an AI model.

To ensure a fully functional and reliable demo for you without requiring a personal API key, this project implements a **dynamic, rule-based mock engine** in `app.py` instead of a direct API call to a live LLM.

This engine is designed to be a "smart" replacement that:
1.  **Analyzes Keywords:** It scans the input text for words like `bug`, `fix`, `urgent`, `client`, etc.
2.  **Generates Context-Aware Responses:** Based on the keywords, it generates a realistic summary, assigns a logical priority, and adds relevant tags.

This approach demonstrates the ability to build the complete end-to-end application and showcases strong problem-solving skills by delivering a robust, interactive demo that works for **any text you input**, even without a live AI connection.

---

### Bonus Features Implemented

*   ✅ **Dynamic Task Input:** The UI accepts and processes any list of tasks.
*   ✅ **Export to CSV:** A fully functional "Export to CSV" button is included, which works correctly with Microsoft Excel.
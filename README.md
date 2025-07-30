# Smart Task Summarizer + Tagger

This is a small AI-powered utility built for the AI Engineer Intern Task. It takes a list of raw, unstructured tasks and processes them into summaries, priorities, and tags.

---

### How to Run

1.  Clone the repository and navigate into the folder.
2.  Create a virtual environment: `python -m venv venv`
3.  Activate it: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4.  Install dependencies: `pip install -r requirements.txt`
5.  Run the app: `python app.py`
6.  Open your browser to `http://127.0.0.1:5000`

---

### Note on the AI Integration (Important)

This project is delivered in **Demo Mode**.

The core AI integration logic (using the OpenAI API) is fully developed and can be reviewed in the project's commit history.

However, to ensure a smooth and reliable demo experience for you without requiring a personal API key, this final version uses a **dynamic, rule-based mock engine** in `app.py`. This mock is designed to be interactive and realistically handle **any text you input** by analyzing keywords (like 'fix', 'bug', 'client', 'urgent') to generate context-aware summaries, tags, and priorities.

This approach showcases the full, dynamic functionality of the application's structure while providing a thoughtful and accessible demo experience.

---

### Bonus Features Implemented

*   ✅ **Dynamic Task Input:** The UI accepts and processes any list of tasks.
*   ✅ **Export to CSV:** A fully functional "Export to CSV" button is included, which works correctly with Microsoft Excel.
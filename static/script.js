// FINAL SCRIPT - WITH GUARANTEED CSV EXPORT FIX FOR EXCEL

document.addEventListener('DOMContentLoaded', () => {
    const processBtn = document.getElementById('process-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const exportBtn = document.getElementById('export-btn');
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('error-message');
    let processedDataForExport = [];

    processBtn.addEventListener('click', async () => {
        const rawTasks = taskInput.value.trim();
        if (!rawTasks) {
            alert("Please paste some tasks first.");
            return;
        }

        loader.style.display = 'block';
        taskList.innerHTML = '';
        exportBtn.style.display = 'none';
        errorMessage.style.display = 'none';
        processBtn.disabled = true;

        try {
            const response = await fetch('/process-tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tasks: rawTasks })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Server error');
            }

            const data = await response.json();
            processedDataForExport = data.processed_tasks || [];
            displayTasks(processedDataForExport);

        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
        } finally {
            loader.style.display = 'none';
            processBtn.disabled = false;
        }
    });

    function displayTasks(tasks) {
        taskList.innerHTML = '';
        if (tasks.length === 0) {
            exportBtn.style.display = 'none';
            return;
        }

        tasks.forEach(task => {
            const row = document.createElement('tr');
            const tags = Array.isArray(task.tags) ? task.tags.join(', ') : '';
            const escape = (str) => String(str).replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"');

            row.innerHTML = `
                <td>${escape(task.original_task || '')}</td>
                <td>${escape(task.summary || '')}</td>
                <td>${escape(task.priority || 'N/A')}</td>
                <td>${escape(tags)}</td>
            `;
            taskList.appendChild(row);
        });
        
        exportBtn.style.display = 'block';
    }

    exportBtn.addEventListener('click', () => {
        if (processedDataForExport.length === 0) return;

        const header = "Original Task,Summary,Priority,Tags\n";
        let csvRows = [];

        processedDataForExport.forEach(task => {
            const original = `"${(task.original_task || '').replace(/"/g, '""')}"`;
            const summary = `"${(task.summary || '').replace(/"/g, '""')}"`;
            const priority = task.priority || '';
            const tags = `"${(Array.isArray(task.tags) ? task.tags.join(', ') : '')}"`;
            csvRows.push([original, summary, priority, tags].join(","));
        });
        
        // The magic trick for Excel: Add a BOM character at the start
        const bom = "\uFEFF";
        const csvContent = bom + header + csvRows.join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "processed_tasks.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
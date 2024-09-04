<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 50px;
        }
        #todo-list {
            list-style-type: none;
            padding: 0;
            width: 300px;
        }
        #todo-list li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            margin: 5px 0;
            background-color: #f0f0f0;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        #todo-list li.completed {
            text-decoration: line-through;
            color: gray;
            background-color: #d0d0d0;
        }
        button {
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 4px;
        }
        #add-button {
            margin-top: 20px;
        }
        #todo-input {
            width: 200px;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }
        #filter-buttons {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
            width: 300px;
        }
        #filter-buttons button {
            flex: 1;
            margin: 0 5px;
        }
    </style>
</head>
<body>

    <h1>My To-Do List</h1>
    <input type="text" id="todo-input" placeholder="New task...">
    <button id="add-button">Add</button>
    <ul id="todo-list"></ul>

    <div id="filter-buttons">
        <button id="all-button">All</button>
        <button id="active-button">Active</button>
        <button id="completed-button">Completed</button>
    </div>

    <script>
        // Додаємо нове завдання в список
        document.getElementById('add-button').addEventListener('click', function() {
            const taskText = document.getElementById('todo-input').value;
            if (taskText.trim() !== "") {
                addTask(taskText);
                document.getElementById('todo-input').value = '';
            }
        });

        // Функція для додавання завдання
        function addTask(taskText) {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            // Додаємо унікальний номер кожному завданню
            const taskId = document.querySelectorAll('#todo-list li').length + 1; // number
            listItem.setAttribute('data-id', taskId.toString()); // Перетворення number в string

            // Кнопка "Complete"
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', function() {
                const isCompleted = listItem.classList.toggle('completed'); // boolean
                console.log(`Task ${taskId} completed: ${isCompleted}`); // Лог boolean значення
            });

            // Кнопка "Delete"
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                listItem.remove();
                console.log(`Task ${taskId} deleted`); // Використання number як ідентифікатора завдання
            });

            listItem.appendChild(completeButton);
            listItem.appendChild(deleteButton);

            document.getElementById('todo-list').appendChild(listItem);
        }

        // Фільтрація завдань
        document.getElementById('all-button').addEventListener('click', function() {
            filterTasks('all');
        });

        document.getElementById('active-button').addEventListener('click', function() {
            filterTasks('active');
        });

        document.getElementById('completed-button').addEventListener('click', function() {
            filterTasks('completed');
        });

        // Функція для фільтрації завдань
        function filterTasks(filter) {
            const tasks = document.querySelectorAll('#todo-list li');
            tasks.forEach(function(task) {
                switch (filter) {
                    case 'all':
                        task.style.display = 'flex';
                        break;
                    case 'active':
                        if (task.classList.contains('completed')) {
                            task.style.display = 'none';
                        } else {
                            task.style.display = 'flex';
                        }
                        break;
                    case 'completed':
                        if (task.classList.contains('completed')) {
                            task.style.display = 'flex';
                        } else {
                            task.style.display = 'none';
                        }
                        break;
                }
            });
        }

        // Збереження завдань у Local Storage
        window.addEventListener('beforeunload', function() {
            const tasks = [];
            document.querySelectorAll('#todo-list li').forEach(function(task) {
                tasks.push({
                    text: task.firstChild.textContent,
                    completed: task.classList.contains('completed') // boolean
                });
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        // Додатковий функціонал: Пошук завдань
        document.getElementById('todo-input').addEventListener('input', function() {
            const searchText = document.getElementById('todo-input').value.toLowerCase();
            const tasks = document.querySelectorAll('#todo-list li');
            tasks.forEach(function(task) {
                const taskText = task.firstChild.textContent.toLowerCase();
                if (taskText.includes(searchText)) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
            });
        });

        // Автоматичне фокусування на полі вводу після додавання завдання
        document.getElementById('add-button').addEventListener('click', function() {
            document.getElementById('todo-input').focus();
        });

        // Завантаження завдань з Local Storage
        window.addEventListener('load', function() {
            const savedTasks = JSON.parse(localStorage.getItem('tasks'));
            if (savedTasks) {
                savedTasks.forEach(function(task) {
                    addTask(task.text);
                    const listItem = document.querySelectorAll('#todo-list li');
                    const lastTask = listItem[listItem.length - 1];
                    if (task.completed) {
                        lastTask.classList.add('completed');
                    }
                });
            }
        });

    </script>

</body>
</html>

- Starting the Application
Install Dependencies
Run the following command in your terminal to install all the required packages:
npm install

- Start the Development Server
Launch the application locally by running:
npm run start

- Access the Application
Open your browser and navigate to the URL provided in the terminal (usually http://localhost:3000).

- Application Features and Flow
Login
The application starts with a login page.
Users must log in using valid credentials.
Upon successful login, the user will be redirected to the Home Page.
Home Page
The home page displays the user's To-Do List with the following functionalities:

- View To-Do List

- All tasks are listed here, sorted by the most recently created task at the top.
Modify Tasks

- Users can perform the following actions on each task:
Create: Add a new task to the list.
Update Status: Change the status of a task (e.g., Pending, In Progress, Completed).
Delete: Remove a task from the list.
View Details: See detailed information about a task.
Conditional Add Section

The "Add Task" form can be hidden or shown based on specific conditions (e.g., a button toggle or user interaction).
Add a New Task

Users can enter details for a new to-do task.
Once a task is created, it will immediately appear at the top of the list.

- Summary of Actions
Action	Description
Login	Enter valid credentials to access the home page.
View Tasks	See all tasks in a list format, sorted by latest created.
Add Task	Create a new to-do item; it appears at the top of the list after creation.
Update Status	Modify the status of a task (Pending → In Progress → Completed).
Delete Task	Permanently remove a task from the list.
View Details	Expand to see additional details about a specific task.
Hide/Show Add Task	Toggle the visibility of the "Add Task" section based on user interaction.
Additional Notes
Ensure that the backend API for managing tasks is running and accessible if the application depends on it.
Check the console or logs for any errors during development or while performing actions.
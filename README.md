User Registration Guide
Overview
The registration page allows users to create an account by providing their personal and professional details. This process ensures users are onboarded correctly, whether they are freelancers or clients.
________________________________________
For Users
Steps to Register
1.	Access the Registration Page:
o	Navigate to the registration page by clicking on the "Register" link on the homepage.
2.	Fill Out the Form:
o	First Name & Last Name: Enter your full name.
o	Email: Provide a valid email address (this will be used for login).
o	Phone Number: Enter your contact number (optional).
o	User Type: 
	Choose whether you are a Freelancer or Client.
o	Skills (for freelancers): List your skills, separated by commas (e.g., JavaScript, React, Node.js).
o	Professional Title: Add a title summarizing your role (e.g., Frontend Developer, Designer).
o	Hourly Rate: Specify your rate per hour in USD (optional).
o	Password: Create a secure password.
3.	Submit:
o	Click the "Register" button to create your account.
4.	Confirmation:
o	On successful registration, you will see a success message, and you'll be redirected to the login page.
________________________________________
For Developers
Component Overview
The Register component is built using React and performs the following:
•	Manages form state using useState.
•	Handles form submission by sending user data to the backend via the createUser service.
•	Redirects users to the login page after successful registration.
Key Files
•	Component: Register.jsx
•	Service: userService.js (handles API interaction for creating users)
Key Functionalities
1.	State Management:
o	Form data is stored in formData, and updates are handled via the handleInputChange method.
o	Success and error messages are managed with message and error states.
2.	Form Submission:
o	The handleSubmit function: 
	Prevents default form submission behavior.
	Processes the skills input into an array.
	Sends data to the backend API.
	Displays feedback (success or error) and redirects on success.
3.	Redirects:
o	After successful registration, the app redirects users to the login page using useNavigate.
________________________________________
API Documentation
Endpoint: /api/users/create
•	Method: POST
•	Request Payload: 
•	{
•	  "firstName": "John",
•	  "lastName": "Doe",
•	  "email": "johndoe@example.com",
•	  "phoneNumber": "1234567890",
•	  "userType": "freelancer",
•	  "skills": ["JavaScript", "React", "Node.js"],
•	  "professionalTitle": "Frontend Developer",
•	  "hourlyRate": 50,
•	  "password": "securepassword123"
•	}
•	Response: 
o	Success: 
o	{
o	  "user": {
o	    "id": "12345",
o	    "firstName": "John",
o	    "lastName": "Doe",
o	    "email": "johndoe@example.com",
o	    "userType": "freelancer"
o	  }
o	}
o	Error: 
o	{
o	  "message": "Email already exists"
o	}
________________________________________
Error Handling
•	Invalid Data: Users are prompted to correct input if required fields are missing or invalid.
•	Server Errors: Displays a generic error message ("Failed to create user") if the server is unreachable or returns an error.
________________________________________
How to Run Locally
1.	Clone the repository:
2.	git clone https://github.com/your-repo/scheduling-app.git
3.	cd scheduling-app
4.	Install dependencies:
5.	npm install
6.	Start the development server:
7.	npm start
8.	Open the app in your browser:
o	Go to http://localhost:3000/register to access the registration page.
 
Here's the documentation for the Login functionality:
________________________________________
User Login Guide
Overview
The login page allows registered users to securely access their accounts by providing their email and password. Once authenticated, users are redirected to their personalized dashboard.
________________________________________
For Users
Steps to Log In
1.	Navigate to the Login Page:
o	Go to the homepage and click on the "Login" button.
2.	Enter Your Credentials:
o	Email: Type in the email address you used during registration.
o	Password: Enter your account password.
3.	Submit the Form:
o	Click the "Login" button to submit your details.
4.	Access Your Dashboard:
o	If your credentials are correct, you’ll be logged in and redirected to your dashboard.
5.	Error Handling:
o	If the email or password is incorrect, an error message will appear prompting you to retry.
6.	Register if You Don’t Have an Account:
o	If you don’t have an account, click "Register here" to navigate to the registration page.
________________________________________
For Developers
Component Overview
The Login component:
•	Captures and manages user input using useState.
•	Sends login credentials to the backend via the loginUser service.
•	Stores the authentication token and user data in localStorage for session management.
•	Redirects authenticated users to the dashboard.
Key Functionalities
1.	State Management:
o	The form inputs (email and password) are managed via the formData state.
o	Errors during login are displayed using the error state.
2.	Form Submission:
o	The handleSubmit function: 
	Prevents default form submission behavior.
	Sends a POST request to the backend with the user’s credentials.
	On success, stores the token and user details in localStorage and redirects to the dashboard.
	On failure, displays an error message.
3.	Navigation:
o	Uses useNavigate from react-router-dom to redirect users to the dashboard after successful login or to the registration page if they need to create an account.
________________________________________
API Documentation
Endpoint: /api/users/login
•	Method: POST
•	Request Payload: 
•	{
•	  "email": "johndoe@example.com",
•	  "password": "securepassword123"
•	}
•	Response: 
o	Success: 
o	{
o	  "token": "eyJhbGciOiJIUzI1NiIsInR5...",
o	  "user": {
o	    "id": "12345",
o	    "firstName": "John",
o	    "lastName": "Doe",
o	    "email": "johndoe@example.com",
o	    "userType": "freelancer"
o	  }
o	}
o	Error: 
o	{
o	  "message": "Invalid email or password"
o	}
________________________________________
Error Handling
•	Invalid Credentials: 
o	Displays a user-friendly error message such as "Invalid email or password."
•	Server Errors: 
o	If the backend is unreachable or encounters an error, a generic message like "Login failed" is displayed.
________________________________________
How to Run Locally
1.	Clone the repository:
2.	git clone https://github.com/your-repo/scheduling-app.git
3.	cd scheduling-app
4.	Install dependencies:
5.	npm install
6.	Start the development server:
7.	npm start
8.	Open the app in your browser:
o	Go to http://localhost:3000/login to access the login page.
________________________________________
Security Considerations
•	Token Storage: 
o	The authentication token is stored in localStorage for session management. Ensure it’s handled securely and cleared on logout.
•	Error Messages: 
o	Avoid exposing sensitive information in error messages (e.g., specify whether the email or password is invalid).
 
How to Schedule a Meeting
This guide explains how to use the Meeting Scheduler form to create a new meeting.
________________________________________
Steps to Schedule a Meeting
Step 1: Access the Meeting Form
•	Navigate to the Schedule Meeting page in the application.
________________________________________
Step 2: Fill Out the Meeting Details
1.	Meeting Title:
o	Enter a descriptive title for your meeting (e.g., "Team Sync" or "Project Update").
o	This field is required.
2.	Participants:
o	Your name (as the logged-in user) will automatically populate and cannot be edited.
o	Enter the name of the second participant in the provided field.
o	Both participants are required to schedule the meeting.
3.	Meeting Date:
o	Select a date for the meeting using the date picker.
o	Ensure the date is correct before proceeding.
4.	Start Time:
o	Enter the start time of the meeting in HH:mm:ss format (e.g., 10:30:00 for 10:30 AM).
o	If the format is invalid, an error message will appear.
5.	Duration:
o	Specify the meeting duration in minutes (e.g., 30 for 30 minutes or 60 for 1 hour).
o	Ensure this is a positive number.
________________________________________
Step 3: Submit the Meeting
•	Once all fields are completed: 
1.	Click the "Schedule Meeting" button.
2.	If any errors are detected, correct them as prompted (e.g., invalid time format).
3.	Upon successful scheduling, you’ll see a confirmation message: "Meeting Scheduled Successfully!"
________________________________________
Error Handling
•	If an error occurs while scheduling, the application will display a message like: 
o	"Failed to schedule meeting."
o	Details of the error will appear below if available (e.g., backend validation issues).
________________________________________
Tips for Scheduling
•	Ensure the meeting does not overlap with other commitments.
•	Double-check the date and time format.
•	Add clear and relevant titles for easy identification.
________________________________________
For Developers
The meeting data is processed through the createMeeting service. The payload sent to the backend includes:
{
  "title": "Team Sync",
  "participants": ["123", "456"],
  "date": "2024-12-15",
  "startTime": "10:00:00",
  "duration": 60
}
This ensures proper validation and scheduling on the server. Any errors or exceptions during this process are logged and displayed for debugging or user correction.
 
How to Manage Meetings
This guide outlines how to view, update, and cancel meetings using the Manage Meetings functionality.
________________________________________
Steps to Manage Meetings
Step 1: Access the Manage Meetings Page
1.	Log in to your account.
2.	Navigate to the Manage Meetings section from the main menu or dashboard.
________________________________________
Step 2: View Your Meetings
•	Upon opening the page, all meetings associated with your account will be displayed.
•	For each meeting, you can view: 
o	Title: The name of the meeting.
o	Date: The scheduled date of the meeting.
o	Time: The start time in HH:mm:ss format.
o	Duration: The length of the meeting in minutes.
o	Participants: Your name and the name of the other participant.
If no meetings are found, a message will display: "No meetings found."
________________________________________
Step 3: Cancel a Meeting
1.	Locate the meeting you wish to cancel.
2.	Click the "Cancel" button associated with the meeting.
3.	Confirm the cancellation. 
o	The meeting will be removed from your list, and a message will confirm: "Meeting canceled successfully."
4.	If cancellation fails, an error message will appear.
________________________________________
Step 4: Update a Meeting
1.	Locate the meeting you want to update.
2.	Click the "Update" button associated with the meeting.
3.	Provide the new meeting details: 
o	Date: Enter a new date in the format YYYY-MM-DD.
o	Time: Enter a new time in the format HH:mm:ss.
4.	The app validates the date and time format: 
o	If invalid, an alert will prompt you to correct the input.
o	Example: "Invalid time format. Use HH:mm:ss."
5.	Once valid, the meeting details will be updated.
6.	A confirmation message will display: "Meeting updated successfully."
7.	If the update fails, an error message will display.
________________________________________
Error Handling
•	Failed Operations: 
o	Cancellation or update failures will display error messages such as: 
	"Failed to cancel meeting."
	"Failed to update meeting."
o	Check the error log for more details if required.
•	Invalid Input: 
o	Alerts prompt users to correct invalid date or time formats: 
	"Invalid date format. Use YYYY-MM-DD."
	"Invalid time format. Use HH:mm:ss."
________________________________________
Additional Features
•	Automatic User Identification: 
o	The logged-in user's name is displayed on the page.
o	The first participant in any meeting is prefilled as the logged-in user.
•	Other Participant Name: 
o	The app fetches and displays the name of the other participant for easier identification.
________________________________________
For Developers
Component Overview
The ManageMeetings component:
•	Fetches user meetings from the backend using getUserMeetings.
•	Provides functionality to cancel and update meetings using cancelMeeting and updateMeeting.
•	Displays each meeting as a MeetingCard component, which includes actions for updating and canceling.
Key Methods
1.	fetchMeetings:
o	Retrieves meetings for the logged-in user.
o	Uses the user's ID stored in localStorage.
2.	handleCancel:
o	Sends a request to the backend to cancel the selected meeting.
o	Removes the meeting from the UI upon successful cancellation.
3.	handleUpdate:
o	Prompts the user for a new date and time.
o	Validates the input before sending an update request to the backend.
o	Updates the meeting in the UI upon success.
4.	getOtherParticipantName:
o	Identifies the other participant by comparing their ID with the logged-in user's ID.
API Endpoints
1.	Get User Meetings:
o	Endpoint: /api/meetings/user/:userId
o	Method: GET
o	Response: List of meetings associated with the user.
2.	Cancel Meeting:
o	Endpoint: /api/meetings/:meetingId
o	Method: DELETE
o	Response: Confirmation of cancellation.
3.	Update Meeting:
o	Endpoint: /api/meetings/:meetingId
o	Method: PUT
o	Payload: 
o	{
o	  "date": "2024-12-15",
o	  "startTime": "10:30:00"
o	}
o	Response: Updated meeting details.
________________________________________
How to Run Locally
1.	Clone the repository and navigate to the project directory:
2.	git clone https://github.com/your-repo/scheduling-app.git
3.	cd scheduling-app
4.	Install dependencies:
5.	npm install
6.	Start the development server:
7.	npm start
8.	Log in to the app and navigate to Manage Meetings.


# Cars Dealership – Full-Stack Web Application

## Project Overview

Cars Dealership is a full-stack web application developed as part of the IBM Full-Stack Software Developer Capstone Project. The application allows users to explore car dealerships across different locations in the United States, view dealership details, and submit customer reviews.

The platform provides user authentication, dealer search and filtering, review management, and sentiment analysis to help users understand customer feedback.

## Features

- **Dealer Listings:** Browse available car dealerships.
- **Dealer Search:** Retrieve dealership information by dealer ID.
- **State Filtering:** Filter dealerships by state.
- **User Authentication:** Register, log in, and log out.
- **Customer Reviews:** View and submit dealership reviews.
- **Sentiment Analysis:** Analyze customer reviews to identify their sentiment.
- **Responsive UI:** Access the application through a responsive frontend.
- **REST APIs:** Communicate between frontend and backend services.

## Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React.js, HTML, CSS, JavaScript |
| Backend | Python, Django, REST APIs |
| Database | SQLite / configured database |
| Authentication | Django Authentication |
| API Testing | cURL |
| Version Control | Git, GitHub |
| CI/CD | GitHub Actions |
| Deployment | IBM Cloud Code Engine / configured deployment platform |
| Containerization | Docker |
| Orchestration | Kubernetes |

## Project Structure

```text
Cars-Dealership/
├── server/
│   ├── frontend/
│   │   ├── src/
│   │   │   └── components/
│   │   │       └── Register/
│   │   │           └── Register.jsx
│   │   └── static/
│   │       ├── About.html
│   │       └── Contact.html
│   ├── manage.py
│   └── ...
├── README.md
└── ...
```

*Note: The structure above is illustrative. Update it to match the actual repository.*

## Application Functionality

### 1. Dealer Management
Users can retrieve all dealerships, search for a specific dealership, and filter dealerships by state.

### 2. User Management
Users can create accounts, authenticate themselves, and log out securely.

### 3. Review Management
Authenticated users can submit reviews for dealerships and view existing customer feedback.

### 4. Sentiment Analysis
The application analyzes review text and returns sentiment information to help interpret customer experiences.

## Installation and Setup

Clone the repository:

```bash
git clone <https://github.com/Sanika-2605/Cars-Dealership_Coursera-Capstone-Project>
cd Cars-Dealership_Coursera-Capstone-Project
```

Navigate to the backend directory:

```bash
cd server
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Apply database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

Follow the frontend setup instructions in the relevant frontend directory if a separate frontend development server is required.

## Testing

The application APIs can be tested using cURL commands or an API testing tool.

Test the following functionality:

- Dealer retrieval
- Dealer details by ID
- Dealer filtering by state
- User registration and authentication
- Login and logout
- Dealer review retrieval and submission
- Sentiment analysis

## CI/CD and Deployment

GitHub Actions is used for workflow automation and continuous integration. The application can be containerized using Docker and deployed using the configured cloud deployment environment.

## Learning Outcomes

Through this project, the following concepts were applied:

- Full-stack web development
- Frontend and backend integration
- REST API development and testing
- Authentication and database management
- Responsive user interface development
- Version control with Git and GitHub
- CI/CD workflow automation
- Application deployment
- Sentiment analysis integration

## Project Information

**Project:** Cars Dealership – Full-Stack Development Capstone

**Program:** IBM Full-Stack Software Developer Professional Certificate

**Purpose:** Educational capstone project demonstrating full-stack application development and deployment.

 Medicinal Remedies

Medicinal Remedies is a full-stack project that helps users explore natural remedies for common symptoms such as headaches, colds, and digestive issues.

The project demonstrates:
- Responsive web development
- REST API development with ASP.NET Core
- Async programming with `HttpClient`
- JSON serialization/deserialization
- Node.js and Express server setup
- Console application development

 Features

- Symptom-based remedy suggestions
- Responsive mobile-friendly layout
- Dynamic content using JavaScript
- ASP.NET Core Minimal API
- Async console application using `HttpClient`
- JSON API endpoints
- Data visualization with Chart.js
- Input validation using regular expressions

 Technologies Used

 Frontend
- HTML5
- CSS3
- JavaScript
- Chart.js

 Backend
- Node.js
- Express.js
- ASP.NET Core
- C#
- HttpClient

 Tools
- Git & GitHub
- VS Code
- .NET CLI

---

 Project Structure

```text
Medicinal-Remedies/
│
├── MedicinalRemedies.Api/
├── MedicinalRemedies.Console/
├── MedicinalRemedies.Tests/
├── server/
└── README.md
API Endpoints
GET /api/remedies
GET /api/remedies/1
GET /api/remedies/symptom/headache
Running the ASP.NET API
dotnet run --project MedicinalRemedies.Api --urls http://localhost:5000
Running the Console App

Open a second terminal:

dotnet run --project MedicinalRemedies.Console
Running the Node.js Server
cd server
npm install
node server.js

Open:

http://localhost:3000


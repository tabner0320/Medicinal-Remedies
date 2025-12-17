# -- Medicinal Remedies

This project includes an interactive web application designed to help users explore natural remedies for the following symptoms: headaches, colds, and digestive issues. This project displays my understanding of front-end web development, responsive design, and Node.js/Express server setup.

## -- Features

- Symptom-based remedy suggestions  
- Dynamic content updates using JavaScript  
- Responsive design for both mobile and desktop views  
- Organized project structure with static file serving via Express  
- Clean, accessible, and semantic HTML markup  
- Analyze data that is stored in arrays, objects, sets or maps and display information about it in your app. 
- Use a regular expression to validate user input and either prevent the invalid input or inform the user about it (in all cases prevent invalid input from being stored or saved). 
-  Create a function that accepts two or more input parameters and returns a value that is calculated or    determined by the inputs.  Basic math functions don’t count (e.g. addition, etc). 
-  Visualize data in a user friendly way. (e.g. graph, chart, etc) This can include using libraries like ChartJS 

### Responsive Design
- Mobile-first layout with a desktop breakpoint at **768px**.
- On smaller screens, content stacks vertically for readability.
- On larger screens, the remedies section switches to a **two-column grid** for improved layout.


## -- Technologies Used

-- Frontend:  
- HTML5  
- CSS3 (Flexbox, Grid, Media Queries)  
- Vanilla JavaScript (DOM manipulation, event handling)

-- Backend: 
- Node.js  
- Express.js  
- CORS and dotenv for configuration

## --- Project Structure

Medicinal-Remedies/
├── server.js
├── package.json
├── /public
│ ├── index.html
│ ├── style.css
│ ├── script.js
│ └── /images
│ └── profile.jpg
└── /data.json
---

## -- Setup Instructions

1. Clone this repository  
   gitbash
   git clone https://github.com/tabner0320/Medicinal-Remedies.git

2. Navigate to the project directory

   gitbash

   cd Medicinal-Remedies

3. Install dependencies

   gitbash

   npm install

4. Start the server

   gitbash

  node server/server.js

5. Open your browser and go to:

   http://localhost:3000

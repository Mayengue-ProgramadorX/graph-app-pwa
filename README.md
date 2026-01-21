#  Graph App — Smart Data Visualization (PWA)

**Graph App** is a Progressive Web Application (PWA) designed to transform raw user data into clear, meaningful visualizations.  
The system intelligently analyzes the structure and semantics of the data and recommends the most appropriate chart types based on real-world interpretation rules.

---

##  Features

-  **Automatic chart recommendations**
  - Line charts for trends and evolution
  - Bar charts for comparisons
  - Pie charts for proportional data
  - Tables for textual or non-visual data

-  **Smart data analysis**
  - Detects numeric vs textual data
  - Supports labeled values (`label:value`)
  - Validates proportional data for pie charts

-  **Clean & responsive UI**
  - Optimized for desktop and mobile
  - Charts rendered with Chart.js
  - Percentages displayed directly on pie charts

-  **Export options**
  - Download charts as PNG
  - Download tables as CSV

-  **Progressive Web App (PWA)**
  - Installable on mobile & desktop
  - Works offline
  - Custom icons and theme color

---

##  Project Structure

app-graph/
├── public/
│ ├── home.html
│ ├── app.html
│ ├── dashboard.html
│ ├── about.html
│ ├── manifest.json
│ └── _redirects
│
├── assets/
│ ├── css/
│ ├── js/
│ └── icons/
│
├── service-worker.js
└── README.md



---

##  Example Inputs

### Numeric trend (Line chart)
10, 15, 20, 25



### Proportional data (Pie chart)
Apple:40, Samsung:35, Xiaomi:25



### Multiple categories (Bar chart)
Category A → 10, 20
Category B → 15, 30



---

##  Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES Modules)**
- **Chart.js**
- **Chart.js DataLabels Plugin**
- **Service Workers**
- **Web App Manifest**
- **Netlify (Hosting)**

---

##  Deployment

The app is deployed using **Netlify** with GitHub integration.

**Key settings:**
- Publish directory: `app-graph/public`
- HTTPS enabled automatically
- SPA routing handled via `_redirects`

---

##  Developer Information

**Developed by:** Jose Mayengue Antonio  
**Email:** [josemayengue51@gmail.com](mailto:josemayengue51@gmail.com)  
**WhatsApp:** [+1 774 494 5819](https://wa.me/17744945819)  
**Development Date:** January 2026  

---

##  License

This project is for educational and demonstrative purposes.  
You are free to study, modify, and extend it.

---

##  Future Improvements

- Offline fallback screen
- Advanced chart customization
- Data import (CSV / JSON)
- Analytics integration
- Multi-language support

---

**Graph App — Turning data into insight.**

# Zeraki Sales Dashboard

## Project Overview

The Zeraki Sales Dashboard is a web application designed to manage and visualize school-related data, including collections, signups, revenue, and bounced cheques. It provides an intuitive interface for tracking financial performance and sign-ups for different products (Analytics, Finance, and Timetable).

## Features

- Display total collections, signups, revenue, and bounced cheques.
- Show sign-ups per product and their breakdown by school type (Primary, Secondary, IGCSE).
- Visualize targets and achievements for each product using pie charts.
- View upcoming invoices with quick actions for payment collection.

## Key Design Decisions

- **Responsiveness:** The layout is designed to be responsive, using a grid system to ensure it works well on different screen sizes.
- **Component-based Architecture:** The application is built with reusable components like `MetricsCard`, `Piechart`, `Barchart`, and `UpcomingInvoices`.
- **State Management:** Utilizes React's `useState` and `useEffect` hooks to manage state and side effects.
- **Data Fetching:** Uses Axios for data fetching from a JSON server.

## Technologies Used

- React
- Tailwind CSS
- Axios
- JSON Server (for mock backend)
- Git for version control

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Git

### Installation

1. **Clone the repository:**

   ```sh
   git clone git@github.com:Mghendi-Pato/zerakisales.git
   cd zerakisales
2. **Install dependencies:**
   npm install -f
   - the flag is due to the dependency conflict in react alerts
3. Start the application
   npm run dev

## Usage overview
- Metrics Overview: View total collections, signups, revenue, and bounced cheques on the dashboard.
- Signups Overview: Visualize sign-ups per product categorized by school type using bar charts.
- Targets: Track and visualize targets vs. achievements for each product using pie charts.
- Upcoming Invoices: Manage and view upcoming invoices with quick action buttons for payment collection.
  
  ![image](https://github.com/Mghendi-Pato/zerakisales/assets/106270504/660bac47-8bef-4ee7-aa37-e818cba33235)

  ![image](https://github.com/Mghendi-Pato/zerakisales/assets/106270504/5e5880ba-f600-47db-99b6-72e2449ee878)

- The application features a retractable sidebar for easy navigation, allowing for maximum visibility of the main application window.

  ![image](https://github.com/Mghendi-Pato/zerakisales/assets/106270504/7c07631f-3a91-4d4b-b955-414b0a89f72a)

- Schools list page, click on a school to view school details

  ![image](https://github.com/Mghendi-Pato/zerakisales/assets/106270504/160d7d38-c3e1-405c-adab-27749973a18e)

- On the School Details page, you can view each school's invoices and collections. Use the green and yellow buttons to switch between the invoices and collections.

  ![image](https://github.com/Mghendi-Pato/zerakisales/assets/106270504/fd3f5c1a-f3bb-4f48-9bdd-61374418ca7b)

- Add an invoice, collect payment, and delete invoices
- ![image](https://github.com/Mghendi-Pato/zerakisales/assets/106270504/fe968fe1-6d85-4eed-8c70-0f39a5f3db31)
- ![image](https://github.com/Mghendi-Pato/zerakisales/assets/106270504/cdd8f507-6af5-4979-8d1e-93295448eefb)
- ![image](https://github.com/Mghendi-Pato/zerakisales/assets/106270504/474a3535-e515-4f2e-aa38-6763a536975f)


















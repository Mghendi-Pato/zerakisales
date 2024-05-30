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










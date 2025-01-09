**Dashboard Application**

**Overview**

This project is a responsive dashboard application built using TypeScript, Next.js, TailwindCSS, and Zustand for state management. The dashboard includes features for displaying products, creating and editing product entries, and handling data with pagination. The application stores data in local storage, simulating GraphQL queries and mutations.

**Features**

**Summary Boxes:**
* Displays the total number of products.
* Displays the count of products by status (Pending, Delivered, Cancelled).
**Data Table:**
* Paginated list of products with details such as Product ID, Title, Description, Status, and ETA ``(formatted as dd/MM/yyyy hh:mm aaa)``.
*Ability to create, edit, and delete product entries.
**Form to Add/Edit Products:**
* Form for adding and editing product details, including:
* Title
* Recipient
* Recipient Phone
* Description
* Origin
* Destination
* ETA
* Packages
**Pagination:**
* Pagination implemented using the products query with a page size of 5 records.
* "Next" and "Previous" buttons for navigating through pages.
**Responsiveness:**
* Fully responsive design, ensuring that the dashboard works across mobile, tablet, and desktop devices.
**State Management:**
* Zustand is used for managing the application state (products list, pagination, form data).
**Tech Stack**
* TypeScript - For type safety and reliability.
* Next.js - React framework for building the app.
* TailwindCSS - Utility-first CSS framework for styling.
* Zustand - Lightweight state management library for handling state in a global store.
**Setup Instructions**
1. Clone the repository:
``git clone <repository-url>``
2. Navigate to the project folder
``cd dashboard-app``
3. Install dependencies:
``yarn install # OR npm install``
4. Run the development server:
``yarn dev # OR npm run dev``
5. Open the application in your browser at:
``http://localhost:3000``

**Implementation Approach**
* State Management: I used Zustand to manage the global state of the application, including product data, pagination, and form inputs.
* GraphQL Simulation: Since no real API is required, I simulated GraphQL queries and mutations in local storage, allowing me to manage and manipulate data seamlessly.
* UI Components: The dashboard layout was broken down into reusable components, including ProductTable, ProductForm, SummaryBox, and Pagination.
* Responsive Design: TailwindCSS's responsive utilities were used to ensure the application is mobile-friendly and adjusts according to screen size.
**Assumptions**
* All data is stored and managed in local storage.
* No actual GraphQL API integration is required, but mutations and queries are simulated in local storage.
**Extra Features**
* Pagination is implemented to show 5 records per page, with "Next" and "Previous" buttons to navigate.
* A form to add and edit products with validation for fields like weight and quantity.
**Known Issues (if any)**
* No major issues at the moment. All functionalities should work as expected, but improvements can be made in pagination logic for handling larger data sets.
**Future Improvements**
* Add functionality for searching products.
* Implement delete functionality for product records.




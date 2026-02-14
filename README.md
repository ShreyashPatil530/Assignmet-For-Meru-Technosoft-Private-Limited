# Invoice Details Assignment - Meru Technosoft

This project is a full-stack MERN application developed as an assignment for Meru Technosoft Private Limited. It features a comprehensive Invoice Details page allowing users to view, manage, and process invoice data efficiently.

## Table of Contents
- [Project Overview](#project-overview)
- [Workflow Diagram](#workflow-diagram)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)

## Project Overview
The application consists of a typically structured **React frontend** and a **Node.js/Express backend**. 

**Key Features:**
- **Invoice Management:** View detailed invoice information including line items and totals.
- **Payment Processing:** Add payments to specific invoices via a modal interface.
- **Status Tracking:** Automatically updates invoice status (e.g., Pending, Paid, Late) based on payments and due dates.
- **PDF Generation:** Download invoice details as a PDF document.

## Workflow Diagram

```mermaid
graph TD
    User["User"] -->|"Interacts with UI"| Client["React Client (Vite)"]
    Client -->|"HTTP Requests (Axios)"| Server["Node.js Express Server"]
    Server -->|"CRUD Operations"| DB["Database / Mock Data"]
    
    subgraph Frontend ["Client Side"]
        Client -->|"View Details"| InvoicePage["Invoice Details Page"]
        Client -->|"Add Payment"| PaymentModal["Payment Modal"]
        Client -->|"Download PDF"| PDFGen["PDF Generator"]
    end

    subgraph Backend ["Server Side"]
        Server -->|"GET /api/invoices/:id"| GetInvoice["Fetch Invoice"]
        Server -->|"POST /api/invoices/:id/payment"| AddPayment["Process Payment"]
        Server -->|"Validation"| Middleware["Validation Middleware"]
    end
```

## Tech Stack
- **Frontend:** React 19, Vite, TailwindCSS, Lucide React (Icons), Axios
- **Backend:** Node.js, Express.js, CORS
- **Tools:** Git, npm

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
Open your terminal and run:
\`\`\`bash
git clone https://github.com/ShreyashPatil530/Assignmet-For-Meru-Technosoft-Private-Limited.git
cd Assignmet-For-Meru-Technosoft-Private-Limited
\`\`\`

### 2. Server Setup
Navigate to the server directory, install dependencies, and start the server:
\`\`\`bash
cd server
npm install
npm start
\`\`\`
The server will run on \`http://localhost:5000\`.

### 3. Client Setup
Open a **new terminal window**, navigate to the client directory, install dependencies, and start the frontend:
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`
The client will run on \`http://localhost:5173\`.

## API Endpoints
| Method | Endpoint | Description |
|Col1|Col2|Col3|
|---|---|---|
| `GET` | `/api/invoices/:id` | Fetch specific invoice details including items and history. |
| `POST` | `/api/invoices/:id/payment` | Add a payment record to a specific invoice. |

## Folder Structure
\`\`\`
root
├── client/          # Frontend React Application
│   ├── src/         # Source code (Components, Pages, Assets)
│   ├── public/      # Static assets
│   └── package.json # Frontend dependencies
├── server/          # Backend Node.js Application
│   ├── index.js     # Server entry point
│   ├── routes/      # API route definitions
│   └── package.json # Backend dependencies
└── README.md        # Project Documentation
\`\`\`

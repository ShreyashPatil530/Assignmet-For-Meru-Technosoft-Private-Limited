# Invoice Details Assignment - Meru Technosoft

This project is a full-stack MERN application developed as an assignment for Meru Technosoft Private Limited. It features an Invoice Details page with functionalities to view, manage, and process invoice data.

## Table of Contents
- [Project Overview](#project-overview)
- [Workflow Diagram](#workflow-diagram)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)

## Project Overview
The application consists of a React frontend and a Node.js/Express backend. It allows users to:
- View invoice details including line items.
- Add payments to invoices.
- Download invoice PDFs.
- Manage invoice status (Pending, Paid, Late).

## Workflow Diagram

```mermaid
graph TD
    User[User] -->|Interacts with UI| Client[React Client (Vite)]
    Client -->|HTTP Requests (Axios)| Server[Node.js Express Server]
    Server -->|CRUD Operations| DB[(Database / Mock Data)]
    
    subgraph Frontend [Client Side]
        Client -->|View Details| InvoicePage[Invoice Details Page]
        Client -->|Add Payment| PaymentModal[Payment Modal]
        Client -->|Download PDF| PDFGen[PDF Generator]
    end

    subgraph Backend [Server Side]
        Server -->|GET /api/invoices/:id| GetInvoice[Fetch Invoice]
        Server -->|POST /api/invoices/:id/payment| AddPayment[Process Payment]
        Server -->|Validation| Middleware[Validation Middleware]
    end
```

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS, Lucide React (Icons), Axios
- **Backend:** Node.js, Express.js, Cors
- **Database:** (Simulated or MongoDB if applicable)

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- Git installed.

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/ShreyashPatil530/Assignmet-For-Meru-Technosoft-Private-Limited.git
cd Assignmet-For-Meru-Technosoft-Private-Limited
\`\`\`

### 2. server Setup
Navigate to the server directory and install dependencies:
\`\`\`bash
cd server
npm install
npm start
\`\`\`
The server will run on \`http://localhost:5000\`.

### 3. Client Setup
Open a new terminal, navigate to the client directory and install dependencies:
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`
The client will run on \`http://localhost:5173\`.

## API Endpoints
- \`GET /api/invoices/:id\` - Fetch invoice details.
- \`POST /api/invoices/:id/payment\` - Add a payment record.

## Folder Structure
\`\`\`
root
├── client/          # Frontend React Application
│   ├── src/         # Source code
│   ├── public/      # Static assets
│   └── package.json
├── server/          # Backend Node.js Application
│   ├── index.js     # Entry point
│   ├── routes/      # API routes
│   └── package.json
└── README.md        # Project Documentation
\`\`\`

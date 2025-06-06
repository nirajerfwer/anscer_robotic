# Fleet Management Workflow Builder

This project is a **Fleet Management Software** that enables users to visually create, manage, and store workflows consisting of **nodes** and **transitions**. It is built using **Bun** (a fast JavaScript runtime) and **Hono** (a lightweight web framework), backed by **MongoDB** for data storage.

## 🚀 Features

- Create customizable workflow nodes  
- Define transitions between nodes  
- Store and retrieve workflows  
- REST API built with Hono and Bun  
- MongoDB as the database  
- Frontend integration using React + React Flow (not covered here)  

## 🧰 Tech Stack

| Layer          | Technology               |
| -------------- | ------------------------ |
| Runtime        | [Bun](https://bun.sh/)   |
| Web Framework  | [Hono](https://hono.dev/)|
| Database       | MongoDB                  |
| ODM            | Mongoose                 |
| Frontend       | React + React Flow       |

## 📦 Installation & Setup Guide

### 1. Clone the Repository


git clone https://github.com/nirajerfwer/anscer_robotic
cd fleet-workflow-builder

### 2. Install Dependencies

bun install

### 3. Set Up Environment Variables
Create a .env file in the root folder with the following content:


PORT=3000
MONGO_URI=mongodb://localhost:27017/workflowdb
redisURL = redis://default:d56aAPjnQsseWJRshmYTjA874rBKzuJq@redis-14545.c85.us-east-1-2.ec2.redns.redis-cloud.com:14545

Make sure MongoDB is running locally or update the MONGO_URI to point to your database server.

### Running the Application
Start the development server with:

bun run dev

Your backend server will be running at http://localhost:3000.

### To build and run in production mode:


npm run start


### API Endpoints

Method	Endpoint	Description
POST	/workflow	Create a new workflow
GET	/workflow/:id	Retrieve a workflow by ID

### System Architecture

Frontend (React + React Flow)
        │
        ▼
Backend REST API (Hono + Bun)
        │
        ▼
MongoDB Database (workflowdb)


### Backend Folder Structure

/src
  ├── db/
  │    ├── workflow.ts          # WorkFlow schema
  ├── handler/
  │    ├── workflow_handler.ts          # Workflow Handler
  ├── redis/
  │    ├── redis_client.ts          # redis client
  ├── router/
  │    └── workflow.ts            # Workflow API routes
  └── server.ts                      # Main Hono app setup


### Sample Workflow JSON

{
  "name": "Vehicle Dispatch Workflow",
  "nodes": [{
    "id":1,
    "name":"assign task",
    "position":[{"x":100,"y":100}]
    },
    {"
    id":2,
    "name":
    "navigate",
    "position":[{"x":100,"y":100}]
    }],
  "transitions": [{
    "from":1,
    "to":2
    }]
}

## 📸 UI Preview

_Add screenshots below to demonstrate the application UI_

> **Workflow UI**
> ![Workflow UI](./workflow_create_work_flow.PNG)

> **Workflow View by ID**
> ![Workflow by ID](./get_workflow_withId.PNG)

---

## ⚙️ Features

- Create custom fleet workflows visually.
- Drag-and-drop node editor powered by `react-flow-renderer`.
- Save workflows via backend API.
- View specific workflows by ID.
- Clean and responsive interface.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

git clone https://github.com/your-username/fleet-management-frontend.git

cd fleet-management-frontend
2️⃣ Install Dependencies

npm install
3️⃣ Start Development Server

npm run dev
Visit: http://localhost:5173

🔗 API Integration
The frontend communicates with the backend to POST and GET workflows using the following routes:

➕ Create Workflow
URL: POST http://localhost:5173/workflow

Triggered on form submission or node canvas save action.

📄 Get Workflow by ID
URL Format: GET http://localhost:3000/workflow/:id

Access in frontend via: http://localhost:5173/workflow_id_here

Replace workflow_id_here with the actual workflow ID.

🧰 Tech Stack
React

Vite

React Flow Renderer

Axios

Tailwind CSS (optional)


📝 Folder Structure

/src
  ├── components/
  │    ├── nodes_and_transitions/
  │    │      ├── FlowCanvas.jsx
  │    │      ├── my_.jsx
  │    │      └── TextInputNode.jsx
  │    ├── home.jsx
  │    └── workflowcanvas.css
  ├── services/
  │    └── Flow_Operations.jsx
  ├── App.jsx
  └── main.jsx
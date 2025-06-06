import { Hono } from 'hono'
import { serve } from 'bun'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { workflowRouter } from './router/workflow'
import { cors } from 'hono/cors'
// import { workflowRouter } from './router/workflow'

// Load .env variables
config()

const app = new Hono()

app.use('*', cors()) // Enable CORS for all routes

// Connect MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/workflowdb"

mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Use workflow routes
app.route('/workflow', workflowRouter)

// Start server
serve({
  fetch: app.fetch,
  port: parseInt(process.env.PORT || '3000'),
})

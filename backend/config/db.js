const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Create connection pool using Supabase DATABASE_URL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Test the connection when server starts
pool.query('SELECT NOW()', (err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ PostgreSQL Database connected successfully');
    }
});

// Export query helper function
module.exports = {
    query: (text, params) => pool.query(text, params),
};

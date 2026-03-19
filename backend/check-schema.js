const db = require('./config/db');

async function checkSchema() {
    try {
        const res = await db.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'files' AND column_name = 'user_id'
        `);
        console.log('Schema for files.user_id:');
        console.log(JSON.stringify(res.rows, null, 2));
        
        // Also check if any other columns are missing (like is_starred, is_trash)
        const allCols = await db.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'files'
        `);
        console.log('All columns in files table:');
        console.log(allCols.rows.map(r => r.column_name).join(', '));
        
        process.exit(0);
    } catch (err) {
        console.error('Check failed:', err.message);
        process.exit(1);
    }
}

checkSchema();

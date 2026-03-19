const db = require('./config/db');
db.query('SELECT * FROM files WHERE user_id = $1', ['user_clerk_test'])
  .then(res => {
      console.log('Query successful');
      process.exit(0);
  })
  .catch(err => {
      console.error('Query failed with error:', err.message);
      process.exit(1);
  });

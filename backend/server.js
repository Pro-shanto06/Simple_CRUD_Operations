require('dotenv').config();
const app = require('./index');
const connectDB = require('./db');

connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
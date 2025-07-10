import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import { initDb } from './apps/component-a/data-access/initDatabase.js'
const PORT = process.env.PORT || 3000;

(async () => {
  await initDb();
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});})();

// reference this: https://github.com/goldbergyoni/nodebestpractices
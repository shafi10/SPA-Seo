import sqlite3 from "sqlite3";
import path from "path";

const DEFAULT_DB_FILE = path.join(process.cwd(), "database.sqlite");

const db = new sqlite3.Database(DEFAULT_DB_FILE);

async function __query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}
export async function getAccessTokenForShop(shop) {
  const query = `SELECT accessToken FROM shopify_sessions WHERE shop = ?`;
  const response = await __query(query, [shop]);
  return response;
}

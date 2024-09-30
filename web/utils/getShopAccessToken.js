import sqlite3 from "sqlite3";
import path from "path";

const DEFAULT_DB_FILE = path.join(process.cwd(), "database.sqlite");

const db = new sqlite3.Database(DEFAULT_DB_FILE);

export async function getAccessTokenForShop(shop) {
  const query = `SELECT access_token FROM shops WHERE shop = ?`;
  const response = await db.get(query, [shop]);
  return response;
}

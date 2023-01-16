import client from "../database";

export type Book = {
  id: number;
  title: string;
  author: string;
  totalPages: number;
  summary: string;
};

export class BookStore {
  // show all books
  async index(): Promise<Book[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM books";
      const result = await connection.query(sql);
      connection.release(); // close db connection
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get books. Error: ${error}`);
    }
  }
  //show book by id
  async show(id: string): Promise<Book> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM books WHERE id=($1)";
      const result = await connection.query(sql, [id]);
      connection.release(); // close db connection

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get books. Error: ${error}`);
    }
  }
  //add book to database
  async create(b: Book): Promise<Book> {
    try {
      const connection = await client.connect();
      const sql =
        "INSERT INTO books (title, author, totalPages, summary) VALUES ($1, $2, $3, $4) RETURNING *";
      const result = await connection.query(sql, [
        b.title,
        b.author,
        b.totalPages,
        b.summary,
      ]); //
      connection.release(); // close db connection
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get books. Error: ${error}`);
    }
  }
  //delete book from database
  async delete(id: string): Promise<Book> {
    try {
      const connection = await client.connect();
      const sql = "DELETE FROM books WHERE id=($1)";
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete book. Error: ${error}`);
    }
  }
}

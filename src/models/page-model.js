const db = require('./index');

const pageModel = {
  selectParentPage: async function (id) {
    try {
      query = `
        SELECT page.parent_page, parentpage.title, page.title, page.depth
        FROM page
        LEFT JOIN page AS parentpage
        ON page.parent_page = parentpage.id
        WHERE page.id = ${id};
      `;

      const connection = await db.getConnection(); // DB pool 연결
      const result = await connection.query(query);
      connection.release();

      return result[0][0];
    } catch (error) {
      console.error(error);
    }
  },
  selectSubPages: async function (id) {
    try {
      query = `
        SELECT title
        FROM page
        WHERE parent_page = ${id};
      `;

      const connection = await db.getConnection(); // DB pool 연결
      const subPages = await connection.query(query);
      connection.release();

      return subPages[0];
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = pageModel;

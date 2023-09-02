const db = require('./index');

exports.pageModel = {
  selectParentPage: async function () {
    try {
      // parent_page가 null일때까지 반복 breadcrumbs head에 삽입
      // Linked List 활용해서 앞에 삽입
      query = `
        SELECT page.parent_page, parentpage.title, page.title
        FROM page
        INNER JOIN page AS parentpage
        ON page.parent_page = parentpage.id
        WHERE page.id = ?;
      `;

      const connection = await db.getConnection(); // DB pool 연결
      const result = await connection.query(query);
      connection.release();

      return result;
    } catch (error) {
      console.error(error);
    }
  },
  selectSubPages: async function () {
    try {
      query = `
        SELECT title
        FROM page
        WHERE parent_page = ${id};
      `;

      const connection = await db.getConnection(); // DB pool 연결
      const subPages = await connection.query(query);
      connection.release();

      return subPages;
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = db;

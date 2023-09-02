const mysql = require('mysql2/promise');
const db = mysql.createPool({
  url: 'http://localhost:3037',
});

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

async function getNotionPage(req, res) {
  try {
    const { id } = req.params;
    let breadcrumbs;
    let query, path;

    const connection = await db.getConnection(); // DB pool 연결

    // parent_page가 null일때까지 반복 breadcrumbs head에 삽입
    // Linked List 활용해서 앞에 삽입
    query = `
      SELECT page.parent_page, parentpage.title, page.title
      FROM page
      INNER JOIN page AS parentpage
      ON page.parent_page = parentpage.id
      WHERE page.id = ?;
    `;

    while (path.parent_page !== null) {
      // default로 null
      path = await connection.query(query, queryData);
      breadcrumbs = new ListNode(path.parent_page.title);
    }

    // parent_page가 id인 로우 검색
    query = `
      SELECT title
      FROM page
      WHERE parent_page = ${id};
    `;

    let subPages = await connection.query(query);
    connection.release();

    return res.status(200).json({
      pageId: id,
      title,
      subPages, // []
      breadcrumbs, // ["A", "B", "C"]
    });
  } catch (error) {
    console.error(error);
  }
}

export default getNotionPage;

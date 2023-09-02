class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

async function getNotionPage(req, res) {
  try {
    const { id } = req.params;
    let breadcrumbs, query, path;

    while (path.parent_page !== null) {
      // default로 null
      path = await connection.query(query, queryData);
      breadcrumbs = new ListNode(path.parent_page.title);
    }

    // parent_page가 id인 로우 검색

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

module.exports = getNotionPage;

const pageModel = require('../models/page-model');

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

async function getNotionPage(req, res) {
  try {
    const { id } = req.params;
    let breadcrumbs, title, path;

    // parent_page가 null일때까지 반복 breadcrumbs head에 삽입
    // Linked List 활용해서 앞에 삽입
    let targetId = id;
    while (targetId !== null) {
      path = await pageModel.selectParentPage(targetId);
      console.log(path);
      if (targetId === id) {
        title = path.title;
      }
      targetId = path['parent_page'];
    }

    // parent_page가 id인 로우 검색
    let subPages = await pageModel.selectSubPages(id);
    for (let i = 0; i < subPages.length; i++) {
      subPages[i] = subPages[i].title;
    }

    return res.status(200).json({
      pageId: id,
      title,
      subPages, // []
      // breadcrumbs, // ["A", "B", "C"]
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = getNotionPage;

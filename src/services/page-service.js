const pageModel = require('../models/page-model');

async function getNotionPage(req, res) {
  try {
    const { id } = req.params;
    let breadcrumbs = [];
    let path, depth;

    // parent_page가 null일때까지 반복
    let targetId = id;
    let i = 1;
    while (targetId !== null) {
      path = await pageModel.selectParentPage(targetId);
      if (targetId === id) {
        depth = path.depth;
      }
      breadcrumbs[depth - i++] = path.title;
      targetId = path['parent_page'];
    }

    // parent_page = id인 row SELECT
    let subPages = await pageModel.selectSubPages(id);
    for (let i = 0; i < subPages.length; i++) {
      subPages[i] = subPages[i].title;
    }

    return res.status(200).json({
      pageId: id,
      title: breadcrumbs[breadcrumbs.length - 1],
      subPages, // []
      breadcrumbs, // ["A", "B", "C"]
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = getNotionPage;

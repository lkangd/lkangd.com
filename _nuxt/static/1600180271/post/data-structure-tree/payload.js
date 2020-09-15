__NUXT_JSONP__("/post/data-structure-tree", (function(a){return {data:[{post:{attributes:{title:"树数据结构的原理及JS实现",date:"2019-06-29",spoiler:"JavaScript语言环境下的树学习",featured:false,link:a,min2read:"☕️☕️☕️ 17 min read",wordcount:"3.8k"},body:"\u003Cp\u003E\u003Cdiv class=\"cs-toc-dom\"\u003E\u003Cul\u003E\u003Cli\u003E\u003Ca href=\"#shimoshishu\"\u003E什么是树？\u003C\u002Fa\u003E\u003Cul\u003E\u003Cli\u003E\u003Ca href=\"#dingyi\"\u003E定义\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#jiedianfenlei\"\u003E结点分类\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#jiedianguanxi\"\u003E结点关系\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#cengyushendu\"\u003E层与深度\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#cunchujiegou\"\u003E存储结构\u003C\u002Fa\u003E\u003Cul\u003E\u003Cli\u003E\u003Ca href=\"#fumubiaoshifa\"\u003E父母表示法\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#haizibiaoshifa\"\u003E孩子表示法\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#haizixiongdibiaoshifa\"\u003E孩子兄弟表示法\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#changyongshujiegouerchashu\"\u003E常用树结构：二叉树\u003C\u002Fa\u003E\u003Cul\u003E\u003Cli\u003E\u003Ca href=\"#erchashudingyi\"\u003E二叉树定义\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#erchashucunchujiegou\"\u003E二叉树存储结构\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#erchashubianli\"\u003E二叉树遍历\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fp\u003E\n\u003Ch2 id=\"shimoshishu\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'shimoshishu')\"\u003E¶\u003C\u002Fa\u003E 什么是树？\u003C\u002Fh2\u003E\n\u003Ch3 id=\"dingyi\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'dingyi')\"\u003E¶\u003C\u002Fa\u003E 定义\u003C\u002Fh3\u003E\n\u003Cp\u003E树（Tree）是 n（n &gt;= 0）个结点的有限集合。n = 0 时称为空树。在任意一棵非空树中：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Cstrong\u003E有且仅有一个\u003C\u002Fstrong\u003E特定的称为根（Root）的结点；\u003C\u002Fli\u003E\n\u003Cli\u003E当 n &gt; 1 时，其余结点可分为 m（m &gt; 0）个互不相交的有限集合 T1、T2、...、Tm，其中每一个集合本身又是一棵树，并且称为根的子树（SubTree）；\u003C\u002Fli\u003E\n\u003Cli\u003E所有子树的集合称为\u003Cstrong\u003E森林（Forest）\u003C\u002Fstrong\u003E；\u003C\u002Fli\u003E\n\u003Cli\u003E树中结点的各子树如果从左至右是有次序且不能互换的，称为有序树，否则称为无序树；\u003Cbr\u003E\n\u003Cimg src=\"_nuxt\u002Fimg\u002Fpic-1.73192a2.png\" alt=\"\"\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3 id=\"jiedianfenlei\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'jiedianfenlei')\"\u003E¶\u003C\u002Fa\u003E 结点分类\u003C\u002Fh3\u003E\n\u003Cp\u003E树的结点包含一个数据元素和若干指向其子树的分支。\u003Cbr\u003E\n结点拥有的子树称为结点的\u003Ccode\u003E度（Degree）\u003C\u002Fcode\u003E。度为 0 的结点称为\u003Cstrong\u003E叶结点（Leaf）\u003C\u002Fstrong\u003E；度不为 0 的结点称为\u003Cstrong\u003E分支结点\u003C\u002Fstrong\u003E。除根结点外，分支结点也称为内部结点。树的度是\u003Cstrong\u003E树内各结点的度最大值\u003C\u002Fstrong\u003E。\u003Cbr\u003E\n\u003Cimg src=\"_nuxt\u002Fimg\u002Fpic-2.7454d80.png\" alt=\"\"\u003E\u003C\u002Fp\u003E\n\u003Ch3 id=\"jiedianguanxi\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'jiedianguanxi')\"\u003E¶\u003C\u002Fa\u003E 结点关系\u003C\u002Fh3\u003E\n\u003Cp\u003E结点的下一层分支称为改结点的\u003Cstrong\u003E子结点（Child）\u003C\u002Fstrong\u003E，结点的上一层分支称为该结点的\u003Cstrong\u003E父结点（Parent）\u003C\u002Fstrong\u003E。同一个父结点的结点之间称为\u003Cstrong\u003E兄弟结点（Sibling）\u003C\u002Fstrong\u003E。结点上层所有的结点称为该结点的\u003Cstrong\u003E祖先结点\u003C\u002Fstrong\u003E，反之，结点下层所有的结点称为该节点的\u003Cstrong\u003E子孙结点\u003C\u002Fstrong\u003E。\u003Cbr\u003E\n\u003Cimg src=\"_nuxt\u002Fimg\u002Fpic-3.8f23481.png\" alt=\"\"\u003E\u003C\u002Fp\u003E\n\u003Ch3 id=\"cengyushendu\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'cengyushendu')\"\u003E¶\u003C\u002Fa\u003E 层与深度\u003C\u002Fh3\u003E\n\u003Cp\u003E结点的 \u003Cstrong\u003E层次（level）\u003C\u002Fstrong\u003E 从根开始定义，根为第一层，根的子结点为第二层，依次类推。父结点在同一层的同层结点互为堂兄弟结点，如 \b G、H、I 与 J 互为堂兄弟结点。\u003C\u002Fp\u003E\n\u003Cp\u003E树中结点最大层次称为树的 \u003Cstrong\u003E深度（Depth）\u003C\u002Fstrong\u003E ，当前树的深度为 5 。\u003Cbr\u003E\n\u003Cimg src=\"_nuxt\u002Fimg\u002Fpic-4.52e8be9.png\" alt=\"\"\u003E\u003C\u002Fp\u003E\n\u003Chr\u003E\n\u003Ch2 id=\"cunchujiegou\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'cunchujiegou')\"\u003E¶\u003C\u002Fa\u003E 存储结构\u003C\u002Fh2\u003E\n\u003Cp\u003E子结点个数无限制的有根树有 3 种常用的关系表示法进行数据存储，\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Cstrong\u003E父母表示法\u003C\u002Fstrong\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003E孩子表示法\u003C\u002Fstrong\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003E左孩子右兄弟表示法（left-child, right-sibling representation）\u003C\u002Fstrong\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3 id=\"fumubiaoshifa\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'fumubiaoshifa')\"\u003E¶\u003C\u002Fa\u003E 父母表示法\u003C\u002Fh3\u003E\n\u003Cp\u003E父母表示法的一般做法是使用线性的存储结构，将每个结点\u003Cstrong\u003E按结点所在层次\u003C\u002Fstrong\u003E从左往右依次记录在该线性存储结构内（数组），在存储每个结点时，使用一个变量存储其父结点所在的下标。父结点的下标为 \u003Cstrong\u003E-1\u003C\u002Fstrong\u003E，当需要遍历一棵树时，遍历到下标为 \u003Cstrong\u003E-1\u003C\u002Fstrong\u003E 时就可知道整棵树已经完成遍历。\u003C\u002Fp\u003E\n\u003Cp\u003E要点：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E使用数组依次存储所有结点；\u003C\u002Fli\u003E\n\u003Cli\u003E每个结点内记录父结点的数组下标；\u003Cbr\u003E\n\u003Cimg src=\"_nuxt\u002Fimg\u002Fpic-5.f341874.png\" alt=\"\"\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E当业务场景需要频繁查找某结点的父结点时，这种表示法最合适，所需的时间复杂度为\u003Cstrong\u003EO(1)\u003C\u002Fstrong\u003E。\u003C\u002Fp\u003E\n\u003Ch4 id=\"daimashixian\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'daimashixian')\"\u003E¶\u003C\u002Fa\u003E 代码实现\u003C\u002Fh4\u003E\n\u003Cpre  class=\"language-javascript\"\u003E\u003Ccode class=\"language-javascript\"\u003Eclass TreeNode {\n  constructor(data, parentSub) {\n    this.data = data;\n    this.parent = parentSub;\n  }\n}\n\nclass Tree {\n  constructor() {\n    this.data = [];\n  }\n  \u002F\u002F 返回树的深度\n  treeDepth() {\n    if (this.data.filter(Boolean).length === 0) return 0;\n\n    let lastChild = Math.max.apply(\n      null,\n      this.data.map(node =&gt; node &amp;&amp; node.parent),\n    );\n    lastChild = this.data[lastChild];\n    let depth = 1;\n    while (~lastChild.parent) {\n      lastChild = this.data[lastChild.parent];\n      depth++;\n    }\n    return depth + 1;\n  }\n  \u002F\u002F 插入结点\n  insertChild(node) {\n    if (this.data[0] &amp;&amp; !this.data[node.parent]) {\n      return false;\n    }\n    for (let i = 0; i &lt; this.data.length; i++) {\n      if (this.data[i] === null) {\n        this.data[i] = node;\n        return true;\n      }\n    }\n    this.data.push(node);\n    return true;\n  }\n  \u002F\u002F 删除结点及其子树\n  deleteChild(node) {\n    const nodeSub = this.data.indexOf(node);\n    if (nodeSub !== -1) {\n      this.data[nodeSub] = null;\n      const needDels = [nodeSub];\n      for (let i = 0, n; i &lt; this.data.length; i++) {\n        n = this.data[i];\n        if (n &amp;&amp; needDels.indexOf(n.parent) !== -1) {\n          this.data[i] = null;\n          needDels.push(i);\n        }\n      }\n      return true;\n    }\n    return false;\n  }\n}\n\n\u002F\u002F 初始化树，结点\nconst tree = new Tree();\nconst A = new TreeNode('A', -1);\nconst B = new TreeNode('B', 0);\nconst C = new TreeNode('C', 0);\nconst D = new TreeNode('D', 1);\nconst E = new TreeNode('E', 2);\nconst F = new TreeNode('F', 2);\nconst G = new TreeNode('G', 3);\nconst H = new TreeNode('H', 3);\nconst I = new TreeNode('I', 3);\nconst J = new TreeNode('J', 4);\nconst K = new TreeNode('K', 9);\nconst L = new TreeNode('L', 9);\nconst M = new TreeNode('M', 9);\n\n\u002F\u002F 插入结点\ntree.insertChild(A);\ntree.insertChild(B);\ntree.insertChild(C);\ntree.insertChild(D);\ntree.insertChild(E);\ntree.insertChild(F);\ntree.insertChild(G);\ntree.insertChild(H);\ntree.insertChild(I);\ntree.insertChild(J);\ntree.insertChild(K);\ntree.insertChild(L);\n\n\u002F\u002F 测试\ntree.deleteChild(M); \u002F\u002F false 结点不存在树内\ntree.deleteChild(D); \u002F\u002F true\ntree.treeDepth(); \u002F\u002F 5\ntree.deleteChild(J); \u002F\u002F true\ntree.treeDepth(); \u002F\u002F 3\ntree.insertChild(J);\ntree.treeDepth(); \u002F\u002F 4\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Ch3 id=\"haizibiaoshifa\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'haizibiaoshifa')\"\u003E¶\u003C\u002Fa\u003E 孩子表示法\u003C\u002Fh3\u003E\n\u003Cp\u003E孩子表示法跟父母表示法做法类似，也是使用线性的存储结构，将每个结点\u003Cstrong\u003E按结点所在层次\u003C\u002Fstrong\u003E从左往右依次记录在该线性存储结构内（数组），但是在存储每个结点时，将该结点的孩子结点排列成一个线性表（链表）。所以对于有 n 个结点的数来说，就会有 n 个单链表。\u003C\u002Fp\u003E\n\u003Cp\u003E要点：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E使用数组依次存储所有结点；\u003C\u002Fli\u003E\n\u003Cli\u003E每个结点维护一个指向该结点所有孩子的链表；\u003Cbr\u003E\n\u003Cimg src=\"_nuxt\u002Fimg\u002Fpic-6.159363c.png\" alt=\"\"\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch4 id=\"daimashixian-2\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'daimashixian-2')\"\u003E¶\u003C\u002Fa\u003E 代码实现\u003C\u002Fh4\u003E\n\u003Cpre  class=\"language-javascript\"\u003E\u003Ccode class=\"language-javascript\"\u003Eclass TreeNode {\n  constructor(data, next = null) {\n    this.data = data;\n    this.next = next;\n  }\n  setNext(next = null) {\n    this.next = next;\n  }\n}\n\nclass TreeNodeChain {\n  constructor(treeNodeSub, next = null) {\n    this.treeNodeSub = treeNodeSub;\n    this.next = next;\n  }\n  setNext(next = null) {\n    this.next = next;\n  }\n  setSub(treeNodeSub) {\n    this.treeNodeSub = treeNodeSub;\n  }\n}\n\nclass Tree {\n  constructor() {\n    this.data = [];\n  }\n  treeDepth() {\n    if (this.data.filter(Boolean).length === 0) return 0;\n\n    let result = 0;\n    const root = this.data[0];\n    const getDepth = (node, _depth = 1) =&gt; {\n      if (node.next) {\n        let nextChild = node.next;\n        getDepth(this.data[nextChild.treeNodeSub], _depth + 1);\n        while (nextChild &amp;&amp; nextChild.next) {\n          getDepth(this.data[nextChild.next.treeNodeSub], _depth + 1);\n          nextChild = nextChild.next;\n        }\n      }\n      result = Math.max(result, _depth);\n    };\n    getDepth(root);\n    return result;\n  }\n  insertChild(node) {\n    for (let i = 0; i &lt; this.data.length; i++) {\n      if (this.data[i] === null) {\n        this.data[i] = node;\n        return i;\n      }\n    }\n    this.data.push(node);\n    return this.data.length - 1;\n  }\n  deleteChild(delNode) {\n    const nodeSub = this.data.indexOf(delNode);\n    if (nodeSub !== -1) {\n      this.data[nodeSub] = null;\n      \u002F\u002F 删除孩子和结点所维持的链表\n      while (delNode.next) {\n        let prev = delNode;\n        delNode = delNode.next;\n        prev.setNext(null);\n        this.data[delNode.treeNodeSub] = null;\n      }\n\n      \u002F\u002F 更新父母链表关系\n      for (let i = 0; i &lt; this.data.length; i++) {\n        let node = this.data[i];\n        while (node &amp;&amp; node.next) {\n          if (node.next.treeNodeSub === nodeSub) {\n            node.next = node.next.next;\n            return true;\n          } else {\n            node = node.next;\n          }\n        }\n      }\n      return true;\n    }\n    return false;\n  }\n}\n\n\u002F\u002F 初始化树，结点\nconst tree = new Tree();\nconst A = new TreeNode('A');\nconst B = new TreeNode('B');\nconst C = new TreeNode('C');\nconst D = new TreeNode('D');\nconst E = new TreeNode('E');\nconst F = new TreeNode('F');\nconst G = new TreeNode('G');\nconst H = new TreeNode('H');\nconst I = new TreeNode('I');\nconst J = new TreeNode('J');\nconst K = new TreeNode('K');\nconst L = new TreeNode('L');\nconst M = new TreeNode('M');\n\n\u002F\u002F 插入结点\ntree.insertChild(A);\ntree.insertChild(B);\ntree.insertChild(C);\ntree.insertChild(D);\ntree.insertChild(E);\ntree.insertChild(F);\ntree.insertChild(G);\ntree.insertChild(H);\ntree.insertChild(I);\ntree.insertChild(J);\ntree.insertChild(K);\ntree.insertChild(L);\n\n\u002F\u002F 设置关系\nconst A1 = new TreeNodeChain(1);\nconst A2 = new TreeNodeChain(2);\nA.setNext(A1);\nA1.setNext(A2);\n\nconst B1 = new TreeNodeChain(3);\nB.setNext(B1);\n\nconst C1 = new TreeNodeChain(4);\nconst C2 = new TreeNodeChain(5);\nC.setNext(C1);\nC1.setNext(C2);\n\nconst D1 = new TreeNodeChain(6);\nconst D2 = new TreeNodeChain(7);\nconst D3 = new TreeNodeChain(8);\nD.setNext(D1);\nD1.setNext(D2);\nD2.setNext(D3);\n\nconst E1 = new TreeNodeChain(9);\nE.setNext(E1);\n\nconst J1 = new TreeNodeChain(10);\nconst J2 = new TreeNodeChain(11);\nJ.setNext(J1);\nJ1.setNext(J2);\n\n\u002F\u002F 测试\ntree.deleteChild(M); \u002F\u002F false 结点不存在树内\ntree.deleteChild(D); \u002F\u002F true\nD.next; \u002F\u002F null\nD1.next; \u002F\u002F null\nD2.next; \u002F\u002F null\ntree.treeDepth(); \u002F\u002F 5\ntree.deleteChild(J); \u002F\u002F true\nJ.next; \u002F\u002F null\nJ1.next; \u002F\u002F null\nJ2.next; \u002F\u002F null\ntree.treeDepth(); \u002F\u002F 3\ntree.deleteChild(H); \u002F\u002F false\ntree.treeDepth(); \u002F\u002F 3\n\nconst newIndex = tree.insertChild(J); \u002F\u002F 3\nE1.setSub(newIndex);\nE.setNext(E1);\ntree.treeDepth(); \u002F\u002F 4\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E使用孩子表示法存储的树结构，正好和父母表示法相反，适用于查找某结点的孩子结点，不适用于查找其父结点。但是因为每个结点都维持了一个链表，所以空间复杂度会大大增加。\u003C\u002Fp\u003E\n\u003Cp\u003E从上面两种的实现原理和代码，不难发现可以结合“父母表示法”和“孩子表示法”来实现一种特殊的“父母孩子表示法”，适合同时需要频繁“父母”和“孩子”的场景，是一种常用的“空间”换“时间”的手段。\u003C\u002Fp\u003E\n\u003Ch3 id=\"haizixiongdibiaoshifa\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'haizixiongdibiaoshifa')\"\u003E¶\u003C\u002Fa\u003E 孩子兄弟表示法\u003C\u002Fh3\u003E\n\u003Cp\u003E与上述两种表示法不同的是，这种表示法不再需要声明额外的空间进行所有结点的存储，而是直接使用链式存储结构来关进行结点关联，因为只有两个指针域指向，所有这种表示法其实是将一棵不限定子结点数量的有根树转换成了 \u003Cstrong\u003E“二叉树”\u003C\u002Fstrong\u003E。\u003C\u002Fp\u003E\n\u003Cp\u003E要点：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E生成 node 存储结构，除数据域 “data” 外，该 node 拥有 “next” 和 “right” 两个特殊属性；\u003C\u002Fli\u003E\n\u003Cli\u003Enode.next 指向 node 最左边的第一个孩子；\u003C\u002Fli\u003E\n\u003Cli\u003Enode.right 指向 node 右边的第一个兄弟；\u003Cbr\u003E\n\u003Cimg src=\"_nuxt\u002Fimg\u002Fpic-7.244cfb7.png\" alt=\"\"\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch4 id=\"daimashixian-3\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'daimashixian-3')\"\u003E¶\u003C\u002Fa\u003E 代码实现\u003C\u002Fh4\u003E\n\u003Cpre  class=\"language-javascript\"\u003E\u003Ccode class=\"language-javascript\"\u003Eclass TreeNode {\n  constructor(data, next = null, right = null) {\n    this.data = data;\n    this.next = next;\n    this.right = right;\n  }\n  setNext(next = null) {\n    this.next = next;\n  }\n  setRight(right = null) {\n    this.right = right;\n  }\n}\n\nfunction insertNode(parent, treeNode) {\n  let prev = parent.next;\n  parent.next = treeNode;\n  treeNode.right = prev;\n}\nfunction deleteNode(root, target) {\n  target.next = null;\n  const update = node =&gt; {\n    if (node.next === target) {\n      if (target.right) {\n        node.next = target.right;\n      } else {\n        node.next = null;\n      }\n    } else if (node.right === target) {\n      node.right = null;\n    }\n    node.next &amp;&amp; update(node.next);\n    node.right &amp;&amp; update(node.right);\n  };\n  update(root);\n}\nfunction treeDepth(root) {\n  let result = 0;\n  const getDepth = (node, _depth = 1) =&gt; {\n    if (node.next) {\n      let nextChild = node.next;\n      getDepth(nextChild, _depth + 1);\n      while (nextChild &amp;&amp; nextChild.right) {\n        \u002F\u002F 向右遍历层数不增加\n        getDepth(nextChild.right, _depth);\n        nextChild = nextChild.right;\n      }\n    }\n    result = Math.max(result, _depth);\n  };\n  getDepth(root);\n  return result;\n}\n\n\u002F\u002F 初始化结点\nconst A = new TreeNode('A');\nconst B = new TreeNode('B');\nconst C = new TreeNode('C');\nconst D = new TreeNode('D');\nconst E = new TreeNode('E');\nconst F = new TreeNode('F');\nconst G = new TreeNode('G');\nconst H = new TreeNode('H');\nconst I = new TreeNode('I');\nconst J = new TreeNode('J');\nconst K = new TreeNode('K');\nconst L = new TreeNode('L');\nconst M = new TreeNode('M');\n\n\u002F\u002F 设置结点关系\nA.setNext(B);\nB.setNext(D);\nB.setRight(C);\nC.setNext(E);\nD.setNext(G);\nE.setNext(J);\nE.setRight(F);\nG.setRight(H);\nH.setRight(I);\nJ.setNext(K);\nK.setRight(L);\n\n\u002F\u002F 测试\ndeleteNode(A, C);\ntreeDepth(A); \u002F\u002F 4\ndeleteNode(A, D);\ntreeDepth(A); \u002F\u002F 2\nC.setNext(E);\nE.setNext(J);\nE.setRight(F);\nJ.setNext(K);\nK.setRight(L);\ninsertNode(A, C);\ntreeDepth(A); \u002F\u002F 5\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E通过孩子兄弟表示法，普通树转化为了二叉树，所以孩子兄弟表示法又被称为 \u003Cstrong\u003E“二叉树表示法\u003C\u002Fstrong\u003E”或者 \u003Cstrong\u003E“二叉链表表示法”\u003C\u002Fstrong\u003E。\u003C\u002Fp\u003E\n\u003Chr\u003E\n\u003Ch2 id=\"changyongshujiegouerchashu\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'changyongshujiegouerchashu')\"\u003E¶\u003C\u002Fa\u003E 常用树结构：二叉树\u003C\u002Fh2\u003E\n\u003Ch3 id=\"erchashudingyi\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'erchashudingyi')\"\u003E¶\u003C\u002Fa\u003E 二叉树定义\u003C\u002Fh3\u003E\n\u003Cp\u003E二叉树（Binary Tree）是 n（n &gt;= 0）个结点的有限集合，该集合或者为空集（空二叉树），或者由一个根结点和两课互不相交的、分别称为根结点的左子树和右子树的二叉树组成。在一棵二叉树中：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E每个结点最多有两棵子树，树中不存在度大于 2 的结点；\u003C\u002Fli\u003E\n\u003Cli\u003E左子树和右子树是有顺序的，次序不能颠倒；\u003C\u002Fli\u003E\n\u003Cli\u003E即使树中某个结点只有子结点，也必须区分该结点是左结点还是右结点；\u003C\u002Fli\u003E\n\u003Cli\u003E有五种基本形态：空二叉树、只有根结点、根结点只有左子树、根结点只有右子树、根结点同时具有左子树和右子树；\u003Cbr\u003E\n\u003Cimg src=\"_nuxt\u002Fimg\u002Fpic-8.9644366.png\" alt=\"\"\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3 id=\"erchashucunchujiegou\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'erchashucunchujiegou')\"\u003E¶\u003C\u002Fa\u003E 二叉树存储结构\u003C\u002Fh3\u003E\n\u003Cp\u003E二叉树常用的存储结构有两种，分别是线性的数组存储和链接存储，线性数组存储一般只适用于\u003Ca href=\"https:\u002F\u002Fbaike.baidu.com\u002Fitem\u002F%E5%AE%8C%E5%85%A8%E4%BA%8C%E5%8F%89%E6%A0%91\" target=\"_blank\"\u003E完全二叉树\u003C\u002Fa\u003E，这里不作详细讨论，只着重讲解更普遍适用的链式存储结构。\u003C\u002Fp\u003E\n\u003Ch4 id=\"daimashixian-4\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'daimashixian-4')\"\u003E¶\u003C\u002Fa\u003E 代码实现\u003C\u002Fh4\u003E\n\u003Cpre  class=\"language-javascript\"\u003E\u003Ccode class=\"language-javascript\"\u003Eclass TreeNode {\n  constructor(data, leftChild = null, rightChild = null) {\n    this.data = data;\n    this.leftChild = leftChild;\n    this.rightChild = rightChild;\n  }\n  setLeft(leftChild = null) {\n    this.leftChild = leftChild;\n  }\n  setRight(rightChild = null) {\n    this.rightChild = rightChild;\n  }\n}\n\u002F\u002F 前序生成二叉树\nfunction createBiTree(datas) {\n  const data = datas.shift();\n  if (data) {\n    const root = new TreeNode(data);\n    const leftChild = createBiTree(datas);\n    const rightChild = createBiTree(datas);\n    root.setLeft(leftChild);\n    root.setRight(rightChild);\n    return root;\n  } else {\n    return null;\n  }\n}\n\n\u002F\u002F 生成树\nconst tree = createBiTree([\n  'A',\n  'B',\n  'D',\n  'H',\n  null,\n  null,\n  'I',\n  null,\n  null,\n  'E',\n  'J',\n  null,\n  null,\n  'K',\n  null,\n  null,\n  'C',\n  'F',\n  'L',\n  null,\n  null,\n  'M',\n  null,\n  null,\n  'G',\n  'N',\n  null,\n  null,\n  'O',\n  null,\n  null,\n]);\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E观察代码实现可以发现，因为二叉树的特殊性质，对于树的生成，不需要再一个一个手动生成和关联结点间的关系，而是将树结构按“前序”的方式排列装入数组，然后借助一个特殊的“前序”生成辅助函数来生成树。\u003C\u002Fp\u003E\n\u003Cp\u003E下面来介绍二叉树的“前序”、“中序”、“后序”三种遍历方式的实现原理和实现方式。\u003C\u002Fp\u003E\n\u003Ch3 id=\"erchashubianli\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'erchashubianli')\"\u003E¶\u003C\u002Fa\u003E 二叉树遍历\u003C\u002Fh3\u003E\n\u003Cp\u003E二叉树的遍历（traversing binary tree）是指从根结点出发，按照某种 \u003Cstrong\u003E\u003Ccode\u003E次序\u003C\u002Fcode\u003E\u003C\u002Fstrong\u003E 依次 \u003Cstrong\u003E\u003Ccode\u003E访问\u003C\u002Fcode\u003E\u003C\u002Fstrong\u003E 二叉树中的所有结点，使得每个结点都被访问一次，且仅被只访问一次。\u003C\u002Fp\u003E\n\u003Ch4 id=\"qianxubianli\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'qianxubianli')\"\u003E¶\u003C\u002Fa\u003E 前序遍历\u003C\u002Fh4\u003E\n\u003Cp\u003E规则是若二叉树为空，则空操作返回，否则先访问根结点，然后前序遍历左子树，再前序遍历右子树。如下图，遍历顺序为 A，B，D，H，I，E，J，K，C，F，L，M，G，N，O。\u003Cbr\u003E\n\u003Cimg src=\"_nuxt\u002Fimg\u002Fpic-9.4b229ae.png\" alt=\"\"\u003E\u003C\u002Fp\u003E\n\u003Ch5 id=\"daimashixian-5\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'daimashixian-5')\"\u003E¶\u003C\u002Fa\u003E 代码实现\u003C\u002Fh5\u003E\n\u003Cpre  data-line=\"6,7,8\" class=\"language-javascript\"\u003E\u003Ccode data-line=\"6,7,8\" class=\"language-javascript\"\u003E\u002F\u002F 前序遍历\nfunction preOrderTraverse(treeNode) {\n  if (treeNode === null) {\n    return;\n  }\n  console.log('treeNode.data :&gt;&gt; ', treeNode.data);\n  preOrderTraverse(treeNode.leftChild);\n  preOrderTraverse(treeNode.rightChild);\n}\n\npreOrderTraverse(tree);\n\u002F\u002F treeNode.data :&gt;&gt;  A\n\u002F\u002F treeNode.data :&gt;&gt;  B\n\u002F\u002F treeNode.data :&gt;&gt;  D\n\u002F\u002F treeNode.data :&gt;&gt;  H\n\u002F\u002F treeNode.data :&gt;&gt;  I\n\u002F\u002F treeNode.data :&gt;&gt;  E\n\u002F\u002F treeNode.data :&gt;&gt;  J\n\u002F\u002F treeNode.data :&gt;&gt;  K\n\u002F\u002F treeNode.data :&gt;&gt;  C\n\u002F\u002F treeNode.data :&gt;&gt;  F\n\u002F\u002F treeNode.data :&gt;&gt;  L\n\u002F\u002F treeNode.data :&gt;&gt;  M\n\u002F\u002F treeNode.data :&gt;&gt;  G\n\u002F\u002F treeNode.data :&gt;&gt;  N\n\u002F\u002F treeNode.data :&gt;&gt;  O\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E留意代码实现的高亮部分，这里使用 console 的方式来进行数据访问的操作，逻辑的顺序是：\u003Cstrong\u003E访问数据 =&gt; 递归左子树 =&gt; 递归右子树\u003C\u002Fstrong\u003E，数据访问操作放在两个递归操作的\u003Cstrong\u003E前面\u003C\u002Fstrong\u003E，根结点的访问在最前面。\u003C\u002Fp\u003E\n\u003Ch4 id=\"zhongxubianli\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'zhongxubianli')\"\u003E¶\u003C\u002Fa\u003E 中序遍历\u003C\u002Fh4\u003E\n\u003Cp\u003E规则是若树为空，则空操作返回，否则从根结点开始（注意不是先访问根结点），中序遍历根结点的左子树，然后是访问根结点，最后是中序遍历右子树，如下图，遍历顺序为 H，D，I，B，J，E，K，A，L，F，M，C，N，G，O。\u003Cbr\u003E\n\u003Cimg src=\"_nuxt\u002Fimg\u002Fpic-10.95f9c22.png\" alt=\"\"\u003E\u003C\u002Fp\u003E\n\u003Ch5 id=\"daimashixian-6\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'daimashixian-6')\"\u003E¶\u003C\u002Fa\u003E 代码实现\u003C\u002Fh5\u003E\n\u003Cpre  data-line=\"6,7,8\" class=\"language-javascript\"\u003E\u003Ccode data-line=\"6,7,8\" class=\"language-javascript\"\u003E\u002F\u002F 中序遍历\nfunction inOrderTraverse(treeNode) {\n  if (treeNode === null) {\n    return;\n  }\n  inOrderTraverse(treeNode.leftChild);\n  console.log('treeNode.data :&gt;&gt; ', treeNode.data);\n  inOrderTraverse(treeNode.rightChild);\n}\n\ninOrderTraverse(tree);\n\u002F\u002F treeNode.data :&gt;&gt;  H\n\u002F\u002F treeNode.data :&gt;&gt;  D\n\u002F\u002F treeNode.data :&gt;&gt;  I\n\u002F\u002F treeNode.data :&gt;&gt;  B\n\u002F\u002F treeNode.data :&gt;&gt;  J\n\u002F\u002F treeNode.data :&gt;&gt;  E\n\u002F\u002F treeNode.data :&gt;&gt;  K\n\u002F\u002F treeNode.data :&gt;&gt;  A\n\u002F\u002F treeNode.data :&gt;&gt;  L\n\u002F\u002F treeNode.data :&gt;&gt;  F\n\u002F\u002F treeNode.data :&gt;&gt;  M\n\u002F\u002F treeNode.data :&gt;&gt;  C\n\u002F\u002F treeNode.data :&gt;&gt;  N\n\u002F\u002F treeNode.data :&gt;&gt;  G\n\u002F\u002F treeNode.data :&gt;&gt;  O\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E留意代码实现的高亮部分，这里使用 console 的方式来进行数据访问的操作，逻辑的顺序是：\u003Cstrong\u003E递归左子树 =&gt; 访问数据 =&gt; 递归右子树\u003C\u002Fstrong\u003E，数据访问操作放在两个递归操作的\u003Cstrong\u003E中间\u003C\u002Fstrong\u003E，根结点的访问在正中间。\u003C\u002Fp\u003E\n\u003Ch4 id=\"houxubianli\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'houxubianli')\"\u003E¶\u003C\u002Fa\u003E 后序遍历\u003C\u002Fh4\u003E\n\u003Cp\u003E规则是若树为空，则空操作返回，否则从左到右先叶子结点的方式遍历访问左右子树，最后是访问根结点。如下图，遍历顺序是 H，I，D，J，K，E，B，L，M，F，N，O，G，C，A。\u003Cbr\u003E\n\u003Cimg src=\"_nuxt\u002Fimg\u002Fpic-11.bfc24ba.png\" alt=\"\"\u003E\u003C\u002Fp\u003E\n\u003Ch5 id=\"daimashixian-7\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'daimashixian-7')\"\u003E¶\u003C\u002Fa\u003E 代码实现\u003C\u002Fh5\u003E\n\u003Cpre  data-line=\"6,7,8\" class=\"language-javascript\"\u003E\u003Ccode data-line=\"6,7,8\" class=\"language-javascript\"\u003E\u002F\u002F 后序遍历\nfunction postOrderTraverse(treeNode) {\n  if (treeNode === null) {\n    return;\n  }\n  postOrderTraverse(treeNode.leftChild);\n  postOrderTraverse(treeNode.rightChild);\n  console.log('treeNode.data :&gt;&gt; ', treeNode.data);\n}\n\npostOrderTraverse(tree);\n\u002F\u002F treeNode.data :&gt;&gt;  H\n\u002F\u002F treeNode.data :&gt;&gt;  I\n\u002F\u002F treeNode.data :&gt;&gt;  D\n\u002F\u002F treeNode.data :&gt;&gt;  J\n\u002F\u002F treeNode.data :&gt;&gt;  K\n\u002F\u002F treeNode.data :&gt;&gt;  E\n\u002F\u002F treeNode.data :&gt;&gt;  B\n\u002F\u002F treeNode.data :&gt;&gt;  L\n\u002F\u002F treeNode.data :&gt;&gt;  M\n\u002F\u002F treeNode.data :&gt;&gt;  F\n\u002F\u002F treeNode.data :&gt;&gt;  N\n\u002F\u002F treeNode.data :&gt;&gt;  O\n\u002F\u002F treeNode.data :&gt;&gt;  G\n\u002F\u002F treeNode.data :&gt;&gt;  C\n\u002F\u002F treeNode.data :&gt;&gt;  A\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E留意代码实现的高亮部分，这里使用 console 的方式来进行数据访问的操作，逻辑的顺序是：\u003Cstrong\u003E递归左子树 =&gt; 递归右子树 =&gt; 访问数据\u003C\u002Fstrong\u003E，数据访问操作放在两个递归操作的\u003Cstrong\u003E后面\u003C\u002Fstrong\u003E，根结点的访问在最后面。\u003C\u002Fp\u003E\n\u003Ch4 id=\"buchong\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'buchong')\"\u003E¶\u003C\u002Fa\u003E 补充\u003C\u002Fh4\u003E\n\u003Cp\u003E前面说树的表示法时，提到“孩子兄弟表示法”又称为 \u003Cstrong\u003E“二叉树表示法\u003C\u002Fstrong\u003E”，再结合二叉树的定义，可以得知其实所有有根树都可以转换为一棵 \u003Cstrong\u003E\u003Cem\u003E根结点没有右子树\u003C\u002Fem\u003E\u003C\u002Fstrong\u003E 的二叉树，篇幅有限这里不再展开，推荐一篇文章：\u003Ca href=\"https:\u002F\u002Fzhuanlan.zhihu.com\u002Fp\u002F134251528\" target=\"_blank\"\u003E树和森林与二叉树的相互转换\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n",bodyBegin:8,frontmatter:"title: 树数据结构的原理及JS实现\ndate: '2019-06-29'\nspoiler: JavaScript语言环境下的树学习\nfeatured: false",link:a,next:{title:"Design Patterns In Javascript",date:"2019-09-03",spoiler:"总结常用设计模式在 Javascript 中的实现",link:"\u002Fpost\u002Fdesign-patterns-in-javascript\u002F",min2read:"🍱🍱 31 min read",wordcount:"7.6k"}}}],fetch:[],mutations:void 0}}("\u002Fpost\u002Fdata-structure-tree\u002F")));
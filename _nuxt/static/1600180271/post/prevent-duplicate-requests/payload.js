__NUXT_JSONP__("/post/prevent-duplicate-requests", (function(a){return {data:[{post:{attributes:{title:"控制前端业务重复请求的一个新思路",date:"2020-09-13",spoiler:"少一个请求，少一分负担",link:a,min2read:"☕️☕️☕️ 13 min read",wordcount:"3.3k"},body:"\u003Cp\u003E\u003Cdiv class=\"cs-toc-dom\"\u003E\u003Cul\u003E\u003Cli\u003E\u003Ca href=\"#xuqiubeijing\"\u003E需求背景\u003C\u002Fa\u003E\u003Cul\u003E\u003Cli\u003E\u003Ca href=\"#zhongfuqingqiudehuaichu\"\u003E重复请求的坏处\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#zhongfuqingqiuchulifenxi\"\u003E重复请求处理分析\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#zailanjieqiliguanlizhongfuqingqiu\"\u003E在拦截器里管理重复请求\u003C\u002Fa\u003E\u003Cul\u003E\u003Cli\u003E\u003Ca href=\"#lanjieqideshixianyuanli\"\u003E拦截器的实现原理\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#shixianzhongfuqingqiuguanliqi\"\u003E实现重复请求管理器\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#weishimoshiflybushiaxios\"\u003E为什么是 fly 不是 axios？\u003C\u002Fa\u003E\u003Cul\u003E\u003Cli\u003E\u003Ca href=\"#axiosguanjianyuanmafenxi\"\u003Eaxios 关键源码分析\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#flyguanjianyuanmafenxi\"\u003Efly 关键源码分析\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#nengfoushiyongaxiosdadaomude\"\u003E能否使用 axios 达到目的？\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#jieyan\"\u003E结言\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fp\u003E\n\u003Ch2 id=\"xuqiubeijing\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'xuqiubeijing')\"\u003E¶\u003C\u002Fa\u003E 需求背景\u003C\u002Fh2\u003E\n\u003Cp\u003E在上一家公司的时候，因为业务重组，笔者被分配到一个电商项目组，负责项目中 hybrid app 的前端模块功能迭代。该项目代码已经具有一定规模，长期的快速业务需求迭代，导致前端模块耦合的程度也到了不容忽视的时候，而且还存在一些小 bug。比如，没有对可能导致重复请求的场景进行处理。\u003C\u002Fp\u003E\n\u003Ch3 id=\"zhongfuqingqiudehuaichu\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'zhongfuqingqiudehuaichu')\"\u003E¶\u003C\u002Fa\u003E 重复请求的坏处\u003C\u002Fh3\u003E\n\u003Cp\u003E前端重复请求如果不及时处理可能会带来以下几个坏处：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E消耗额外的 \u003Cstrong\u003E服务器\u002F客户端\u003C\u002Fstrong\u003E 资源；\u003C\u002Fli\u003E\n\u003Cli\u003E后端若未对请求做幂等处理，造成后端脏数据；\u003C\u002Fli\u003E\n\u003Cli\u003E多个重复请求占据请求队列，达到浏览器并发请求上限，导致正常请求阻塞；\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3 id=\"zhongfuqingqiuchulifenxi\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'zhongfuqingqiuchulifenxi')\"\u003E¶\u003C\u002Fa\u003E 重复请求处理分析\u003C\u002Fh3\u003E\n\u003Cp\u003E因此，在新的需求没来之前，第一件事就是着手处理这个问题。众所周知，拦截重复请求的常规手段不外乎以下几种：\u003C\u002Fp\u003E\n\u003Col\u003E\n\u003Cli\u003E\u003Cstrong\u003E请求发起后，前端添加 遮罩层+loading 提示。\u003C\u002Fstrong\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003E对请求方法进行防抖和节流。\u003C\u002Fstrong\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003E利用流行前端 ajax 库中的拦截器进行拦截取消，如 \u003Ca href=\"https:\u002F\u002Fgithub.com\u002Faxios\u002Faxios\" target=\"_blank\"\u003Eaxios\u003C\u002Fa\u003E 的 cancelToken。\u003C\u002Fstrong\u003E\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Cp\u003E因为是新接手的具有一定规模的项目，使用一、二种方法去处理的话需要短时间内投入大量的工作量，而且还不能保证做到百分百的覆盖。第三种方法看来很适合，在统一的进出口进行处理，就不会有前两种方法的问题，但是这种捕捉到重复请求就立马取消，一刀切式的方式真的适合吗？\u003C\u002Fp\u003E\n\u003Cp\u003E试想一下是不是会有这样的业务场景存在？\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003EA 页面作为总的页面入口，具有 BCDEF 等子页面。A 页面依赖请求 X 的数据；\u003C\u002Fli\u003E\n\u003Cli\u003EB 页面也依赖请求 X 的数据，但 CDEF 不依赖请求 X 的数据；\u003C\u002Fli\u003E\n\u003Cli\u003E进入 A 页面时有可能在 X 请求前未返回前直接跳转到 B 页面；\u003C\u002Fli\u003E\n\u003Cli\u003EB 页面可能会作为独立的营销页对外公开；\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E如果进行了一刀切处理，在遇到「进入 A 页面时有可能在 X 请求前未返回前直接跳转到 B 页面」这种情况时，B 页面所依赖的 X 数据就再也拿不到了。如果在 B 页面添加额外处理逻辑，就会遇到第一二种方法同样的问题。\u003C\u002Fp\u003E\n\u003Cp\u003E虽然方法三也不可行，但在统一的出入口进行处理这个思路是没有问题的。我们需要改进一下这个一刀切的操作，在避免重复请求的同时保证原来的业务逻辑不能受到影响。\u003C\u002Fp\u003E\n\u003Cp\u003E如何改进？首先先来看看拦截器的实现原理是怎样的。\u003C\u002Fp\u003E\n\u003Ch2 id=\"zailanjieqiliguanlizhongfuqingqiu\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'zailanjieqiliguanlizhongfuqingqiu')\"\u003E¶\u003C\u002Fa\u003E 在拦截器里管理重复请求\u003C\u002Fh2\u003E\n\u003Ch3 id=\"lanjieqideshixianyuanli\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'lanjieqideshixianyuanli')\"\u003E¶\u003C\u002Fa\u003E 拦截器的实现原理\u003C\u002Fh3\u003E\n\u003Cp\u003E在使用了如 axios 的前端请求库的请求过程一般如下图所示，在调用请求方法时，传入\u003Ccode\u003EOptions\u003C\u002Fcode\u003E，然后这个请求配置会经过请求拦截器\u003Ccode\u003ERequestInterceptor\u003C\u002Fcode\u003E处理，过后配置传到\u003Ccode\u003ERequest\u003C\u002Fcode\u003E方法中进行正式请求，待请求从服务端返回后将请求交给响应拦截器\u003Ccode\u003EResponseInterceptor\u003C\u002Fcode\u003E进行处理，处理完成后将数据交给业务逻辑：\u003C\u002Fp\u003E\n\u003Cpre  class=\"language-text\"\u003E\u003Ccode class=\"language-text\"\u003E         ┌─────────┐\n         │ Options │\n         └─────────┘\n              │\n┌ ─ ─ ─ ─ ─ ─ ┼ ─ ─ ─ ─ ─ ─┐ ─ ─ ─ ─┐\n              ▼\n│  ┌────────────────────┐  │        │\n   │ RequestInterceptor │\n│  └────────────────────┘  │        │\n              │\n│             ▼            │        │\n   ┌────────────────────┐\n│  │  Request(Options)  │  │     请求过程\n   └────────────────────┘\n│             │            │        │\n              ▼\n│  ┌────────────────────┐  │        │\n   │ ResponseInterceptor│\n│  └────────────────────┘  │        │\n              │\n└ ─ ─ ─ ─ ─ ─ ┼ ─ ─ ─ ─ ─ ─┘ ─ ─ ─ ─┘\n              │\n              ▼\n         ┌─────────┐\n         │ bsLogic │\n         └─────────┘\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E那么 axios 等类库是如何将这个过程串成一条链的呢？答案就是 promise。下来就用简单的代码示例讲解拦截器的实现原理。\u003C\u002Fp\u003E\n\u003Cp\u003E首先创建一些请求拦截器和响应拦截器，在每个拦截器里面打印自身名称，方便请求时观察触发顺序：\u003C\u002Fp\u003E\n\u003Cpre  class=\"language-js\"\u003E\u003Ccode class=\"language-js\"\u003E\u002F\u002F 模拟配置\nconst config = { url: 'https:\u002F\u002Flkangd.com\u002F', count: 0 };\n\n\u002F\u002F 模拟请求拦截器s\nconst reqInterceptor1 = config =&gt; {\n  config.count++;\n  console.log('reqInterceptor1');\n  return config;\n};\nconst reqInterceptor2 = config =&gt; {\n  config.count++;\n  console.log('reqInterceptor2');\n  return config;\n};\nconst reqInterceptor3 = config =&gt; {\n  config.count++;\n  console.log('reqInterceptor3');\n  return config;\n};\n\u002F\u002F 按倒序插入\nconst reqInterceptors = [reqInterceptor3, reqInterceptor2, reqInterceptor1];\n\n\u002F\u002F 模拟响应拦截器s\nconst resInterceptor1 = config =&gt; {\n  config.count++;\n  console.log('resInterceptor1');\n  return config;\n};\nconst resInterceptor2 = config =&gt; {\n  console.log('resInterceptor2');\n  config.count++;\n  return config;\n};\nconst resInterceptor3 = config =&gt; {\n  console.log('resInterceptor3');\n  config.count++;\n  return config;\n};\n\u002F\u002F 按正序插入\nconst resInterceptors = [resInterceptor1, resInterceptor2, resInterceptor3];\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003Epromise 的 then 方法会默认返回一个新的 promise，我们可以利用这个特性，将所有拦截器包装起来，然后串成一条链：\u003C\u002Fp\u003E\n\u003Cpre  data-line=\"19-22\" class=\"language-js\"\u003E\u003Ccode data-line=\"19-22\" class=\"language-js\"\u003Econst request = (config, reqInterceptors, resInterceptors) =&gt; {\n  const makeRequest = config =&gt; {\n    console.log('makeRequest!');\n    return new Promise((resolve, reject) =&gt; {\n      \u002F\u002F 模拟请求延时\n      setTimeout(() =&gt; {\n        resolve({ data: 'response', ...config });\n      }, 3000);\n    });\n  };\n  const chain = [makeRequest];\n  let promise = Promise.resolve(config);\n\n  \u002F\u002F 将请求拦截器放在请求前\n  reqInterceptors.forEach(ri =&gt; chain.unshift(ri));\n  \u002F\u002F 将响应拦截器放在请求后\n  resInterceptors.forEach(ri =&gt; chain.push(ri));\n\n  \u002F\u002F 将 chain 串成一条 promise 链\n  while (chain.length) {\n    promise = promise.then(chain.shift()); \u002F\u002F then 的默认行为是返回一个新的 promise\n  }\n  \u002F\u002F 将 promise 链返回\n  return promise;\n};\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E调用\u003Ccode\u003Erequest\u003C\u002Fcode\u003E方法，按参数顺序传入，配置、请求拦截器，响应拦截器，看打印结果：\u003C\u002Fp\u003E\n\u003Cpre  class=\"language-js\"\u003E\u003Ccode class=\"language-js\"\u003Erequest(config, reqInterceptors, resInterceptors).then(data =&gt; {\n  console.log(data);\n});\n\u002F\u002F 留意触发顺序\n\u002F\u002F reqInterceptor1\n\u002F\u002F reqInterceptor2\n\u002F\u002F reqInterceptor3\n\u002F\u002F makeRequest!\n\u002F\u002F Promise {&lt;pending&gt;} 3 秒后打印下面的内容\n\u002F\u002F resInterceptor1\n\u002F\u002F resInterceptor2\n\u002F\u002F resInterceptor3\n\u002F\u002F {data: &quot;response&quot;, url: &quot;https:\u002F\u002Flkangd.com\u002F&quot;, count: 6}，count 被处理了 6 次\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Ch3 id=\"shixianzhongfuqingqiuguanliqi\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'shixianzhongfuqingqiuguanliqi')\"\u003E¶\u003C\u002Fa\u003E 实现重复请求管理器\u003C\u002Fh3\u003E\n\u003Cp\u003E知道了拦截器的实现原理之后，答案就呼之欲出了，我们不是直接取消掉后续的重复请求，而是将这些重复请求挂起，等到第一个元子请求的结果返回后，将这个结果传递给挂起的重复请求。这样就做到了重复请求只发出一次，但是业务逻辑不用做额外的处理，整个处理流程图如下所示：\u003C\u002Fp\u003E\n\u003Cpre  class=\"language-text\"\u003E\u003Ccode class=\"language-text\"\u003E         ┌─────────┐\n         │ Options │\n         └─────────┘\n              │\n┌ ─ ─ ─ ─ ─ ─ ┼ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ──┐ ─ ─ ─ ─┐\n              ▼\n│  ┌────────────────────┐   Yes    ┌───────────────────┐  │        │\n   │   hasRequesting?   │ ───────&gt; │ waitForRequesting │\n│  └────────────────────┘    ▲     └───────────────────┘  │        │\n           No │              │ resolve        │\n│             ▼              │                │           │        │\n   ┌────────────────────┐    │                │\n│  │   addRequesting    │    │                │           │        │\n   └────────────────────┘    │                │\n│             │              │                │           │        │\n              ▼              │                │\n│  ┌────────────────────┐    │                │           │        │\n   │ requestInterceptor │    │                │\n│  └────────────────────┘    │                │           │        │\n              │              │                │\n│             ▼              │                │           │     请求过程\n   ┌────────────────────┐    │                │\n│  │  request(Options)  │    │                │           │        │\n   └────────────────────┘    │                │\n│             │              │                │           │        │\n              ▼              │                │\n│  ┌────────────────────┐    │                │           │        │\n   │ ResponseInterceptor│    │                │\n│  └────────────────────┘    │                │           │        │\n              │              │                │\n│             ▼              │                │           │        │\n   ┌────────────────────┐    │                │\n│  │  resolveRequesting │ ───┘                │           │        │\n   └────────────────────┘                     │\n│             │&lt;──────────────────────────────┘           │        │\n              │\n└ ─ ─ ─ ─ ─ ─ ┼ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ ─ ─ ─ ─┘\n              │\n              ▼\n         ┌─────────┐\n         │ bsLogic │\n         └─────────┘\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E第一步，如何识别多个请求是否重复请求？很简单，只要将每个新请求中的\u003Ccode\u003Emethod(请求方法)\u003C\u002Fcode\u003E、\u003Ccode\u003Eparams(请求参数)\u003C\u002Fcode\u003E、\u003Ccode\u003Ebody(请求体)\u003C\u002Fcode\u003E和\u003Ccode\u003Eurl(请求地址)\u003C\u002Fcode\u003E组装成一个新对象，然后对这个新对象进行 JSON 序列化，获得的字符串就是这个请求的唯一标识，如下所示：\u003C\u002Fp\u003E\n\u003Cpre  class=\"language-js\"\u003E\u003Ccode class=\"language-js\"\u003Econst { method, params, body, url } = request;\nconst _serialization = JSON.stringify({ method, params, body, url });\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E有了唯一标识后，第二步就是将\u003Cstrong\u003E已经发出但是还未返回\u003C\u002Fstrong\u003E的请求存储起来，在这个请求未返回期间，如果识别到具有同一标识的请求发生，就分配一个处于\u003Ccode\u003Epending\u003C\u002Fcode\u003E状态的 promise ，待请求结束后将请求结果去\u003Ccode\u003Eresolve\u003C\u002Fcode\u003E所有\u003Ccode\u003Epending\u003C\u002Fcode\u003E状态中的 promise：\u003C\u002Fp\u003E\n\u003Cpre  data-line=\"9,14,20,21\" class=\"language-js\"\u003E\u003Ccode data-line=\"9,14,20,21\" class=\"language-js\"\u003E\u002F\u002F 最简实现原理\nconst repeatRecord = {};\nlet count = 0;\n\nfunction requestInterceptor(request) {\n  const { method, params, body, url } = request;\n  const _serialization = JSON.stringify({ method, params, body, url });\n\n  if (repeatRecord[_serialization]) return repeatRecord[_serialization]; \u002F\u002F 存在则立即返回\n\n  return new Promise(resolve =&gt; {\n    let resolveRepeat;\n    repeatRecord[_serialization] = new Promise(resolve =&gt; {\n      resolveRepeat = resolve; \u002F\u002F 将新 promise 的 resolver 存储起来\n    });\n\n    setTimeout(() =&gt; {\n      const result = `done! ${++count}`;\n      \u002F\u002F 使用结果同时 resolve 两个 promise\n      resolve(result);\n      resolveRepeat(result);\n      delete repeatRecord[_serialization]; \u002F\u002F 请求结束后删除状态\n    }, 3000);\n  });\n}\n\n\u002F\u002F 进行 4 次重复请求，count 只累加了一次\nconst request = { method: 'GET', params: { p1: 'p1' }, body: { b1: 'b1' }, url: 'https:\u002F\u002Flkangd.com\u002F' };\nrequestInterceptor(request).then(res =&gt; {\n  console.log(res); \u002F\u002F done! 1\n});\nrequestInterceptor(request).then(res =&gt; {\n  console.log(res); \u002F\u002F done! 1\n});\nrequestInterceptor(request).then(res =&gt; {\n  console.log(res); \u002F\u002F done! 1\n});\nrequestInterceptor(request).then(res =&gt; {\n  console.log(res); \u002F\u002F done! 1\n});\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E关键代码和思路已经具备，接下来就是完善整个管理器的实现了，除了请求成功的状态当然还会有请求失败的状态：\u003C\u002Fp\u003E\n\u003Cpre  class=\"language-js\"\u003E\u003Ccode class=\"language-js\"\u003Econst requestManager = {\n  data: {}, \u002F\u002F 存储请求\n  resolvers: {}, \u002F\u002F 存储每一个请求的 promise 的 resolve 回调\n  rejecters: {}, \u002F\u002F 存储每一个请求的 promise 的 reject 回调\n  \u002F\u002F 将新请求存入 data\n  add(request) {\n    const serialized = this._serialization(request);\n    return (this.data[serialized] = new Promise((resolve, reject) =&gt; {\n      this.resolvers[serialized] = resolve;\n      this.rejecters[serialized] = reject;\n    }));\n  },\n  \u002F\u002F 获取请求中的请求\n  get(request) {\n    const serialized = this._serialization(request);\n    return this.data[serialized];\n  },\n  \u002F\u002F 请求成功时调用\n  success(request, response) {\n    const serialized = this._serialization(request);\n    this.resolvers[serialized] &amp;&amp; this.resolvers[serialized](response);\n    this._clean(request);\n  },\n  \u002F\u002F 请求失败时调用\n  fail(request, error) {\n    const serialized = this._serialization(request);\n    this.rejecters[serialized] &amp;&amp; this.rejecters[serialized](error);\n    this._clean(request);\n  },\n  \u002F\u002F 清除存储的请求\n  _clean(request) {\n    const serialized = this._serialization(request);\n    delete this.resolvers[serialized];\n    delete this.rejecters[serialized];\n    delete this.data[serialized];\n  },\n  \u002F\u002F 对请求的配置进行序列化，获得请求的唯一序列\n  _serialization(request) {\n    const { method, params, body, url } = request;\n    return JSON.stringify({ method, params, body, url });\n  },\n};\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E最后就是在拦截器里面加入重复请求管理器的逻辑，有一个需要注意的地方是，这里笔者选择使用的是 \u003Ca href=\"https:\u002F\u002Fgithub.com\u002Fwendux\u002Ffly\" target=\"_blank\"\u003Efly\u003C\u002Fa\u003E 而不是 axios（原因后面再说），如下所示：\u003C\u002Fp\u003E\n\u003Cpre  class=\"language-js\"\u003E\u003Ccode class=\"language-js\"\u003Eimport Flyio from 'flyio\u002Fdist\u002Fnpm\u002Ffly';\nconst flyInstance = new Flyio();\n\nconst requestInterceptor = request =&gt; {\n  const repeatedRequest = requestManager.get(request);\n  if (repeatedRequest) return repeatedRequest; \u002F\u002F 判断是否有相同请求正在进行中，有的话直接返回\n\n  requestManager.add(request); \u002F\u002F 添加新请求\n\n  \u002F\u002F do some stuff...\n\n  return request;\n};\n\nconst responseInterceptor = [\n  response =&gt; {\n    requesting.success(response.request, response.data); \u002F\u002F 请求成功，响应其它重复请求的成功回调\n\n    \u002F\u002F do some stuff...\n\n    return response.data;\n  },\n  error =&gt; {\n    requesting.fail(error.request, error); \u002F\u002F 请求失败，响应其它重复请求的失败回调\n\n    \u002F\u002F do some stuff...\n\n    return Promise.reject(error);\n  },\n];\n\nflyInstance.interceptors.request.use(requestInterceptor);\nflyInstance.interceptors.response.use(...responseInterceptor);\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Ch2 id=\"weishimoshiflybushiaxios\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'weishimoshiflybushiaxios')\"\u003E¶\u003C\u002Fa\u003E 为什么是 fly 不是 axios？\u003C\u002Fh2\u003E\n\u003Ch3 id=\"axiosguanjianyuanmafenxi\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'axiosguanjianyuanmafenxi')\"\u003E¶\u003C\u002Fa\u003E axios 关键源码分析\u003C\u002Fh3\u003E\n\u003Cp\u003E我们打开 axios 的源码中的 \u003Ca href=\"https:\u002F\u002Fgithub.com\u002Faxios\u002Faxios\u002Fblob\u002Fmaster\u002Flib\u002Fcore\u002FAxios.js#L49\" target=\"_blank\"\u003Erequest\u003C\u002Fa\u003E部分，可以看到在 promise 链的正中是\u003Ccode\u003EdispatchRequest\u003C\u002Fcode\u003E进行请求：\u003C\u002Fp\u003E\n\u003Cpre  data-line=\"3\" class=\"language-js\"\u003E\u003Ccode data-line=\"3\" class=\"language-js\"\u003EAxios.prototype.request = function request(config) {\n  \u002F\u002F ...\n  var chain = [dispatchRequest, undefined]; \u002F\u002F 默认调用方法是 dispatchRequest\n  var promise = Promise.resolve(config);\n\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    chain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  while (chain.length) {\n    promise = promise.then(chain.shift(), chain.shift());\n  }\n\n  return promise;\n};\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E\u003Ca href=\"https:\u002F\u002Fgithub.com\u002Faxios\u002Faxios\u002Fblob\u002Fmaster\u002Flib\u002Fcore\u002FdispatchRequest.js#L52\" target=\"_blank\"\u003E\u003Ccode\u003EdispatchRequest\u003C\u002Fcode\u003E\u003C\u002Fa\u003E 返回 adapter 对传入 config 进行处理后的结果：\u003C\u002Fp\u003E\n\u003Cpre  data-line=\"3\" class=\"language-js\"\u003E\u003Ccode data-line=\"3\" class=\"language-js\"\u003Emodule.exports = function dispatchRequest(config) {\n  \u002F\u002F ...\n  return adapter(config); \u002F\u002F ...\n};\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003Eaxios 默认的 adapter 是 xhr，最后去看看 adapter 的实现，发现最终\u003Ccode\u003Enew XMLHttpRequest()\u003C\u002Fcode\u003E使用 config 中的 \u003Ca href=\"https:\u002F\u002Fgithub.com\u002Faxios\u002Faxios\u002Fblob\u002Fmaster\u002Flib\u002Fadapters\u002Fxhr.js#L14\" target=\"_blank\"\u003Edata\u003C\u002Fa\u003E 作为数据进行发送，如果传入的是 promise，肯定是不存在 data 属性的，最后只能产生错误。\u003C\u002Fp\u003E\n\u003Cpre  class=\"language-js\"\u003E\u003Ccode class=\"language-js\"\u003Emodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n\n    \u002F\u002F ...\n\n    var request = new XMLHttpRequest();\n\n    \u002F\u002F ...\n\n    request.send(requestData);\n  });\n};\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Ch3 id=\"flyguanjianyuanmafenxi\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'flyguanjianyuanmafenxi')\"\u003E¶\u003C\u002Fa\u003E fly 关键源码分析\u003C\u002Fh3\u003E\n\u003Cp\u003E而 fly 在请求方法会对传入的 options 进行判断，如果经过请求拦截器处理后返回的结果不是 options，则将这个结果直接返回，所以就能达到我们上面流程图想要的结果：\u003C\u002Fp\u003E\n\u003Cpre  data-line=\"18,26-30\" class=\"language-js\"\u003E\u003Ccode data-line=\"18,26-30\" class=\"language-js\"\u003E\u002F\u002F ...\nclass Fly {\n  \u002F\u002F ...\n  request(url, data, options) {\n    \u002F\u002F ...\n    enqueueIfLocked(requestInterceptor.p, () =&gt; {\n      utils.merge(options, JSON.parse(JSON.stringify(this.config)));\n      let headers = options.headers;\n      headers[contentType] = headers[contentType] || headers[contentTypeLowerCase] || '';\n      delete headers[contentTypeLowerCase];\n      options.body = data || options.body;\n      url = utils.trim(url || '');\n      options.method = options.method.toUpperCase();\n      options.url = url;\n      let ret = options;\n      if (requestInterceptorHandler) {\n        \u002F\u002F 处理请求拦截器逻辑\n        ret = requestInterceptorHandler.call(requestInterceptor, options, Promise) || options;\n      }\n      if (!isPromise(ret)) {\n        ret = Promise.resolve(ret);\n      }\n      ret.then(\n        d =&gt; {\n          \u002F\u002Fif options continue\n          if (d === options) {\n            makeRequest(d);\n          } else {\n            resolve(d); \u002F\u002F 如果请求拦截器返回了非 options 结果，则跳过了请求阶段\n          }\n        },\n        err =&gt; {\n          reject(err);\n        },\n      );\n    });\n    \u002F\u002F ...\n  }\n  \u002F\u002F ...\n}\n\u002F\u002F ...\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Ch3 id=\"nengfoushiyongaxiosdadaomude\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'nengfoushiyongaxiosdadaomude')\"\u003E¶\u003C\u002Fa\u003E 能否使用 axios 达到目的？\u003C\u002Fh3\u003E\n\u003Cp\u003E我们知道，axios 和 fly 都支持使用自定义的 adapter 来作为请求发送器的，理论上，在 axios 生成实例的时候将原来默认的 adapter 包装一下，判断一下传入 config 是否为 promise，然后直接返回，应该是可以得到支持的。\u003C\u002Fp\u003E\n\u003Cpre  class=\"language-js\"\u003E\u003Ccode class=\"language-js\"\u003Eimport Axios from 'axios';\nconst wrappedAdapter = config =&gt; {\n  if ('function' == typeof config.then) return config;\n  return Axios.defaults.adapter(config);\n};\n\nconst instance = Axios.createInstance({ adapter: wrappedAdapter });\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Cp\u003E然后，理想很丰满，现实却是骨感的。因为 axios 在真正发送请求前，会在 dispatchRequest 方法内对传入的 config 进行多个特殊处理，而 dispatchRequest 的实现是不对外暴露的，所以如果此时 config 的类型为 promise，可能会产生很多意想不到的错误。因此，不建议对 axios 进行类似的包装操作。\u003C\u002Fp\u003E\n\u003Cpre  data-line=\"2-25\" class=\"language-js\"\u003E\u003Ccode data-line=\"2-25\" class=\"language-js\"\u003Emodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config);\n\n  \u002F\u002F Support baseURL config\n  if (config.baseURL &amp;&amp; !isAbsoluteURL(config.url)) {\n    config.url = combineURLs(config.baseURL, config.url);\n  }\n\n  \u002F\u002F Ensure headers exist\n  config.headers = config.headers || {};\n\n  \u002F\u002F Transform request data\n  config.data = transformData(config.data, config.headers, config.transformRequest);\n\n  \u002F\u002F Flatten headers\n  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});\n\n  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {\n    delete config.headers[method];\n  });\n\n  var adapter = config.adapter || defaults.adapter;\n\n  \u002F\u002F 上面的代码都是对传入 config 的处理\n  return adapter(config).then(\n    function onAdapterResolution(response) {\n      throwIfCancellationRequested(config);\n\n      \u002F\u002F Transform response data\n      response.data = transformData(response.data, response.headers, config.transformResponse);\n\n      return response;\n    },\n    function onAdapterRejection(reason) {\n      if (!isCancel(reason)) {\n        throwIfCancellationRequested(config);\n\n        \u002F\u002F Transform response data\n        if (reason &amp;&amp; reason.response) {\n          reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);\n        }\n      }\n\n      return Promise.reject(reason);\n    },\n  );\n};\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003Ch2 id=\"jieyan\"\u003E\u003Ca class=\"cs-header-anchor\" href=\"\" onclick=\"!this.getAttribute('href') &amp;&amp; this.setAttribute('href', window.location.origin+window.location.pathname+'#'+'jieyan')\"\u003E¶\u003C\u002Fa\u003E 结言\u003C\u002Fh2\u003E\n\u003Cp\u003E本文铺垫了一个特定的业务场景，讲述了前端重复请求会带来的几种危害，并且陈列了几种常规的前端控制重复请求的方法，然后针对每种方法进行简单分析，在不违反开放-封闭原则的前提下，对其中一种方法进行改进后达到了我们想要的结果。\u003C\u002Fp\u003E\n\u003Cp\u003E这次优化给笔者带来的最大启发就是，我们在使用流行框架、库的时候，不应当仅仅学习其 api，更应该对其实现进行分析研究，这样在我们遇到特殊难题的时候可以获得更广阔的视野，从而获得更好的解决方案。\u003C\u002Fp\u003E\n",bodyBegin:7,frontmatter:"title: 控制前端业务重复请求的一个新思路\ndate: '2020-09-13'\nspoiler: 少一个请求，少一分负担",link:a,next:{title:"剖析无限滚动虚拟列表的实现原理",date:"2020-08-26",spoiler:"长列表渲染的终极优化手段",featured:true,link:"\u002Fpost\u002Fvirtual-infinite-scroll\u002F",min2read:"🍱🍱 28 min read",wordcount:"7k"},prev:{title:"一文看全 Vue 3.X 带来的新变化",date:"2020-07-19",spoiler:"只关注区别于 Vue 2.x 实现，助力快速过渡到 Vue 3.x",link:"\u002Fpost\u002Fnew-for-vue-3\u002F",min2read:"🍱🍱🍱 39 min read",wordcount:"8.4k"}}}],fetch:[],mutations:void 0}}("\u002Fpost\u002Fprevent-duplicate-requests\u002F")));
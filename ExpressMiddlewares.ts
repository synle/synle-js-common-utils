// middleware to do pretty print json if accessed without the application/json
app.use(function(req, res, next) {
  const accept = req.headers['accept'];
  if(accept?.indexOf('application/json') !== 0){
    res.json = (data) => res.send(`
      <pre><code class="json">${JSON.stringify(data, null, 2)}</code></pre>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/default.min.css">
      <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js"></script>
      <script>hljs.initHighlightingOnLoad();</script>
    `);
  }
  next();
});

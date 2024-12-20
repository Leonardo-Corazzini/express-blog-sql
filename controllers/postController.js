
const connection = require('../data/db.js')


function index(req, res) {

    const sql = 'SELECT * FROM posts';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}
function show(req, res) {

    const id = req.params.id
    const sql = 'SELECT * FROM posts WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json(results[0]);
    });
}


function store(req, res) {
    const { title, slug, content, image, tags, published } = req.body
    console.log(tags)
    lastIndex++

    const post = {
        title,
        slug,
        content,
        image,
        tags,
        published,
        id: lastIndex
    }
    posts.push(post)
    console.log(post)
    res.status(201).send(post)
}

function update(req, res) {
    const { title, slug, content, image, tags } = req.body
    const id = parseInt(req.params.id)
    console.log(`Post con id: ${id}`)
    const post = posts.find((p) => p.id === id)



    if (!post) {
        res.status(404)
        res.json({
            error: "Post not found",
            message: `Post non trovato`
        })
    }
    post.title = title
    post.slug = slug
    post.content = content
    post.image = image
    post.tags = tags
    res.json(post)
}

function modify(req, res) {
    const { title, slug, content, image, tags } = req.body
    const id = parseInt(req.params.id)
    console.log(`Post con id: ${id}`)
    const post = posts.find((p) => p.id === id)



    if (!post) {
        res.status(404)
        res.json({
            error: "Post not found",
            message: `Post non trovato`
        })
    }
    post.title = title
    post.slug = slug
    post.content = content
    post.image = image
    post.tags = tags


    if (title) post.title = title
    if (slug) post.slug = slug
    if (content) post.content = content
    if (image) post.img = content
    if (tags) post.tags = content

    res.json(post)

}

function destroy(req, res) {

    const { id } = req.params;

    connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204)
    });
}
module.exports = { index, show, store, update, modify, destroy }



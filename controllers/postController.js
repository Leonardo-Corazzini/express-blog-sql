const posts = require('../data/posts.js')
let lastIndex = posts.at(-1).id

function index(req, res) {

    let filteredPosts = posts

    if (req.query.tag) {

        filteredPosts = posts.filter((post) => post.tags.includes(req.query.tag))
    }

    res.json(filteredPosts)

}

function show(req, res) {
    const id = req.params.id
    console.log(`Post con id: ${id}`)
    let post

    if (!isNaN(parseInt(id))) {
        post = posts.find((p) => p.id === parseInt(id))
    } else {
        post = posts.find((p) => p.slug === id)
    }



    if (!post) {
        res.status(404)
        res.json({
            error: "Post not found",
            message: `Post non trovato`
        })
    }
    res.json(post)
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
    const id = req.params.id
    let postIndex
    if (!isNaN(parseInt(id))) {
        postIndex = posts.findIndex((post) => post.id === parseInt(id))
    } else {
        postIndex = posts.findIndex((post) => post.slug === id)
    }


    if (postIndex === -1) {
        res.status(404)
        console.log(`Post con id: ${id} non trovato`)
        return res.json({
            error: 'Post not found',
            message: `Post con id: ${id} non trovato`
        })
    }


    posts.splice(postIndex, 1)
    console.log(`Elimino il post con id: ${id}`)
    res.sendStatus(204)
}
module.exports = { index, show, store, update, modify, destroy }



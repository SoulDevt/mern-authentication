const Comments = require('../models/comment-model')

const createComment = async (req, res) => {
    const { comment, id, userId } = req.body;

    if (!comment) {
        res.status(400).json({ error: 'comment is required' });
    } else {
        Comments.create({
            text: comment,
            productId: id,
            userId: userId
        });
        // const allComments = await fetchAllComments();
        // console.log(allProducts)
        res.status(200).json({ success: 'comment added successfully' });
    }
}

// const fetchAllComments = async (req, res) => {
//     console.log("fetching all comments launched")
//     try {
//         comments = await Comments.find({});
//         res.status(200).json(comments)
//     } catch (error) {
//         console.error(error);
//     }
// }

const fetchAllComments = async (req, res) => {
    const productId = req.query.productId;
    const page = req.query.page || 1;
    const perPage = 10; // Nombre de commentaires par page

    try {
        const comments = await Comments.find({ productId })
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error while trying to fetch comments' });
    }
}

module.exports = {
    createComment,
    fetchAllComments
}
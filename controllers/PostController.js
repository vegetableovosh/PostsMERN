import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);

    } catch (err) {
        console.error(err);
        res.status(500)
            .json({
                error: "No get posts"
            });
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const updatedPost = await PostModel.findOneAndUpdate(
            {_id: postId},
            {$inc: { viewsCount: 1 }},
            {returnDocument: 'after'}
        );

        if (!updatedPost) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        res.json(updatedPost);


    } catch (err) {
        console.error(err);
        res.status(500)
            .json({
                error: "No get posts"
            });
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const removePost = await PostModel.findOneAndDelete({
            _id: postId,
        });

        if (!removePost) {
            return res.status(404).json({
                message: 'Post not found',
            })
        }

        res.json({success: true});


    } catch (err) {
        console.error(err);
        res.status(500)
            .json({
                error: "No get posts"
            });
    }
}

export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.send(post);
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({
                error: "No req"
            });
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await  PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({
                error: "No update"
            });
    }
}
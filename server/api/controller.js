import { create as createFactory, index as indexFactory, getById as getByIdFactory, update as updateFactory, deleteReview as deleteReviewFactory } from './factory.js';
export const create = (req, res, next) => {
    const body = req.body || {};
    return createFactory(body)
        .then((data) => {
            res.json({
                success: true,
                data
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: err.message
            });
        });
}

export const index = (req, res, next) => {
    const query = req.query || {};
    return indexFactory(query)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}

export const update = (req, res, next) => {
    const body = req.body || {};
    const { params } = req;
    const id = params.id;
    return updateFactory(id, body)
        .then((data) => {
            res.json({
                success: true,
                data
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: err.message
            });
        });
}

export const getById = (req, res, next) => {
    const query = req.query || {};
    const { params } = req;
    const id = params.id;
    return getByIdFactory(id, query)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}

export const deleteReview = (req, res, next) => {
    const { params } = req;
    const id = params.id;
    return deleteReviewFactory(id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}
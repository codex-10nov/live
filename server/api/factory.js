import Reviews from "./model.js";

export const create = async(body) => {
    const { title, content = "" } = body;
    console.log("logging body", body);
    if (!title) {
        throw new Error("Title is required");
    }
    const review = await Reviews.create({ title, content });
    return review;
}

export const index = async(query = {}) => {
    return Reviews.find(query);
}

export const getById = async(id, query = {}) => {
    return Reviews.findById(id);
}

export const update = async(id, body) => {

    const review = await getById(id);

    if (!review) throw new Error("Review not found");

    const { title, content } = body;
    if (title) {
        review.title = title;
    }
    if (content) {
        review.content = content;
    }

    review.status = "edited";

    return review.save();
}
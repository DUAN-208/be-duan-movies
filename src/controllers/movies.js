import Joi from "joi";
import Movies from "../models/movies";

const MoviesSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    diem: Joi.number().required(),
    nam: Joi.number().required(),
    desc: Joi.string().required(),
});

export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = MoviesSchema.validate(body);
        if (error) {
            return res.json({
                message: error.details[0].message,
            });
        }
        const movies = await Movies.create(body);

        if (movies.length === 0) {
            return res.status(400).json({
                message: "Thêm sản phẩm thất bại",
            });
        }
        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            movies,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
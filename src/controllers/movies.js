import Joi from "joi";
import Movies from "../models/movies";



const MoviesSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    diem: Joi.number().required(),
    nam: Joi.number().required(),
    desc: Joi.string().required(),
});

export const getAll = async (req, res) => {
    try {
        const data = await Movies.find();

        if (data.length == 0) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Movies.findOne({ _id: id })
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có sản phẩm",
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

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
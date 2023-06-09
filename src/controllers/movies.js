
import Joi from "joi";
import Movies from "../models/movies";

const MoviesSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    diem: Joi.number().required(),
    nam: Joi.number().required(),
    desc: Joi.string().required(),
    video:Joi.string().required()
});

export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = MoviesSchema.validate(body,{abortEarly:false
        });
        if (error) {
            return res.json({
                message: error.details.map(err=> err.message),
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

export const getAll = async (req, res) => {
        const { _limit = 10, _sort = "createAt", _order = "asc", _page = 1 } = req.query;
        const options = {
            page: _page,
            limit: _limit,
            sort: {
                [_sort]: _order == "desc" ? -1 : 1,
            },
        };
    
        try {
            const data = await Movies.paginate({}, options);
    
            if (data.length == 0) {
                return res.json({
                    message: "Không có phim nào",
                });
            }
            return res.json(data);
        } catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
    };
 
export const update = async (req ,res )=>{
    try{
        const{error}= MoviesSchema.validate(req.body,{abortEarly:false});
        if (error) {
            return res.json({
              messages: error.details.map((err) => err.message),
            });
        }
        const data = await Movies.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
          );
          !data
          ? res.json({ message: "Cập nhật Phim không thành công" })
          : res.json({ message: "Cập nhật Phim  thành công", data });
    }catch (error) {
        return res.json({ message: error.message });
      }
};


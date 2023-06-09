import Movies from "../models/movies";
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
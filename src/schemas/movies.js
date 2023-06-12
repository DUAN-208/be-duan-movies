import joi from "joi";

export const moviesSchema= joi.object({
        _id:joi.string().required(),
        name:joi.string().required(),
        img:joi.string().required(),
        diem:joi.number().required(),
        nam:joi.string().required(),
        desc:joi.string().required(),
        createdAt: joi.string(),
        updatedAt: joi.string(),

})


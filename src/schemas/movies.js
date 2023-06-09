import joi from "joi";

export const moviesSchema= joi.object({
        name:joi.string().required(),
        img:joi.string().required(),
        diem:joi.string().required(),
        nam:joi.string().required(),
        desc:joi.string().required(),

})


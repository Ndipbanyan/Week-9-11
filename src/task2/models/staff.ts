import mongoose from 'mongoose';
import Joi from 'joi';
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    name: String,
    position: String,
    salary: Number,
    homeAddress: String,
});

function validateStaff(organ: any) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        position: Joi.string().min(5).max(50).required(),
        salary: Joi.number().min(3).max(50).required(),
        homeAddress: Joi.string().min(5).max(50).required()
    });
    return schema.validate(organ)
};


const Staff = mongoose.model('Staff', staffSchema);

export { Staff, validateStaff };

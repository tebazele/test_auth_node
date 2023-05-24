import mongoose from "mongoose";
import { Schema } from "mongoose";


export const SpeciesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
},
    { timestamps: true, toJSON: { virtuals: true } })

SpeciesSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})
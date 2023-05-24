import mongoose from "mongoose";
import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const GalaxySchema = new mongoose.Schema({
    name: { type: String, required: true },
    stars: { type: Number, default: 0 },
    creatorId: { type: ObjectId, required: true, ref: 'Account' }
},
    { timestamps: true, toJSON: { virtuals: true } })

GalaxySchema.virtual('planetCount', {
    ref: 'Planet',
    localField: '_id',
    foreignField: 'galaxyId',
    justOne: false,
    count: true
})

GalaxySchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})
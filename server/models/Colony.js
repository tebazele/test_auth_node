import mongoose from "mongoose";
import { Schema } from "mongoose";

const ColonySchema = new mongoose.Schema({
    name: { type: String, required: true },
    population: { type: Number, default: 0 },
    planetId: { type: Schema.Types.ObjectId, required: true, ref: 'Planet' },
    speciesId: { type: Schema.Types.ObjectId, required: true, ref: 'Species' }
},
    { timestamps: true, toJSON: { virtuals: true } })

ColonySchema.virtual('planet', {
    localField: 'planetId',
    foreignField: '_id',
    justOne: true,
    ref: 'Planet'
})

ColonySchema.virtual('species', {
    localField: 'speciesId',
    foreignField: '_id',
    justOne: true,
    ref: 'Species'
})
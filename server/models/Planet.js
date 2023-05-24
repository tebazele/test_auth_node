import mongoose from "mongoose";
import { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId
export const PlanetSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        biome: { type: String, default: "Unknown" },
        atmosphere: { type: Boolean, default: false },
        galaxyId: { type: ObjectId, required: true, ref: 'Galaxy' },
        creatorId: { type: ObjectId, required: true, ref: 'Account' }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

PlanetSchema.virtual('galaxy', {
    localField: 'galaxyId',
    foreignField: '_id',
    ref: 'Galaxy',
    justOne: true
})

PlanetSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})
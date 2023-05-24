import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";
import { BadRequest } from "../utils/Errors.js";

class GalaxyService {
    async createGalaxy(body) {
        const galaxy = await dbContext.Galaxy.create(body);
        await galaxy.populate('planetCount creator')
        return galaxy;
    }
    async getGalaxies() {
        const galaxies = await dbContext.Galaxy.find()
            .populate('planetCount creator')
        return galaxies
    }

    async editGalaxy(userId, galaxyId, editBody) {
        const foundGalaxy = await dbContext.Galaxy.findById(galaxyId);
        if (!foundGalaxy) {
            throw new BadRequest('This galaxy does not exist');
        }
        if (userId != foundGalaxy.creatorId) {
            throw new Forbidden('You cannot edit a galaxy you did not add yourself')
        }
        foundGalaxy.name = editBody.name ? editBody.name : foundGalaxy.name
        foundGalaxy.stars = editBody.stars ? editBody.stars : foundGalaxy.stars;

        await foundGalaxy.save()
        await foundGalaxy.populate('planetCount creator')
        return foundGalaxy;
    }

    async deleteGalaxy(userId, galaxyId) {
        const galaxy = await dbContext.Galaxy.findById(galaxyId);
        if (!galaxy) {
            throw new BadRequest('No galaxy at this id')
        }
        if (galaxy.creatorId != userId) {
            throw new Forbidden('Not yours to delete')
        }
        await galaxy.remove()
        return 'Galaxy has been deleted';
    }

}

export const galaxyService = new GalaxyService();
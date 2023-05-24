import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";
import { BadRequest } from "../utils/Errors.js";

class PlanetsService {
    async getPlanetsByGalaxyId(galaxyId) {
        const planets = await dbContext.Planet.find({ galaxyId }).populate('galaxy creator')
        return planets;
    }
    async deletePlanet(planetId, userId) {
        const foundPlanet = await dbContext.Planet.findById(planetId);
        if (!foundPlanet) throw new BadRequest('No planet here');
        if (foundPlanet.creatorId != userId) throw new Forbidden("Can't delete a planet that you didn't add");
        foundPlanet.remove()
        return `The planet named ${foundPlanet.name} was deleted`
    }
    editPlanet(planetId, userId, body) {
        throw new Error("Method not implemented.");
    }
    async createPlanet(body) {
        const planet = await dbContext.Planet.create(body)
        return planet;
    }
    async getPlanets() {
        const planets = await dbContext.Planet.find()
        return planets;
    }

}

export const planetsService = new PlanetsService();
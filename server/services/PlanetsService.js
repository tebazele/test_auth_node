import { dbContext } from "../db/DbContext.js";

class PlanetsService {
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
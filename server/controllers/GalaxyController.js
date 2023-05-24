import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { galaxyService } from "../services/GalaxyService.js"
import { planetsService } from "../services/PlanetsService.js";

export class GalaxyController extends BaseController {
    constructor() {
        super('api/galaxies')
        this.router
            .get('', this.getGalaxies)
            .get('/:id/planets', this.getPlanetsByGalaxyId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createGalaxy)
            .put('/:id', this.editGalaxy)
            .delete('/:id', this.deleteGalaxy)
    }

    async getGalaxies(req, res, next) {
        try {
            const galaxies = await galaxyService.getGalaxies()
            return res.send(galaxies)
        } catch (error) {
            next(error)
        }
    }

    async getPlanetsByGalaxyId(req, res, next) {
        try {
            const galaxyId = req.params.id
            const planets = await planetsService.getPlanetsByGalaxyId(galaxyId);
            return res.send(planets)
        } catch (error) {
            next(error)
        }
    }

    async createGalaxy(req, res, next) {
        try {
            const body = {
                ...req.body,
                creatorId: req.userInfo.id
            }
            const galaxy = await galaxyService.createGalaxy(body)
            return res.send(galaxy)
        } catch (error) {
            next(error)
        }
    }

    async editGalaxy(req, res, next) {
        try {
            const userId = req.userInfo.id;
            const galaxyId = req.params.id;
            const editBody = {
                ...req.body
            }
            const galaxy = await galaxyService.editGalaxy(userId, galaxyId, editBody);
            return res.send(galaxy);
        } catch (error) {
            next(error)
        }
    }

    async deleteGalaxy(req, res, next) {
        try {
            const userId = req.userInfo.id;
            const galaxyId = req.params.id;
            const message = await galaxyService.deleteGalaxy(userId, galaxyId);
            return res.send(message);
        } catch (error) {
            next(error)
        }
    }
}
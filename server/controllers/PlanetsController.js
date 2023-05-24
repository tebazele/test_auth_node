import { Auth0Provider } from "@bcwdev/auth0provider";
import { planetsService } from "../services/PlanetsService.js";
import BaseController from "../utils/BaseController.js";

export class PlanetsController extends BaseController {
    constructor() {
        super('api/planets')
        this.router
            .get('', this.getPlanets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createPlanet)
            .put('/:id', this.editPlanet)
            .delete('/:id', this.deletePlanet)
    }

    async createPlanet(req, res, next) {
        try {
            const body = {
                ...req.body,
                creatorId: req.userInfo.id

            }
            const planet = await planetsService.createPlanet(body)
            return res.send(planet)
        } catch (error) {
            next(error)
        }
    }

    async getPlanets(req, res, next) {
        try {
            const planets = await planetsService.getPlanets();
            return res.send(planets)
        } catch (error) {
            next(error)
        }
    }

    async editPlanet(req, res, next) {
        try {
            const body = {
                ...req.body
            }
            const userId = req.userInfo.id
            const planetId = req.params.id
            const planet = await planetsService.editPlanet(planetId, userId, body)
            return res.send(planet)
        } catch (error) {
            next(error)
        }
    }

    async deletePlanet(req, res, next) {
        try {
            const planetId = req.params.id
            const userId = req.userInfo.id
            const message = await planetsService.deletePlanet(planetId, userId)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}
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
}
import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";

export class ColoniesController extends BaseController {
    constructor() {
        super('api/colonies')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createColony)
    }

    async createColony(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
}
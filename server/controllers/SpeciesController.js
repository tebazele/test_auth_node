import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js";
import { speciesService } from "../services/SpeciesService.js";

export class SpeciesController extends BaseController {
    constructor() {
        super('api/species')
        this.router
            .get('', this.getSpeciesList)
            .get('/:id', this.getOneSpecies)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.addSpecies)
            .put('/:id', this.editSpecies)
            .delete('/:id', this.deleteSpecies)
    }

    async getSpeciesList(req, res, next) {
        try {
            const query = req.query
            const species = await speciesService.getSpeciesList(query)
            return res.send(species);
        } catch (error) {
            next(error)
        }
    }

    async getOneSpecies(req, res, next) {
        try {
            const speciesId = req.params.id
            const specimen = await speciesService.getOneSpecies(speciesId)
            return res.send(specimen);
        } catch (error) {
            next(error)
        }
    }

    async addSpecies(req, res, next) {
        try {

            const body = {
                ...req.body,
                creatorId: req.userInfo.id
            }
            const specimen = await speciesService.addSpecies(body)
            return res.send(specimen);
        } catch (error) {
            next(error)
        }
    }

    async editSpecies(req, res, next) {
        try {
            const userId = req.userInfo.id
            const speciesId = req.params.id
            const body = {
                ...req.body
            }
            const specimen = await speciesService.editSpecies(speciesId, userId, body)
            return res.send(specimen)
        } catch (error) {
            next(error)
        }
    }

    async deleteSpecies(req, res, next) {
        try {
            const speciesId = req.params.id
            const userId = req.userInfo.id
            const message = await speciesService.deleteSpecies(speciesId, userId)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}
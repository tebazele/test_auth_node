import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { PlanetSchema } from '../models/Planet.js';
import { GalaxySchema } from '../models/Galaxy.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Planet = mongoose.model('Planet', PlanetSchema);
  Galaxy = mongoose.model('Galaxy', GalaxySchema);
}

export const dbContext = new DbContext()

// @flow

import { Router } from 'express'
import { GQLExpressMiddleware, ModuleParser } from 'graphql-lattice'

const router = Router();
const parser = new ModuleParser(global.fromRoot('src', 'gql'))
const lattice = new GQLExpressMiddleware(parser.parseSync())

router.use('/graphql', lattice.middleware)

export default router;

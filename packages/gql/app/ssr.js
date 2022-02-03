/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
const path = require('path')
const {getRuntime} = require('pwa-kit-runtime/ssr/server/express')
const pkg = require('../package.json')

// New Imports
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const {typeDefs} = require('./schema')
const {resolvers} = require('./resolvers')

const options = {
    buildDir: path.resolve(process.cwd(), 'build'),
    faviconPath: path.resolve(__dirname, 'static', 'favicon.ico'),
    defaultCacheTimeSeconds: 600,
    mobify: pkg.mobify,
    enableLegacyRemoteProxying: false,
    protocol: 'http',
    port: process.env.PORT || 4000
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const runtime = getRuntime()

const {handler} = runtime.createHandler(options, (app) => {
    app.use(cors())

    app.use(
        '/graphql',
        graphqlHTTP({
            schema: schema,
            // rootValue: root,
            graphiql: true
        })
    )
})

exports.get = handler

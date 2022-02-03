const CommerceSdk = require('commerce-sdk')
const {helpers, Product, Search} = CommerceSdk

const config = {
    headers: {},
    parameters: {
        clientId: 'c9c45bfd-0ed3-4aa2-9971-40f88962b836',
        organizationId: 'f_ecom_zzrf_001',
        shortCode: '8o7m175y',
        siteId: 'RefArchGlobal'
    }
}

// Helpers
const withGuestAuth = async (fn, config) => {
    const token = await helpers.getShopperToken(config, {type: 'guest'})

    // Add the token to the client configuration
    config.headers['authorization'] = token.getBearerHeader()

    return await fn(config)
}

const resolvers = {
    Query: {
        getProduct: async (_, {options}) => {
            const product = await withGuestAuth(async () => {
                // Create a new ShopperSearch API client
                const productClient = new Product.ShopperProducts(config)

                return await productClient.getProduct(options)
            }, config)

            return product
        },
        getCategory: async (_, {options}) => {
            const category = await withGuestAuth(async () => {
                // Create a new ShopperSearch API client
                const productClient = new Product.ShopperProducts(config)

                return await productClient.getCategory(options)
            }, config)

            return category
        },
        productSearch: async (_, {options, includeProducts}) => {
            const productSearchResult = await withGuestAuth(async () => {
                // Create a new ShopperSearch API client
                const searchClient = new Search.ShopperSearch(config)

                let searchResult = await searchClient.productSearch(options)
                console.log('includeProducts: ', includeProducts)
                if (includeProducts) {
                    const productClient = new Product.ShopperProducts(config)

                    const productIds = searchResult.hits.map(({productId}) => productId)
                    console.log('productIds: ', productIds.length)
                    const productResult = await productClient.getProducts({
                        parameters: {
                            ids: productIds.join(',')
                        }
                    })

                    searchResult = {
                        ...searchResult,
                        products: productResult.data
                    }
                }

                return searchResult
            }, config)

            return productSearchResult
        }
    }
}

module.exports = {
    resolvers
}
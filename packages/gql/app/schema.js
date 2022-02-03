const typeDefs = `
  input Header {
    key: String,
    value: String
  }
  input CategoryQueryParameters {
    organizationId: String,
    id: String,
    levels: Int,
    locale: String,
    siteId: String
  }
  input ProductQueryParameters {
    organizationId: String,
    id: String,
    inventoryIds: String,
    currency: String,
    locale: String,
    allImages: Boolean,
    perPricebook: Boolean,
    siteId: String
  }
  input SearchQueryParameters {
    organizationId: String,
    siteId: String,
    q: String,
    refine: [String],
    sort: String,
    currency: String,
    locale: String,
    offset: Int,
    limit: Int,
  }
  input CategoryQuery {
    parameters: CategoryQueryParameters,
    headers: [Header]
  }
  input ProductQuery {
    parameters: ProductQueryParameters,
    headers: [Header]
  }
  input SearchQuery {
    parameters: SearchQueryParameters,
    headers: [Header]
  }
  type Category {
    categories: [Category],
    description: String,
    id: String,
    image: String,
    name: String,
    pageDescription: String,
    pageKeywords: String,
    pageTitle: String,
    parentCategoryId: String,
    thumbnail: String
  }
  type Variant {
    productId: String
  }
  type Product {
    id: String,
    name: String,
    variants: [Variant]
  }
  type ProductResult {
    limit: Int,
    data: [Product],
    total: Int
  }
  type Image {
    alt: String
    disBaseLink: String
    link: String
    title: String
  }
  type ProductType {
    bundle: Boolean
    item: Boolean
    master: Boolean
    option: Boolean
    set: Boolean
    variant: Boolean
    variationGroup: Boolean
  }
  type VariationAttributeValue  {
    description: String
    image: Image
    imageSwatch: Image
    name: String
    orderable: Boolean
    value: String
  }

  type VariationAttribute {
    id: String
    name: String
    values: [VariationAttributeValue]
  }
  type ProductSearchHit {
    currency: String
    hitType: String
    image: Image
    orderable: Boolean
    price: Float
    productId: String
    productName: String
    productType: ProductType
    variationAttributes: [VariationAttribute]
  }
  type ProductSearchRefinementValue {
    description: String,
    hitCount: Int,
    label: String,
    presentationId: String,
    value: String,
    values: [ProductSearchRefinementValue]
  }

  type ProductSearchRefinement {
    attributeId: String,
    label: String,
    values: [ProductSearchRefinementValue]
  }

  type SuggestedPhrase {
    exactMatch: Boolean
    phrase: String
  }

  type SuggestedTerm {
    completed: Boolean
    corrected: Boolean
    exactMatch: Boolean
    value: String
  }

  type SuggestedTerms {
    originalTerm: String
    terms: [SuggestedTerm]
  }

  type Suggestion {
    suggestedPhrases: [SuggestedPhrase]
    suggestedTerms: [SuggestedTerms]
  }

  type ProductSearchSortingOption {
    id: String
    label: String
  }

  type ProductSearchResult {
    limit: Int
    hits: [ProductSearchHit]
    products: [Product]
    query: String
    refinements: [ProductSearchRefinement]
    searchPhraseSuggestions: Suggestion
    selectedSortingOption: String
    sortingOptions: [ProductSearchSortingOption]
    offset: Int,
    total: Int
  }
  
  type Query {
    getCategory(options: CategoryQuery): Category,
    getProduct(options: ProductQuery): Product,
    productSearch(options: SearchQuery, includeProducts: Boolean): ProductSearchResult
  }
`


module.exports = {
  typeDefs
}
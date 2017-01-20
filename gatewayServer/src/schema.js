const axios = require('axios');
const {flatten} = require('lodash');
const config = require('../../config/config');
const amazonConfig = require('../../config/config.privatekeys').amazon;
const AmazonSearch = require('./AmazonSearch');
const amazonSearch = new AmazonSearch(amazonConfig);

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean,
  GraphQLFloat
} = require('graphql');

const Coords = new GraphQLObjectType({
  name: 'Coords',
  description: 'Latitude and Longitude',
  fields: () => ({
    lat: {type: GraphQLFloat},
    lon: {type: GraphQLFloat}
  })
})

const Spec = new GraphQLObjectType({
  name: 'Spec',
  description: 'Spec fields for computers',
  fields: () => ({
    condition: { type: GraphQLInt },
    screenSize: { type: new GraphQLList(GraphQLString) },
    year: { type: new GraphQLList(GraphQLString) },
    processor: { type: new GraphQLList(GraphQLString) },
    screenSize: { type: new GraphQLList(GraphQLString) },
    RAM: { type: new GraphQLList(GraphQLString) },
    hardDrive: { type: new GraphQLList(GraphQLString) },
    graphics: { type: new GraphQLList(GraphQLString) },
  })
});

const CLListingType = new GraphQLObjectType({
  name: 'Listing',
  description: 'A representation of elastic search listing',
  fields: () => ({
    postId: { type: GraphQLString },
    postDate: { type: GraphQLString },
    postingUrl: { type: GraphQLString },
    title: { type: GraphQLString },
    price: { type: GraphQLInt },
    cityName: { type: GraphQLString },
    imageUrls: { type: new GraphQLList(GraphQLString) }, //since it is an array you need to make it a constructo functioin for list and pass it graphqlstrings
    attributes: { type: new GraphQLList(GraphQLString) },
    location: { type: Coords },
    condition: { type: GraphQLInt },
    postId: { type: GraphQLString },
    postingUrl: { type: GraphQLString },
    postDate: { type: GraphQLString },
    updateDate: {type: GraphQLString },
    attributes: { type: new GraphQLList(GraphQLString) },
    sellerUrl: { type: GraphQLString },
    sellerName: { type: GraphQLString },
    sellerPhoneNumber: { type: GraphQLString },
    sellerEmail: { type: GraphQLString },
    specs: { type: Spec },
    description: { type: GraphQLString },
  })
});

const HitsMetaData = new GraphQLObjectType({
  name: 'HitsMetaData',
  description: 'Meta data associated with a search',
  fields: () => ({
    total: { type: GraphQLInt },
    maxScore: {type: GraphQLFloat },
    timedOut: {type: GraphQLBoolean }
  })
});

const CLListingsHitResult = new GraphQLObjectType({
  name: 'ListingsHitResult',
  description: 'Representaiton of a complete elastic search listing result',
  fields: () => ({
    metaData: {type: HitsMetaData},
    results: {type: new GraphQLList(CLListingType)}
  })
});

const CityCoordinates = new GraphQLObjectType({
  name: 'CityCoordinates',
  description: 'Latitude and longitude for a city',
  fields: () => ({
    cityName: {type: GraphQLString},
    state: {type: GraphQLString},
    lat: {type: GraphQLFloat},
    long: {type: GraphQLFloat},
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query for graphql endpoint',
  fields: () => ({
    craigslist: {
      type: CLListingsHitResult,
      description: 'Keyword query to search',
      args: {
        query: {
          type: GraphQLString,
          description: 'Searches title for keywords separated by spaces'
        },
        descQuery: {
          type: GraphQLString,
          description: 'Searches description for keywords separated by spaces'
        },
        size: {
          type: GraphQLInt,
          description: 'The number of results to return'
        },
        from: {
          type: GraphQLInt,
          description: 'The starting point of the results to return'
        },
        priceRange: {
          type: new GraphQLList(GraphQLInt),
          description: 'Price range',
        },
        conditionRange: {
          type: new GraphQLList(GraphQLInt),
          description: 'Condition Range (0-5)',
        }
      },
      resolve: async (_, args) => {
        let request;
        try {
          let should = [];
          if (args.query) should.push({"match": {"title": args.query}});
          if (args.descQuery) should.push({"match": {"description": args.query}});
          let must = [
            {"exists": {"field": "imageUrls"}},
            {"exists": {"field": "location.lat"}},
            {"exists": {"field": "location.lon"}},
            {"exists": {"field": "price"}},
          ];
          if (args.conditionRange && args.conditionRange.length === 2) {
            must.push({"range": {"condition": {"from": args.conditionRange[0], "to": args.conditionRange[1]}}})
          }
          if (args.priceRange && args.priceRange.length === 2) {
            must.push({"range": {"price": {"from": args.priceRange[0], "to": args.priceRange[1]}}})
          }
          let postReq = {
            'query': {
              'bool': {
                should,
                must,
                'minimum_should_match': '60%',
              }
            }
          };

          if (args.size) { postReq.size = args.size; }
          if (args.from) { postReq.from = args.from; }

          request = await axios.post(config.ELASTIC_SEARCH_URI + '/cl/listing/_search?pretty', postReq);
        } catch(error) {
          console.error('NonFatal: ' + error);
        }
        let results = request.data.hits.hits.map(listing => listing._source);
        results.map(listing => {
          listing.specs.screenSize = listing.specs['Screen Size'];
          listing.specs.year = listing.specs['Year'];
          listing.specs.processor = listing.specs['Processor'];
          listing.specs.hardDrive = listing.specs['Hard Drive'];
          listing.specs.graphics = listing.specs['Graphics'];
          return listing;
        });
        let listingsHitResult = {
          metaData: {
            total: request.data.hits.total,
            maxScore: request.data.hits.max_score,
            timedOut: request.data.timed_out
          },
          results
        };
        return listingsHitResult;
      }
    },

    cities: {
      type: new GraphQLList(CityCoordinates),
      description: 'Returns all suported cities',
      args: {},
      resolve: _ => [
        {
          cityName: 'San Francisco',
          state: 'CA',
          lat: 37.783591,
          long: -122.408949,
        },
        {
          cityName: 'New York',
          state: 'NY',
          lat: 40.731815,
          long: -73.992933,
        },
        {
          cityName: 'Chicago',
          state: 'IL',
          lat: 41.872881,
          long: -87.665966,
        },
        {
          cityName: 'Phoenix',
          state: 'AZ',
          lat: 33.479618,
          long: -112.091034,
        }
      ]
    },

    amazon: {
      type: new GraphQLList(GraphQLString),
      description: 'List of amazon products',
      args: {
        query: {
          type: GraphQLString,
          description: 'Keywords to search on Amazon'
        },
        SearchIndex: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The category to search for, see following link for list of categories: http://docs.aws.amazon.com/AWSECommerceService/latest/DG/localevalues.html'
        },
        Brand: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        let allResults = [];
        let requests = [];

        // Batch 10 searches to get 10 amazon result pages
        for (let i = 1; i <= 10; i++) {
          let searchOpts = {
            SearchIndex: args.SearchIndex,
            Keywords: args.query,
            ResponseGroup: 'ItemAttributes',
            ItemPage: i,
          };
          if (args.Brand) searchOpts.brand = args.Brand;
          requests.push(amazonSearch.itemSearch(searchOpts));
        }

        // Execute search requests in parralel
        let datas;
        try {
          datas = await Promise.all(requests);
        } catch (error) {
          console.error('NonFatal: ', error);
        }

        // Return flattened URLS
        return flatten(datas.map(data =>
          data[0].Item.map(item =>
            item.DetailPageURL[0].split('%3FSubscription')[0])));
      }
    }
  })
});

const schema = new GraphQLSchema({ query: Query });

module.exports = schema;

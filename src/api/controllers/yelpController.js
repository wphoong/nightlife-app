

const Yelp = require('node-yelp-api-v3');

const YelpController = () => {
  const yelp = new Yelp({
	  consumer_key: process.env.YELP_CLIENT_ID,
	  consumer_secret: process.env.YELP_API_SECRET,
  });

  yelp.searchBusiness({ location: 'los angeles' })
    .then(results => console.log(results));
};

export default YelpController;

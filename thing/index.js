module.exports = function(context, request) {
  const rpn = require('request-promise-native');
  let things = [];
  
  Promise.all([rpn('https://swapi.co/api/planets'), rpn('https://swapi.co/api/people')])
    .then(thingArrays => {
      let planetsResponse = JSON.parse(thingArrays[0]);
      let peopleResponse = JSON.parse(thingArrays[1]);
      let planets = planetsResponse.results.map(planet => planet.name);
      let people = peopleResponse.results.map(people => people.name);
      things = [].concat(planets, people);
      context.res = { body: things };
      context.done();
    })
    .catch(err => {
      context.log('something went wrong');
      context.log.error(err);
      context.res = {status:500, body:err}
      context.done();
    });
  
};

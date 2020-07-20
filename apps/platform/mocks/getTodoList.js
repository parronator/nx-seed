/* eslint-disable-next-line */
var g = require('dyson-generators');

const example = [
  {
    id: g.id(),
    text: g.lorem.short(),
    completed: false,
  },
];

module.exports = {
  path: '/api/v1/todos',
  method: 'GET',
  status: (req, res, next) => {
    res.status(200);
    res.send(example);
  },
};

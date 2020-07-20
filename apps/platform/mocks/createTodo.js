/* eslint-disable-next-line */
var g = require('dyson-generators');

const example = {
  id: g.id(),
  text: g.lorem.short(),
  completed: false,
};

module.exports = {
  path: '/api/v1/todos',
  method: 'POST',
  status: (req, res, next) => {
    res.status(200);
    console.log(req.body)

    res.send({...example, text: req.body.text});
  },
};

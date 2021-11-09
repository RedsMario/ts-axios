import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get?',
  params: {
    a: 1,
    b: 2,
    foo: ['bar', 'haha'],
    date: new Date(),
    form: {
      user: 'mario'
    },
    str: '@'
  }
})






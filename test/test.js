'use strict'
let assert = require('assert')
let AwsTest = require('aws-lambda-testing')
let awsTest = new AwsTest() // you can pass a handler.
let handler = require('../index').handler
describe('test to lambda request', function () {
  it('should obtain the events', function (done) {
    awsTest.addHandler(handler)
        .call({
          key: '1d1b3e62755f203360545da40424f2',
          zip: 10704
        }, function (error, res) {
          assert(!error)
          assert(res.length)
        })
        .then(done)
        .catch(done)
  })
  it('the error code is throw if key is not given ', function (done) {
    awsTest.addHandler(handler)
        .call({
          zip: 10704
        }, function (error, res) { // The call function can receive the params and callback
          assert(!error)
          assert(res.code === 'not_authorized')
        })
        .then(done)
        .catch(done)
  })

  it('if city var is given obtain the correct result', function (done) {
    awsTest.addHandler(handler)
        .call({
          key: '1d1b3e62755f203360545da40424f2',
          city: 'New York',
          state: 'NY',
          country: 'us'
        }, function (error, res) {
          assert(!error)
          assert(res)
        })
        .then(done)
        .catch(done)
  })
})

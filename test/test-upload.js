var fs = require("fs");
var request = require('request');
var httpUtils = require('request-mocha')(request);
var expect = require("chai").expect;
var assert = require('chai').assert;

describe('Read line by line from file and combined two string combination and return match from same file', () => {
  describe('#fetchCombinedWords()', () => {
    var readStream = fs.createReadStream("./test_file.txt.txt");
    var options = {
      method: 'POST',
      url: 'http://localhost:3000/api/upload',
      headers:
        {
          'cache-control': 'no-cache',
          'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        },
      formData:
        {
          dict_file:
            {
              value: readStream,
              options: { filename: 'test_file.txt.txt', contentType: null }
            }
        }
    };

    httpUtils.save(options);
    it('should return { data: [ "chicken", "postman" ] }', function () {
      testObject = {
        data: ['chicken', 'postman']
      };
      expect(this.err).to.equal(null);
      expect(this.res.statusCode).to.equal(200);
      expect(JSON.parse(this.body)).to.have.property("data");
      assert.deepEqual(JSON.parse(this.body), testObject);
    });
  });
});


var expect = require('chai').expect;
var chai = require('chai'), chaiHttp = require('chai-http');
var expect = chai.expect;
const app = require("../src/routes.js");


chai.use(chaiHttp);

let userToken = '';

describe('Discovery', function () {
    let userToken = null;
    it('Get Basic Token', function (done) { // <= Pass in done callback
        chai.request(app)
            .get('/token')
            .end(function (err, res) {
                userToken = res.body.token
                expect(userToken).to.not.be.empty;
                done();                               // <= Call done to signal callback end
            });
    });

    it('Get Recs (Seed: Tool)', function (done) { // <= Pass in done callback
        const data = {
            '_method': 'post',
            token: userToken,
            artist: 'tool',
            filters: {
                tempo: .5,
                popularity: .5,
                energy: .5,
                mood: .5,
                vocals: .5,
                danceability: .5
            },
            location: {
                city: 'New York',
                state: 'NY'
            }
        }

        chai.request(app)
            .post('/search')
            .send(data)
            .end(function (err, res) {
                expect(res.body[0]).to.have.all.keys(
                    "album",
                    "artists",
                    "available_markets",
                    "disc_number",
                    "duration_ms",
                    "explicit",
                    "external_ids",
                    "external_urls",
                    "href",
                    "id",
                    "is_local",
                    "name",
                    "popularity",
                    "preview_url",
                    "track_number",
                    "type",
                    "uri")
            });
        done()
    }).timeout(5000);

    it('gets nearby artists', function (done) { // <= Pass in done callback
        const data = {
            '_method': 'post',
            token: userToken,
            location: 'new york',
        }

        chai.request(app)
            .post('/nearby')
            .send(data)
            .end(function (err, res) {
                expect(res.body.events[0]).to.have.all.keys(
                    "artist",
                    "event",
                    "tracks",
                )
                done();
            });
    }).timeout(5000000);
})

describe('Analytics', function () {
    it('top song', function (done) {
        chai.request(app)
            .post('/topSong')
            .end(function (err, res) {
                expect(res.body).to.be.a('object');
                done();
            });
    }).timeout(5000);

    it('monthly artist', function (done) {
        chai.request(app)
            .post('/monthlyArtist')
            .end(function (err, res) {
                expect(res.body).to.be.a('object');
                done();
            });
    }).timeout(5000);
})
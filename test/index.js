var should = require('chai').should(),
    dracula = require('../index'),
    analyze = dracula.analyze,
    score = dracula.score

describe('#analyze', function() {
    it('Should think "terror" is bad news', function() {
        analyze("terror").should.equal("negative");
    });

    it('Should think "puppies" are good news', function() {
        analyze('puppies').should.equal("positive");
    });

    it('Should be able to pick up on this negativity here', function() {
        analyze('he\'s been saying really negative things about me').should.equal("negative");
    });
});

describe('#score', function() {
    it('Should think "terrorism" is generally negative', function() {
        var scores = score("terrorism");
        scores[0].should.above(scores[1]);
        scores[0].should.above(scores[2]);
    });
});

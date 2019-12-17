const chai = require('chai'); 
const chaiHTTP = require('chai-http');
const { URLMappingModel } = require('../model');
const { generateID } = require('../uid');
const app = require('../index');

chai.use(chaiHTTP); 
chai.should(); 

const HelperObject = Object.freeze({
    FIRST_URL: `https://www.${generateID()}testing${generateID()}.com`, 
    DUPLICATION_TEST_URL: `https://www.${generateID()}testing${generateID()}.us`, 
    REDIRECT_TEST : {
        UID: generateID(),
        HREF: `https://www.${generateID()}testing${generateID()}.ca`
    }
});

before(async () => {
    try {
         console.log('Pre Test Processing: Cleaning Up Data and Creating Link')
         const urlMapping = new URLMappingModel({ uid: HelperObject.REDIRECT_TEST.UID , href: HelperObject.REDIRECT_TEST.HREF });
         await urlMapping.save();
         await URLMappingModel.findOneAndDelete({ href: HelperObject.FIRST_URL }).exec();
         await URLMappingModel.findOneAndDelete({ href: HelperObject.SECOND_URL }).exec();
         await URLMappingModel.findOneAndDelete({ href: HelperObject.DUPLICATION_TEST_URL }).exec(); 
    } catch (error) {
        console.log(error.message)
    }
 });

after(async () => {
   try {
        console.log('Post Test Processing: Cleaning Up Data')
        await URLMappingModel.findOneAndDelete({ href: HelperObject.FIRST_URL }).exec();
        await URLMappingModel.findOneAndDelete({ href: HelperObject.SECOND_URL }).exec();
        await URLMappingModel.findOneAndDelete({ href: HelperObject.DUPLICATION_TEST_URL }).exec();
        await URLMappingModel.findOneAndDelete({ uid: HelperObject.REDIRECT_TEST.UID , href: HelperObject.REDIRECT_TEST.HREF }).exec();  
   } catch (error) {
       console.log(error.message)
   }
});

describe('URL Shortener Tests', () => {
    it('Should generate a link', (done) => {
        chai.request(app)
        .post('/shorten')
        .send({ href: HelperObject.FIRST_URL  })
        .end((error, res) => {
            if (error) console.log(error.message);
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.include.keys("href");
        });
        done();
    });

    it('Should generate a link', (done) => {
        chai.request(app)
        .post('/shorten')
        .send({ href: HelperObject.DUPLICATION_TEST_URL  })
        .end((error, res) => {
            if (error) console.log(error.message);
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.include.keys("href");
        });
        done();
    });

    it('Should pull pre generated link', (done) => {
        chai.request(app)
        .post('/shorten')
        .send({ href: HelperObject.DUPLICATION_TEST_URL  })
        .end((error, res) => {
            if (error) console.log(error.message);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.include.keys("href");
        });
        done();
    });
    
    it('Should fetch the main page', (done) => {
        chai.request(app)
        .get('/')
        .end((error, res) => {
            if (error) console.log(error.message);
            res.should.have.status(200);
        });
        done();
    });

    it('Should successfully attempt redirect', (done) => {
        chai.request(app)
        .get(`/${HelperObject.REDIRECT_TEST.UID}`)
        .end((error, res) => {
            if (error) console.log(error.message);
            res.should.have.status(200);
        });
        done();
    });

});
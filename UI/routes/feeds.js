var express = require('express');
var router = express.Router();
var webApiUrl = 'http://localhost/FeedApi';
var request = require('request');
// Request API : https://www.npmjs.com/package/request

router.post('/feeds', function(req, res, next) {
    request.post({
        url: webApiUrl + '/api/Feed',  
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
        }, function(error, response, body)
        {
            if(error) {
                console.error('Error occurred:', error);
                return next(error);
            }
        res.sendStatus(200);
    });
});

router.put('/teams/:teamName', function(req, res, next) {
	delete req.body._id;
});

router.delete('/feeds/:feedName', function(req, res, next) {
    request.del(webApiUrl + '/api/Feed/' + req.params.feedName, function(error, response, body){
       if(error) {
           return next(error);
       }
       res.sendStatus(200); 
    });
})

router.get('/feeds/:feedName', function(req, res, next) {
    request.get(webApiUrl + '/api/Feed/' + req.params.feedName, { headers: {
        'Content-Type': 'application/json'
    }}, function(error, response, body)
    {
        if(error) {
			return next(error);
		}
       
        res.send(body);
    });
});

router.get('/feeds/:feedName/:index', function(req, res, next) {
    request.get(webApiUrl + '/api/Feed/' + req.params.feedName + '/' + req.params.index, function(error, response, body)
    {
        res.json(body);
    });
});

router.get('/feeds', function(req, res, next) {
    request.get(webApiUrl + '/api/Feed', { headers: {
        'Content-Type': 'application/json'
    }}, function(error, response, body)
    {
        if(error) {
			return next(error);
		}
        
        res.send(body);
    });
});

router.get('/', function(req, res, next) {
    res.redirect('/feeds');
})

module.exports = router;
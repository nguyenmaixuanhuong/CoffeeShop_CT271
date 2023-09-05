class SiteControler{

    // GET /
    home(req,res){
        res.render('home');
    }

    abouts(req,res){
        res.render('abouts');
    }
}


module.exports = new SiteControler;
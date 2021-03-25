exports.get404 = (req, res, next) => {
    res.status(404).render('404page',{ pageTitle:'Page not Found', path:'/404',isAuthenticated:req.isLoggedin})
    ///ffff
}
const fs = require('fs');
const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if(url ==='/') {
        res.write('<html>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
       return res.end();
     }
     if(url ==='/message' && method==='POST') {
        fs.writeFileSync('message.txt','DUMMY');
        res.statusCode= 302;
        res.setHeader('Location','/');
        return res.end();
     }
     res.write('<html>');
     res.write('<h1>Welcome to my homepage</h1>');
     res.write('</html>');
     res.end();
     
};
module.exports = requestHandler;
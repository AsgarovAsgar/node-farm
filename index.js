const fs = require('fs') // file system
const http = require('http')
const url = require('url')

////////////////////
// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn);

// const textOut = `Info about Avocado: ${textIn} \nCreated at: ${new Date()}`
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('doc created');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if(err) return console.log('Error! ', err);
//   console.log(data1);
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file has been written');
//       })
//     })
//   })
// })

// console.log('will read file');

/////////////////
// SERVER

const server = http.createServer((req, res) => {
  const pathName = req.url

  if(pathName === '/overview') {
    res.end('this is overview')
  } else if(pathName === '/product') {
    res.end('this is product')
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    })
    res.end('not found')
  }

})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listen to req on port 8000');
})


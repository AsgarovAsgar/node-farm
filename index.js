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

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{{productName}}/g, product.productName)
  output = output.replace(/{{image}}/g, product.image)
  output = output.replace(/{{price}}/g, product.price)
  output = output.replace(/{{from}}/g, product.from)
  output = output.replace(/{{nutrients}}/g, product.nutrients)
  output = output.replace(/{{quantity}}/g, product.quantity)
  output = output.replace(/{{description}}/g, product.description)
  output = output.replace(/{{id}}/g, product.id)

  if(!product.organic) output = output.replace(/{{notOrganic}}/g, 'not-organic')
  return output
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`)
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true)

  // overview page
  if(pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' })

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
    console.log(cardsHtml);

    const output = tempOverview.replace('{{productCards}}', cardsHtml)
    
    res.end(output)

  // product page
  } else if(pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' })
    const product = dataObj[query.id]
    const output = replaceTemplate(tempProduct, product)

    res.end(output)

    // api
  } else if(pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(data)

    // 404 page
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    })
    res.end('not found')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listen to the request on port 8000');
})


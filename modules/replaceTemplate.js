module.exports = (temp, product) => {
  let output = temp.replace(/{{productName}}/g, product.productName)
  output = output.replace(/{{image}}/g, product.image)
  output = output.replace(/{{price}}/g, product.price)
  output = output.replace(/{{from}}/g, product.from)
  output = output.replace(/{{nutrients}}/g, product.nutrients)
  output = output.replace(/{{quantity}}/g, product.quantity)
  output = output.replace(/{{description}}/g, product.description)
  output = output.replace(/{{id}}/g, product.id)
  output = output.replace(/{{slug}}/g, product.slug)

  if(!product.organic) output = output.replace(/{{notOrganic}}/g, 'not-organic')
  return output
}
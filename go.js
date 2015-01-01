var GOforGene = require('./go_gene_annotation.js')

GOforGene("FBgn0262139","FB", function (err, list) {
  if (err) return console.error('Something went wrong here: ', err)

  list.forEach(function (annotation) {
	console.log(annotation)
  })
})
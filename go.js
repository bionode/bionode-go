var GOforGene = require('./go_gene_annotation.js')

GOforGene.write({
  geneID: 'FBgn0262139',
  dbName: 'FB'
})

GOforGene
.on('data', console.log)
.on('error', function (err) {
  return console.error('Something went wrong here: ', err)
})

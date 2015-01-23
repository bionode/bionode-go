// demoes how GO annotation can be retrieved

// load the relevant module
var GOquery = require('./lib/go_gene_annotation.js')

// initiate contact to GO MySQL server at EBI
GOquery.start_session();

// ask for a fly ("FB") gene
GOquery.direct_annotation.write({
  geneID: 'FBgn0262139',
  dbName: 'FB'
})

// retrieve annotation
GOquery.direct_annotation
.on('data', console.log)
.on('error', function (err) {
  return console.error('Something went wrong here: ', err)
})

// how to efficiently query for many genes
// NOTE: this still needs implementing: collate a few genes before firing up a query with all
// with parameters determined in maxBatchTimeout and maxBatchSize (go_gene_annotation.js)
var seriesOfGenesfromFB = ['FBgn0262139','FBgn0003720','FBgn0001077','FBgn0000166','FBgn0003866','FBgn0011655','FBgn0024250','FBgn0001150','FBgn0004915','FBgn0040765','FBgn0003900','FBgn0000028','FBgn0000099']; // 14 genes
var seriesofGenesDB = 'FB';

for (i = 0; i < seriesOfGenesfromFB.length; i++) { 
  GOquery.direct_annotation.write({
  geneID: seriesOfGenesfromFB[i],
  dbName: seriesofGenesDB
  })
}

GOquery.direct_annotation
.on('data', console.log)
.on('error', function (err) {
  return console.error('Something went wrong here: ', err)
})

// disconnect from the EBI database
GOquery.end_session();
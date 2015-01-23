var through    = require('through2');
var mysql      = require('mysql');
var connection = undefined;
var maxBatchTimeout = 1000;
var maxBatchSize = 20; 

var GO = exports

// call this function to initiate a database connection with the public server at EBI
// set different batch query options where needed.
GO.start_session = function(fastOptions) {
	connection = mysql.createConnection({
	    host     : 'mysql.ebi.ac.uk',
	    user     : 'go_select',
	    database : 'go_latest',
	    password : 'amigo',
	    port     : 4085
	  });
	connection.connect();
}

// call this function for good practice to formally end the database connection
GO.end_session = function () {
	connection.end();
} 

// call this function with a geneID and source DB for getting all direct gene annotations
// http://amigo.geneontology.org/goose provides some more help until I get around to full doc
GO.direct_annotation = through.obj(function transform(obj, enc, next) {
  var self = this;
	connection.query("SELECT gene_product.symbol, gene_product.full_name, dbxref.xref_dbname, dbxref.xref_key, species.genus, species.species, association.is_not, evidence.code, term.acc, term.name FROM gene_product INNER JOIN dbxref ON (gene_product.dbxref_id=dbxref.id) INNER JOIN species ON (gene_product.species_id=species.id) INNER JOIN association ON (gene_product.id=association.gene_product_id) INNER JOIN evidence ON (association.id=evidence.association_id) INNER JOIN term ON (association.term_id=term.id) WHERE dbxref.xref_key = '"+obj.geneID+"' AND dbxref.xref_dbname = '"+obj.dbName+"';", function(err, rows, fields) {
    if (err) return self.emit('error', err);
    rows.forEach(function(row) {
      self.push(row);
      //console.log('The solution is: ', rows[0]);
    });
  });
  next();
})
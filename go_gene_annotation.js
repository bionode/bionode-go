var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'mysql.ebi.ac.uk',
  user     : 'go_select',
  database : 'go_latest',
  password : 'amigo',
  port     : 4085
});

module.exports = function ( geneID, dbName, callback ) {
	connection.connect();

	connection.query("SELECT gene_product.symbol, gene_product.full_name, dbxref.xref_dbname, dbxref.xref_key, species.genus, species.species, association.is_not, evidence.code, term.acc, term.name FROM gene_product INNER JOIN dbxref ON (gene_product.dbxref_id=dbxref.id) INNER JOIN species ON (gene_product.species_id=species.id) INNER JOIN association ON (gene_product.id=association.gene_product_id) INNER JOIN evidence ON (association.id=evidence.association_id) INNER JOIN term ON (association.term_id=term.id) WHERE dbxref.xref_key = '"+geneID+"' AND dbxref.xref_dbname = '"+dbName+"';", function(err, rows, fields) {
	  if (err) return callback(err);

	  callback(null, rows)
	  //console.log('The solution is: ', rows[0]);
	});

	connection.end();
}
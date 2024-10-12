const sql =require("mssql/msnodesqlv8")
var config = {
    server : "DESKTOP-8SDOTK9\\SQLEXPRESS",
    database:"testdb",
    driver:"msnodesqlv8",
    options:{
        trustedconnection:true
    }
}

sql.connect(config,function(err){
    if(err)console.log(err);
    var request  = new sql.Request();
    request.query("SELECT * FROM testtable", function(err, recordset) {
        if (err) console.log(err);
        else console.log(records);
})
})
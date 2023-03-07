const mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node",
});

conn.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("mysql connected");
});

const storeData = function (req, res) {
  console.log("controller is coming hre r",req.body);
 
  const { name, email, password } = req.body;
  var sql = `insert into users(user_name,user_email,user_password) values('${name}','${email}','${password}')`;
  conn.query(sql, function (err, result) {
    if (err) {
      console.log("error occured while storing data in mysql");
    } else {
      res.send({ msg: "data is saved in my sql", data: result });
    }
  });
};


const displayData = function (req,res){
     var displayquery = 'select * from users';

     conn.query(displayquery,function(err,result){
      if(err){
        res.send({ msg :"erro while display"})
      }else{
        res.send({msg : "data received" , data : result})
      }
     })
};


const deleteData = function(req,res){
    let id = req.params.id;
   //let id = "3"
    console.log(id)
    var deletedata = `delete from users where user_id = '${id}'`;

    conn.query(deletedata,function(err,result){
      if(err){res.send({msg :"error while delete",error : err})}
      else{
        if(result.affectedRows == 0){ return res.send({msg : 'this record is already deleted'})}
        res.send({msg : 'record deleted successfully',data : result})
      }
    })
}

const updateData = function(req,res){
  const {name , email, password} = req.body;
  let id = req.params.id
  console.log(id)
   var updatedata = `select * from users where user_id ='${id}'`
    
    conn.query(updatedata,function(err,result){
      if(err) {
        return res.send({msg : "error is occured", msg : err})
      }else{
        if(result.length == 0){ return res.send({msg : 'no data found to update in data base'})}
        else{

          var sql = `update users set user_name='${name}',user_email='${email}',user_password='${password}'`
          conn.query(sql,function(err,result){
            if(err) return res.send({msg : "error occured",er : err})
            else return res.send({msg : "data updated", data : result})
          })
        }
      }
    })

  }


module.exports = { storeData,displayData,deleteData ,updateData};

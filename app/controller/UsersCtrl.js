class UsersCtrl{

  constructor(){
    this.users=require('../app').getTable('users');
    
  }
  
   login (request, response) { 
    const sha1=require('sha1')
   this.users.login([request.body.username,sha1(request.body.password)],(row)=>{
      if(row !==null){
        request.session.userId=row.id;
        response.json(true);
      }else{
        response.json([false]);
      }
    });
   }//END login

   logged(request,response){
     let bool=request.session.userId !==undefined
     response.json(bool);
   }

   logout(request, response) {
    request.session.userId=undefined;
    response.json();
   }

   getUserId(request,response){
     response.json({'id':request.session.userId});
   }

   passwordCheck(request,response){
     const sha1=require('sha1')
    this.users.findPass(request.body.id,sha1(request.body.password),(row)=>{
      let bool=row !==null;
      response.json(bool);
  })
   }

   usernameChange(request, response) { 
    this.users.update(request.body.id,{'username':request.body.username});
    response.json();
   }

   passwordChange(request, response) { 
    const sha1=require('sha1')
    this.users.update(request.body.id,{'password':sha1(request.body.password)})
  response.json(); 
  }

}
module.exports = new UsersCtrl();
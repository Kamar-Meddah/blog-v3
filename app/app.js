class app{//Begin Class

     static getInstance(){
         if(this.instance === undefined){
             this.instance = new app();
         }
         return this.instance;
     }

     getDb(){
         
        if(this.DB=== undefined){
            const dbConnect=require('../core/database/SqlDB');
            this.DB=new dbConnect(require('../config/dbconfig'));
        }
        return this.DB.getDbConnect();
    }

    getTable(name){
        let n=name+'Table';
        return require('./table/'+n);
    }

    getDbAuth(){
        
       if(this.dbAuth=== undefined){
           const auth=require('../core/admin/dbAuth');
           this.dbAuth=new auth();
       }
       return this.dbAuth;
   }

}//END Class
module.exports=app.getInstance();
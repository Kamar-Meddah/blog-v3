const table = require('../../core/table/table');
class imagesTable extends table{

    constructor(){
        super();
        this.tab='images';
    }

   
   findImg(id,cb){
       this[this.tab].findAll({where:{"articlesId":id}}).then((res)=>{
           cb(res)
       })
    }

    deleteWithArticle(id,cb=null){
        this[this.tab].destroy({where:{"articlesId":id}}).then(res=>{
            if(cb !== null){
                cb();
            }
        })

    }
}

module.exports=new imagesTable();
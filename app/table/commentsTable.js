const table = require('../../core/table/table');

class commentsTable extends table{

    constructor(){
        super();
        this.tab='comments';
    }

    find(id,cb){
        this[this.tab].findAll({where:{"articleId":id},order: [['date', 'DESC']]}).then(res=>{
            cb(res)
        })
    }

    deleteCom(id,cb=null){
        this[this.tab].destroy({where:{"articleId":id}}).then(res=>{
            if(cb !== null){
                cb();
            }
        })
    }

}

module.exports=new commentsTable();
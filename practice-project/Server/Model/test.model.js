

const Datas = new Map()

let id = 0

const Data = {
        id:id,
        title:'Hello There ',
    }
   

Datas.set(Data.id , Data);



function IdExist(id){
    return Datas.has(id)
}

function getAllTest(){
    return Array.from(Datas.values());
}

function addNewTest(test){
    id ++ ;
    Datas.set(id , Object.assign(test,{
        id:id,
    }));  
}

function deleteTest (id){
    Datas.delete(id)

}


module.exports = {getAllTest,addNewTest,deleteTest};
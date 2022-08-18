const fs = require('fs');

class Contenedor {
    constructor (ruta){
        this.ruta = ruta
    }
   async save(obj){
        const objs = await this.getAll();
        let newId;

        if (objs.length == 0){
            newId = 1;
        }else {
            newId = objs[objs.length - 1].id + 1;
        }

        const newObj ={...obj , id: newId}
        objs.push (newObj);
        try {
           await fs.writeFile(this.ruta, JSON.stringify(objs,null,2));
            return newId
        } catch (error) {
            throw new Error (`Error al guardar:${error}`);
        }
    }
    async getById(id) {
        const objs = await this.getAll();
        const obj = objs.find(x => x.id == id);
        return obj;
    }
    async getAll(){
        try {
            const objs = await fs.readFile(this.ruta,'utf-8');
            return JSON.parse(objs);
            
        } catch (error) {
            return []
        }
    }    
    async deleteById(id){
        let collection = []
        await fs.readFile(`./${this.ruta}`,'utf-8')
        .then( contenido => {
            let col = JSON.parse(contenido)
            for (const ob of col) {
                if(ob.id != id) {
                    collection.push(ob)
                }
            }
        })
        .catch( err => console.log(err));
        await fs.writeFile(`./${this.ruta}`, JSON.stringify(collection));
        console.log('Objeto eliminado!');
    }   
    async deleteAll(){
        try{
            await fs.writeFile(`./${this.ruta}`, '');
        } catch (error) {
            throw new Error (` falla: ${error}`);    
        }
    }
    async update(id , update){

        try {
            const lista = await this.getAll();
            const producto =  await this.getById(id)
            const Objeto = lista.findIndex( e => e.id == id);
            producto.title = update.title;
            producto.price = update.price;
            producto.thumbnail = update.thumbnail;
            lista.splice(Objeto , 1 , producto)
            await this.deleteAll();
            await fs.writeFile(`./${this.ruta}`, JSON.stringify(lista));
            return producto
        } catch (error) {
            throw new Error (`error: ${error}`);  
        }
   }
}
module.exports = Contenedor
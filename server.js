const express = require("express");
const Contenedor = require('./contenedor');
const {Router} = express;
const app = express();
const productos = Router();
const index = require ('./src/index')

app.use(express.static('./Public'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const contenedor = new Contenedor('productos.txt');
const Get = async (req, res) =>{
    try{
      const productos = await contenedor.getAll()
      res.json({productos:productos});
    } catch (error) {
        res.send(`Error  ${error}`)
    }
  }
  const GetById = async (req, res) =>{
    try{
         let id = req.params.id
         const productoEncontrado = await contenedor.getById(id)
          if( !productoEncontrado ){
              return res.status(400).json({
                error : 'No encontro'
            });
          }
          res.json({producto:productoEncontrado });
        } catch (error) {
           return res.send(error)
    }
  }
  const Delete = async (req, res) =>{
    try{
          let id = req.params.id
          const productoEliminado = contenedor.deleteById(id)
          res.json({producto: productoEliminado})
        }catch (error) {
              return res.send(error)
    }
  }
  const Put = async (req, res) =>{
    try{
      let id = req.params.id 
      const { producto } = req.body;
      const Actualizado = await contenedor.updateById(id , producto)       
      res.json({producto: Actualizado})     
        }catch (error) {
              return res.send(error)
    }
  }
  const Post = async (req, res) =>{
      try{
        const { title, price, thumbnail } = req.body;         
        const productoNuevo = {
          title,
          price,
          thumbnail
        }  
        await contenedor.save(productoNuevo)  
        res.json({productos : productoNuevo})
          }catch (error) {
                return res.send(error)
      }
    }

productos.get( '/', Get );
productos.get('/:id', GetById );
productos.post( '/', Post ); 
productos.put('/:id', Put); 
productos.delete('/:id', Delete);

app.use('/api/productos',productos);
app.use('/',index);

const PORT = 8080
const server = app.listen(PORT, () =>{
console.log(`Servidor funcionando en http://localhost:8080`);
});
server.on('error', (err)=> console.log(err));
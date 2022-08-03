const Contenedor =require('./subcontenedor');

const p1 =    {
    "title": "pelota",
    "price": 500,
    "id": 1
  }
 const p2 =    {
    "title": "remera",
    "price": 750,
    "id": 2
}
  
  const p3 =   {
    "title": "gorra",
    "price": 200,
    "id": 3
  }

  const p4 = {
    "title": "zapatilla",
    "price": 1200,
    "id": 4
  }
  const main = async () => {

     const contenedor = new Contenedor('./productos.txt');
     console.log("Mostrando Productos")
     let objs =  await contenedor.getAll();
     console.log(objs)

     console.log("GUARDO PRODUCTO 1")
     let idp1 = await contenedor.save(p1)
     console.log("id de p1:" ,idp1)

     console.log("GUARDO PRODUCTO 2")
     let idp2 = await contenedor.save(p2)
     console.log("id de p2:" ,idp2)
   
     console.log("GUARDO PRODUCTO 3")
     let idp3 = await contenedor.save(p3);
     console.log("id de p3:" ,idp3)

     console.log("Mostrando Productos")
     objs =  await contenedor.getAll();
     console.log(objs)

      console.log("BUSCANDO POR ID")
      const res = await contenedor.getById(idp1);   
      console.log("res",res);

      console.log("ELIMINANDO POR ID")
      objs =  await contenedor.deleteById(1);


     console.log("ELIMINANDO TODO")
     objs =  await contenedor.deleteAll();
}

main ()
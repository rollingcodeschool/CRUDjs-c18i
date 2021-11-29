import {campoRequerido, validarNumeros, validarURL, validarGeneral} from './validaciones.js'
import {Producto} from './productoClass.js'

// agregar eventos a los elementos del formulario
let campoCodigo = document.querySelector('#codigo');
let campoProducto = document.querySelector('#producto');
let campoDescripcion = document.querySelector('#descripcion');
let campoCantidad = document.querySelector('#cantidad');
let campoURL = document.querySelector('#url');
let formularioProducto = document.querySelector('#formProducto');
// lista de productos
let listaProductos = JSON.parse(localStorage.getItem('listaProductosKey')) || [];
let productoExistente = false; //si productoExistente=false quiero crear un nuevo producto, caso contrario quiero modificar
let btnAgregar = document.querySelector('#btnAgregar');

campoCodigo.addEventListener('blur', () => { campoRequerido(campoCodigo)});
campoProducto.addEventListener('blur', ()=> { campoRequerido(campoProducto)});
campoDescripcion.addEventListener('blur', ()=>{ campoRequerido(campoDescripcion)})
campoCantidad.addEventListener('blur',()=>{ validarNumeros(campoCantidad)});
campoURL.addEventListener('blur', ()=>{validarURL(campoURL)});
formularioProducto.addEventListener('submit', guardarProducto);
btnAgregar.addEventListener('click', limpiarFormulario)

//llamar a la funcion cargaInicial
cargaInicial();

function guardarProducto(e){
    e.preventDefault()
    // validar los campos del formulario
    if(validarGeneral(campoCodigo, campoProducto, campoDescripcion,campoCantidad, campoURL)){
        if(productoExistente == false){
            // caso 1: agregar o crear un producto
            crearProducto();
        }else{
            // caso 2: el usuario quiere editar un producto
            modificarProducto();
        }      
    }
}


function crearProducto(){
    console.log('aqui creo el producto')
    // crear el objeto producto
    let productoNuevo = new Producto(campoCodigo.value, campoProducto.value, campoDescripcion.value, campoCantidad.value, campoURL.value);
    console.log(productoNuevo);
    // guardar el producto creado en el arreglo
    listaProductos.push(productoNuevo);
    console.log(listaProductos);
    // limpiar el formulario
    limpiarFormulario();
    //guardar en localstorage el arreglo de productos
    guardarLocalstorage();
    // mostrar un mensaje al usuario
    Swal.fire(
        'Producto creado',
        'Su producto fue correctamente creado',
        'success'
      )
      //creo una nueva fila en la tabla
      crearFila(productoNuevo);
}

function limpiarFormulario(){
    // limpiar los value de todo el formulario
    formularioProducto.reset();
    // limpiar las clases
    campoCodigo.className = 'form-control';
    campoProducto.className = 'form-control';
    // Tarea limpiar todos las clases
    //limpiar la variable booleano
    productoExistente=false;
}

function guardarLocalstorage(){
    localStorage.setItem('listaProductosKey', JSON.stringify(listaProductos));
}

function crearFila(producto){
    let tabla = document.querySelector('#tablaProductos');
    tabla.innerHTML += `<tr>
    <td>${producto.codigo}</td>
    <td>${producto.producto}</td>
    <td>${producto.descripcion}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.url}</td>
    <td>
      <button class="btn btn-warning" onclick="prepararEdicionProducto(${producto.codigo})">Editar</button
      ><button class="btn btn-danger" onclick="borrarProducto(${producto.codigo})">Borrar</button>
    </td>
  </tr>`;
}

function cargaInicial(){
    // si hay datos en localstorage o en listaProductos dibujo las filas
    if(listaProductos.length > 0){
        // dibujar fila
        listaProductos.forEach((itemProducto)=>{crearFila(itemProducto)})
    }
}

function borrarTabla(){
    let tabla = document.querySelector('#tablaProductos');
    tabla.innerHTML='';
}

window.prepararEdicionProducto = function (codigo) {
    console.log(codigo)
    // obtener el objeto a modificar
    let productoBuscado = listaProductos.find((itemProducto)=>{return itemProducto.codigo == codigo })
    console.log(productoBuscado);
    // mostrar los datos en el form
    campoCodigo.value = productoBuscado.codigo;
    campoProducto.value = productoBuscado.producto;
    campoDescripcion.value = productoBuscado.descripcion;
    campoCantidad.value = productoBuscado.cantidad;
    campoURL.value = productoBuscado.url;
    // aqui modifico la variable boolena
    productoExistente=true;
}

function modificarProducto(){
    console.log('aqui quiero modificar este producto')
    //buscar la posicion de mi producto dentro del arreglo
    let posicionProducto = listaProductos.findIndex((itemProducto)=>{return itemProducto.codigo == campoCodigo.value});
    console.log(posicionProducto);
    //modificar los datos de ese producto dentro del arreglo
    listaProductos[posicionProducto].descripcion= campoDescripcion.value;
    listaProductos[posicionProducto].producto = campoProducto.value;
    listaProductos[posicionProducto].cantidad = campoCantidad.value;
    listaProductos[posicionProducto].url = campoURL.value;
    console.log(listaProductos);
    //actualizar los datos del localstorage
    guardarLocalstorage();
    //mostrar un cartel al usuario
    Swal.fire(
        'Producto modificado',
        'Su producto fue correctamente editado',
        'success'
      )
    //limpiar los datos del formulario
    limpiarFormulario()
    //actualizar la tabla
    borrarTabla();
    // dibujar fila
    listaProductos.forEach((itemProducto)=>{crearFila(itemProducto)});
}

window.borrarProducto = function (codigo){
    console.log(codigo);
    // borro el producto del arreglo
    let arregloProductoBorrado = listaProductos.filter((itemProducto)=>{return itemProducto.codigo != codigo})
    console.log(arregloProductoBorrado);
    //actualizar los datos en localstorage
    listaProductos = arregloProductoBorrado;
    guardarLocalstorage();
    //actualizar los datos de la tabla
    borrarTabla();
    // dibujar fila
    listaProductos.forEach((itemProducto)=>{crearFila(itemProducto)});
    //mostrar mensaje
    Swal.fire(
        'Producto Eliminado',
        'Su producto fue correctamente eliminado del sistema',
        'success'
      )
}
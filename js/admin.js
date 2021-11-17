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


campoCodigo.addEventListener('blur', () => { campoRequerido(campoCodigo)});
campoProducto.addEventListener('blur', ()=> { campoRequerido(campoProducto)});
campoDescripcion.addEventListener('blur', ()=>{ campoRequerido(campoDescripcion)})
campoCantidad.addEventListener('blur',()=>{ validarNumeros(campoCantidad)});
campoURL.addEventListener('blur', ()=>{validarURL(campoURL)});
formularioProducto.addEventListener('submit', guardarProducto);

function guardarProducto(e){
    e.preventDefault()
    // validar los campos del formulario
    if(validarGeneral(campoCodigo, campoProducto, campoDescripcion,campoCantidad, campoURL)){
        // agregar o crear un producto
        crearProducto();
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
}

function limpiarFormulario(){
    // limpiar los value de todo el formulario
    formularioProducto.reset();
    // limpiar las clases
    campoCodigo.className = 'form-control';
    campoProducto.className = 'form-control';
    // Tarea limpiar todos las clases
}

function guardarLocalstorage(){
    localStorage.setItem('listaProductosKey', JSON.stringify(listaProductos));
}
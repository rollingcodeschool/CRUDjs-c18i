export function campoRequerido(input){
    if(input.value.trim().length > 0){
     //    console.log('paso la validacion')
        input.className = 'form-control is-valid';
        return true;
    }else{
     //    console.log('no paso la validacion')
        input.className = 'form-control is-invalid';
        return false;
    }
 }
 
 export function validarNumeros(input){
     // crear una expresion regular
     let patron = /^[0-9]{1,3}$/;
     // probar el funcionamiento del patron o expresion regular
     if(patron.test(input.value)){
         // cumple la expresion la regular
         input.className = 'form-control is-valid';
         return true;
     }else{
         // si no cumple la expresion regular
         input.className = 'form-control is-invalid';
         return false;
     }
 }
 
 export function validarURL(input){
     // crear la expresion regular
     let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
     if(patron.test(input.value)){
         input.className = 'form-control is-valid';
         return true;
     }else{
         input.className = 'form-control is-invalid';
         return false;
     }
 }
 
 export function validarGeneral(campoCodigo, campoProducto, campoDescripcion, campoCantidad,campoURL){
     // console.log('aqui tengo que validar todo de nuevo');
     // volver a validar todos los campos
     // if( preguntar si el codigo es correcto && pregunto si el producto es correcto)
     let alerta = document.querySelector('#msjAlerta');
     if(campoRequerido(campoCodigo) && 
     campoRequerido(campoProducto) && 
     campoRequerido(campoDescripcion) && 
     validarNumeros(campoCantidad) &&
     validarURL(campoURL)){
         // console.log('si paso la validacion');
         alerta.className = 'alert alert-danger my-5 d-none';
         return true;
     }else{
         // console.log('no paso la validacion');
         alerta.className = 'alert alert-danger my-5';
         return false;
     }
 }

export  interface IEmpleado {
    idUsuario:number,
    nombre:string,
    apellido:string,
    idRol:number,
    descripcionRol:string,
    correo:string,
    clave:string,
    activo:number,
}

export  interface Sesion {
    idUsuario:number,
    nombre:string,
    token:string,
    rolDescripcion:string,
    correo:string
}

export  interface ITarea {
    idTarea:number,
    idUsuario:number,
    idCreador:number,
    titulo:string,
    descripcion:string,
    tipo:string,
    nombreCreador:string,
    nombreUsuario:string,
    apellidoUsuario:string,
    fechaRegistrada:string,
    fechaLimite:string,
    activo: boolean
}

export  interface ITareaSend {
    idTarea:number,
    idUsuario:number,
    idCreador:number,
    titulo:string,
    descripcion:string,
    tipo:string,
    activo: boolean
}

export  interface IRol {
    idRol:number,
    descripcion:number,
}

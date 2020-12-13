'use strict';

const MESSAGES = {
    ERROR : {
        DEFAULT : 'From lost to the river',
        USER : {
            ADDUSERERRORTEXT : 'No se ha podido añadir el usuario',
            GETUSERERRORTEXT : 'No se encuentra el usuario con los parámetros indicados',
            GETUSERSLISTERRORTEXT : 'No existen usuarios',
            GETSPECIFICUSERSLISTERRORTEXT : 'No existen usuarios con los parámetros indicados',
            GETUSERWITHEMAILERRORTEXT: 'No existe ningún usuario con ese correo',
            MODIFYUSERERRORTEXT: 'No se ha podido modificar el usuario',
            REMOVEUSERERRORTEXT: 'No se ha podido eliminar el usuario'
        },
        ISSUE : {
            ADDISSUEERRORTEXT : 'No se ha podido añadir el incidente',
            GETISSUEERRORTEXT : 'No se encuentra el incidente con los parámetros indicados',
            GETISSUESLISTERRORTEXT : 'No existen incidentes',
            GETSPECIFICISSUESLISTERRORTEXT : 'No existen incidentes con los parámetros indicados',
            MODIFYISSUEERRORTEXT: 'No se ha podido modificar el incidente',
            REMOVEISSUEERRORTEXT: 'No se ha podido eliminar el incidente'
        },
        LOGIN : {
            ERRORLOGINTEXT : 'Error en el proceso de login',
            INCONSISTENTDATATEXT : 'Existe algún error de datos en la base de datos',
            ACCOUNTNOTACTIVETEXT : 'La cuenta no ha sido activada',
            INCORRECTPASSWORDTEXT : 'Contraseña incorrecta'
        },
        PASSWORD : {
            WRONGPASSWORDTEXT : 'Password incorrecto'
        },
        PROJECT : {
            ADDPROJECTERRORTEXT : 'No se ha podido añadir el proyecto',
            GETISSUEERRORTEXT : 'No se encuentra el proyecto con los parámetros indicados',
            GETPROJECTSLISTERRORTEXT : 'No existen proyectos',
            MODIFYPROJECTERRORTEXT: 'No se ha podido modificar el proyecto',
            REMOVEPROJECTERRORTEXT: 'No se ha podido eliminar el proyecto'
        },
        REQUESTPARAMETERS : {
            INCORRECTPARAMETERSTEXT : 'Parametros incorrectos'
        },
        ROLES : {
            ADDROLERRORTEXT : 'No se ha podido añadir el rol',
            GETROLERRORTEXT : 'No se ha podido obtener el rol con los parámetros indicados',
            GETROLESERRORTEXT : 'No existen roles',
            MODIFYROLERRORTEXT : 'No se ha podido modificar el incidente',
            REMOVEROLERRORTEXT : 'No se ha podido eliminar el rol'
        }
    },
    SUCCESS : {
        DEFAULT : 'Be water',
        LOGIN : {
            SUCCESSLOGINTEXT : 'El usuario se ha logueado correctamente'
        },
        USER : {
            ADDUSERSUCCESSTEXT : 'Usuario añadido correctamente',
            GETUSERSUCCESSTEXT : 'Usuario obtenido correctamente',
            MODIFYUSERSUCCESSTEXT : 'Usuario modificado correctamente',
            REMOVEUSERSUCCESSTEXT : 'Usuario eliminado correctamente'
        },
        ISSUE : {
            ADDISSUESUCCESSTEXT : 'Incidencia añadida correctamente',
            GETISSUESUCCESSTEXT : 'Incidencia obtenida correctamente',
            MODIFYISSUESUCCESSTEXT : 'Incidencia modificada correctamente',
            REMOVEISSUESUCCESSTEXT : 'Incidencia eliminada correctamente'
        },
        PROJECT : {
            ADDPROJECTSUCCESSTEXT : 'Proyecto añadido correctamente',
            GETPROJECTSUCCESSTEXT : 'Proyecto obtenido correctamente',
            MODIFYPROJECTSUCCESSTEXT : 'Proyecto modificado correctamente',
            REMOVEPROJECTSUCCESSTEXT : 'Proyecto eliminado correctamente'
        },
        ROLES : {
            ADDROLUCCESSTEXT : 'Rol añadido correctamente',
            GETROLSUCCESSTEXT : 'Rol obtenido correctamente',
            GETROLESSUCCESSTEXT : 'Roles obtenidos correctamente',
            MODIFYROLSUCCESSTEXT : 'Rol modificado correctamente',
            REMOVEROLSUCCESSTEXT : 'Rol eliminado correctamente'
        }
    },
    CODES : {
        200 : '200', //OK
        201 : '201', //CREATED
        202 : '202', //ACCEPTED
        204 : '204', //NO CONTENT
        400 : '400', //BAD REQUEST
        401 : '401', //UNAUTHORIZED
        403 : '403', //FORBIDDEN
        404 : '404', //NOT FOUND
        405 : '405', //METHOD NOT ALLOWED
        411 : '411', //LENGTH REQUIRED
        412 : '412', //PRECONDITION FAILED
        413 : '413', //PAYLOAD TOO LARGE
        414 : '414', //URI TOO LONG
        418 : '418', //I'M A TEAPOT
        500 : '500'  //INTERNAL SERVER ERROR
    }
}

function getMessage(code, error) {
    //TODO: Añadir funcionalidad de comprobación de existencia para evitar poder mandar
    //cualquier otro error que no exista en la librería

    return {status: code, message: error};
}

module.exports = {
    MESSAGES,
    getMessage
};
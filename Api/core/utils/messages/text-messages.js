'use strict';

const MESSAGES = {
    ERROR : {
        DEFAULT : 'From lost to the river',
        USER : {
            ADDUSERERRORTEXT : 'No se ha podido añadir el usuario',
            GETUSERERRORTEXT : 'No se encuentra el usuario con los parámetros indicados',
            GETUSERSLISTERRORTEXT : 'No existen usuarios',
            GETSPECIFICUSERSLISTERRORTEXT : 'No existen usuarios con los parámetros indicados',
            GETUSERWITHEMAILERRORTEXT: 'No existe ningún usuario con ese correo'
        },
        ISSUE : {
            ADDISSUEERRORTEXT : 'No se ha podido añadir el incidente',
            GETISSUEERRORTEXT : 'No se encuentra el incidente con los parámetros indicados',
            GETISSUESLISTERRORTEXT : 'No existen incidentes',
            GETSPECIFICISSUESLISTERRORTEXT : 'No existen incidentes con los parámetros indicados'
        },
        REQUESTPARAMETERS : {
            INCORRECTPARAMETERSTEXT : 'Parametros incorrectos'
        },
        PASSWORD : {
            WRONGPASSWORDTEXT : 'Password incorrecto'
        }
    },
    SUCCESS : {
        DEFAULT : 'Be water',
        USER : {
            ADDUSERSUCCESSTEXT : 'Usuario añadido correctamente',
            GETUSERSUCCESSTEXT : 'Usuario obtenido correctamente'
        },
        ISSUE : {
            ADDISSUEUCCESSTEXT : 'Incidencia añadida correctamente',
            GETISSUESUCCESSTEXT : 'Incidencia obtenida correctamente'
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
//A partir de la versión 7.4 de babel es necesario para evitar el error de runtime unexpected
import 'regenerator-runtime/runtime'
//Importamos las librerías
const chai = require('chai');
const { expect }  = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const bcrypt = require('bcrypt');
//Importamos el api ya que las pruebas se realizaran sin el servidor api lanzado
const checkJwtToken = require('../core/utils/session/check-token');
const app = require('../index');

chai.use(chaiHttp);

describe('Comprobación de funcionamiento de Autenticación', ()=> {
    describe('Comprobamos la inserción con encriptación de pass', async ()=> {
        const hashPassword = await bcrypt.hash('testPassword', 10);
        const user = {
            user : 'testUser',
            email : 'email@test.com',
            password : hashPassword,
            rol: 0
        }

        it('Insertamos usuario de prueba', ()=> {

            return chai.request(app)
                .post('/api/user/add')
                .send(user)
                .then((res)=> {
                    res.should.have.status(201);
                }, (err) => {
                    Promise.reject();
                })
        });
        it('Comprobación de obteción de pass encriptada y correcta', ()=> {
            return chai.request(app)
                .get('/api/user')
                .then((res)=> {
                    res.should.have.status(200);
                }, (err) => {
                    Promise.reject();
                })
        });
    });
    describe('GET session token', ()=> {
        it('Comprobación de recuperación de session token', ()=> {
            
        });
    });
});
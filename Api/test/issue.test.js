//A partir de la versión 7.4 de babel es necesario para evitar el error de runtime unexpected
import 'regenerator-runtime/runtime'
//Importamos las librerías
const chai = require('chai');
const { expect }  = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
//Importamos el api ya que las pruebas se realizaran sin el servidor api lanzado
const app = require('../index');

chai.use(chaiHttp);

describe('Grupo de peticiones de incidencias', ()=> {
    describe('GET /user', ()=> {
        it('Obtenemos un listado de incidencias', ()=> {
            return chai.request(app)
                .get('/api/issue')
                .then((res)=> {
                    res.should.have.status(200);
                }, (err) => {
                    Promise.reject();
                })
        });
    });
    describe('GET /user/:id', ()=> {
        it('Obtenemos una incidencia concreta', ()=> {
            return chai.request(app)
                .get('/api/issue/1')
                .then((res)=> {
                    expect(res.body).to.have.property('id').to.be.equal(1);
                }, (err) => {
                    Promise.reject();
                })
        });
    });
});
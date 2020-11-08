const logger = require('../../../utils/logger');
const structure = require('../../database-structure/structure');
const BASE_VERSION = 1;

window.addEventListener('load', () => {
    selectOptionEvent();
})

async function getInfo() {
    logger.info(`>>>GETINFO SELECTED`);

    logger.info(`<<<GETINFO SELECTED`);
}

async function update() {
    logger.info(`>>>UPDATE SELECTED`);

    logger.info(`<<<UPDATE SELECTED`);
}

async function install() {
    logger.info(`>>>INSTALL SELECTED`);

    try {
        var parameters = {
            MYSQL_USER : document.getElementById('user').value,
            MYSQL_PASSWORD : document.getElementById('pass').value,
            MYSQL_HOST : document.getElementById('host').value,
            MYSQL_PORT : document.getElementById('port').value,
            MYSQL_DATABASE : document.getElementById('database').value
        }

        let succesfullyInstall = await structure.install(parameters);

        if (succesfullyInstall)
        {
            structure.setVersion(BASE_VERSION, parameters);
            logger.info(`>>>INSTALL SELECTED: Finish`);
        } else {
            logger.error(`>>>INSTALL SELECTED: Error`);
        }
    } catch (e) {
        logger.error(`>>>INSTALL SELECTED: `+e);
    }
}

function selectOptionEvent() {
    const options = document.querySelectorAll('li.list-group-item');

    for(let i = 0, len = options.length; i < len; i++) {
        options[i].addEventListener('click', function () {
            changeForm(this);
        })
    }
}

function changeForm(node) {
    document.querySelector('li.selected').classList.remove('selected');
    node.classList.add('selected');
    if (node.innerText.includes("Instalación")) {
        document.getElementById('execute').setAttribute("onclick","install()");
    } else if (node.innerText.includes("Actualización")) {
        document.getElementById('execute').setAttribute("onclick","update()");
    } else if (node.innerText.includes("Información")) {
        document.getElementById('execute').setAttribute("onclick","getInfo()");
    }
}
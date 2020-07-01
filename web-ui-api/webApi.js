const express = require('express')
const cors = require('cors')
const { Service, Recipient} = require('domain-shared')
const port = 8080
/*
const mickeyMouse = new Recipient('9493dabc-0ebb-4395-a4bc-cbe9220dd59e', { name: 'Mickey Mouse'});
const donaldDuck = new Recipient('f6803e93-51f2-4721-8494-67141c4df43f', { name: 'Donald Duck'});
const elmerFudd = new Recipient('76876c72-4b10-4f08-ac9e-bbfbcfc87c3c', { name: 'Elmer Fudd'});
const minnieMouse = new Recipient('7ba7786c-93fd-4bb9-9f6a-b41e058b6d2e', { name: 'Minnie Mouse'});

const mockServices = [
    new Service (
        '1cf0dddd-372d-4015-82e6-0657a9ae593e',
        mickeyMouse, 
        new Date(2020, 0, 1, 11, 0)),
    new Service (
        '7597c4a5-5776-466c-ae06-1c34f3df6aac',
        mickeyMouse,
        new Date(2020, 0, 15, 21, 30)),
    new Service (
        'aca5eb77-b5b8-4909-afdb-e4efc1dbfce4',
        mickeyMouse,
        new Date(2020, 1, 15, 10, 0)),
    new Service(
        '90565c30-3d05-45d9-9c99-78d9b5fc29fe',
        donaldDuck,
        new Date(2020, 0, 14, 9, 45)),
    new Service(
        '78d9d1a5-8500-4e32-9e0c-af097d29bb3b',
        donaldDuck,
        new Date(2020, 1, 1, 13, 0)),
    new Service(
        '46075b8d-0d5e-428a-beac-ebe57f875da7',
        elmerFudd,
        new Date(2020, 2, 15, 8, 53)),
    new Service(
        'f6f25029-884a-49da-beb1-fccc209ccd2a',
        minnieMouse,
        new Date(2019, 11, 14, 17, 0)),
    new Service(
        '9c8ff780-ffe2-466b-9d86-cfd4a71066e1',
        minnieMouse,
        new Date(2020, 0, 22, 14, 5)),
    new Service(
        'c799edcb-7174-4fc0-b682-e22e542a779e',
        minnieMouse,
        new Date(2020, 0, 2, 8, 0)),
    new Service(
        'f4a89849-f598-4f05-9ce8-93c1003360b5',
        minnieMouse,
        new Date(2020, 0, 13, 8, 0))
  ];
*/
exports.start = (repo) => {
    const app = express()

    app.listen(port)

    app.use(express.json())
    app.use(cors())

    app.get('/', (req, res) => res.send("Hello"))     

    app.post('/services', (req, res, next) => {
        
        //res.json(mockServices);
        console.log(req.body.filter);

        repo.findServices(req.body.filter).
            then((services) => res.json(services)).
            catch(error=> next(error))
    });
}


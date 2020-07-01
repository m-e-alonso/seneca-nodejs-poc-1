db = db.getSiblingDB('seneca-nodejs-poc-1')

db.services.insertMany([
{_id:"1cf0dddd-372d-4015-82e6-0657a9ae593e",recipient:{_id:"9493dabc-0ebb-4395-a4bc-cbe9220dd59e",name:"Mickey Mouse"},startTime:new Date("2020-01-01T19:00:00.000Z"),endTime:null},
{_id:"7597c4a5-5776-466c-ae06-1c34f3df6aac",recipient:{_id:"9493dabc-0ebb-4395-a4bc-cbe9220dd59e",name:"Mickey Mouse"},startTime:new Date("2020-01-16T05:30:00.000Z"),endTime:null},
{_id:"aca5eb77-b5b8-4909-afdb-e4efc1dbfce4",recipient:{_id:"9493dabc-0ebb-4395-a4bc-cbe9220dd59e",name:"Mickey Mouse"},startTime:new Date("2020-02-15T18:00:00.000Z"),endTime:null},
{_id:"90565c30-3d05-45d9-9c99-78d9b5fc29fe",recipient:{_id:"f6803e93-51f2-4721-8494-67141c4df43f",name:"Donald Duck"},startTime:new Date("2020-01-14T17:45:00.000Z"),endTime:null},
{_id:"78d9d1a5-8500-4e32-9e0c-af097d29bb3b",recipient:{_id:"f6803e93-51f2-4721-8494-67141c4df43f",name:"Donald Duck"},startTime:new Date("2020-02-01T21:00:00.000Z"),endTime:null},
{_id:"46075b8d-0d5e-428a-beac-ebe57f875da7",recipient:{_id:"76876c72-4b10-4f08-ac9e-bbfbcfc87c3c",name:"Elmer Fudd"},startTime:new Date("2020-03-15T15:53:00.000Z"),endTime:null},
{_id:"f6f25029-884a-49da-beb1-fccc209ccd2a",recipient:{_id:"7ba7786c-93fd-4bb9-9f6a-b41e058b6d2e",name:"Minnie Mouse"},startTime:new Date("2019-12-15T01:00:00.000Z"),endTime:null},
{_id:"9c8ff780-ffe2-466b-9d86-cfd4a71066e1",recipient:{_id:"7ba7786c-93fd-4bb9-9f6a-b41e058b6d2e",name:"Minnie Mouse"},startTime:new Date("2020-01-22T22:05:00.000Z"),endTime:null},
{_id:"c799edcb-7174-4fc0-b682-e22e542a779e",recipient:{_id:"7ba7786c-93fd-4bb9-9f6a-b41e058b6d2e",name:"Minnie Mouse"},startTime:new Date("2020-01-02T16:00:00.000Z"),endTime:null},
{_id:"f4a89849-f598-4f05-9ce8-93c1003360b5",recipient:{_id:"7ba7786c-93fd-4bb9-9f6a-b41e058b6d2e",name:"Minnie Mouse"},startTime:new Date("2020-01-13T16:00:00.000Z"),endTime:null}]);
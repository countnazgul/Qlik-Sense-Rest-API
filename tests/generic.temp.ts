// import path from "path";
// const dotEnvPath = path.resolve("./.env");
// require("dotenv").config({ path: dotEnvPath });
// import fs from "fs";

// import chai from "chai";
// const expect = chai.expect;

// import { ISessionConfig, ITicketConfig } from "../src/interfaces/interfaces";

// import {
//   QlikEngineClient,
//   QlikGenericRestClient,
//   QlikProxyClient,
//   QlikRepositoryClient,
// } from "../src/index";

// import { Util } from "../tests/util";

// const Config = new Util();

// describe("PLAYGROUND", function () {
//   it("Test GET", async function () {
//     let repo = new QlikRepositoryClient(Config.baseConfigPxf);
//     let result = await repo.Get("about").catch((e) => {
//       let a = 1;
//     });

//     let a = 1;
//   });

//   it("Test PUT", async function () {
//     let repo = new QlikRepositoryClient(Config.baseConfig);
//     let tag = await repo
//       .Get("tag/full?filter=(id eq 4b21e4cc-311b-47af-8758-beabf9b68e48)")
//       .catch((e) => {
//         let a = 1;
//       });

//     let tag1 = { ...(tag as any).data[0] };
//     tag1.name = "TEST1";

//     // let b = 1;

//     let tagUpdate = await repo
//       .Put(`tag/${(tag as any).data[0].id}`, tag1)
//       .catch((e) => {
//         let a = 1;
//       });

//     let a = 1;
//   });

//   it("Test POST and DELETE", async function () {
//     let repo = new QlikRepositoryClient(Config.baseConfig);

//     let newTag = await repo.Post(`tag`, { name: "My New Tag" }).catch((e) => {
//       let a = 1;
//     });

//     let b = 1;

//     let deleteTag = await repo
//       .Delete(`tag/${(newTag as any).data.id}`)
//       .catch((e) => {
//         let a = 1;
//       });

//     let a = 1;
//   });

//   it("Test GET (Header)", async function () {
//     let repo = new QlikRepositoryClient(Config.baseConfigHeader);
//     let result = await repo.Get("about").catch((e) => {
//       let a = 1;
//     });

//     let a = 1;
//   });

//   it("Test GET Proxy (Certificates)", async function () {
//     let localConfig = { ...Config.baseConfig };
//     localConfig.port = 4243;
//     let repo = new QlikProxyClient(localConfig);
//     let result = await repo.Get("session").catch((e) => {
//       let a = 1;
//     });

//     let a = 1;
//   });

//   it("Test DELETE Proxy (Certificates)", async function () {
//     let localConfig = { ...Config.baseConfig };
//     localConfig.port = 4243;
//     let repo = new QlikProxyClient(localConfig);
//     let result = await repo
//       .Delete(`session/1e28fa60-900d-414a-9cf0-68db9d5e3893`)
//       .catch((e) => {
//         let a = 1;
//       });

//     let a = 1;
//   });

//   it("Test POST Proxy (Certificates)", async function () {
//     let localConfig = { ...Config.baseConfig };
//     localConfig.port = 4243;
//     let repo = new QlikProxyClient(localConfig);
//     let result = await repo
//       .Post("session", {
//         userDirectory: process.env.SENSE_USER_DIRECTORY,
//         userId: process.env.SENSE_USER_NAME,
//         sessionId: Config.generateUUID(),
//       })
//       .catch((e) => {
//         let a = 1;
//       });

//     let a = 1;
//   });

//   it("Test GET Engine (Header)", async function () {
//     let localConfig = { ...Config.baseConfigHeader };
//     // let localConfig = { ...baseConfig };
//     delete localConfig.port;
//     // localConfig.port = 4747;
//     let repo = new QlikEngineClient(localConfig);
//     let result = await repo.Get("engine/healthcheck").catch((e) => {
//       // let result = await repo
//       //   .Get("v1/apps/4a13cc60-d380-4776-a96b-82301e5a03d0")
//       // .catch((e) => {
//       let a = 1;
//     });

//     let a = 1;
//   });

//   it("Test GET Generic (Header)", async function () {
//     let localConfig = { ...Config.baseConfigHeader };
//     // let localConfig = { ...baseConfig };
//     delete localConfig.port;
//     let repo = new QlikGenericRestClient(localConfig);
//     let result = await repo.Get("api/engine/healthcheck").catch((e) => {
//       let a = 1;
//     });

//     let a = 1;
//   });

//   it("Test GET Repository (JWT)", async function () {
//     let localConfig = { ...Config.baseConfigJWT };
//     // let localConfig = { ...baseConfig };
//     delete localConfig.port;
//     let repo = new QlikRepositoryClient(localConfig);
//     let result = await repo.Get("about").catch((e) => {
//       let a = 1;
//     });

//     let a = 1;
//   });

//   it("Test GET Repository (SessionID)", async function () {
//     let sessionID = Config.generateUUID();
//     let proxyConfig = { ...Config.baseConfig };
//     proxyConfig.port = 4243;

//     let proxy = new QlikProxyClient(proxyConfig);

//     let proxyResult = await proxy.Post("session", {
//       userDirectory: process.env.SENSE_USER_DIRECTORY,
//       userId: process.env.SENSE_USER_NAME,
//       sessionId: sessionID,
//     });

//     let localConfig = { ...Config.baseConfigSession };
//     (localConfig.authentication as ISessionConfig).sessionId = sessionID;

//     let repo = new QlikRepositoryClient(localConfig);
//     let result = await repo.Get("about").catch((e) => {
//       let a = 1;
//     });

//     let a = 1;
//   });

//   it("Test GET Repository (Ticket)", async function () {
//     let proxyConfig = { ...Config.baseConfig };
//     proxyConfig.port = 4243;

//     let proxy = new QlikProxyClient(proxyConfig);

//     let proxyResult = await proxy.Post("ticket", {
//       userDirectory: process.env.SENSE_USER_DIRECTORY,
//       userId: process.env.SENSE_USER_NAME,
//     });

//     let localConfig = { ...Config.baseConfigTicket };
//     (localConfig.authentication as ITicketConfig).ticket =
//       proxyResult.data.Ticket;

//     let repo = new QlikRepositoryClient(localConfig);
//     let result = await repo.Get("about").catch((e) => {
//       let a = 1;
//     });

//     let a = 1;
//   });

//   it("Test POST (UPLOAD)", async function () {
//     let repo = new QlikRepositoryClient(Config.baseConfig);

//     let extension = fs.readFileSync(process.env.EXTENSION_PATH);

//     let newExtension = await repo
//       .Post(`extension/upload`, extension)
//       .catch((e) => {
//         let a = 1;
//       });

//     // let deleteTag = await repo
//     //   .Delete(`tag/${(newTag as any).data.id}`)
//     //   .catch((e) => {
//     //     let a = 1;
//     //   });

//     let a = 1;
//   });
// });

import path from "path";
const dotEnvPath = path.resolve("./.env");
require("dotenv").config({ path: dotEnvPath });
import fs from "fs";

import chai from "chai";
const expect = chai.expect;

import {
  IConfig,
  ISessionConfig,
  ITicketConfig,
} from "../src/interfaces/interfaces";

import {
  QlikEngineClient,
  QlikGenericRestClient,
  QlikProxyClient,
  QlikRepositoryClient,
} from "../src/index";
import { generateUUID } from "../src/helpers/generic";

const crt = fs.readFileSync(`${process.env.TEST_CERT}/client.pem`);
const key = fs.readFileSync(`${process.env.TEST_CERT}/client_key.pem`);
const pfx = fs.readFileSync(`${process.env.TEST_CERT}/client.pfx`);

let baseConfig: IConfig = {
  host: process.env.TEST_HOST,
  port: 4242,
  //   proxy: "blah",
  authentication: {
    // cert: crt,
    // key: key,
    pfx: pfx,
    user_dir: process.env.SENSE_USER_DIRECTORY,
    user_name: process.env.SENSE_USER_NAME,
  },
};

let baseConfigHeader: IConfig = {
  host: process.env.TEST_HOST,
  proxy: process.env.AUTH_HEADER_PROXY,
  authentication: {
    header: process.env.AUTH_HEADER,
    user: process.env.AUTH_HEADER_USER,
  },
};

let baseConfigJWT: IConfig = {
  host: process.env.TEST_HOST,
  proxy: process.env.AUTH_JWT_PROXY,
  authentication: {
    token: process.env.AUTH_JWT_TOKEN,
  },
};

let baseConfigSession: IConfig = {
  host: process.env.TEST_HOST,
  authentication: {
    sessionId: "",
    cookieHeaderName: "X-Qlik-Session",
  },
};

let baseConfigTicket: IConfig = {
  host: process.env.TEST_HOST,
  authentication: {
    ticket: "",
  },
};

describe("PLAYGROUND", function () {
  it("Test GET", async function () {
    let repo = new QlikRepositoryClient(baseConfig);
    let result = await repo.Get("about").catch((e) => {
      let a = 1;
    });

    let a = 1;
  });

  it("Test PUT", async function () {
    let repo = new QlikRepositoryClient(baseConfig);
    let tag = await repo
      .Get("tag/full?filter=(id eq 4b21e4cc-311b-47af-8758-beabf9b68e48)")
      .catch((e) => {
        let a = 1;
      });

    let tag1 = { ...(tag as any).data[0] };
    tag1.name = "TEST1";

    // let b = 1;

    let tagUpdate = await repo
      .Put(`tag/${(tag as any).data[0].id}`, tag1)
      .catch((e) => {
        let a = 1;
      });

    let a = 1;
  });

  it("Test POST and DELETE", async function () {
    let repo = new QlikRepositoryClient(baseConfig);

    let newTag = await repo.Post(`tag`, { name: "My New Tag" }).catch((e) => {
      let a = 1;
    });

    let b = 1;

    let deleteTag = await repo
      .Delete(`tag/${(newTag as any).data.id}`)
      .catch((e) => {
        let a = 1;
      });

    let a = 1;
  });

  it("Test GET (Header)", async function () {
    let repo = new QlikRepositoryClient(baseConfigHeader);
    let result = await repo.Get("about").catch((e) => {
      let a = 1;
    });

    let a = 1;
  });

  it("Test GET Proxy (Certificates)", async function () {
    let localConfig = { ...baseConfig };
    localConfig.port = 4243;
    let repo = new QlikProxyClient(localConfig);
    let result = await repo.Get("session").catch((e) => {
      let a = 1;
    });

    let a = 1;
  });

  it("Test DELETE Proxy (Certificates)", async function () {
    let localConfig = { ...baseConfig };
    localConfig.port = 4243;
    let repo = new QlikProxyClient(localConfig);
    let result = await repo
      .Delete(`session/1e28fa60-900d-414a-9cf0-68db9d5e3893`)
      .catch((e) => {
        let a = 1;
      });

    let a = 1;
  });

  it("Test POST Proxy (Certificates)", async function () {
    let localConfig = { ...baseConfig };
    localConfig.port = 4243;
    let repo = new QlikProxyClient(localConfig);
    let result = await repo
      .Post("session", {
        userDirectory: process.env.SENSE_USER_DIRECTORY,
        userId: process.env.SENSE_USER_NAME,
        sessionId: generateUUID(),
      })
      .catch((e) => {
        let a = 1;
      });

    let a = 1;
  });

  it("Test GET Engine (Header)", async function () {
    let localConfig = { ...baseConfigHeader };
    // let localConfig = { ...baseConfig };
    delete localConfig.port;
    // localConfig.port = 4747;
    let repo = new QlikEngineClient(localConfig);
    let result = await repo.Get("engine/healthcheck").catch((e) => {
      // let result = await repo
      //   .Get("v1/apps/4a13cc60-d380-4776-a96b-82301e5a03d0")
      // .catch((e) => {
      let a = 1;
    });

    let a = 1;
  });

  it("Test GET Generic (Header)", async function () {
    let localConfig = { ...baseConfigHeader };
    // let localConfig = { ...baseConfig };
    delete localConfig.port;
    let repo = new QlikGenericRestClient(localConfig);
    let result = await repo.Get("api/engine/healthcheck").catch((e) => {
      let a = 1;
    });

    let a = 1;
  });

  it("Test GET Repository (JWT)", async function () {
    let localConfig = { ...baseConfigJWT };
    // let localConfig = { ...baseConfig };
    delete localConfig.port;
    let repo = new QlikRepositoryClient(localConfig);
    let result = await repo.Get("about").catch((e) => {
      let a = 1;
    });

    let a = 1;
  });

  it("Test GET Repository (SessionID)", async function () {
    let sessionID = generateUUID();
    let proxyConfig = { ...baseConfig };
    proxyConfig.port = 4243;

    let proxy = new QlikProxyClient(proxyConfig);

    let proxyResult = await proxy.Post("session", {
      userDirectory: process.env.SENSE_USER_DIRECTORY,
      userId: process.env.SENSE_USER_NAME,
      sessionId: sessionID,
    });

    let localConfig = { ...baseConfigSession };
    (localConfig.authentication as ISessionConfig).sessionId = sessionID;

    let repo = new QlikRepositoryClient(localConfig);
    let result = await repo.Get("about").catch((e) => {
      let a = 1;
    });

    let a = 1;
  });

  it("Test GET Repository (Ticket)", async function () {
    let proxyConfig = { ...baseConfig };
    proxyConfig.port = 4243;

    let proxy = new QlikProxyClient(proxyConfig);

    let proxyResult = await proxy.Post("ticket", {
      userDirectory: process.env.SENSE_USER_DIRECTORY,
      userId: process.env.SENSE_USER_NAME,
    });

    let localConfig = { ...baseConfigTicket };
    (localConfig.authentication as ITicketConfig).ticket =
      proxyResult.data.Ticket;

    let repo = new QlikRepositoryClient(localConfig);
    let result = await repo.Get("about").catch((e) => {
      let a = 1;
    });

    let a = 1;
  });

  it("Test POST (UPLOAD)", async function () {
    let repo = new QlikRepositoryClient(baseConfig);

    let extension = fs.readFileSync(process.env.EXTENSION_PATH);

    let newExtension = await repo
      .Post(`extension/upload`, extension)
      .catch((e) => {
        let a = 1;
      });

    // let deleteTag = await repo
    //   .Delete(`tag/${(newTag as any).data.id}`)
    //   .catch((e) => {
    //     let a = 1;
    //   });

    let a = 1;
  });
});

import path from "path";
const dotEnvPath = path.resolve("./.env");
require("dotenv").config({ path: dotEnvPath });
import fs from "fs";

import chai from "chai";
const expect = chai.expect;

import { IConfig } from "../src/interfaces/interfaces";

import { QlikRepositoryClient } from "../src/index";
// import { generateUUID } from "../src/helpers/generic";

const crt = fs.readFileSync(`${process.env.TEST_CERT}/client.pem`);
const key = fs.readFileSync(`${process.env.TEST_CERT}/client_key.pem`);
const pfx = fs.readFileSync(`${process.env.TEST_CERT}/client.pfx`);

let baseConfig = {
  host: process.env.TEST_HOST,
  port: "4242",
  //   proxy: "blah",
  authentication: {
    // cert: crt,
    // key: key,
    pfx: pfx,
    user_dir: process.env.SENSE_USER_DIRECTORY,
    user_name: process.env.SENSE_USER_NAME,
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
});

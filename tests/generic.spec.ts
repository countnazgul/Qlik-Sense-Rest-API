import path from "path";
const dotEnvPath = path.resolve("./.env");
require("dotenv").config({ path: dotEnvPath });
import fs from "fs";

import chai from "chai";
const expect = chai.expect;

import { IConfig } from "../src/interfaces/interfaces";

import { QlikRepositoryClient } from "../src/index";

describe("PLAYGROUND", function () {
  it("Test", async function () {
    let crt = fs.readFileSync(`${process.env.TEST_CERT}/client.pem`);
    let key = fs.readFileSync(`${process.env.TEST_CERT}/client_key.pem`);
    let pfx = fs.readFileSync(`${process.env.TEST_CERT}/client.pfx`);

    let config: IConfig = {
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

    let repo = new QlikRepositoryClient(config);
    let result = await repo.Get("about").catch((e) => {
      let a = 1;
    });

    let a = 1;
  });
});

Interact with various Qlik Sense REST APIs (like Repository, Proxy, Engine and SaaS edition)

Lot to be done!

---

**Any "physical" content (like certificates, qvf files, extensions etc)
have to be provided in advance.**
The package communicates with Qlik only and should not read files from the file system. Its not its job ... and make life easier when the package is used in the browser

## Examples:

- Certificates authentication

```javascript
// certificates authentication example (pem or pfx)
import { QlikRepositoryClient } from "../src/index";

const crt = fs.readFileSync("path/to/client.pem");
const key = fs.readFileSync("path/to/client_key.pem");
const pfx = fs.readFileSync("path/to/client.pfx");

let config = {
  host: "my-sense-host",
  port: 4242,
  authentication: {
    cert: crt,
    key: key,
    //pfx: pfx,
    user_dir: "SOME_DIR",
    user_name: "SOME_USER",
  },
};

// this is where the magic is happening
let repoClient = new QlikRepositoryClient(config);
let result = await repoClient.Get("about");

// result variable is in format:
// {
//     data: {} or [] (depends what Qlik is returning)
//     status: 200, 201, 204, 404, 409 etc.
//     statusText: "OK", "Created", "No content" etc.
// }

console.log(result.data.buildVersion);
```

- Header authentication

```javascript
// header authentication
import { QlikRepositoryClient } from "../src/index";

let config = {
  host: "my-sense-host",
  proxy: "proxy-prefix",
  authentication: {
    header: "header-name",
    user: "directory\\user", //(or in whatever format the user is)
  },
};

let repoClient = new QlikRepositoryClient(config);
let result = await repoClient.Get("about");
```

- Proxy API

```javascript
import { QlikProxyClient } from "../src/index";

const pfx = fs.readFileSync("path/to/client.pfx");

let config = {
  host: "my-sense-host",
  port: 4243,
  authentication: {
    pfx: pfx,
    user_dir: "SOME_DIR",
    user_name: "SOME_USER",
  },
};

let proxyClient = new QlikProxyClient(config);
let result = await proxyClient.Get("session");

console.log(result.data.buildVersion);
```

- Engine API

```javascript
import { QlikEngineClient } from "../src/index";

const pfx = fs.readFileSync("path/to/client.pfx");

let config = {
  host: "my-sense-host",
  port: 4747,
  authentication: {
    pfx: pfx,
    user_dir: "SOME_DIR",
    user_name: "SOME_USER",
  },
};

let engineClient = new QlikProxyClient(config);
let result = await engineClient.Get("engine/healthcheck");
```

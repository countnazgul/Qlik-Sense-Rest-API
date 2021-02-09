## Qlik Sense REST API (Node/JavaScript)

Interact with Qlik Sense REST APIs (Repository, Proxy, Engine and SaaS) from a single package

Lot to be done!

---

## Motivation

The short answer ... I needed it :D

Long(er) answer:

- communicate with multiple QS REST API services (not limited only to a single service) from single package
- support multiple authentication mechanisms (certificates, header, JWT etc) **The package itself is not performing authentication**
- good project to skill up my `TypeScript`

## REST API coverage

- [x] Repository (QSoW)
- [x] Proxy (QSoW)
- [x] Engine (QSoW)
- [x] Generic (QSoW)
- [ ] SaaS (QSoK) (next phase)
- [ ] Engine JSON API through REST API (not guaranteed)

---

## Installation

TBA

---

**Any "physical" content (like certificates, qvf files, extension files etc)
have to be provided in advance.**
The package communicates with Qlik only and should not read files from the file system. Its not its job ... and make life easier when the package is used in the browser ;)

## Examples

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

- JWT authentication

```javascript
// JWT authentication
import { QlikRepositoryClient } from "../src/index";

let config = {
  host: "my-sense-host",
  proxy: "jwt-proxy-prefix",
  authentication: {
    token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2...",
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

- Generic REST client - all other clients are adding the required service prefix automatically (for example `qrs`, `qps` and `api`). Some other REST request dont need prefix. In these cases the `Generic REST client` can be used. In general this client can be used as replacement for all other clients by adding the necessary prefix to the url

```javascript
import { QlikGenericRestClient } from "../src/index";

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

let genericClient = new QlikGenericRestClient(config);
let result = await genericClient.Get("engine/healthcheck");
```

---

## Supported authentication methods

**This package is not performing authentication by itself!**

- [x] Certificates
- [x] Header
- [x] JWT
- [ ] Session
- [ ] Ticket

---

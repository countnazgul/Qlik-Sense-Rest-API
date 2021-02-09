Interact with various Qlik Sense REST APIs (like Repository, Proxy, Engine and SaaS edition)

Lot to be done!

---

**Any "physical" content (like certificates, qvf files, extensions etc)
have to be provided in advance.**
The package communicates with Qlik only and should not read files from the file system. Its not its job ... and make life easier when the package is used in the browser

```javascript
// certificates authentication example
import { QlikRepositoryClient } from "../src/index";

const crt = fs.readFileSync("path/to/client.pem");
const key = fs.readFileSync("path/to/client_key.pem");

let config = {
  host: "my-sense-host",
  port: "4242",
  authentication: {
    cert: crt,
    key: key,
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

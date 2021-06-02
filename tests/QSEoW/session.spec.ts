import chai from "chai";
import { Util, TagOperations, ProxySessionOperation } from "../../tests/util";
import { QlikProxyClient, QlikRepositoryClient } from "../../src/index";
import { ISessionConfig } from "../../src/interfaces/interfaces";

const expect = chai.expect;
const globalUtil = new Util(true);

describe("QSEoW (Session)", function () {
  it("Repository (Session) - DELETE, GET, POST and PUT (Tag)", async function () {
    let localProxyConfig = { ...globalUtil.baseConfig };
    localProxyConfig.port = 4243;

    const proxyClient = new QlikProxyClient(localProxyConfig);
    const proxyOperations = new ProxySessionOperation(proxyClient);
    const sessionId = await proxyOperations
      .createSession()
      .then((sessionDetails) => sessionDetails.data.SessionId);

    const localUtil = new Util(false);
    let localConfig = { ...localUtil.baseConfigSession };

    (localConfig.authentication as ISessionConfig).sessionId = sessionId;
    const repo = new QlikRepositoryClient(localConfig);

    const tagOperations = new TagOperations(repo);
    const {
      newTagData,
      getTagData,
      deleteTagData,
      updateTagData,
    } = await tagOperations.run();

    await proxyOperations.deleteSession(sessionId);

    expect(newTagData.status).to.be.eq(201) &&
      expect(getTagData.status).to.be.eq(200) &&
      expect(getTagData.data.id).to.be.eq(newTagData.data.id) &&
      expect(updateTagData.status).to.be.eq(200) &&
      expect(updateTagData.data.name).to.be.eq(tagOperations.tagNewName) &&
      expect(deleteTagData.status).to.be.eq(204);
  });
});

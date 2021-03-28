import assert from "assert";

describe("yapa", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "yapa");
  });
});

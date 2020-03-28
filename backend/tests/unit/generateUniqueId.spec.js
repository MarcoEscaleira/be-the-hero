const generateUniqueId = require("../../src/utils/generateUniqueId");

describe("Generate unique Id tests", () => {
  it("should generate a unique id", () => {
    expect(generateUniqueId()).toHaveLength(8);
  });
});
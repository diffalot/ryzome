import { root } from "./index";

test("default", async () => {
  const result = await root();
  expect(result).toBe("spring has sprung!!!");
});

test("echoes", async () => {
  const result = await root("word");
  expect(result).toBe("word");
});

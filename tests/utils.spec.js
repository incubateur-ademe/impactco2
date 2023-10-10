import { test, expect } from "@playwright/test";
import { buildCurrentUrlFor } from "utils/urls";

test.describe("describe title", () => {
  test("buildCurrentUrlFor returns an URL with http (without s) for a local URL", () => {
    let res = buildCurrentUrlFor("localhost:3000", "");
    expect(res).toEqual("http://localhost:3000");
  });
  test("buildCurrentUrlFor returns an URL with http (with s) for a remote URL", () => {
    let res = buildCurrentUrlFor("impactco2.fr", "");
    expect(res).toEqual("https://impactco2.fr");
  });
  test("buildCurrentUrlFor may add a path if needed", () => {
    let res = buildCurrentUrlFor("impactco2.fr", "/livraison");
    expect(res).toEqual("https://impactco2.fr/livraison");
  });
});

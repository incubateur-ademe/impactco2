import { test, expect } from "@playwright/test";
import { buildCurrentUrlFor } from "utils/urls";

test.describe("buildCurrentUrlFor", () => {
  test("returns an URL with http (without s) for a local URL", () => {
    let res = buildCurrentUrlFor("localhost:3000", "");
    expect(res).toEqual("http://localhost:3000");
  });
  test("returns an URL with http (with s) for a remote URL", () => {
    let res = buildCurrentUrlFor("impactco2.fr", "");
    expect(res).toEqual("https://impactco2.fr");
  });
  test("may add a path if needed", () => {
    let res = buildCurrentUrlFor("impactco2.fr", "/livraison");
    expect(res).toEqual("https://impactco2.fr/livraison");
  });
  test("may say that base URL is not defined", () => {
    let res = buildCurrentUrlFor(undefined, "/livraison");
    expect(res).toEqual("https://notdefined/livraison");
  });
});

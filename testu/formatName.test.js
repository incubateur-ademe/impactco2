import { formatName } from "utils/formatters";

describe("formatName", () => {
  test("transforme les s entre crochet par un simple s, par ex 'les' devient 'le'", () => {
    let res = formatName("le[s]");
    expect(res).toEqual("le");
  });
  test("transforme les x entre crochet par un simple x, par ex 'cadeaux' devient 'cadeau'", () => {
    let res = formatName("cadeau[x]");
    expect(res).toEqual("cadeau");
  });
  test("au singulier, le[s] cadeau[x] devient le cadeau", () => {
    let res = formatName("le[s] cadeau[x]");
    expect(res).toEqual("le cadeau");
  });
  test("au pluriel, le[s] cadeau[x] devient les cadeaux", () => {
    let res = formatName("le[s] cadeau[x]", 2);
    expect(res).toEqual("les cadeaux");
  });
});

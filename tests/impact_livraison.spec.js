import { mockRoutes } from "../test-mock/mock-route.js";

// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`);
  mockRoutes(page);
  await page.goto("/livraison");
  await expect(page.getByText("par livraison")).toHaveCount(1);
});

test("Affichage simulateur et source", async ({ page }) => {
  await test.step("On peut accèder à impact-livraison directement depuis l'URL du navigateur", async () => {
    await expect(page).toHaveTitle(/Impact Carbone de la livraison de colis | Impact CO2/);
  });
  await test.step("J'ai bien le titre de l'onglet, le fil d'ariane, et le lien vers la source qui s'affichent", async () => {
    await expect(page).toHaveTitle(/Impact Carbone de la livraison de colis | Impact CO2/);
    await expect(page.getByRole("heading").first()).toHaveText("Mesurer l'impact carbone de la livraison de colis");
    await expect(page.getByTestId("paragraph1")).toHaveText(
      "80 % des Français de 11 ans et plus font des achats en ligne."
    );
    await expect(page.getByTestId("lien-etude-ademe")).toHaveText("Commerce en ligne - Étude ADEME 2023 ");
  });
  await test.step("J'ai bien le texte explicatif qui s'affiche", async () => {
    await expect(page.getByTestId("paragraph1")).toHaveText(
      "80 % des Français de 11 ans et plus font des achats en ligne."
    );
  });
});

test("Calcul de l'impact d'une livraison", async ({ page }) => {
  await test.step("Le produit par défaut est l'habillement", async () => {
    let currentProduit = await page.$eval(
      "select#produits",
      (sel) => sel.options[sel.options.selectedIndex].textContent
    );
    expect(currentProduit).toEqual("Habillement (vêtements, chaussures, accessoires…)");
  });
  await test.step("Le mode de retrait par défaut est le point relais", async () => {
    let currentRetrait = await page.$eval(
      "select#retraits",
      (sel) => sel.options[sel.options.selectedIndex].textContent
    );
    expect(currentRetrait).toEqual("Point relais");
  });

  await test.step("Par défaut un calcul de CO2 est affiché", async () => {
    // Given
    await expect(page.getByTestId("resultAsText")).toHaveText("3,31 kg de CO2e ");
  });

  await test.step("Si on prend un colis volumineux, on a bien une augmentation de CO2", async () => {
    // Given
    await page.locator("select#retraits").selectOption({ label: "Livraison à domicile" });
    await page.locator("select#produits").selectOption({ label: "Mobilier et gros électroménager" }); // Ici
    // When-Then
    await expect(page.getByTestId("resultAsText")).toHaveText("70,59 kg de CO2e ");
  });

  await test.step("La liste déroulante “Vous commandez a bien les options “grande consommation”, “Habillement”, “Produits culturel“, “mobilier”", async () => {
    await page
      .locator("select#produits")
      .selectOption({ label: "Produits de grande consommation (aliments, épicerie, boissons…)" });
    await page.locator("select#produits").selectOption({ label: "Habillement (vêtements, chaussures, accessoires…)" });
    await page.locator("select#produits").selectOption({ label: "Produits culturels (CD, livres, DVD…)" });
    await page.locator("select#produits").selectOption({ label: "Mobilier et gros électroménager" });
  });

  await test.step("La liste déroulante “Que vous faites livrer” a bien 3 options", async () => {
    await page.locator("select#retraits").selectOption({ label: "Livraison à domicile" });
    await page.locator("select#retraits").selectOption({ label: "Point relais" });
    await page.locator("select#retraits").selectOption({ label: "Click & collect" });
  });
});

test("Equivalences", async ({ page }) => {
  await test.step("Les équivalences par défaut s'affichent", async () => {
    await expect(page.locator("#eq_nb_1")).toHaveText("15 km");
    await expect(page.locator("#eq_what_1")).toHaveText("en voiture");

    await expect(page.locator("#eq_nb_2")).toHaveText("0,5 repas");
    await expect(page.locator("#eq_what_2")).toHaveText("avec du boeuf");

    await expect(page.locator("#eq_nb_3")).toHaveText("52 heures");
    await expect(page.locator("#eq_what_3")).toHaveText("de streaming vidéo");
  });

  await test.step("Une modale d'explication s'affiche", async () => {
    // Given
    await expect(page.getByRole("button", { name: "Fermer" })).not.toBeVisible();
    // When
    await page.getByRole("button", { name: "Comprendre le calcul" }).click();
    // Then
    await page.getByRole("button", { name: "Fermer" }).click();
  });

  await test.step("On peut ouvrir une modale pour choisir une autre équivalence", async () => {
    // Given
    await expect(page.getByRole("heading", { name: "Choisir une autre équivalence" })).not.toBeVisible();
    // When
    await page.locator("#button_change_eq_1").click();
    // Then
    await expect(page.getByRole("heading", { name: "Choisir une autre équivalence" })).toBeVisible();
  });

  await test.step("Une liste réduite s'affiche si on cherche une autre équivalence", async () => {
    // Given
    await expect(page.locator(".equivalent-radio")).toHaveCount(9);

    await page.getByPlaceholder("Recherchez un autre équivalent").click({ force: true });
    await page.keyboard.type("b");
    await page.keyboard.type("a");
  });
  await test.step("On peut choisir une autre équivalence", async () => {
    // Given
    await page.getByRole("button", { name: "Banane" }).click();
    // When
    await page.getByRole("button", { name: "Valider et fermer" }).click();
    // Then
    await expect(page.locator("#eq_nb_1")).toHaveText("3,8 kg");
    await expect(page.locator("#eq_what_1")).toHaveText("de banane");
  });
});

import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "admin/administrar_llamados",
  "admin/llamados/editar/1",
  "admin/nuevo_llamado",
  "api/user",
  "calificar_postulacion/1",
  "descargar_curriculum/1",
  "generar_orden_de_merito/1",
  "jefe_catedra/postulaciones",
  "login",
  "password/confirm",
  "password/reset",
  "password/reset/1",
  "postulaciones",
  "postulaciones/create",
  "postulaciones/create/1",
  "postulaciones/1",
  "postulaciones/1/edit",
  "register",
  "sanctum/csrf-cookie",
  "test/1",
  "users",
  "users/create",
  "users/1",
  "users/1/edit",
  "vacantes_cerradas",
  "vacantes_mi_catedra",
  "1/postulaciones",
];

const base_url = "http://localhost:8000/";
for (let route of routes) {
  test("html " + route, async ({ page }) => {
    await page.goto("https://validator.w3.org/nu/#textarea");

    const html = await fetch(base_url + route).then((x) => x.text());
    await page.$("textarea").then((x) => x?.fill(html));

    const btn = await page.$("#submit");
    expect(btn).toBeTruthy();
    await btn?.click();

    await page.setViewportSize({
      width: 1280 * 2,
      height: 800 * 2,
    });

    const file_name = route.replace(new RegExp("/", "g"), "-");
    const path = `out/${file_name}.png`;
    await page.screenshot({ path });

    expect(1 + 1).toBe(2);
  });
}

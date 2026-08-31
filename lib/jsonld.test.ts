import { test } from "node:test";
import assert from "node:assert/strict";
import {
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateServiceSchema,
  generateWebsiteSchema,
  BRAND_NAME,
  BRAND_ALTERNATE_NAMES,
  BRAND_URL,
  BRAND_SAME_AS,
} from "./jsonld.ts";

test("generateOrganizationSchema exposes brand name, alternate names and identifier for entity disambiguation", () => {
  const schema = generateOrganizationSchema();

  assert.equal(schema.name, BRAND_NAME);
  assert.deepEqual(schema.alternateName, BRAND_ALTERNATE_NAMES);
  assert.equal(schema.identifier, BRAND_URL);
  assert.equal(schema.url, BRAND_URL);
  assert.deepEqual(schema.sameAs, BRAND_SAME_AS);
  // Regression guard: must remain a multi-type entity (TravelAgency + LocalBusiness + Organization)
  assert.deepEqual(schema["@type"], ["TravelAgency", "LocalBusiness", "Organization"]);
});

test("BRAND_SAME_AS includes the same Google Maps Business Profile link used on the contact page", () => {
  assert.ok(BRAND_SAME_AS.includes("https://maps.app.goo.gl/Gou7H9Ls6hAWSPpx5"));
  assert.ok(BRAND_SAME_AS.includes("https://www.instagram.com/karimunjawa.tours"));
});

test("generateWebsiteSchema declares a WebSite entity distinct from the Organization entity", () => {
  const schema = generateWebsiteSchema();

  assert.equal(schema["@type"], "WebSite");
  assert.equal(schema.name, BRAND_NAME);
  assert.deepEqual(schema.alternateName, BRAND_ALTERNATE_NAMES);
  assert.equal(schema.url, BRAND_URL);
  assert.equal(schema.publisher.name, BRAND_NAME);
  assert.equal(schema.publisher.url, BRAND_URL);
});

test("generateBreadcrumbSchema still builds absolute URLs against the canonical apex domain", () => {
  const schema = generateBreadcrumbSchema([
    { label: "Beranda", href: "/" },
    { label: "Tentang Kami" },
  ]);

  assert.equal(schema["@type"], "BreadcrumbList");
  assert.equal(schema.itemListElement[0].item, `${BRAND_URL}/`);
  assert.equal(schema.itemListElement[0].position, 1);
});

test("generateServiceSchema still references the same brand name as provider", () => {
  const schema = generateServiceSchema();
  assert.equal(schema.provider.name, BRAND_NAME);
  assert.equal(schema.provider.url, BRAND_URL);
});

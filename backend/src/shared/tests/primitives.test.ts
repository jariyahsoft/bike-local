import assert from "node:assert/strict";
import test from "node:test";
import { asMinorUnitAmount } from "../domain/index.js";

test("money must use integer minor units", () => {
  assert.equal(asMinorUnitAmount(100), 100);
  assert.throws(() => asMinorUnitAmount(10.5), /integer minor units/);
});

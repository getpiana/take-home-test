import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });
  it("normal Dafalgan should decrease the benefit twice as fast as Doliprane", () => {
    // Normal behavior
    const drugs = [new Drug("Doliprane", 2, 3), new Drug("Dafalgan", 2, 3)];
    const pharmacy = new Pharmacy(drugs);
    expect(pharmacy.updateBenefitValue()).toEqual([
      new Drug("Doliprane", 1, 2),
      new Drug("Dafalgan", 1, 1),
    ]);
  });
  it("expired Dafalgan should decrease the benefit twice as fast as Doliprane", () => {
    // Expired behavior
    const drugs = [new Drug("Doliprane", 0, 5), new Drug("Dafalgan", 0, 5)];
    const pharmacy = new Pharmacy(drugs);
    expect(pharmacy.updateBenefitValue()).toEqual([
      new Drug("Doliprane", -1, 3),
      new Drug("Dafalgan", -1, 1),
    ]);
  });
});

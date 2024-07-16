import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });

  it("should never underflow", () => {
    expect(new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 0)],
    );
  });

  describe("Dafalgan", () => {
    it("normal: decrease the benefit and expiresIn", () => {
      const pharmacy = new Pharmacy([new Drug("Dafalgan", 2, 3)]);
      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Dafalgan", 1, 1),
      ]);
    });

    it("expired: decrease the benefit and expiresIn", () => {
      const pharmacy = new Pharmacy([new Drug("Dafalgan", 0, 5)]);
      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Dafalgan", -1, 1),
      ]);
    });

    it("should not underflow", () => {
      const pharmacy = new Pharmacy([new Drug("Dafalgan", 0, 3)]);
      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Dafalgan", -1, 0),
      ]);
    });
  });

  describe("Doliprane", () => {
    it("normal: decrease the benefit and expiresIn", () => {
      const pharmacy = new Pharmacy([new Drug("Doliprane", 2, 3)]);
      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Doliprane", 1, 2),
      ]);
    });

    it("expired: decrease the benefit and expiresIn", () => {
      const pharmacy = new Pharmacy([new Drug("Doliprane", 0, 5)]);
      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Doliprane", -1, 3),
      ]);
    });
  });

  describe("Herbal Tea", () => {
    it("normal: increase the benefit and expiresIn", () => {
      const pharmacy = new Pharmacy([new Drug("Herbal Tea", 2, 3)]);
      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Herbal Tea", 1, 4),
      ]);
    });

    it("expired: increase the benefit and expiresIn", () => {
      const pharmacy = new Pharmacy([new Drug("Herbal Tea", 0, 5)]);
      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Herbal Tea", -1, 7),
      ]);
    });

    it("should not overflow", () => {
      const pharmacy = new Pharmacy([new Drug("Herbal Tea", -1, 49)]);
      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Herbal Tea", -2, 50),
      ]);
    });
  });

  describe("Magic Pill", () => {
    it("normal: decrease the benefit and expiresIn", () => {
      const pharmacy = new Pharmacy([new Drug("Magic Pill", 2, 3)]);
      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Magic Pill", 2, 3),
      ]);
    });

    it("expired: decrease the benefit and expiresIn", () => {
      const pharmacy = new Pharmacy([new Drug("Magic Pill", -1, 5)]);
      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Magic Pill", -1, 5),
      ]);
    });
  });

  describe("Fervex", () => {
    it("> 10 days: increase the benefit and expiresIn", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 12, 3)]);
      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Fervex", 11, 4),
      ]);
    });

    it("> 5 days: increase the benefit and expiresIn", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 7, 3)]);
      expect(pharmacy.updateBenefitValue()).toEqual([new Drug("Fervex", 6, 5)]);
    });

    it("expired: reset the benefit", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", -1, 5)]);
      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Fervex", -2, 0),
      ]);
    });
  });
});

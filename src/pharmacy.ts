export class Drug {
  name: string;
  expiresIn: number;
  benefit: number;

  constructor(name: string, expiresIn: number, benefit: number) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  change_benefit(amount: number) {
    if (this.expiresIn < 0) {
      amount *= 2;
    }
    this.benefit = Math.min(Math.max(0, this.benefit + amount), 50);
  }
}

export class Pharmacy {
  constructor(public drugs: Drug[] = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      if (drug.name == "Magic Pill") return;

      drug.expiresIn -= 1;

      switch (drug.name) {
        case "Herbal Tea":
          drug.change_benefit(+1);
          break;
        case "Fervex":
          if (drug.expiresIn < 0) {
            drug.benefit = 0;
            break;
          }
          drug.change_benefit(+1);
          if (drug.expiresIn < 11) {
            drug.change_benefit(+1);
          }
          if (drug.expiresIn < 6) {
            drug.change_benefit(+1);
          }
          break;
        case "Dafalgan":
          drug.change_benefit(-2);
          break;
        default:
          drug.change_benefit(-1);
          break;
      }
    });

    return this.drugs;
  }
}

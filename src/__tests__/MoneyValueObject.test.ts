import Money from "js-money";
import { MoneyValueObject } from "../MoneyValueObject";

describe("Test MoneyValueObject", () => {
  test("isNull() should return false", () => {
    const m = new MoneyValueObject(new Money(200, Money.EUR));
    expect(m.isNull()).toBeFalsy();
  });

  test("isSame() returns true when amount and currency match", () => {
    const m1 = new MoneyValueObject(new Money(200, Money.EUR));
    const m2 = new MoneyValueObject(new Money(200, Money.EUR));

    expect(m1.isSame(m2)).toBeTruthy();
  });

  test("isSame() returns false when amount does not match", () => {
    const m1 = new MoneyValueObject(new Money(300, Money.EUR));
    const m2 = new MoneyValueObject(new Money(200, Money.EUR));

    expect(m1.isSame(m2)).toBeFalsy();
  });

  test("isSame() returns false when currency does not match", () => {
    const m1 = new MoneyValueObject(new Money(200, Money.EUR));
    const m2 = new MoneyValueObject(new Money(200, Money.GBP));

    expect(m1.isSame(m2)).toBeFalsy();
  });

  test("fromNative() correctly instantiates", () => {
    const native = {
      amount: 200,
      currency: "GBP"
    };
    const m = MoneyValueObject.fromNative(native);

    expect(m.toNative()).toStrictEqual(native);
  });

  test("toNative() returns expected serialiation of money", () => {
    const m = new MoneyValueObject(new Money(200, Money.EUR));

    expect(m.toNative()).toStrictEqual({
      amount: 200,
      currency: "EUR"
    });
  });

  test("getMoney() returns expected Money object", () => {
    const money = new Money(200, Money.EUR);
    const m = new MoneyValueObject(money);

    expect(m.getMoney()).toStrictEqual(money);
  });
});

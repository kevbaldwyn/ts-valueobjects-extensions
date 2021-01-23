import { v4, version } from "uuid";
import { UuidValueObject } from "../UuidValueObject";

describe("Test UuidValueObject", () => {
  test("constructor() should validate uuid", () => {
    expect(() => {
      const v = new UuidValueObject("gjgygkhgkjhg");
      v.isNull();
    }).toThrowError("Value must be a valid UUID");
  });

  test("fromNative() correctly instantiates", () => {
    const native = v4();
    const v = UuidValueObject.fromNative(native);

    expect(v.toNative()).toStrictEqual(native);
  });

  test("generate() correctly instantiates v4 uuid", () => {
    const v = UuidValueObject.generate();

    expect(version(v.toNative())).toBe(4);
  });

  test("generateV3() correctly instantiates v3 uuid", () => {
    const v = UuidValueObject.generateV3(
      "name",
      "1b671a64-40d5-491e-99b0-da01ff1f3341"
    );

    expect(version(v.toNative())).toBe(3);
  });

  test("generateV4() correctly instantiates v4 uuid", () => {
    const v = UuidValueObject.generateV4();

    expect(version(v.toNative())).toBe(4);
  });

  test("generateV5() correctly instantiates v5 uuid", () => {
    const v = UuidValueObject.generateV5(
      "name",
      "1b671a64-40d5-491e-99b0-da01ff1f3341"
    );

    expect(version(v.toNative())).toBe(5);
  });

  test("isNull() should return false", () => {
    const vo = new UuidValueObject(v4());
    expect(vo.isNull()).toBeFalsy();
  });

  test("isSame() returns true when uuids match", () => {
    const uuid = v4();
    const vo1 = new UuidValueObject(uuid);
    const vo2 = new UuidValueObject(uuid);

    expect(vo1.isSame(vo2)).toBeTruthy();
  });

  test("isSame() returns false when uuids do not match", () => {
    const vo1 = new UuidValueObject(v4());
    const vo2 = new UuidValueObject(v4());

    expect(vo1.isSame(vo2)).toBeFalsy();
  });

  test("getVersion() returns correct version", () => {
    const v = UuidValueObject.generateV4();
    expect(v.getVersion()).toBe(4);
  });
});

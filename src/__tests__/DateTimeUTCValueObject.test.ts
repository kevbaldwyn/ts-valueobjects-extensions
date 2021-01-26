import { DateTimeUTCValueObject } from "../DateTimeUTCValueObject";

describe("Test DateTimeUTCValueObject", () => {
  test("isNull() should return false", () => {
    const v = new DateTimeUTCValueObject({
      date: new Date(),
      timezone: "Europe/London"
    });
    expect(v.isNull()).toBeFalsy();
  });

  test("isSame() returns true when date and timezone match", () => {
    const v1 = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T23:16:00.000Z"),
      timezone: "Europe/London"
    });
    const v2 = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T23:16:00.000Z"),
      timezone: "Europe/London"
    });

    expect(v1.isSame(v2)).toBeTruthy();
  });

  test("isSame() returns false when date does not match", () => {
    const v1 = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/London"
    });
    const v2 = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T23:16:00.000Z"),
      timezone: "Europe/London"
    });

    expect(v1.isSame(v2)).toBeFalsy();
  });

  test("isSame() returns false when timezone does not match", () => {
    const v1 = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T23:16:00.000Z"),
      timezone: "Europe/Paris"
    });
    const v2 = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T23:16:00.000Z"),
      timezone: "Europe/London"
    });

    expect(v1.isSame(v2)).toBeFalsy();
  });

  test("fromNative() correctly instantiates", () => {
    const native = {
      date: "2021-01-11T23:16:00.000Z",
      timezone: "Europe/London"
    };
    const v = DateTimeUTCValueObject.fromNative(native);

    expect(v.toNative()).toStrictEqual(native);
  });

  test("toNative() returns expected serialiation of DateTime", () => {
    const v = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T23:16:00.000Z"),
      timezone: "Europe/London"
    });

    expect(v.toNative()).toStrictEqual({
      date: "2021-01-11T23:16:00.000Z",
      timezone: "Europe/London"
    });
  });

  test("fromLocalUTC() returns expected object", () => {
    const v = DateTimeUTCValueObject.fromLocalUTC(
      "2021-01-11T23:16:00.000+01:00",
      "Europe/Paris"
    );
    expect(v.toNative()).toStrictEqual({
      date: "2021-01-11T22:16:00.000Z",
      timezone: "Europe/Paris"
    });
  });

  test("toLocalUTC() returns expected string", () => {
    const v = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/Paris"
    });
    expect(v.toLocalUTC()).toBe("2021-01-11T23:16:00.000+01:00");
  });

  test("withTimezone() creates new object with expected timezone and does not change original object", () => {
    const london = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/London"
    });

    const paris = london.withTimezone("Europe/Paris");

    expect(london.toNative()).toStrictEqual({
      date: "2021-01-11T22:16:00.000Z",
      timezone: "Europe/London"
    });
    expect(london.isSame(paris)).toBeFalsy();

    expect(paris.toLocalUTC()).toBe("2021-01-11T23:16:00.000+01:00");
    expect(paris.toNative()).toStrictEqual({
      date: "2021-01-11T22:16:00.000Z",
      timezone: "Europe/Paris"
    });
  });

  test("format() correctly formats date", () => {
    const v = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/London"
    });

    expect(v.format("yyyy/MM/dd HH:mm (z)")).toBe("2021/01/11 22:16 (GMT)");
  });

  test("isBefore() returns true if date in same timezone is before", () => {
    const v1 = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/London"
    });
    const v2 = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T23:16:00.000Z"),
      timezone: "Europe/London"
    });
    expect(v1.isBefore(v2)).toBeTruthy();
  });

  test("isBefore() returns true for same date in earlier timezone", () => {
    const london = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/London"
    });
    const paris = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/Paris"
    });
    expect(london.isBefore(paris)).toBeTruthy();
  });

  test("isBefore() returns false if date in same timezone is after", () => {
    const v1 = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T23:16:00.000Z"),
      timezone: "Europe/London"
    });
    const v2 = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/London"
    });
    expect(v1.isBefore(v2)).toBeFalsy();
  });

  test("isBefore() returns false for same date in earlier timezone", () => {
    const london = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T23:30:00.000Z"),
      timezone: "Europe/London"
    });
    const paris = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/Paris"
    });
    expect(london.isBefore(paris)).toBeFalsy();
  });

  test("isAfter() returns true if date in same timezone is after", () => {
    const v1 = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T23:16:00.000Z"),
      timezone: "Europe/London"
    });
    const v2 = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/London"
    });
    expect(v1.isAfter(v2)).toBeTruthy();
  });

  test("isAfter() returns true for same date in later timezone", () => {
    const london = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/London"
    });
    const paris = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/Paris"
    });
    expect(paris.isAfter(london)).toBeTruthy();
  });

  test("isAfter() returns false if date in same timezone is before", () => {
    const v1 = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/London"
    });
    const v2 = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T23:16:00.000Z"),
      timezone: "Europe/London"
    });
    expect(v1.isAfter(v2)).toBeFalsy();
  });

  test("isAfter() returns false for same date in later timezone", () => {
    const london = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/London"
    });
    const paris = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:30:00.000Z"),
      timezone: "Europe/Paris"
    });
    expect(london.isAfter(paris)).toBeFalsy();
  });

  test("getDate() should return timezone corrected date object", () => {
    const v = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/Paris"
    });
    expect(v.getDate().toUTCString()).toBe("Mon, 11 Jan 2021 23:16:00 GMT");
  });

  test("should not allow changing of internal date properties", () => {
    const v = new DateTimeUTCValueObject({
      date: new Date("2021-01-11T22:16:00.000Z"),
      timezone: "Europe/London"
    });

    expect(() => {
      v.value.date = new Date();
    }).toThrowError();
    expect(() => {
      v.value.timezone = "Europe/Paris";
    }).toThrowError();
  });
});

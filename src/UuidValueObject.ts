import { v1, v3, v4, v5, validate, version } from "uuid";
import { StringScalar } from "ts-valueobjects";

export class UuidValueObject extends StringScalar {
  constructor(value: string) {
    super(value);
    if (!validate(value)) {
      throw new Error("Value must be a valid UUID");
    }
  }

  public static fromNative(value: string): UuidValueObject {
    return new this(value);
  }

  public static generate(): UuidValueObject {
    return this.generateV4();
  }

  public static generateV1(): UuidValueObject {
    return new this(v1());
  }

  public static generateV3(name: string, namespace: string): UuidValueObject {
    return new this(v3(name, namespace));
  }

  public static generateV4(): UuidValueObject {
    return new this(v4());
  }

  public static generateV5(name: string, namespace: string): UuidValueObject {
    return new this(v5(name, namespace));
  }

  public getVersion = (): number => {
    return version(this.value);
  };
}

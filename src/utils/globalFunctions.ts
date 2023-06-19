export class GlobalFunctions {
  private constructor() {}

  static getProperties(body: Record<string, any>, props: string[]) {
    const bodyProps = Object.keys(body);

    return bodyProps.every((bodyP) => props.includes(bodyP));
  }
}

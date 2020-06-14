let deParaType = new Map();
deParaType.set("string", "S");

export default class DynamoFactory {

  static process(obj: any) {

    Object.keys(obj).forEach((key) => {
      let originalValue = obj[key];
      let valueType = (typeof obj[key]).toLowerCase();
      let dePara = deParaType.get(valueType);

      obj[key] = {
        [dePara]: originalValue
      };
    });

    return obj;
  }

  static validateRequiredFields(fields: Array<any>, obj: any) {

    return !fields.some((value) => {
      console.log(value);
      return obj[value] === undefined
        || obj[value] === null
    });

  }

}
import { profileEnd } from "console";

export function AssignOptions(values: any, defauls: any): any {
  const result: any = {};
  const propertyNames = Object.getOwnPropertyNames(defauls);
  for (const name in propertyNames) {
    result[name] = values[name] ?? defauls[name];
  }
}

export function DestructureMessage(text: string) {
  const firstSpace = text.indexOf(" ");
  const cutLocation = firstSpace != -1 ? firstSpace : text.length;
  const command = text.substring(0, cutLocation);
  const args = text.substring(cutLocation + 1);

  return { command, rawArgs: args };
}

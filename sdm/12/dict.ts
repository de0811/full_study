class Dict<T> {
  // type DictDataType : { [key: string]: T };
  private map: { [key: string]: T };
  constructor() {
    this.map = {};
  }
  push(key: string, val: T): T;
  push(ob: { [key: string]: T }): void;
  push(kob: any, val?: T): T | void {
    if (typeof kob === "string" && val !== undefined) {
      return (this.map[kob] = val);
    } else if (typeof this.map === typeof kob) {
      this.map = { ...this.map, ...kob };
    }
  }
  get(key: string): T {
    return this.map[key];
  }
  delete(key: string): T {
    let result = this.map[key];
    // delete this.map[key];
    Reflect.deleteProperty(this.map, key);
    return result;
  }
  size(): number {
    return Object.keys(this.map).length;
  }
  isEmpty(): boolean {
    if (this.size() === 0) return true;
    return false;
  }
  isNotEmpty(): boolean {
    return !this.isEmpty();
  }
  clone(): { [key: string]: T } {
    return { ...this.map };
  }
}

const dict = new Dict<number>();
dict.push("hello", 1);
dict.push("123", 23);
console.log(dict.get("hello"));
dict.delete("123");
const dict1 = new Dict<number>();
dict1.push("asd", 123);
dict.push(dict1.clone());
const dict2 = new Dict<string>();
dict2.push("1111", "asddd");
// dict.push(dict2);  //T가 다름

dict;
dict1;

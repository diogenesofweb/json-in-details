import { openDB, DBSchema } from "idb";

interface MyDB extends DBSchema {
  JSON: {
    value: IMyDBValue;
    key: Date;
  };
}
interface IMyDBValue {
  name: string;
  src: "file" | "url" | "form";
  json: any;
  date: Date;
}

import { Plugin } from "payload";
import { multiTenancy } from "./tenants";

export const plugins:Plugin[] = [
    multiTenancy
]
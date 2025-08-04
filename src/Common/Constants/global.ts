export const ENV = process.env.ENV || "local";

console.log(ENV);

export const enum envs {
  LOCAL = "LOCAL",
  PROD = "PROD",
}

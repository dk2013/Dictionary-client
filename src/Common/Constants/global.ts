export const ENV = process.env.REACT_APP_ENV || "LOCAL";

console.log(ENV);

export const enum envs {
  LOCAL = "LOCAL",
  PROD = "PROD",
}

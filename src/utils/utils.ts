import proj4 from "proj4";

export const classNames = (...args: any[]) => {
  return args.filter(Boolean).join(" ");
};

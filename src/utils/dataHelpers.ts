import { BigNumber } from "alchemy-sdk";

// 0x5940ff9c3792248c3c26aab53fd2fb5a9e51e50529101468ec8df2efee642192 => 0x594...42192
export const getAbreviatedHash = (hash: string) =>
  hash.slice(0, 5) + " ... " + hash.slice(hash.length - 5);

/**
 * @dev why? becasue the big Int we get from the request cant get the expected propierties, since that type is not standart in the web/js
 * @param {BigNumber} number encountered in any amount used in etherium
 * @returns {string} Int reprenstation of the hex value
 */
export const getIntFromHex = (number: BigNumber): string => {
  const reMadeBigInt = BigNumber.from(number);
  return reMadeBigInt.toString();
};

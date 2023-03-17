/**
 * If the value is greater than zero, return true, otherwise return false.
 * @param {number} value - number - The value to be validated.
 * @returns A function that takes a number and returns a boolean.
 */
export const costoValorOk = (value: number ): boolean =>{

    if(value > 0) return true;

    return false;
}
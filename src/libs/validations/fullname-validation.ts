
/**
 * It checks if the string has a space, and if each word starts with a capital letter.
 * @param {string} value - string: The value to be validated.
 * @returns A function that takes a string and returns a boolean.
 */
export const isFullNameOK = (value : string): boolean =>{

const dataTest = value;

  // Verifico que haya un espacio en el nombre y el apellido
  if (!/\s/.test(dataTest)) {
    return false;
  }

  // Verifico que cada palabra del nombre completo comience con mayúscula
  const nameParts = dataTest.split(' ');

  const isValidNameParts = nameParts.every((part) => /^[A-Z][a-z]*$/.test(part));
  
  if (!isValidNameParts) {
    return false;
  }

  return true;
};
 
 
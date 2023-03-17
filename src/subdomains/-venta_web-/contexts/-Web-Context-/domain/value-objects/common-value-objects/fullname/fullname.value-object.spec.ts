import { FullnameValueObject } from './fullname.value-object';

/* Testing the constructor of the FullnameValueObject class.

Aquí se utiliza la función describe() para agrupar las pruebas relacionadas en diferentes bloques.
La función it() para definir cada prueba individual.
La función expect() se utiliza para hacer afirmaciones sobre el comportamiento del código.
Para correr las pruebas, puedes ejecutar el comando npm test en tu terminal.

*/


describe("FullnameValueObject", () => {
  describe("constructor", () => {
    it("should create a FullnameValueObject instance with the correct value", () => {
      const value = "Homero Simpson";
      const nombreCliente = new FullnameValueObject(value);
      expect(nombreCliente).toEqual(value);
    });
  });


  describe("validateData", () => {
    it("should not throw an error for a valid name", () => {
      const value = "Homero Simpson";
      const nombreCliente = new FullnameValueObject(value);
      expect(() => {
        nombreCliente.validateData();
      }).not.toThrow();
    });


    it("should throw an error for a name with numbers", () => {
      const value = "Hom3ro S1mpson";
      const nombreCliente = new FullnameValueObject(value);
      expect(() => {
        nombreCliente.validateData();
      }).toThrow('El dato ingresado en "nombreCliente" no contiene una estructura valida ');
    });


    it("should throw an error for a name with spaces only", () => {
      const value = "BR U NN O ";
      const nombreCliente = new FullnameValueObject(value);
      expect(() => {
        nombreCliente.validateData();
      }).toThrow('El dato ingresado en "nombreCliente" no contiene una estructura valida ');
    });
  });
});
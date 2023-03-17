import {costoValorOk} from'./costo-validation'




/* A test that is going to pass because the function isphoneOk is going to accept the string
       '' */
describe('costoValorOk', () => {
    let validador: typeof costoValorOk;
  
    // Antes de todas las pruebas
    beforeAll(() => {});
  
    // Antes de cada prueba
    beforeEach(() => {
      // Arrange
      validador = costoValorOk;
    });
  
    it('esto debería definir la función', () => {
      // Assert
      expect(validador).toBeDefined();
    });


    //POSITIVA
  
   /* A test that is going to pass because the function isphoneOk is going to accept the string
       '' */
    it('debería ser verdadero', () => {
      // Arrange
      const costo = 20; //CON ESTE NUMERO EL RESULTADO TIENE QUE SER TRUE
      const expected = true;
  
      // Act
      const result = validador(costo);
  
      // Assert
      expect(result).toEqual(expected);
    })
  

    //NEGATIVA

    /* A test that is going to fail because the function isphoneOk is not going to accept the string
    'LLAMAME BEBE!' */
    it('debería ser falso', () => {
      // Arrange
      const valor = 0 ;
      const expected = false;
  
      // Act
      const result = validador(valor);
  
      // Assert
      expect(result).toEqual(expected);
    })
  


    // Despues de cada prueba
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    // Despues de todas las pruebas
    afterAll(() => {
      jest.restoreAllMocks();
    });
  });
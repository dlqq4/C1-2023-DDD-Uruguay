import {isphoneOk} from'./phone-validation'


/* A test that is going to pass because the function isphoneOk is going to accept the string
       '0913664417' */
describe('isphoneOk', () => {
    let validador: typeof isphoneOk;
  
    // Antes de todas las pruebas
    beforeAll(() => {});
  
    // Antes de cada prueba
    beforeEach(() => {
      // Arrange
      validador = isphoneOk;
    });
  
    it('esto debería definir la función', () => {
      // Assert
      expect(validador).toBeDefined();
    });


    //POSITIVA
  
   /* A test that is going to pass because the function isphoneOk is going to accept the string
       '0913664417' */
    it('debería ser verdadero', () => {
      // Arrange
      const telefono = '091364417'; 
      const expected = true;
  
      // Act
      const result = validador(telefono);
  
      // Assert
      expect(result).toEqual(expected);
    })
  

    //NEGATIVA

    /* A test that is going to fail because the function isphoneOk is not going to accept the string
    'LLAMAME BEBE!' */
    it('debería ser falso', () => {
      // Arrange
      const date = 'LLAMAME BEBE!';
      const expected = false;
  
      // Act
      const result = validador(date);
  
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
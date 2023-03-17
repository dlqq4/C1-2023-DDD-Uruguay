import {isFullNameOK} from'./fullname-validation'


/* A test that is going to pass because the function isFullNameOK is going to accept the string
       'Bruno Fernandez' */
describe('isFullNameOK', () => {
    let validador: typeof isFullNameOK;
  
    // Antes de todas las pruebas
    beforeAll(() => {});
  
    // Antes de cada prueba
    beforeEach(() => {
      // Arrange
      validador = isFullNameOK;
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
      const nombre = 'Bruno Fernandez';
      const expected = true;
  
      // Act
      const result = validador(nombre);
  
      // Assert
      expect(result).toEqual(expected);
    })
  

    //NEGATIVA

    /* A test that is going to fail because the function isphoneOk is not going to accept the string
    'LLAMAME BEBE!' */
    it('debería ser falso', () => {
      // Arrange
      const nombreMal = '';
      const expected = false;
  
      // Act
      const result = validador(nombreMal);
  
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
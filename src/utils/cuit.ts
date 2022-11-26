/**
 * @module cuit
 */

const _isLengthOk = (documentNumber:string, documentType:string, countryCode:string): boolean => {
    return (!!documentNumber && documentNumber.length == 11);
};
  
const _isTypeOk = (documentNumber:string, documentType:string, countryCode:string): boolean => {
    if (!documentNumber || !documentNumber.substr) return false
    var code = parseInt(documentNumber.substr(0, 2), 10);
    var validTypes = [20, 23, 24, 27, 30, 33, 34];
    return validTypes.indexOf(code) > -1;
};
  
const _checksumIsOk = (documentNumber:string, documentType:string, countryCode:string): boolean => {
    if (!documentNumber) return false
    documentNumber = String(documentNumber);
    const aCUIT:string[] = documentNumber.split('');
  
    const aMult = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i <= 9; i++) 
        sum += parseInt(aCUIT[i]) * aMult[i];
  
    let diff = 11 - (sum % 11);
    const checksum = parseInt(aCUIT[10]);
  
    if (diff == 11) diff = 0; // do not consider diff == 10
  
    return (diff == checksum);
}
  
/**
 * @description Returns whether a given CUIT or CUIL is valid
 * @param {string} cuit
 * @returns {boolean} isValid
 */
const isValid = (documentNumber:string, documentType:string, countryCode:string): boolean => {
    return _isLengthOk(documentNumber, documentType, countryCode) && _isTypeOk(documentNumber, documentType, countryCode) && _checksumIsOk(documentNumber, documentType, countryCode);
};
  
/**
 * Cuil format is: AB - document_number - C
 * Author: Nahuel Sanchez, Woile
 *
 * @param {str} document_number -> string solo digitos
 * @param {str} gender -> debe contener HOMBRE, MUJER o SOCIEDAD
 *
 * @return {str}
 **/
  const calculateCuilCuit = (documentNumber:string, gender:string) : string => {
    
    const HOMBRE = ["HOMBRE", "M", "MALE"],
      MUJER = ["MUJER", "F", "FEMALE"],
      SOCIEDAD = ["SOCIEDAD", "S", "SOCIETY"];
    let AB, C;
  
    /**
     * Verifico que el document_number tenga exactamente ocho numeros y que
     * la cadena no contenga letras.
     */
    if (documentNumber.length != 8 || isNaN(parseInt(documentNumber))) {
      if (documentNumber.length == 7 && !isNaN(parseInt(documentNumber)))
        documentNumber = "0".concat(documentNumber);
      else 
        throw "El numero de document_number ingresado no es correcto.";
    }
  
    /**
     * De esta manera permitimos que el gender venga en minusculas,
     * mayusculas y titulo.
     */
    gender = gender.toUpperCase();
  
    // Defino el valor del prefijo.
    if (HOMBRE.indexOf(gender) >= 0) 
      AB = "20";
    else if (MUJER.indexOf(gender) >= 0) 
      AB = "27";
    else 
      AB = "30";
    
    /*
     * Los numeros (excepto los dos primeros) que le tengo que
     * multiplicar a la cadena formada por el prefijo y por el
     * numero de document_number los tengo almacenados en un arreglo.
     */
    const multiplicadores = [3, 2, 7, 6, 5, 4, 3, 2];
  
    // Realizo las dos primeras multiplicaciones por separado.
    let calculo = parseInt(AB.charAt(0)) * 5 + parseInt(AB.charAt(1)) * 4;
  
    /*
     * Recorro el arreglo y el numero de document_number para
     * realizar las multiplicaciones.
     */
    for (let i = 0; i < 8; i++) {
      calculo += parseInt(documentNumber.charAt(i)) * multiplicadores[i];
    }
  
    // Calculo el resto.
    let resto:number = calculo % 11;
  
    /*
     * Llevo a cabo la evaluacion de las tres condiciones para
     * determinar el valor de C y conocer el valor definitivo de
     * AB.
     */
    if (SOCIEDAD.indexOf(gender) < 0 && resto == 1) {
      C = (HOMBRE.indexOf(gender) >= 0) ? "9" : "4";
      AB = "23";
    } else if (resto === 0) 
      C = "0";
    else
      C = 11 - resto;
  
    // Generate cuit
    const cuil_cuit = `${AB}${documentNumber}${C}`;
    return cuil_cuit;
  }
  
  module.exports = {
    _isLengthOk: _isLengthOk,
    _checksumIsOk: _checksumIsOk,
    _isTypeOk: _isTypeOk,
    isValid: isValid,
    calculateCuilCuit: calculateCuilCuit
  };
  
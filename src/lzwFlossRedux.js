/* jshint esversion: 6, curly: true, eqeqeq: true, forin: true */

/***********************************************************************************
* Title: lzwFlossRedux                                                             *
* Description: 100% Vanilla Javascript Multithreaded LZW Compression Library       *
* Author: Austin K. Smith                                                          *
* Contact: austin@asmithdev.com                                                    *  
* Copyright: 2015 Austin K. Smith - austin@asmithdev.com                           * 
* License: Artistic License 2.0                                                    *
***********************************************************************************/

'use strict';

class lzwFlossReduxjs {

  /**
  * @constructor
  * @function constructor - Sets properties for this class
  */
  constructor() {
    version: "1.0.0",
    encode: lzwEncode,
    decode: lzwDecode
  }

  /**
  * @description: Generates a thread and lzw encodes the supplied string
  * @method encode
  * @param {string} inputString
  * @param {function} onSuccess
  */
  lzwEncode(inputString, onSuccess) {
    run(inputString, encodeString, onSuccess);
  }

  /**
  * @description: Generates a thread and decodes the supplied lzw encoded string
  * @method decode
  * @param {string} inputString
  * @param {function} onSuccess
  */
  lzwDecode(inputString, onSuccess) {
    run(inputString, decodeString, onSuccess, true);
  }

  /**
  * @description: Abstracts hamsters usage for reusability
  * @method run
  * @param {string} inputString
  * @param {function} encodeOrDecode
  * @param {function} onSuccess
  */
  run(inputString, fn, onSuccess, decode) {
    var _inputString = decode
      ? inputString
      : unescape(encodeURIComponent(inputString));

    splitString(_inputString, function(stringArray) {
      var params = {
        array: stringArray
      };
      hamsters.run(params, fn, function(output) {
        var _output = decode
          ? decodeURIComponent(escape(output))
          : output;

        onSuccess(_output);
      }, 1, true);
    });
  }

  /**
  * @description: Splits a string into an array
  * @method splitString
  * @param {string} inputString
  */
  splitString(inputString, onSuccess) {
    var inputArray = (inputString + "").split("");
    var outputArray = [];
    var operator = function(i) {
      return arguments[0].charCodeAt(0);
    };
    var options = {
      operator: operator,
      array: inputArray
    };
    hamsters.tools.loop(options, function(output) {
      onSuccess(output);
    });
  }

  /**
  * @description: Function to be executed within a thread to encode a string
  * @method encodeString
  * @param {params} Object
  */
  encodeString() {
    var returnCharacterCode = function(phrase) {
      if(phrase.length > 1) {
        return dictionary[phrase];
      }
      return phrase.charCodeAt(0);
    };
    var stringArray = [];
    var n = 0;
    for (n; n < params.array.length; n++) {
      stringArray[n] = String.fromCharCode(params.array[n]);
    }
    var currentCharacter;
    var output = [];
    var dictionary = {};
    var code = 256;
    var phrase = stringArray[0];
    var phrasePlusChar;
    var i = 1;
    for (i; i < stringArray.length; i++) {
      currentCharacter = stringArray[i];
      phrasePlusChar = dictionary[phrase + currentCharacter];
      if (phrasePlusChar) {
        phrase += currentCharacter;
      } else {
        output.push(returnCharacterCode(phrase));
        dictionary[phrase + currentCharacter] = code;
        code++;
        phrase = currentCharacter;
      }
    }
    output.push(returnCharacterCode(phrase));
    for (i = 0; i < output.length; i++) {
      rtn.data[i] = String.fromCharCode(output[i]);
    }
    rtn.data = rtn.data.join("");
  }

  /**
  * @description: Function to be executed within a thread to decode an already encoded string
  * @method decodeString
  * @param {params} Object
  */
  decodeString() {
    var returnPhrase = function(currentCode, oldPhrase, currentCharacter) {
      if(typeof dictionary[currentCode] !== 'undefined') {
        return dictionary[currentCode];
      }
      return (oldPhrase + currentCharacter);
    };
    var stringArray = [];
    var n = 0;
    for (n; n < params.array.length; n++) {
      stringArray[n] = String.fromCharCode(params.array[n]);
    }
    var currentCharacter = stringArray[0];
    var oldPhrase = currentCharacter;
    var code = 256;
    var currentCode;
    var currentPhrase;
    var dictionary = {};
    rtn.data.push(currentCharacter);
    for (var i = 1; i < stringArray.length; i++) {
      currentCode = params.array[i];
      if (currentCode < 256) {
        currentPhrase = stringArray[i];
      } else {
        currentPhrase = returnPhrase(currentCode, oldPhrase, currentCharacter);
      }
      rtn.data.push(currentPhrase);
      currentCharacter = currentPhrase.charAt(0);
      dictionary[code] = (oldPhrase + currentCharacter);
      oldPhrase = currentPhrase;
      code++;
    }
    rtn.data = rtn.data.join("");
  }

}

var lzwFlossRedux = new lzwFlossReduxjs();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = lzwFlossRedux;
}
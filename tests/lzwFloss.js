/* jshint esversion: 6, curly: true, eqeqeq: true, forin: true */

/***********************************************************************************
* Title: lzwFlossRedux                                                             *
* Description: 100% Vanilla Javascript Multithreaded LZW Compression Library       *
* Author: Austin K. Smith                                                          *
* Contact: austin@asmithdev.com                                                    *  
* Copyright: 2015 Austin K. Smith - austin@asmithdev.com                           * 
* License: Artistic License 2.0                                                    *
***********************************************************************************/

import lzwFlossRedux from '../src/lzwFlossRedux';
import hamsters from 'hamsters.js';

// Initialize Hamsters.js first
hamsters.init();

// Let's validate our encoding works
describe("lzwFlossRedux", () => {

	it("Hamsters.js should be initialized", () => {
  	expect(typeof hamsters.version).not.toBe('undefined');
    expect(typeof hamsters.init).toBe("undefined");
  });

  it("Version should be defined", () => {
  	expect(typeof lzwFlossRedux.version).not.toBe('undefined');
    expect(typeof lzwFlossRedux.version).toBe("string");
    expect(lzwFlossRedux.version).toEqual('1.0.1');
  });

  it("Encode should be a function", () => {
    expect(typeof lzwFlossRedux.encode).not.toBe('undefined');
    expect(typeof lzwFlossRedux.encode).toEqual('function');
  });

  it("Decode should be a function", () => {
    expect(typeof lzwFlossRedux.decode).not.toBe('undefined');
    expect(typeof lzwFlossRedux.decode).toEqual('function');
  });

  it("splitString should be a function", () => {
    expect(typeof lzwFlossRedux.decode).not.toBe('undefined');
    expect(typeof lzwFlossRedux.decode).toEqual('function');
  });

  it("splitString should return array of charcodes", () => {
  	var stringToSplit = 'This is my string, there are many like it but this one is mine.';
  	var splitString = lzwFlossRedux.splitString(stringToSplit);
  	expect(typeof splitString).not.toBe('undefined');
  	expect(Array.isArray(splitString)).toBe(true);
  });

  it("Encode should encode sample string", () => {
  	var stringToEncode = 'This is my string, there are many like it but this one is mine.';
  	lzwFlossRedux.encode(stringToEncode).then(function(encodedString) {
    	expect(typeof encodedString).not.toBe('undefined');
    	expect(typeof encodedString).toEqual('string');
    	expect(encodedString.length).toBeLessThan(stringToEncode.length);
    	expect(encodedString).toEqual('This Ă my string, there aĕĆanĈlikĖit buģĒąonġămče.')
  	});
  });

  it("Decode should decode sample string", () => {
  	var stringToDecode = 'This Ă my string, there aĕĆanĈlikĖit buģĒąonġămče.';
  	lzwFlossRedux.decode(stringToDecode).then(function(decodedString) {
    	expect(typeof decodedString).not.toBe('undefined');
    	expect(typeof decodedString).toEqual('string');
    	expect(decodedString.length).toBeGreaterThan(stringToDecode.length);
    	expect(decodedString).toEqual('This is my string, there are many like it but this one is mine.')
  	});
  });

});
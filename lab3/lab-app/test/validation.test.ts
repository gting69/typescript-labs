import { expect } from 'chai';
import 'mocha';
import { Validation } from '../src/validation';

describe('Validation Namespace', () => {

    // Тестуємо isRequired
    it('isRequired should return false for empty strings', () => {
        expect(Validation.isRequired('')).to.be.false;
        expect(Validation.isRequired('   ')).to.be.false;
    });

    it('isRequired should return true for non-empty strings', () => {
        expect(Validation.isRequired('hello')).to.be.true;
    });

    // Тестуємо isYear
    it('isYear should correctly validate a year string', () => {
        expect(Validation.isYear('2023')).to.be.true;
        expect(Validation.isYear('1999')).to.be.true;
        expect(Validation.isYear('abc')).to.be.false;
        expect(Validation.isYear('23')).to.be.false;
    });
});
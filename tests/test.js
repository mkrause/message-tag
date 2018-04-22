
const { expect } = require('chai');

const msg = require('../src/index.js');


describe('Message tag', () => {
    it('should return the template unmodified if no substitutions', () => {
        expect(msg``).to.equal('');
        expect(msg`Test message`).to.equal('Test message');
    });
    
    it('should format `undefined` as quoted literal', () => {
        expect(msg`Test: ${undefined}`).to.equal('Test: `undefined`');
    });
    
    it('should format `null` as quoted literal', () => {
        expect(msg`Test: ${null}`).to.equal('Test: `null`');
    });
    
    it('should format string as string literal', () => {
        expect(msg`Test: ${'foo'}`).to.equal('Test: "foo"');
    });
    
    it('should format number as number literal', () => {
        expect(msg`Test: ${42}`).to.equal('Test: 42');
    });
    
    it('should format boolean as quoted literal', () => {
        expect(msg`Test: ${true}`).to.equal('Test: `true`');
        expect(msg`Test: ${false}`).to.equal('Test: `false`');
    });
    
    it('should format symbol as quoted `Symbol(<symbol-name>)`', () => {
        expect(msg`Test: ${Symbol('foo')}`).to.equal('Test: `Symbol(foo)`');
    });
    
    it('should format array as quoted array literal, with elements recursively JSON encoded', () => {
        expect(msg`Test: ${[1, 'foo', true]}`).to.equal('Test: `[1,"foo",true]`');
        
        // Note: at the moment we do not implement recursive formatting, so array elements will not be
        // formatted the same as top-level values
        expect(msg`Test: ${[null]}`).to.not.equal('Test: `[`null`]`');
    });
    
    it('should format function as quoted function body', () => {
        expect(msg`Test: ${function(x) { return x + 1; }}`).to.match(
            // Allow some flexibility in whitespace formatting
            /^Test: `function\s*\(x\)\s*\{\s*return x \+ 1;\s*\}`$/
        );
    });
    
    it('should format plain object as quoted object literal', () => {
        const plainObject1 = Object.create(null); // No prototype
        plainObject1.x = 42;
        
        const plainObject2 = { y: 42 }; // Object prototype
        
        expect(msg`Test: ${plainObject1}`).to.equal('Test: `{"x":42}`');
        expect(msg`Test: ${plainObject2}`).to.equal('Test: `{"y":42}`');
    });
    
    it('should format date as (unquoted) ISO string', () => {
        expect(msg`Test: ${new Date('2018-04-22T18:35:49.382Z')}`).to.equal('Test: 2018-04-22T18:35:49.382Z');
    });
    
    it('should format regex as quoted string representation', () => {
        expect(msg`Test: ${/x/}`).to.equal('Test: `/x/`');
    });
    
    it('should format error as the error type + raw error message', () => {
        expect(msg`Test: ${new Error('foo')}`).to.equal('Test: [Error] foo');
        expect(msg`Test: ${new TypeError('foo')}`).to.equal('Test: [TypeError] foo');
    });
    
    it('should format instance of custom type as constructor name + string representation', () => {
        class ClassSimple {}
        class ClassWithProps {
            constructor() {
                this.x = 42;
                this.y = null;
            }
        }
        
        function CtorWithName() {
            this.x = 42;
        }
        Object.defineProperty(CtorWithName, 'name', { value: 'CustomName' });
        
        expect(msg`Test: ${new ClassSimple()}`).to.equal('Test: [ClassSimple] `{}`');
        expect(msg`Test: ${new ClassWithProps()}`).to.equal('Test: [ClassWithProps] `{"x":42,"y":null}`');
        expect(msg`Test: ${new CtorWithName()}`).to.equal('Test: [CustomName] `{"x":42}`');
    });
});

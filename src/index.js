
const createTag = encode => (stringParts, ...substitutions) =>
    substitutions.reduce(
        (prev, cur, i) => prev + encode(cur) + stringParts[i + 1],
        stringParts[0]
    );

const quote = value => `\`${value}\``;

const hasOwnProperty = (obj, propName) => Object.prototype.hasOwnProperty.call(obj, propName);

const customizedKey = Symbol('msg.customized');

const format = value => {
    if (value === undefined) {
        return quote('undefined');
    } else if (value === null) {
        return quote('null');
    } else if (typeof value === 'boolean') {
        return quote(JSON.stringify(value));
    } else if (typeof value === 'symbol') {
        return quote(value.toString()); // `Symbol(<symbol-name>)`
    } else if (typeof value === 'string') {
        return JSON.stringify(value); // Don't quote, just encode as a string literal
    } else if (typeof value === 'number') {
        if (isNaN(value)) {
            return 'NaN';
        } else if (value === +Infinity) {
            return '+Infinity';
        } else if (value === -Infinity) {
            return '-Infinity';
        }
        
        return JSON.stringify(value);
    } else if (Array.isArray(value)) {
        // Currently just JSON encodes the entire array. We may want to format this a bit nicer.
        return quote(JSON.stringify(value));
    } else if (typeof value === 'function') {
        return quote(value.toString());
    } else if (value instanceof Date) {
        return value.toISOString();
    } else if (value instanceof RegExp) {
        return quote(value.toString());
    } else if (value instanceof Error) {
        // For error messages, print the message raw. We expect the message to be already formatted
        // for display, so encoding it would mess up the formatting.
        return `[${value.constructor.name}] ${value.message}`;
    } else if (typeof value === 'object') {
        if (customizedKey in value) {
            const type = value[customizedKey];
            if (type === 'raw') {
                return value.value;
            } else {
                throw new TypeError(`Unknown customized type \`${JSON.stringify(type)}\``);
            }
        }
        
        const proto = Object.getPrototypeOf(value);
        if (proto === null || proto === Object.prototype) {
            // Currently just JSON encodes the entire object. We may want to format this a bit nicer.
            return quote(JSON.stringify(value));
        }
        
        if (hasOwnProperty(proto, 'constructor') && typeof proto.constructor === 'function') {
            const constructor = proto.constructor;
            
            const tag = constructor.name || 'Unknown';
            
            let stringRep;
            if ('toJSON' in value) {
                // Note: `toJSON` is not included in `Object.prototype`, so will only be present in types
                // that explicitly implement JSON encoding.
                stringRep = quote(JSON.stringify(value));
            } else if ('toString' in value && value.toString !== Object.prototype.toString) {
                // Note: `toString` is included in `Object.prototype`. However, the default implementation is
                // generally not very helpful (e.g. `[Object object]`). So we explicitly ignore it.
                
                stringRep = JSON.stringify(value.toString()); // Encode as string literal
            } else {
                // Fallback: take all enumerable properties and format as object
                stringRep = quote(JSON.stringify({ ...value }));
            }
            
            return `[${tag}] ${stringRep}`;
        }
    }
    
    // Fallback
    return JSON.stringify(value);
};

const msg = createTag(format);

msg.raw = value => ({ [customizedKey]: 'raw', value });

export default msg;

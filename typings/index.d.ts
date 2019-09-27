
declare module 'message-tag' {
    import { Config as PrettyFormatConfig } from 'pretty-format';
    
    type MessageTag = (stringParts : TemplateStringsArray, ...substitutions : unknown[]) => string;
    
    
    type CustomOptions = {
        format ?: Partial<PrettyFormatConfig>,
        dateFormat ?: string,
    };
    
    // Note: structure of the result types can be left opaque (internal structure)
    export const raw : (value : unknown) => object;
    export const custom : (options : CustomOptions, value : unknown) => object;
    
    export const msgTag : (options : CustomOptions) => MessageTag;
    
    const msg : MessageTag & {
        raw : typeof raw,
        custom : typeof msgTag,
    };
    
    export default msg;
}

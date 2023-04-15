
import { type Config as PrettyFormatConfig } from 'pretty-format';


type MessageTag = (stringParts: TemplateStringsArray, ...substitutions: unknown[]) => string;


type CustomOptions = {
    format?: Partial<PrettyFormatConfig>,
    dateFormat?: string,
};

// Note: structure of the result types can be left opaque (internal structure)
export declare const raw: (value: unknown) => object;
export declare const custom: (options: CustomOptions, value: unknown) => object;

export declare const msgTag: (options: CustomOptions) => MessageTag;

declare const msg: MessageTag & {
    raw: typeof raw,
    custom: typeof msgTag,
};

export default msg;

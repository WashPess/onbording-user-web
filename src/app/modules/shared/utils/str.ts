


const toKebabCase = (text: string): string => {
    text = String(text).trim().replace(/ /g, "-").toLowerCase();
    text = `_${text}`;
    return text;
}

const toSnakeCase = (text: string): string => {
    text = String(text).trim().replace(/ /g, "_").toLowerCase();
    text = `_${text}`;
    return text;
}

export const Str = { toKebabCase, toSnakeCase}

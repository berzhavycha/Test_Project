const isObject = (obj: any): boolean => {
    return obj !== null && typeof obj === 'object';
};

const snakeKeyToCamel = (str: string) => {
    return str.split('_')
        .map((word, index) => !index ? word : word[0].toUpperCase() + word.slice(1))
        .join('')
}

export const snakeToCamel = (obj: any) => {
    const camelCaseObj: any = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const camelCaseKey = snakeKeyToCamel(key)

            if (isObject(value)) {
                camelCaseObj[camelCaseKey] = snakeToCamel(value);
            } else if (Array.isArray(value)) {
                value.forEach(elem => {
                    if (isObject(elem)) {
                        snakeKeyToCamel(elem)
                    }
                })
            }
            else {
                camelCaseObj[camelCaseKey] = value;
            }
        }
    }

    return camelCaseObj;
};


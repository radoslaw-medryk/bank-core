export const flattenRequireDir = (obj: any): any[] => {
    if (obj.default) {
        return [obj.default];
    }

    let result: any[] = [];
    for (const val of Object.values<any>(obj)) {
        result = [...result, ...flattenRequireDir(val)];
    }

    return result;
};

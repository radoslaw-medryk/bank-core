export const row = (type: string) => {
    return (a: any, b: any) => {
        console.log(`In row type='${type}', a='${a}', b='${b}'.`);
    };
};

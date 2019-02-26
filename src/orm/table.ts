export const table = (name: string) => {
    return (constructor: any) => {
        console.log(`In table name='${name}', constructor='${constructor}'.`);
    };
};

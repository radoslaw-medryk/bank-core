import { ApiTransactionCategory } from "@radoslaw-medryk/bank-core-shared";

const randomElement = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const transferNames1 = ["Bar", "Place", "Cantin", "Shop", "Mall", "Bistro", "Point", "Palace", "Street", "Restaurant"];

const transferNames2 = [
    "John's",
    "Fenix",
    "Calipso",
    "Harvey's",
    "Barnabus",
    "Kokoloko",
    "Cheburashka",
    "Cat",
    "Lama",
    "Le",
];

export const mockTransferName = () => {
    return `${randomElement(transferNames1)} ${randomElement(transferNames2)}`;
};

const categories: ApiTransactionCategory[] = ["food", "groceries", "transport"];

export const mockCategory = () => {
    return randomElement(categories);
};

const firstNamesM = ["John", "Radoslaw", "Mark", "Peter", "Harvey"];

const firstNamesF = ["Suzan", "Neer", "Anna", "Beatrice", "Jessica"];

const lastNames = ["Smith", "Broke", "Specter", "Ross", "Chen", "Potter", "Pomelo", "Water"];

const genders: ["m", "f"] = ["m", "f"];

export const mockName = () => {
    const gender = randomElement(genders);

    return `${randomElement(gender === "m" ? firstNamesM : firstNamesF)} ${randomElement(lastNames)}`;
};

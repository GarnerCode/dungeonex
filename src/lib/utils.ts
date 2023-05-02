export const generateId = (): number => {
    return Math.round(Date.now() + Math.random());
}
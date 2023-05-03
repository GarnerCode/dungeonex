export const generateId = (): number => {
    return Math.round(Date.now() + Math.random());
}

export const calculateModifier = (stat: number): string => {
    if (stat <= 1) {
        return '-5';
    } else if (2 <= stat && stat <= 3) {
        return '-4';
    } else if (4 <= stat && stat <= 5) {
        return '-3';
    } else if (6 <= stat && stat <= 7) {
        return '-2';
    } else if (8 <= stat && stat <= 9) {
        return '-1';
    } else if (10 <= stat && stat <= 11) {
        return '+0';
    } else if (12 <= stat && stat <= 13) {
        return '+1';
    } else if (14 <= stat && stat <= 15) {
        return '+2';
    } else if (16 <= stat && stat <= 17) {
        return '+3';
    } else if (18 <= stat && stat <= 19) {
        return '+4';
    } else if (20 <= stat && stat <= 21) {
        return '+5';
    } else if (22 <= stat && stat <= 23) {
        return '+6';
    } else if (24 <= stat && stat <= 25) {
        return '+7';
    } else if (26 <= stat && stat <= 27) {
        return '+8';
    } else if (28 <= stat && stat <= 29) {
        return '+9';
    } else {
        return '+10';
    }
}
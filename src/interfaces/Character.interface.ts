export interface Character {
    id: number | string | string[],
    created_at: string,
    name: string,
    race: string,
    class: string,
    level: number,
    stats: Stats,
    armorClass: number,
    maxHp: number,
    speed: number,
    notes: string,
    imageUrl: string,
}

export interface Stats {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
}
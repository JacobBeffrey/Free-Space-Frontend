export interface Astronauts {
  craft: string;
  name: string;
}

export default interface PeopleInSpace {
  people: Astronauts[];
  number: number;
}

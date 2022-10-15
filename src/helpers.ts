import { titleCase as tc } from 'title-case';

export const titleCase = (string: string | undefined) => (string ? tc(string) : '');

import type { BaseElement, coordsType } from '../components/Object';

export function checkClick(coords: coordsType, obj2: BaseElement): boolean {
  return (
    coords.x < obj2.position.x + obj2.size.x &&
    coords.x > obj2.position.x &&
    coords.y < obj2.position.y + obj2.size.y &&
    coords.y > obj2.position.y
  );
}

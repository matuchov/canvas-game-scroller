import type { BaseElement, coordsType } from '../components/Object';

export function checkCollision(obj1: BaseElement, obj2: BaseElement): boolean {
  return (
    obj1.position.x < obj2.position.x + obj2.size.x &&
    obj1.position.x + obj1.size.x > obj2.position.x &&
    obj1.position.y < obj2.position.y + obj2.size.y &&
    obj1.position.y + obj1.size.y > obj2.position.y
  );
}

export function checkClick(coords: coordsType, obj2: BaseElement): boolean {
  return (
    coords.x < obj2.position.x + obj2.size.x &&
    coords.x > obj2.position.x &&
    coords.y < obj2.position.y + obj2.size.y &&
    coords.y > obj2.position.y
  );
}

import type { Object } from '../src/components/Object';

export function checkCircleCollision(obj1: Object, obj2: Object): boolean {
  const dx =
    obj1.position.x + obj1.size.x / 2 - (obj2.position.x + obj2.size.x / 2);
  const dy =
    obj1.position.y + obj1.size.y / 2 - (obj2.position.y + obj2.size.y / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);
  const minDistance = obj1.size.x / 2 + obj2.size.x / 2;
  return distance < minDistance;
}

export function checkCollision(obj1: Object, obj2: Object): boolean {
  return (
    obj1.position.x < obj2.position.x + obj2.size.x &&
    obj1.position.x + obj1.size.x > obj2.position.x &&
    obj1.position.y < obj2.position.y + obj2.size.y &&
    obj1.position.y + obj1.size.y > obj2.position.y
  );
}

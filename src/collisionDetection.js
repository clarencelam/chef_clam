// function detectCollision returns true if bullet is within object
export function detectCollision(bullet, object) {
  let topOfBullet = bullet.position.y;
  let bottomOfBullet = bullet.position.y + bullet.size;
  let leftOfBullet = bullet.position.x;
  let rightOfBullet = bullet.position.x + bullet.size;

  let topOfObject = object.position.y;
  let bottomOfObject = object.position.y + object.size;
  let leftOfObject = object.position.x;
  let rightOfObject = object.position.x + object.size;

  if (
    bottomOfBullet > topOfObject && // bottom of bullet is under the top of obj
    topOfBullet < bottomOfObject &&
    rightOfBullet > leftOfObject &&
    leftOfBullet < rightOfObject
  ) {
    return true;
  } else {
    return false;
  }
}

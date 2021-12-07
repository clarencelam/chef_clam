// function detectCollision returns true if bullet is within object
export function detectCollision(bullet, object) {
  let topOfBullet = bullet.y_pos;
  let bottomOfBullet = bullet.y_pos + bullet.size;
  let leftOfBullet = bullet.x_pos;
  let rightOfBullet = bullet.x_pos + bullet.size;

  let topOfObject = object.y_pos;
  let bottomOfObject = object.y_pos + object.size;
  let leftOfObject = object.x_pos;
  let rightOfObject = object.x_pos + object.size;

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

export function detectOverlapCollision(bullet, object) {
  let topOfBullet = bullet.y_pos;
  let bottomOfBullet = bullet.y_pos + bullet.size;
  let leftOfBullet = bullet.x_pos;
  let rightOfBullet = bullet.x_pos + bullet.size;

  let topOfObject = object.y_pos;
  let bottomOfObject = object.y_pos + object.size;
  let leftOfObject = object.x_pos;
  let rightOfObject = object.x_pos + object.size;

  if (
    bottomOfBullet < bottomOfObject && // bottom of bullet is under the top of obj
    topOfBullet > topOfObject &&
    leftOfBullet > leftOfObject
  ) {
    return true;
  } else {
    return false;
  }
}

export function foodShrink(bullet) {
  const biteSize = 10;
  bullet.size = bullet.size - biteSize;
  bullet.x_pos = bullet.x_pos + biteSize / 2;
  bullet.y_pos = bullet.y_pos + biteSize / 2;
}

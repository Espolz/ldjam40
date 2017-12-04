export function findObjectsByType (type, map, layer) {
  var result = new Array();
  
  map.objects[layer].forEach(function(element){
    if(element.properties.type === type) {
      element.y -= map.tileHeight;
      result.push(element);
    }      
  });
  return result;
}

export function createFromTiledObject(element, group) {
  var sprite = group.create(element.x, element.y, element.properties.sprite);

  Object.keys(element.properties).forEach(function(key){
    sprite[key] = element.properties[key];
  });
}


export const mapsProps = [0, 0, 0, 0]; //rangeMax
export const mapsCoins = [20, 35, 50, 60];
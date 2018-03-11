export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export function spriteSizeFactory(spriteProps, width = 0, height = 0) {
	const scale = spriteProps.scale || 1;
	return Object.assign({}, spriteProps, {
		width: Math.floor(scale * width),
		height: Math.floor(scale * height),
	});
}

export const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
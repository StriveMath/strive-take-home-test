export const loadP5 = async () => {
	// Dynamically import the p5.js library
	const p5Module = await import('p5');
	return p5Module.default; // Return the p5.js module
};

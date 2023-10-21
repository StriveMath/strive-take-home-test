import React, { FC, useEffect, useRef, useState } from 'react';
import P5Console from '../error-console';
import { IP5Props } from './p5.types';

const P5Preview: FC<IP5Props> = ({ p5Code }) => {
	// putting anu for now as there's no time to get the types for it's ref
	const canvasRef = useRef<any>(null);
	const p5Canvas = useRef<any>(null);
	const [error, setError] = useState<string | null>(null);

	const initializeP5 = async () => {
		const p5 = (await import('p5')).default;

		if (p5Canvas.current) {
			p5Canvas.current.remove(); // Remove any existing canvas element
		}

		const sketch = (p: any) => {
			const executeCommand = (command: string) => {
				// Split the command into parts
				const parts = command.match(/[\w.-]+|\[(".*?")\]/g);

				if (parts) {
					const functionName = parts[0];
					const parameters = parts.slice(1).map((param) => param.replace(/['"]/g, ''));

					// Check if the command exists as a property in p and execute it with parameters
					if (p[functionName] && typeof p[functionName] === 'function') {
						p[functionName](...parameters);
					}
				}
			};
			p.setup = () => {
				// check if there;'s a canvas ref
				if (canvasRef.current) {
					// Create a canvas element and append it to the DOM
					p.createCanvas(500, 400).parent(canvasRef.current);
				}
			};

			p.draw = () => {
				try {
					// Split the code into individual commands based on line breaks
					const commands = p5Code.split('\n').map((command) => command.trim());
					// Execute each command
					commands.forEach((command) => {
						executeCommand(command);
					});
					setError(null); // Clear any previous error
				} catch (err: any) {
					setError(err.message); // Capture and display the error message
				}
			};
		};
		// using any here again as we do not know the type of the p5 instance
		const myP5: any = new p5(sketch);
		p5Canvas.current = myP5.canvas; // Store the canvas element reference
	};
	// useEffect to fire the preview based on code changes
	useEffect(() => {
		initializeP5();
	}, [p5Code]);

	return (
		<div>
			<div className="bg-black" ref={canvasRef}></div>
			<P5Console error={error} />
		</div>
	);
};

export default P5Preview;

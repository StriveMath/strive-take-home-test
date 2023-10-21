import React, { FC } from 'react';
import { IErrorConsoleProps } from './error-cconsole.types';

const P5Console: FC<IErrorConsoleProps> = ({ error }) => {
	return (
		<div className="p5-console min-w-500 h-24 p-4 bg-gray-800 text-white overflow-x-auto">
			<div className="console-header flex justify-between items-center">
				<h2 className="text-lg font-semibold">Console</h2>
			</div>
			<div className="console-content mt-2">
				<pre className="text-sm text-red-500 whitespace-nowrap">{error}</pre>
			</div>
		</div>
	);
};

export default P5Console;

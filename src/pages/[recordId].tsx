import BaseLayout from '@/components/BaseLayout';
import { Stepper, StepIndicator, Step, Box, StepSeparator, StepIcon, StepNumber, StepStatus, StepTitle, StepDescription, Button, IconButton, Center } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

import { type GetServerSidePropsContext, type InferGetServerSidePropsType } from 'next';
import Markdown from 'react-markdown';
import { useState } from 'react';

import CodeEditor from '@/components/code-editor';
export default function Lesson(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
	function extractHeadingsWithMarkdown(markdown: string): { heading: string; markdown: string }[] {
		if (!markdown || markdown === '') {
			return [];
		}

		const headingsWithMarkdown: { heading: string; markdown: string }[] = [];

		let currentHeading = '';
		let currentMarkdown = '';

		markdown.split('\n').forEach((line) => {
			if (line.match(/^#\s/)) {
				// A new top-level heading
				if (currentHeading) {
					headingsWithMarkdown.push({ heading: currentHeading, markdown: currentMarkdown });
				}
				currentHeading = line.replace(/^#\s/, '');
				currentMarkdown = line + '\n';
			} else {
				// Add line to current markdown
				currentMarkdown += line + '\n';
			}
		});

		// Add the last set of heading and markdown
		if (currentHeading) {
			headingsWithMarkdown.push({ heading: currentHeading, markdown: currentMarkdown });
		}

		return headingsWithMarkdown;
	}

	const headingsWithChildrenArray = extractHeadingsWithMarkdown(props?.lesson?.record?.fields?.Content || '');
	const [currStepState, setCurrStepState] = useState<number>(0);

	return (
		<BaseLayout>
			{headingsWithChildrenArray.length > 0 ? (
				<>
					<div className="flex items-center gap-4 ">
						<IconButton
							cursor={'pointer'}
							h="30px"
							isDisabled={currStepState === 0}
							onClick={currStepState > 0 ? () => setCurrStepState(currStepState - 1) : () => {}}
							w="24px"
							bgColor={'transparent'}
							_active={{ bgColor: 'transparent' }}
							_hover={{ bgColor: 'transparent' }}
							as={ChevronLeftIcon}
							aria-label="right-icon"
						/>
						<Stepper index={currStepState} className="w-full">
							{headingsWithChildrenArray.map((step) => (
								<Step key={step.heading}>
									<StepIndicator>
										<StepStatus incomplete={<StepNumber />} complete={<StepNumber />} active={<StepNumber />} />
									</StepIndicator>

									<StepSeparator />
								</Step>
							))}
						</Stepper>
						<IconButton
							cursor={'pointer'}
							h="30px"
							isDisabled={currStepState === headingsWithChildrenArray.length - 1}
							onClick={currStepState < headingsWithChildrenArray.length - 1 ? () => setCurrStepState(currStepState + 1) : () => {}}
							w="24px"
							bgColor={'transparent'}
							_active={{ bgColor: 'transparent' }}
							_hover={{ bgColor: 'transparent' }}
							as={ChevronRightIcon}
							aria-label="right-icon"
						/>
					</div>

					<Markdown
						components={{
							h1: ({ node, ...props }) => <h1 className="text-5xl font-bold py-5 text-white" {...props} />,
							h2: ({ node, ...props }) => <h2 className="text-2xl font-bold py-5 text-white" {...props} />,
							p: ({ node, ...props }) => <p className="text-[#FFFFFFCC] py-5" {...props} />,
							ol: ({ node, ...props }) => <ol className="text-[#FFFFFFCC] py-2 list-decimal list-inside space-y-4 ml-4" {...props} />,
							ul: ({ node, ...props }) => <ul className="text-[#FFFFFFCC] py-2 list-disc list-inside space-y-4 ml-4" {...props} />,
							code: ({ children }) => <CodeEditor initialCode={String(children)} />,
						}}
					>
						{headingsWithChildrenArray[currStepState].markdown}
					</Markdown>
				</>
			) : (
				<Center className="text-2xl">{!props.lesson ? 'Error Fetching Lesson' : 'Lessons is Empty'}</Center>
			)}
		</BaseLayout>
	);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	// server side code here
	const recordId = ctx?.query?.recordId as string;

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lessons/${recordId}`);
		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		return {
			props: {
				lesson: await response.json(),
			},
		};
	} catch (error) {
		console.error('Error fetching lesson data:', error);

		return {
			props: {
				lesson: null,
			},
		};
	}
};

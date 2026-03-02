import type { INodeType, INodeTypeDescription, ISupplyDataFunctions } from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';
import { supplyModel } from '@n8n/ai-node-sdk';

type ModelOptions = {
	temperature?: number;
	maxTokens?: number;
};

export class LmChatBaseten implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Baseten Chat Model',
		name: 'lmChatBaseten',
		icon: { light: 'file:../../icons/baseten.svg', dark: 'file:../../icons/baseten.dark.svg' },
		group: ['transform'],
		version: [1],
		description: 'Use Baseten-hosted chat models via the OpenAI-compatible API',
		defaults: {
			name: 'Baseten Chat Model',
		},
		codex: {
			categories: ['assistant'],
			subcategories: {
				AI: ['Language Models', 'Root Nodes'],
				'Language Models': ['Chat Models (Recommended)'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: 'https://docs.baseten.co/api-reference/openai',
					},
				],
			},
		},
		inputs: [],
		outputs: [NodeConnectionTypes.AiLanguageModel],
		outputNames: ['Model'],
		credentials: [
			{
				name: 'basetenApi',
				required: true,
			},
		],
		requestDefaults: {
			ignoreHttpStatusErrors: true,
			baseURL: 'https://inference.baseten.co/v1',
		},
		properties: [
			{
				displayName: 'Model',
				name: 'model',
				type: 'options',
				description:
					'The model to use. Choose from the list, or specify a model ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				typeOptions: {
					loadOptions: {
						routing: {
							request: {
								method: 'GET',
								url: '/models',
							},
							output: {
								postReceive: [
									{ type: 'rootProperty', properties: { property: 'data' } },
									{
										type: 'setKeyValue',
										properties: {
											name: '={{$responseItem.name}}',
											value: '={{$responseItem.id}}',
											description: '={{$responseItem.description}}',
										},
									},
									{ type: 'sort', properties: { key: 'name' } },
								],
							},
						},
					},
				},
				default: '',
			},
			{
				displayName: 'Options',
				name: 'options',
				placeholder: 'Add Option',
				description: 'Additional options to add',
				type: 'collection',
				default: {},
				options: [
					{
						displayName: 'Sampling Temperature',
						name: 'temperature',
						default: 0.7,
						typeOptions: { maxValue: 2, minValue: 0, numberPrecision: 1 },
						description:
							'Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.',
						type: 'number',
					},
					{
						displayName: 'Maximum Tokens',
						name: 'maxTokens',
						default: 1024,
						typeOptions: { minValue: 1 },
						description: 'The maximum number of tokens to generate in the response',
						type: 'number',
					},
				],
			},
		],
	};

	async supplyData(this: ISupplyDataFunctions, itemIndex: number) {
		const credentials = await this.getCredentials('basetenApi');
		const model = this.getNodeParameter('model', itemIndex) as string;
		const options = this.getNodeParameter('options', itemIndex, {}) as ModelOptions;

		return supplyModel(this, {
			type: 'openai',
			baseUrl: 'https://inference.baseten.co/v1',
			apiKey: credentials.apiKey as string,
			model,
			temperature: options.temperature,
			maxTokens: options.maxTokens,
		});
	}
}

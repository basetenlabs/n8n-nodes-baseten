import type {
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestOptions,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class BasetenApi implements ICredentialType {
	name = 'basetenApi';

	displayName = 'Baseten API';

	icon: Icon = { light: 'file:../icons/baseten.svg', dark: 'file:../icons/baseten.dark.svg' };

	documentationUrl = 'https://docs.baseten.co/api-reference/openai';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Your Baseten API key. Find it at app.baseten.co/settings/account/api_keys',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://inference.baseten.co/v1',
			url: '/models',
		},
	};

	async authenticate(
		credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		requestOptions.headers ??= {};
		requestOptions.headers['Authorization'] = `Bearer ${credentials.apiKey}`;
		return requestOptions;
	}
}

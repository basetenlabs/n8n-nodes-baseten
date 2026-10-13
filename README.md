# @basetenlabs/n8n-nodes-baseten

An n8n community node for using [Baseten](https://baseten.co)-hosted chat models in your n8n workflows.

The node calls Baseten's OpenAI-compatible Chat Completions endpoint for chat models served by Model APIs.

[Installation](#installation) | [Credentials](#credentials) | [Usage](#usage) | [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

In your n8n instance, go to **Settings → Community Nodes** and install:

```
@basetenlabs/n8n-nodes-baseten
```

## Credentials

1. Sign up at [app.baseten.co](https://app.baseten.co)
2. Go to **Settings → API Keys** and create a new API key
3. In n8n, create a new **Baseten API** credential and paste your key

## Usage

Use the **Baseten Chat Model** node with a chat model served by Model APIs. Connect it to an AI Agent node or a Basic LLM Chain in your workflow.

Once your API key is saved, the **Model** dropdown auto-populates with all available models. You can also set it to a model slug directly, for example `{{ "zai-org/GLM-5.3" }}`.

Find the full list of supported model slugs in the [Baseten Model APIs documentation](https://docs.baseten.co/inference/model-apis/overview).

## Resources

- [Baseten documentation](https://docs.baseten.co)
- [Baseten model library](https://www.baseten.co/library/)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)

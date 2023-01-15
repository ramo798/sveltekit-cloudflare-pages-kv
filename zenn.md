# install

npm init svelte@latest sveltekit-cloudflare-pages-kv

√ Which Svelte app template? » Skeleton project
√ Add type checking with TypeScript? » Yes, using TypeScript syntax
√ Add ESLint for code linting? ... No / Yes
√ Add Vitest for unit testing? ... No / Yes

npm install
npm run dev --open

# adopter の設定

Cloudflare アダプターをインストール
npm i --save-dev @sveltejs/adapter-cloudflare
svelte.config.js を以下のように修正
プッシュします。

# deploy

pages のページ行く
プロジェクトを作成 → 　先ほど作成したリポジトリを選択　 → 　セットアップを開始
ビルドの設定は下記のように設定します。

# KV 用の設定

環境変数のサポートを含めます。KV 名前空間とその他の env ストレージ オブジェクトを含むオブジェクトは、プラットフォーム プロパティを介して、コンテキストとキャッシュと共に SvelteKit に渡されます。つまり、フックとエンドポイントでアクセスできます。
src\app.d.ts

```
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface Platform {
			env?: {
				MY_KV: KVNamespace;
			};
		}
	}
}

export {};
```

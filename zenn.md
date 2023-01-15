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

ビルドが完了してから割り当てられたドメインを開くとデプロイができたことが確認できます。

# 次に SSR 用の記述をしていきます

+server を記述するとその中身はサーバサイドのみで実行されます。
パラメーターを取得して表示させるだけの処理を書きます
src\routes\[slug]\+page.server.ts

```
import type { PageServerLoad } from './$types';

type OutputType = {
	mozi: string;
};

export const load: PageServerLoad<OutputType> = async ({ params }) => {
	return {
		mozi: params.slug
	};
};

```

src\routes\[slug]\+page.svelte

```
<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<h1>{data.mozi}</h1>

```

表示されていますね

# KV 用の設定

ブラウザから kv の名前空間を作成します
プロジェクト名の命名がかぶってしますので変な名前ですが、、、
今回は sveltekit-cloudflare-pages-kv-kv とします
作成されたら ID を記憶しておいてください。
pages の設定ページから
プロダクショ、プレビューともに以下のように設定しました
wrangler.toml を作成し記述します。

```
name = "sveltekit-cloudflare-pages-kv"
account_id = "909dd8b3a5c0cf5242c23e432efdf5a6"
main = "./.cloudflare/worker.js"
compatibility_date = "2023-01-15"
kv_namespaces = [
   { binding = "MY_KV", id = "a3a690db9abe46cfafbe00480c64ce3e", preview_id = "a3a690db9abe46cfafbe00480c64ce3e" }
 ]
[build]
command = "npm run build"

```

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

# キャッシュを使う

kv 内に値があればその値を返し、なければ kv に登録し、パラメータを返すコードを書きます。

src\routes\[slug]\+page.server.ts

```
import type { PageServerLoad } from './$types';

type OutputType = {
	mozi: string;
};

export const load: PageServerLoad<OutputType> = async ({ params, platform }) => {
	const cache = await platform?.env?.MY_KV.get('test_cache');
	if (cache) {
		return {
			mozi: cache
		};
	}

	await platform?.env?.MY_KV.put('test_cache', params.slug);
	return {
		mozi: params.slug
	};
};

```

npx wrangler@beta pages dev .svelte-kit/cloudflare/ --port 3131
一回目のアクセスはこれ
2 回目はこれ
パラメータを変えてキャッシュが使われていることがわかります。
KV に登録されていることがわかります

#　デプロイしましょう。

プッシュします。

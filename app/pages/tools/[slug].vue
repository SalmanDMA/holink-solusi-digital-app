<script setup lang="ts">
import { computed } from 'vue';
import { useTools } from '~/composables/useTools';

const route = useRoute();
const { getToolBySlug } = useTools();

const tool = computed(() => getToolBySlug(route.params.slug as string));

if (!tool.value) {
	throw createError({ statusCode: 404, statusMessage: 'Tool Not Found' });
}

const t = tool.value!;
const canonicalUrl = computed(() => `https://holink-solusi-digital-app.vercel.app/tools/${tool.value?.slug}`);

useSeoMeta({
	title: `${t.name} — ${t.category} Tool | Holink`,
	description: t.description,
	ogTitle: t.name,
	ogDescription: t.description,
	ogImage: t.image,
	ogType: 'website',
	twitterCard: 'summary_large_image',
	twitterTitle: t.name,
	twitterDescription: t.description,
	twitterImage: t.image,
});

useHead({
	link: [{ rel: 'canonical', href: canonicalUrl.value }],
	script: [
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'SoftwareApplication',
				name: t.name,
				applicationCategory: t.category,
				description: t.description,
				image: t.image,
				url: t.website,
				aggregateRating: {
					'@type': 'AggregateRating',
					ratingValue: t.rating,
					reviewCount: t.reviews,
				},
				offers: {
					'@type': 'Offer',
					price: t.pricing,
				},
			}),
		},
	],
});
</script>

<template>
	<div class="min-h-screen bg-[#F8F9FC]">
		<AppHeader />

		<template v-if="tool">
			<main class="max-w-7xl mx-auto px-6 lg:px-8 py-10">
				<nav class="flex items-center gap-2 text-sm text-[#94A3B8] mb-8">
					<NuxtLink to="/" class="hover:text-[#0057FF] transition-colors">All Tools</NuxtLink>
					<span>/</span>
					<span class="text-[#0F172A] font-medium">{{ tool.name }}</span>
				</nav>

				<div class="grid lg:grid-cols-3 gap-8 items-start">
					<div class="lg:col-span-2 space-y-6">
						<div class="rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white">
							<img :src="tool.image" :alt="tool.name" class="w-full aspect-[16/7] object-cover" />
						</div>

						<div class="bg-white rounded-2xl border border-[#E2E8F0] p-6 md:p-8">
							<span
								class="text-xs font-semibold uppercase tracking-widest text-[#0057FF] bg-[#EFF6FF] px-3 py-1 rounded-full"
							>
								{{ tool.category }}
							</span>
							<h1 class="mt-4 text-3xl md:text-4xl font-bold text-[#0F172A]">{{ tool.name }}</h1>
							<p class="mt-2 text-lg text-[#475569] font-medium">{{ tool.tagline }}</p>
							<p class="mt-6 text-[#475569] leading-relaxed">{{ tool.description }}</p>
						</div>

						<div class="bg-white rounded-2xl border border-[#E2E8F0] p-6 md:p-8">
							<h2 class="text-xl font-bold text-[#0F172A] mb-6">Key Features</h2>
							<ul class="grid sm:grid-cols-2 gap-3">
								<li
									v-for="feature in tool.features"
									:key="feature"
									class="flex items-center gap-3 text-sm text-[#475569]"
								>
									<span
										class="w-5 h-5 rounded-full bg-[#EFF6FF] text-[#0057FF] flex items-center justify-center text-xs font-bold shrink-0"
										>✓</span
									>
									{{ feature }}
								</li>
							</ul>
						</div>

						<div class="bg-white rounded-2xl border border-[#E2E8F0] p-6 md:p-8">
							<h2 class="text-xl font-bold text-[#0F172A] mb-6">Supported Platforms</h2>
							<div class="flex flex-wrap gap-2">
								<span
									v-for="platform in tool.platforms"
									:key="platform"
									class="text-sm font-medium text-[#475569] border border-[#E2E8F0] bg-[#F8F9FC] px-4 py-2 rounded-lg"
								>
									{{ platform }}
								</span>
							</div>
						</div>
					</div>

					<div class="space-y-4 lg:sticky lg:top-24">
						<div class="bg-white rounded-2xl border border-[#E2E8F0] p-6">
							<div class="flex items-center gap-3 mb-6">
								<div class="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-xl">
									🛠
								</div>
								<div>
									<p class="font-bold text-[#0F172A]">{{ tool.name }}</p>
									<p class="text-sm text-[#94A3B8]">{{ tool.category }}</p>
								</div>
							</div>
							<a
								:href="tool.website"
								target="_blank"
								rel="noopener noreferrer"
								class="w-full block text-center bg-[#0057FF] hover:bg-[#0040CC] text-white font-semibold py-3 rounded-xl transition-colors"
							>
								Visit Website →
							</a>
						</div>

						<div class="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-1">
							<div class="flex items-center justify-between py-3 border-b border-[#F1F5F9]">
								<span class="text-sm text-[#94A3B8]">Pricing</span>
								<span class="text-sm font-semibold text-[#0F172A]">{{ tool.pricing }}</span>
							</div>
							<div class="flex items-center justify-between py-3 border-b border-[#F1F5F9]">
								<span class="text-sm text-[#94A3B8]">Rating</span>
								<span class="text-sm font-semibold text-[#0F172A] flex items-center gap-1">
									<span class="text-yellow-400">★</span> {{ tool.rating }}
								</span>
							</div>
							<div class="flex items-center justify-between py-3">
								<span class="text-sm text-[#94A3B8]">Reviews</span>
								<span class="text-sm font-semibold text-[#0F172A]">{{
									tool.reviews.toLocaleString()
								}}</span>
							</div>
						</div>

						<NuxtLink
							to="/"
							class="block text-center text-sm font-medium text-[#475569] hover:text-[#0057FF] transition-colors py-2"
						>
							← Back to all tools
						</NuxtLink>
					</div>
				</div>
			</main>
		</template>

		<footer class="border-t border-slate-200 bg-white">
			<div class="max-w-7xl mx-auto px-6 lg:px-8 h-14 flex justify-center items-center">
				<div class="flex items-center gap-2">
					<span
						class="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs font-bold"
						>H</span
					>
					<p class="text-sm text-slate-500 font-medium">© 2026 Holink Solusi Digital.</p>
				</div>
			</div>
		</footer>
	</div>
</template>

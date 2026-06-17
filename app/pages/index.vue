<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTools } from '~/composables/useTools';
import type { Tool } from '~/types/tool';

export interface CategoryCount {
	label: string;
	count: number;
}

const { tools } = useTools();

const selectedCategory = ref<string>('All');
const searchQuery = ref<string>('');
const sidebarOpen = ref<boolean>(false);

const categories = computed<CategoryCount[]>(() => {
	const counts: Record<string, number> = {};
	for (const t of tools) {
		counts[t.category] = (counts[t.category] || 0) + 1;
	}

	const categoryList = Object.entries(counts).map(([label, count]) => ({ label, count }));
	categoryList.sort((a, b) => a.label.localeCompare(b.label));

	return [{ label: 'All', count: tools.length }, ...categoryList];
});

const filtered = computed<Tool[]>(() => {
	return tools.filter((t) => {
		const matchCategory = selectedCategory.value === 'All' || t.category === selectedCategory.value;
		const searchLower = searchQuery.value.toLowerCase().trim();
		const matchSearch =
			!searchLower ||
			(t.name && t.name.toLowerCase().includes(searchLower)) ||
			(t.description && t.description.toLowerCase().includes(searchLower));

		return matchCategory && matchSearch;
	});
});

function selectCategory(cat: string): void {
	selectedCategory.value = cat;
	sidebarOpen.value = false;
}

useSeoMeta({
	title: 'Holink Solusi Digital — Software Tools Directory',
	description:
		'Explore 50+ curated software tools across marketing, analytics, automation, productivity, and business operations.',
	ogTitle: 'Holink Solusi Digital — Software Tools Directory',
	ogDescription:
		'Explore 50+ curated software tools across marketing, analytics, automation, productivity, and business operations.',
	ogType: 'website',
});
</script>

<template>
	<div class="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
		<AppHeader />

		<main>
			<section class="relative bg-white border-b border-slate-200 overflow-hidden py-8">
				<div
					class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none"
				></div>

				<div
					class="max-w-7xl mx-auto px-6 lg:px-8 relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
				>
					<span
						class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50/80 text-blue-700 text-xs font-bold tracking-wider uppercase ring-1 ring-blue-600/10 shadow-sm mb-8 backdrop-blur-sm"
					>
						Software Directory
					</span>

					<h1
						class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6"
					>
						Find the right tool <br class="hidden sm:block" />
						<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
							for your team.
						</span>
					</h1>

					<p class="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
						{{ tools.length }} curated tools across marketing, analytics, automation, and more — all in one
						centralized hub.
					</p>

					<div class="w-full max-w-2xl relative group">
						<input
							v-model="searchQuery"
							type="text"
							placeholder="Search tools by name or features..."
							class="block w-full pl-14 pr-16 py-4 rounded-2xl border-0 ring-1 ring-slate-200 shadow-sm text-slate-900 bg-white/80 backdrop-blur-md placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-base transition-all duration-300 group-hover:shadow-md group-hover:ring-slate-300"
						/>
					</div>
				</div>
			</section>

			<div class="max-w-7xl mx-auto px-6 lg:px-8 py-10 md:py-14">
				<div class="md:hidden mb-6">
					<button
						@click="sidebarOpen = !sidebarOpen"
						class="w-full flex items-center justify-between px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
					>
						<span class="flex items-center gap-2">
							<span class="text-slate-400">📂</span>
							{{ selectedCategory === 'All' ? 'All Categories' : selectedCategory }}
						</span>
						<span
							class="text-slate-400 transition-transform duration-200"
							:class="sidebarOpen ? 'rotate-180' : ''"
							>▼</span
						>
					</button>

					<transition
						enter-active-class="transition duration-200 ease-out"
						enter-from-class="transform scale-95 opacity-0"
						enter-to-class="transform scale-100 opacity-100"
						leave-active-class="transition duration-75 ease-in"
						leave-from-class="transform scale-100 opacity-100"
						leave-to-class="transform scale-95 opacity-0"
					>
						<div
							v-if="sidebarOpen"
							class="mt-2 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xl absolute z-10 w-[calc(100%-2rem)] left-4 right-4"
						>
							<div class="max-h-80 overflow-y-auto">
								<button
									v-for="cat in categories"
									:key="cat.label"
									@click="selectCategory(cat.label)"
									:class="[
										'w-full flex items-center justify-between px-4 py-3 text-sm border-b border-slate-50 last:border-0 transition-colors',
										selectedCategory === cat.label
											? 'bg-blue-50 text-blue-700 font-semibold'
											: 'text-slate-600 hover:bg-slate-50',
									]"
								>
									<span>{{ cat.label }}</span>
									<span
										:class="[
											'text-xs px-2 py-0.5 rounded-full font-medium border',
											selectedCategory === cat.label
												? 'bg-blue-100 text-blue-700 border-blue-200'
												: 'bg-slate-100 text-slate-500 border-slate-200',
										]"
										>{{ cat.count }}</span
									>
								</button>
							</div>
						</div>
					</transition>
				</div>

				<div class="flex gap-10 items-start">
					<aside class="hidden md:block w-64 shrink-0 sticky top-24">
						<h3
							class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-3 flex items-center gap-2"
						>
							<span>Filter by Category</span>
						</h3>
						<ul class="space-y-1">
							<li v-for="cat in categories" :key="cat.label">
								<button
									@click="selectCategory(cat.label)"
									class="group w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
									:class="[
										selectedCategory === cat.label
											? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
											: 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900',
									]"
								>
									<span>{{ cat.label }}</span>
									<span
										class="text-xs px-2 py-0.5 rounded-full transition-colors"
										:class="[
											selectedCategory === cat.label
												? 'bg-blue-500 text-white border border-blue-400/50'
												: 'bg-white text-slate-500 border border-slate-200 group-hover:border-slate-300',
										]"
										>{{ cat.count }}</span
									>
								</button>
							</li>
						</ul>
					</aside>

					<div class="flex-1 min-w-0">
						<div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
							<p class="text-sm text-slate-500">
								Showing
								<strong class="text-slate-900 font-semibold">{{ filtered.length }}</strong> tool{{
									filtered.length !== 1 ? 's' : ''
								}}
								<span v-if="selectedCategory !== 'All'">
									in
									<strong
										class="text-slate-900 font-semibold px-2 py-1 bg-slate-100 rounded-md ml-1"
										>{{ selectedCategory }}</strong
									>
								</span>
								<span v-if="searchQuery" class="ml-1">
									matching "<strong class="text-slate-900">{{ searchQuery }}</strong
									>"
								</span>
							</p>

							<button
								v-if="filtered.length === 0"
								@click="
									searchQuery = '';
									selectedCategory = 'All';
								"
								class="text-sm text-blue-600 hover:text-blue-800 font-medium"
							>
								Clear filters
							</button>
						</div>

						<div
							v-if="filtered.length === 0"
							class="text-center py-20 px-6 bg-white border border-slate-200 border-dashed rounded-2xl"
						>
							<span class="text-4xl mb-4 block">🔍</span>
							<h3 class="text-lg font-semibold text-slate-900 mb-2">No tools found</h3>
							<p class="text-slate-500 text-sm max-w-sm mx-auto">
								We couldn't find any tools matching your current search or category filters. Try
								adjusting them.
							</p>
						</div>

						<div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
							<ToolCard v-for="tool in filtered" :key="tool.id" :tool="tool" />
						</div>
					</div>
				</div>
			</div>
		</main>

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

<style scoped>
::-webkit-scrollbar {
	width: 6px;
}
::-webkit-scrollbar-track {
	background: transparent;
}
::-webkit-scrollbar-thumb {
	background: #cbd5e1;
	border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
	background: #94a3b8;
}
</style>

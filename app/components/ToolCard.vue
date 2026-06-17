<script setup lang="ts">
import type { Tool } from '~/types/tool';

defineProps<{
	tool: Tool;
}>();
</script>

<template>
	<NuxtLink
		:to="`/tools/${tool.slug}`"
		class="group bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg hover:border-[#0057FF]/30 transition-all duration-200 flex flex-col"
	>
		<div class="relative overflow-hidden aspect-[16/9]">
			<img
				:src="tool.image"
				:alt="tool.name"
				class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
			/>
			<div class="absolute top-3 left-3">
				<span
					class="text-xs font-semibold bg-white/90 backdrop-blur-sm text-[#0057FF] px-2.5 py-1 rounded-full border border-[#E2E8F0]"
				>
					{{ tool.category }}
				</span>
			</div>
		</div>

		<div class="p-5 flex flex-col flex-1">
			<div class="flex items-start justify-between gap-2 mb-2">
				<h2
					class="text-base font-bold text-[#0F172A] group-hover:text-[#0057FF] transition-colors leading-snug"
				>
					{{ tool.name }}
				</h2>
				<span
					class="text-xs font-semibold text-[#0F172A] bg-[#F1F5F9] px-2 py-1 rounded-md whitespace-nowrap shrink-0"
				>
					{{ tool.pricing }}
				</span>
			</div>

			<p class="text-sm text-[#475569] leading-relaxed flex-1">
				{{ tool.tagline }}
			</p>

			<div class="mt-4 flex items-center justify-between">
				<div class="flex items-center gap-1">
					<span class="text-yellow-400 text-sm">★</span>
					<span class="text-sm font-semibold text-[#0F172A]">{{ tool.rating }}</span>
					<span class="text-xs text-[#94A3B8]">({{ tool.reviews.toLocaleString() }})</span>
				</div>
				<div class="flex gap-1">
					<span
						v-for="platform in tool.platforms.slice(0, 2)"
						:key="platform"
						class="text-xs text-[#475569] bg-[#F8F9FC] border border-[#E2E8F0] px-2 py-0.5 rounded"
					>
						{{ platform }}
					</span>
					<span v-if="tool.platforms.length > 2" class="text-xs text-[#94A3B8] px-1 py-0.5">
						+{{ tool.platforms.length - 2 }}
					</span>
				</div>
			</div>
		</div>
	</NuxtLink>
</template>

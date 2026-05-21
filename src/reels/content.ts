export interface ReelContent {
	lines: string[];
	accentLine?: string;
	subtext?: string;
	cta: string;
}

export interface ReelDefinition extends ReelContent {
	id: string;
	durationInFrames: number;
}

export const reels: ReelDefinition[] = [
	{
		id: 'Reel01',
		durationInFrames: 900,
		lines: ['Você está sendo', 'preparado para um', 'mercado que'],
		accentLine: 'não existe mais.',
		cta: 'Chegou a hora de mudar isso.',
	},
	{
		id: 'Reel02',
		durationInFrames: 750,
		lines: ['Diploma não garante', 'mais emprego.'],
		accentLine: 'Habilidade certa, sim.',
		cta: 'Aprenda com quem entende o mercado.',
	},
	{
		id: 'Reel03',
		durationInFrames: 750,
		lines: ['Enquanto você espera,'],
		accentLine: 'o mercado não para.',
		cta: 'Comece agora. Link na bio.',
	},
	{
		id: 'Reel04',
		durationInFrames: 750,
		lines: ['Aprenda hoje', 'o que'],
		accentLine: 'o mercado vai exigir amanhã.',
		cta: 'MD Educação prepara você.',
	},
	{
		id: 'Reel05',
		durationInFrames: 750,
		lines: ['Habilidades digitais', 'não são diferencial.'],
		accentLine: 'São obrigação.',
		cta: 'Você está preparado para o mercado real?',
	},
	{
		id: 'Reel06',
		durationInFrames: 750,
		lines: ['A formatura', 'é o começo,'],
		accentLine: 'não o destino.',
		cta: 'Continue evoluindo. Sempre.',
	},
	{
		id: 'Reel07',
		durationInFrames: 750,
		lines: ['O mercado mudou.'],
		accentLine: 'Sua educação acompanhou?',
		cta: 'Descubra como se preparar de verdade.',
	},
	{
		id: 'Reel08',
		durationInFrames: 750,
		lines: ['Quem se atualiza'],
		accentLine: 'lidera.',
		subtext: 'Quem para fica para trás.',
		cta: 'Qual lado você escolhe?',
	},
	{
		id: 'Reel09',
		durationInFrames: 750,
		lines: ['Não basta estudar muito.'],
		accentLine: 'Estude o que importa.',
		cta: 'Descubra o método MD Educação.',
	},
	{
		id: 'Reel10',
		durationInFrames: 900,
		lines: ['O próximo passo', 'da sua carreira'],
		accentLine: 'começa aqui.',
		cta: 'MD Educação — Link na bio ↓',
	},
];

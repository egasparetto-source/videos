import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import type {ReelContent} from './reels/content';

const RED = '#E63329';
const BG = '#0D0D0D';
const FONT = "'Montserrat', 'Arial Black', Helvetica, Arial, sans-serif";
const PAD_LEFT = 72;
const PAD_RIGHT = 60;
const FONT_SIZE = 72;

interface LineConfig {
	text: string;
	startFrame: number;
	color: string;
	fontSize: number;
	italic?: boolean;
}

const AnimatedLine: React.FC<LineConfig> = ({
	text,
	startFrame,
	color,
	fontSize,
	italic = false,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const p = spring({
		frame: frame - startFrame,
		fps,
		config: {damping: 14, stiffness: 90, mass: 0.6},
	});

	const opacity = interpolate(p, [0, 1], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const y = interpolate(p, [0, 1], [55, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				opacity,
				transform: `translateY(${y}px)`,
				color,
				fontSize,
				fontWeight: 900,
				fontStyle: italic ? 'italic' : 'normal',
				lineHeight: 1.08,
				fontFamily: FONT,
				letterSpacing: '-0.02em',
				marginBottom: 12,
				wordWrap: 'break-word',
			}}
		>
			{text}
		</div>
	);
};

export const ReelTemplate: React.FC<ReelContent> = ({
	lines,
	accentLine,
	subtext,
	cta,
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();

	const fadeIn = interpolate(frame, [0, 20], [0, 1], {
		extrapolateRight: 'clamp',
	});
	const fadeOut = interpolate(
		frame,
		[durationInFrames - 25, durationInFrames],
		[1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const globalOpacity = Math.min(fadeIn, fadeOut);

	const brandP = spring({
		frame: frame - 10,
		fps,
		config: {damping: 14, stiffness: 80},
	});
	const brandOpacity = interpolate(brandP, [0, 1], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	let delay = 25;
	const LINE_DELAY = 14;
	const lineConfigs: LineConfig[] = [];

	for (const line of lines) {
		lineConfigs.push({
			text: line,
			startFrame: delay,
			color: '#FFFFFF',
			fontSize: FONT_SIZE,
		});
		delay += LINE_DELAY;
	}

	if (accentLine) {
		lineConfigs.push({
			text: accentLine,
			startFrame: delay,
			color: RED,
			fontSize: FONT_SIZE,
			italic: true,
		});
		delay += LINE_DELAY;
	}

	if (subtext) {
		delay += 8;
		lineConfigs.push({
			text: subtext,
			startFrame: delay,
			color: '#AAAAAA',
			fontSize: 54,
		});
		delay += LINE_DELAY;
	}

	const ctaDelay = delay + 20;
	const ctaP = spring({
		frame: frame - ctaDelay,
		fps,
		config: {damping: 14, stiffness: 80},
	});
	const ctaOpacity = interpolate(ctaP, [0, 1], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: BG,
				opacity: globalOpacity,
				overflow: 'hidden',
			}}
		>
			<style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,600;0,700;0,900;1,900&display=swap');`}</style>

			{/* Background watermark */}
			<div
				style={{
					position: 'absolute',
					right: -80,
					bottom: -60,
					fontSize: 560,
					fontWeight: 900,
					color: 'rgba(255,255,255,0.025)',
					fontFamily: FONT,
					lineHeight: 1,
					letterSpacing: '-0.1em',
					userSelect: 'none',
					pointerEvents: 'none',
				}}
			>
				MD
			</div>

			{/* Left accent bar */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					width: 10,
					height: '100%',
					background: `linear-gradient(to bottom, transparent 0%, ${RED} 15%, ${RED} 85%, transparent 100%)`,
				}}
			/>

			{/* Brand header */}
			<div
				style={{
					position: 'absolute',
					top: 90,
					left: PAD_LEFT,
					right: PAD_RIGHT,
					opacity: brandOpacity,
					display: 'flex',
					alignItems: 'center',
					gap: 14,
					fontFamily: FONT,
				}}
			>
				<div
					style={{
						width: 10,
						height: 10,
						borderRadius: '50%',
						backgroundColor: RED,
					}}
				/>
				<span
					style={{
						color: '#FFFFFF',
						fontSize: 30,
						fontWeight: 700,
						letterSpacing: '0.12em',
						textTransform: 'uppercase',
					}}
				>
					MD Educação
				</span>
			</div>

			{/* Main text block */}
			<div
				style={{
					position: 'absolute',
					left: PAD_LEFT,
					right: PAD_RIGHT,
					top: '42%',
					transform: 'translateY(-50%)',
				}}
			>
				{lineConfigs.map((cfg, i) => (
					// eslint-disable-next-line react/no-array-index-key
					<AnimatedLine key={i} {...cfg} />
				))}
			</div>

			{/* CTA footer */}
			<div
				style={{
					position: 'absolute',
					bottom: 110,
					left: PAD_LEFT,
					right: PAD_RIGHT,
					opacity: ctaOpacity,
				}}
			>
				<div
					style={{
						width: 56,
						height: 4,
						backgroundColor: RED,
						marginBottom: 18,
						borderRadius: 2,
					}}
				/>
				<div
					style={{
						color: '#BBBBBB',
						fontSize: 38,
						fontWeight: 600,
						fontFamily: FONT,
						lineHeight: 1.4,
					}}
				>
					{cta}
				</div>
			</div>
		</AbsoluteFill>
	);
};

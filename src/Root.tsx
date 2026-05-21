import React from 'react';
import {Composition} from 'remotion';
import {ReelTemplate} from './ReelTemplate';
import {reels} from './reels/content';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			{reels.map((reel) => (
				<Composition
					key={reel.id}
					id={reel.id}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					component={ReelTemplate as any}
					durationInFrames={reel.durationInFrames}
					fps={30}
					width={1080}
					height={1920}
					defaultProps={{
						lines: reel.lines,
						accentLine: reel.accentLine,
						subtext: reel.subtext,
						cta: reel.cta,
					}}
				/>
			))}
		</>
	);
};

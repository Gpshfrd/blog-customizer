import clsx from 'clsx';
import styles from './index.module.scss';

export type SpaceSize = 50 | 207;

export const Spacing = ({ size }: { size: SpaceSize }) => {
	const className = `spacing${size}`;
	return <div className={clsx([styles.spacing, styles[className]])}></div>;
};

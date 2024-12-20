import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen: boolean;
	onClick: OnClick;
};

export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: isOpen })}
			onClick={onClick}
		>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx({
					[styles.arrow]: !isOpen,
					[styles.arrow_open]: isOpen,
				})}
			/>
		</div>
	);
};

import { useEffect, useState, useRef, FormEvent } from 'react';
import { ArticleParamsFormUI } from './ArticleParamsFormUI';
import {
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	articleParams: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleParams,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [settingsState, setSettingsState] =
		useState<ArticleStateType>(defaultArticleState);
	const divElementRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				divElementRef.current &&
				!divElementRef.current.contains(target)
			) {
				if (isMenuOpen) {
					onClick?.();
				}
			}
		};

		if (isMenuOpen) {
			window.addEventListener('mousedown', handleClick);
		} else {
			window.removeEventListener('mousedown', handleClick);
		}

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isMenuOpen]);

	const onClick = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const handleClearForm = (evt: FormEvent) => {
		evt.preventDefault();
		setSettingsState(defaultArticleState);
		articleParams(defaultArticleState);
	};

	const handleSubmitForm = (evt: FormEvent) => {
		evt.preventDefault();
		articleParams(settingsState);
	};

	const updateFormState = (
		selected: OptionType,
		key: keyof ArticleStateType
	) => {
		setSettingsState((prevState) => ({
			...prevState,
			[key]: selected,
		}));
	};

	return (
		<ArticleParamsFormUI
			isMenuOpen={isMenuOpen}
			settingsState={settingsState}
			onClick={onClick}
			handleClearForm={handleClearForm}
			handleSubmitForm={handleSubmitForm}
			updateFormState={updateFormState}
			divElementRef={divElementRef}
		/>
	);
};

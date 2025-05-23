import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { useClickOutside } from 'src/hooks/useClickOutside';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { Spacing } from 'src/ui/spacing';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	setStateArticle: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	setStateArticle,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setStateForm] =
		useState<ArticleStateType>(defaultArticleState);

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setStateForm((prev) => ({ ...prev, [field]: value }));
		};
	};

	const formRef = useRef<HTMLFormElement>(null);
	const asideRef = useRef<HTMLElement>(null);

	useClickOutside(asideRef, () => setIsOpen(false), isOpen);

	const onApply = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStateArticle(formState);
	};

	const onReset = () => {
		setStateForm(defaultArticleState);
		setStateArticle(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={onApply}
					onReset={onReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Spacing size={50} />
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOnChange('fontFamilyOption')}
					/>
					<Spacing size={50} />
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleOnChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Spacing size={50} />
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleOnChange('fontColor')}
					/>
					<Spacing size={50} />
					<Separator />
					<Spacing size={50} />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleOnChange('backgroundColor')}
					/>
					<Spacing size={50} />
					<Select
						title='Ширина контентa'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleOnChange('contentWidth')}
					/>
					<Spacing size={207} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

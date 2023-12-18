import { LoaderIcon } from "@/components/icons"
import styles from './Loading.module.scss'
import { Typography } from "@/components/ui"

export const Loading = () => {
	return (
		<div
			className={styles.wrapper}
		>
			<div className={styles.content}>
				<Typography as={'span'} size={'3xl'}>Just give us a second</Typography>
				<LoaderIcon className="animate-spin" width="2rem" height="2rem" />
			</div>
		</div>
	)
}